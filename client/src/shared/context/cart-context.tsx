import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

export interface CartItemType {
  name: string;
  category: string;
  price: number;
  image: string;
  quantity: number;
}

export type CartContextType = {
  cartItems: CartItemType[];
  setCartItems: Dispatch<SetStateAction<CartItemType[]>>;
};

export const CartContext = React.createContext<CartContextType>({
  cartItems: [],
  setCartItems: () => {},
});

const CartProvider = (props: { children: React.ReactNode }) => {
  const [cartItemsContext, setCartItemsContext] = useState<CartItemType[]>([]);

  return (
    <CartContext.Provider
      value={{ cartItems: cartItemsContext, setCartItems: setCartItemsContext }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
