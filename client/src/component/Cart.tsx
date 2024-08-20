import empty from "../assets/image/illustration-empty-cart.svg";
import React from "react";
const Cart: React.FC = () => {
  return (
    <div className="py-16">
      <article className="bg-white px-20 h-72 p-4 rounded-md ">
        <h2 className="text-red-500 text-2xl font-bold mb-4">Your cart</h2>
        <img src={empty} alt="" />
        <p className="text-center text-brown-500">
          Your added items will appear here
        </p>
      </article>
    </div>
  );
};

export default Cart;
