import Cart from "./component/Cart";
import MenuList from "./component/MenuList";
import CartProvider from "./shared/context/cart-context";

function App() {
  return (
    <CartProvider>
      <MenuList />
    </CartProvider>
  );
}

export default App;
