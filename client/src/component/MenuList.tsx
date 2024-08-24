import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "../shared/context/cart-context";
import addToCartImg from "../assets/image/icon-add-to-cart.svg";
import iconDecrement from "../assets/icon-decrement-quantity.svg";
import iconIncrement from "../assets/icon-increment-quantity.svg";
import Cart from "../component/Cart";

type Product = {
  name: string;
  category: string;
  price: number;
  image: string;
  quantity: number;
};

const MenuList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useContext(CartContext);

  const addToCart = (name: string, price: number) => {
    const existingItem = cartItems.find((item) => item.name === name);
    if (existingItem) {
      setCartItems((prevState) =>
        prevState.map((item) =>
          item.name === name ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      const product = { name, price, quantity: 1 };
      setCartItems((prevState) => [...prevState, product]);
    }
  };

  const handleIncrement = (name: string) => {
    setCartItems((prevState) =>
      prevState.map((item) =>
        item.name === name ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (name: string) => {
    setCartItems((prevState) =>
      prevState.map((item) =>
        item.name === name && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  useEffect(() => {
    fetch("http://localhost:3278/")
      .then((response) => response.json())
      .then((data: Product[]) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <>
      <div className="container py-16">
        <div className="flex lg:flex-row flex-col justify-center gap-10">
          <section>
            <h1 className="mb-6 text-4xl font-bold text-brown-900">Desserts</h1>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
              {products.map((product) => (
                <div key={product.name}>
                  <img
                    className={`rounded-2xl max-w-60 ${
                      cartItems.some((item) => item.name === product.name)
                        ? "border-2 border-red-500"
                        : "border-2 border-transparent"
                    }`}
                    src={product.image}
                    alt={product.name}
                  />
                  {!cartItems.some((item) => item.name === product.name) ? (
                    <button
                      onClick={() => addToCart(product.name, product.price)}
                      className="relative  bottom-5 z-10 flex px-6 py-2 mx-auto bg-white border border-brown-400 rounded-3xl"
                    >
                      <img src={addToCartImg} alt="" />
                      Add to cart
                    </button>
                  ) : (
                    <div className="relative z-10 bottom-5 flex flex-row items-center justify-around w-40 h-10 mx-auto text-white bg-red-700 rounded-3xl">
                      <button
                        onClick={() => handleDecrement(product.name)}
                        className="flex items-center justify-center w-5 h-5 border border-white rounded-full"
                      >
                        <img src={iconDecrement} alt="" />
                      </button>
                      <span>{product.quantity}</span>
                      <button
                        onClick={() => handleIncrement(product.name)}
                        className="flex items-center justify-center w-5 h-5 border border-white rounded-full"
                      >
                        <img src={iconIncrement} alt="" />
                      </button>
                    </div>
                  )}
                  <h3 className="text-brown-500">{product.category}</h3>
                  <h2 className="text-brown-900">{product.name}</h2>
                  <p className="font-semibold text-red-500">${product.price}</p>
                </div>
              ))}
            </div>
          </section>
          <Cart />
        </div>
      </div>
    </>
  );
};

export default MenuList;
