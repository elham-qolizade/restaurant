import React, { useEffect, useState } from "react";

interface Item {
  Image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  name: string;
  category: string;
  price: number;
}

const Cart: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    fetch("http://localhost:12000/")
      .then((response) => response.json())
      .then((data: Item[]) => setItems(data));
  }, []);

  return (
    <>
      {items.map((item) => (
        <div key={item.name}>
          <img src={item.Image.desktop} alt={item.name} />{" "}
          <button className="flex px-6 py-2 border-brown-500 border-rounded-3xl">
            Add to Cart
          </button>
          <p className="text-brown-500">{item.category}</p>
          <h2 className="text-brown-900">{item.name}</h2>
          <p className="font-semibold text-red-500">${item.price}</p>
        </div>
      ))}
    </>
  );
};

export default Cart;
