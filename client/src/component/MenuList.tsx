import React, { useEffect, useState } from "react";
import button from "../assets/image/icon-add-to-cart.svg";

type Product = {
  name: string;
  category: string;
  price: number;
  image: string;
};

const MenuList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

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
      <div className="container flex flex-row gap-14">
        <section>
          <h1 className="mb-6 text-4xl font-bold text-brown-900 ">Desserts</h1>

          <div className="grid grid-cols-3 gap-6">
            {products.map((product, index) => (
              <div key={index}>
                <img
                  className="rounded-lg max-w-56"
                  src={product.image}
                  alt={product.name}
                />
                <button className="relative mx-auto bottom-6 px-6 py-2 flex  bg-white border border-brown-400 rounded-3xl z-10">
                  <img src={button} alt="" />
                  Add to cart{" "}
                </button>

                <h3 className="text-brown-500">{product.category}</h3>
                <h2 className="text-brown-900">{product.name}</h2>

                <p className="font-semibold text-red-500">${product.price}</p>
              </div>
            ))}
          </div>
        </section>
        <article>
          <div>kkddkksk</div>
        </article>
      </div>
    </>
  );
};

export default MenuList;
