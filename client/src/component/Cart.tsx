import React, { useContext } from "react";
import { CartContext } from "../shared/context/cart-context";
import CartModal from "../Modal/Modal";
import empty from "../assets/image/illustration-empty-cart.svg";
import Delete from "../assets/icon-remove-item.svg";

const Cart: React.FC = () => {
  const { cartItems, setCartItems } = useContext<{
    cartItems: Array<any>;
    setCartItems: Function;
  }>(CartContext);

  const handleClearCart = () => {
    setCartItems([]);
  };
  const handleDeleteItems = (index: number) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
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
            {cartItems.map((item, index) => (
              <li key={index} className="pb-4 mb-4 border-b border-brown-100">
                <span className="block mb-2 text-brown-900">{item.name}</span>
                <span>{item.quantity}x</span>
                <span className="ml-4 font-light text-brown-500">
                  @ ${item.price}
                  <b className="ml-1">${item.quantity * item.price}</b>
                </span>
                <button
                  className="inline-flex items-center justify-center float-right w-5 h-5 border rounded-full text-brown-500 border-brown-500"
                  onClick={() => handleDeleteItems(index)}
                >
                  <img src={Delete} alt="" />
                </button>
              </li>
            ))}
          </ul>
          <div className="flex flex-row items-center justify-between">
            <p className="text-sm">Order Total:</p>
            <p className="text-2xl font-bold text-brown-900">
              $
              {cartItems.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              )}
            </p>
          </div>
          <CartModal onClose={handleClearCart} cartItems={cartItems} />
        </article>
      )}
    </div>
  );
};
export default Cart;
