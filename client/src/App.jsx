import React from "react";
import MenuList from "./component/MenuList";
import CartProvider from "./shared/context/cart-context";
import i18n from "./i18n";

import { DarkModeProvider } from "./shared/context/DarkModeContext";
import Cart from "./component/Cart";

function App() {
  return (
    <DarkModeProvider>
      <CartProvider>
        <div>
          <MenuList />
        </div>
      </CartProvider>
    </DarkModeProvider>
  );
}

export default App;
