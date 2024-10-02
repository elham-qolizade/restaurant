import { useDarkMode } from "../shared/context/DarkModeContext";
import { CiLight } from "react-icons/ci";
import { MdLightMode } from "react-icons/md";
import React, { useState, useContext, useEffect } from "react";
import {
  CartContext,
  CartContextType,
  CartItemType,
} from "../shared/context/cart-context";
import AddCart from "../assets/image/icon-add-to-cart.svg";
import IconDecrement from "../assets/image/icon-decrement-quantity.svg";
import IconIncrement from "../assets/image/icon-increment-quantity.svg";

import { useTranslation } from "react-i18next";
import Cart from "./Cart";

const MenuList: React.FC = () => {
  useEffect(() => {
    fetch("http://localhost:2043/")
      .then((response) => response.json())
      .then((data) => {
        const updatedProducts = data.map((product) => ({
          name: { en: product.name_en, fa: product.name_fa },
          category: { en: product.category_en, fa: product.category_fa },
          price: product.price,
          image: product.image,
        }));
        setProducts(updatedProducts);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const { t, i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    console.log(`Changing language to: ${lng}`);
    i18n.changeLanguage(lng);
  };

  const { theme, toggleTheme } = useDarkMode();
  const [products, setProducts] = useState<CartItemType[]>([]);
  const { cartItems: cartItemsComponent, setCartItems: setCartItemsComponent } =
    useContext(CartContext) as CartContextType;
  const addToCart = (name: string, price: number) => {
    const newItem: CartItemType = {
      name: name,
      price: price,
      quantity: 1,
      category: "Category",
      image: "image_url",
    };
    console.log("name:", name);

    setCartItemsComponent((prevState) => [...prevState, newItem]);
  };

  const handleIncrement = (name: string) => {
    setCartItemsComponent((prevState) =>
      prevState.map((item) =>
        item.name === name ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  return (
    <div className={` ${theme === "dark" ? "bg-gray-900" : "bg-pink-100"}`}>
      <div className="container">
        <nav className="flex flex-row justify-between pt-5 ">
          <select
            className={`border-brown-900 border  rounded-md ${
              theme === "dark" ? "bg-gray-900 , text-brown-100" : "bg-white"
            }`}
            value={i18n.language}
            onChange={(e) => changeLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="fa">Pershian</option>
          </select>

          <button onClick={toggleTheme}>
            {theme === "light" ? (
              <MdLightMode />
            ) : (
              <CiLight className="text-white " />
            )}
          </button>
        </nav>

        <div className="container py-16">
          <div className="flex flex-col justify-center gap-10 lg:flex-row">
            <section>
              <h1
                className="mb-6 text-4xl font-bold text-brown-900"
                style={{ direction: i18n.language === "fa" ? "rtl" : "ltr" }}
              >
                {t("title")}
              </h1>
              <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1">
                {products.map((product, index) => (
                  <div
                    key={index}
                    style={{
                      direction: i18n.language === "fa" ? "rtl" : "ltr",
                    }}
                  >
                    <img
                      className="w-full rounded-2xl lg:max-w-60 "
                      style={{
                        border: cartItemsComponent.some(
                          (item) => item.name === product.name.en
                        )
                          ? theme === "dark"
                            ? "2px solid rgb(127 29 29)"
                            : "2px solid rgb(239 68 68 )"
                          : "none",
                      }}
                      src={product.image}
                      alt={
                        i18n.language === "fa"
                          ? product.name.fa
                          : product.name.en
                      }
                    />
                    {!cartItemsComponent?.some(
                      (item) => item.name === product.name.en
                    ) ? (
                      <button
                        onClick={() =>
                          addToCart(product.name.en, product.price)
                        }
                        className={`relative z-10 flex px-6 py-2 mx-auto  border bottom-5 border-brown-400 rounded-3xl ${
                          theme === "dark"
                            ? "bg-gray-900 , text-brown-300"
                            : "bg-white"
                        }`}
                      >
                        <AddCart />
                        {t("addbtn")}
                      </button>
                    ) : (
                      <div
                        className={`relative z-10 flex flex-row items-center justify-around w-40 h-10 mx-auto text-white  bottom-5 rounded-3xl ${
                          theme === "dark" ? "bg-red-900" : " bg-red-500"
                        }`}
                      >
                        <button
                          onClick={() =>
                            setCartItemsComponent((prevState) =>
                              prevState.map((item) =>
                                item.name === product.name.en
                                  ? { ...item, quantity: item.quantity - 1 }
                                  : item
                              )
                            )
                          }
                          className="flex items-center justify-center w-5 h-5 border border-white rounded-full"
                        >
                          <IconDecrement />
                        </button>
                        <span>{product.quantity}</span>
                        <button
                          onClick={() => handleIncrement(product.name.en)}
                          className="flex items-center justify-center w-5 h-5 border border-white rounded-full"
                        >
                          <IconIncrement />
                        </button>
                      </div>
                    )}
                    <h3 className="text-brown-500">
                      {i18n.language === "fa"
                        ? product.category.fa
                        : product.category.en}
                    </h3>
                    <h2 className="text-brown-900">
                      {i18n.language === "fa"
                        ? product.name?.fa
                        : product.name.en}
                    </h2>
                    <p className="font-semibold text-red-500">
                      ${product.price}
                    </p>
                  </div>
                ))}
              </div>
            </section>
            <Cart className="Cart" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuList;
