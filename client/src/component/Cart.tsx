import React, { useContext } from "react";
import { CartContext, CartContextType } from "../shared/context/cart-context";
import CartModal from "../Modal/Modal";
import Empty from "../assets/image/illustration-empty-cart.svg";
import Delete from "../assets/image/icon-remove-item.svg";
import { useTranslation } from "react-i18next";
import { useDarkMode } from "../shared/context/DarkModeContext";

const Cart: React.FC = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    console.log(`Changing language to: ${lng}`);
    i18n.changeLanguage(lng);
  };
  const { cartItems: cartItemsComponent, setCartItems: setCartItemsComponent } =
    useContext(CartContext) as CartContextType;

  const { theme, toggleTheme } = useDarkMode();
  const handleClearCart = () => {
    setCartItemsComponent([]);
  };
  const handleDeleteItems = (index: number) => {
    const updatedCartItems = [...cartItemsComponent];
    updatedCartItems.splice(index, 1);
    setCartItemsComponent(updatedCartItems);
  };

  return (
    <div
      className={` max-h-80 mt-16 ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      }`}
      style={{ direction: i18n.language === "fa" ? "rtl" : "ltr" }}
    >
      {cartItemsComponent.length === 0 ? (
        <article className="container px-20 py-10 rounded-md">
          <h2 className="p-2 mb-4 text-2xl font-bold text-red-500">
            {t("cart")}
            <span>({cartItemsComponent.length})</span>
          </h2>
          <Empty />
          <p className="text-center text-brown-500">{t("paragraph")}</p>
        </article>
      ) : (
        <article
          className={` p-4 px-20  rounded-md ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h3 className="mb-4 text-2xl font-bold text-red-500">
            {t("cart")}
            <span>({cartItemsComponent.length})</span>
          </h3>
          <ul className="px-10">
            {cartItemsComponent.map((item, index) => (
              <li key={index} className="pb-4 mb-4 border-b border-brown-100">
                <span
                  className={`block mb-2  ${
                    theme === "dark" ? "text-brown-700" : "text-brown-900"
                  }`}
                >
                  {item.name}
                </span>
                <span
                  className={` ${
                    theme === "dark" ? "text-brown-400" : "text-black"
                  }`}
                >
                  {item.quantity}x
                </span>
                <span className="ml-4 font-light text-brown-500">
                  @ ${item.price}
                  <b className="ml-1">${item.quantity * item.price}</b>
                </span>
                <button
                  className="inline-flex items-center justify-center float-right w-5 h-5 border rounded-full text-brown-500 border-brown-500"
                  onClick={() => handleDeleteItems(index)}
                >
                  <Delete />
                </button>
              </li>
            ))}
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
              $
              {cartItemsComponent.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              )}
            </p>
          </div>
          <CartModal onClose={handleClearCart} cartItems={cartItemsComponent} />
        </article>
      )}
    </div>
  );
};
export default Cart;
