import React, { useState } from "react";
import done from "../assets/image/icon-order-confirmed.svg";

const CartModal = ({ cartItems, onClose }) => {
  const [showModal, setShowModal] = useState(false);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

  const handleOrder = () => {
    setShowModal(true);
    setIsOrderConfirmed(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    onClose();
  };

  return (
    <div className={`modal ${showModal ? "show" : "hide"}`}>
      {isOrderConfirmed && (
        <div className="fixed inset-0 z-10 w-full mx-auto my-0 bg-black h-max-full opacity-60"></div>
      )}
      {showModal && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-xl p-4 mx-4 bg-white rounded-lg">
            <img src={done} alt="" />
            <h2 className="text-4xl font-bold">Order confirmed</h2>
            <p className="mb-5">We hope you enjoy your food!</p>
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
                      className="pb-4 mb-4 border-b bg-red-50 border-brown-100"
                    >
                      <span className="block mb-2 text-brown-900">
                        {uniqueItem.name}
                      </span>
                      <img src={uniqueItem.img} alt="" />
                      <span>{itemCount}x</span>
                      <span className="ml-4 font-light text-brown-500">
                        @ ${uniqueItem.price}
                        <b className="ml-1">${itemCount * uniqueItem.price}</b>
                      </span>
                    </li>
                  );
                })}
            </ul>
            <div className="flex flex-row items-center justify-between">
              <p className="text-sm">Order Total:</p>
              <p className="text-2xl font-bold text-brown-900">
                ${cartItems.reduce((total, item) => total + item.price, 0)}
              </p>
            </div>
            <button
              className="block w-64 mx-auto my-4 bg-red-500 md:w-full h-14 rounded-3xl"
              onClick={handleCloseModal}
            >
              Start New order
            </button>
          </div>
        </div>
      )}
      <button
        onClick={handleOrder}
        className="block w-64 mx-auto my-4 text-white bg-red-500 md:w-full h-14 rounded-3xl"
      >
        Confirm Order
      </button>
    </div>
  );
};

export default CartModal;
