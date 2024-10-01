import React, { useState } from "react";
import Done from "../assets/image/icon-order-confirmed.svg";
import { useTranslation } from "react-i18next";
import {
  useDarkMode,
  DarkModeProvider,
} from "../shared/context/DarkModeContext";
const CartModal = ({ cartItems, onClose }) => {
  const [showModal, setShowModal] = useState(false);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

  const handleOrder = () => {
    setShowModal(true);
    setIsOrderConfirmed(true);
  };
  const { theme, toggleTheme } = useDarkMode();
  const handleCloseModal = () => {
    setShowModal(false);
    onClose();
  };
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    console.log(`Changing language to: ${lng}`);
    i18n.changeLanguage(lng);
  };

  return (
    <div
      className={`modal ${showModal ? "show" : "hide"}`}
      style={{ direction: i18n.language === "fa" ? "rtl" : "ltr" }}
    >
      {isOrderConfirmed && (
        <div className="fixed inset-0 z-10 w-full mx-auto my-0 bg-black h-max-full opacity-60"></div>
      )}
      {showModal && (
        <div
          className={`fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50 ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div
            className={`w-full max-w-xl p-4 mx-4  rounded-lg ${
              theme === "dark" ? "bg-gray-900" : "bg-white"
            }`}
          >
            <Done />
            <h2
              className={`text-4xl font-bold   ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              {t("ordertitle")}
            </h2>
            <p
              className={`mb-5   ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              {t("orderparagraph")}
            </p>
            <ul className="px-4">
              {cartItems
                .reduce((uniqueItems, item) => {
                  if (
                    !uniqueItems.some(
                      (uniqueItem) => uniqueItem.name === item.name
                    )
                  ) {
                    uniqueItems.push(item);
                  }
                  return uniqueItems;
                }, [])
                .map((uniqueItem, index) => {
                  const itemCount = cartItems.filter(
                    (cartItem) => cartItem.name === uniqueItem.name
                  ).length;

                  return (
                    <li
                      key={index}
                      className={`pb-4 mb-4  ${
                        theme === "dark"
                          ? "bg-gray-800"
                          : "border-b bg-red-50 border-brown-100"
                      }`}
                    >
                      <span
                        className={`block mb-2  ${
                          theme === "dark" ? "text-brown-700" : "text-brown-900"
                        }`}
                      >
                        {uniqueItem.name}
                      </span>
                      <img src={uniqueItem.img} alt="" />
                      <span
                        className={` ${
                          theme === "dark" ? "text-brown-400" : "text-black"
                        }`}
                      >
                        {itemCount}x
                      </span>
                      <span className="ml-4 font-light text-brown-500">
                        @ ${uniqueItem.price}
                        <b className="ml-1">${itemCount * uniqueItem.price}</b>
                      </span>
                    </li>
                  );
                })}
            </ul>
            <div className="flex flex-row items-center justify-between">
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-brown-700" : "text-black"
                }`}
              >
                {t("OrderTotal")}:
              </p>
              <p
                className={`text-2xl font-bold   ${
                  theme === "dark" ? "text-brown-700" : "text-brown-900"
                }`}
              >
                ${cartItems.reduce((total, item) => total + item.price, 0)}
              </p>
            </div>
            <button
              className={`block w-64 mx-auto my-4 text-white md:w-full h-14 rounded-3xl  ${
                theme === "dark" ? "bg-red-900" : " bg-red-500"
              }`}
              onClick={handleCloseModal}
            >
              {t("neworder")}
            </button>
          </div>
        </div>
      )}
      <button
        onClick={handleOrder}
        className={`block w-64 mx-auto my-4 text-white  md:w-full h-14 rounded-3xl ${
          theme === "dark" ? "bg-red-900" : " bg-red-500"
        }`}
      >
        {t("orderbtn")}
      </button>
    </div>
  );
};

export default CartModal;
