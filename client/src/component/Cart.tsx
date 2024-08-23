import empty from "../assets/image/illustration-empty-cart.svg";
import React, { useContext, useState } from "react";
import { CartContext } from "../shared/context/cart-context";
import CartModal from "../Modal/Modal";

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useContext(CartContext);

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="py-10">
      {cartItems.length === 0 ? (
        <article className="px-20 py-10 bg-white rounded-md">
          <h2 className="p-2 mb-4 text-2xl font-bold text-red-500">
            Your cart <span>({cartItems.length})</span>
          </h2>
          <img src={empty} alt="" />
          <p className="text-center text-brown-500">
            Your added items will appear here
          </p>
        </article>
      ) : (
        <article className="p-4 px-20 bg-white rounded-md">
          <h3 className="mb-4 text-2xl font-bold text-red-500">
            Your Cart <span>({cartItems.length})</span>
          </h3>
          <ul className="px-10">
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
                    className="pb-4 mb-4 border-b border-brown-100"
                  >
                    <span className="block mb-2 text-brown-900">
                      {uniqueItem.name}
                    </span>
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
          <CartModal onClose={handleClearCart} cartItems={cartItems} />
        </article>
      )}
    </div>
  );
};

export default Cart;
