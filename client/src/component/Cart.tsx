import empty from "../assets/image/illustration-empty-cart.svg";
import React, { useContext } from "react";
import { CartContext } from "../shared/context/cart-context";

const Cart: React.FC = () => {
  const [cartItems] = useContext(CartContext);

  return (
    <div className="py-10">
      {cartItems.length === 0 ? (
        <article className="bg-white px-20 rounded-md py-10">
          <h2 className="text-red-500 text-2xl p-2 font-bold mb-4">
            Your cart <span>({cartItems.length})</span>
          </h2>
          <img src={empty} alt="" />
          <p className="text-center text-brown-500">
            Your added items will appear here
          </p>
        </article>
      ) : (
        <article className="bg-white px-20 p-4 rounded-md">
          <h3 className="text-red-500 text-2xl font-bold mb-4">
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
                    className="border-b border-brown-100 mb-4 pb-4"
                  >
                    <span className="block text-brown-900 mb-2">
                      {uniqueItem.name}
                    </span>
                    <span>{itemCount}x</span>
                    <span className="text-brown-500 font-light ml-4">
                      @ ${uniqueItem.price}
                      <b className="ml-1">${itemCount * uniqueItem.price}</b>
                    </span>
                    <button className="inline-flex justify-center items-center text-brown-500 border border-brown-500 rounded-full w-5 h-5 float-right">
                      X
                    </button>
                  </li>
                );
              })}
          </ul>
          <div className="flex flex-row justify-between items-center">
            <p className="text-sm">Order Total:</p>
            <p className="text-2xl text-brown-900 font-bold">
              ${cartItems.reduce((total, item) => total + item.price, 0)}
            </p>
          </div>
        </article>
      )}
    </div>
  );
};

export default Cart;
