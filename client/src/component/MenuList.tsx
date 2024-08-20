import React, { useEffect, useState, useContext } from "react";
import { CartContext } from "../shared/context/cart-context";
import addToCartImg from "../assets/image/icon-add-to-cart.svg";
import Cart from "./Cart";

type Product = {
  name: string;
  category: string;
  price: number;
  image: string;
};

const MenuList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useContext(CartContext);
  const addToCart = (name: string, price: number) => {
    const product = { name, price };
    setCartItems((currState: Product[]) => [...currState, product]);
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
        <div className="flex flex-row gap-10 justify-center">
          <section>
            <h1 className="mb-6 text-4xl font-bold text-brown-900">Desserts</h1>
            <div className="grid grid-cols-3 gap-6">
              {products.map((product, index) => (
                <div key={index}>
                  <img
                    className="rounded-2xl max-w-60"
                    src={product.image}
                    alt={product.name}
                  />
                  <button
                    onClick={() => addToCart(product.name, product.price)}
                    className="relative mx-auto bottom-6 px-6 py-2 flex bg-white border border-brown-400 rounded-3xl z-10"
                  >
                    <img src={addToCartImg} alt="" />
                    Add to cart
                  </button>

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
