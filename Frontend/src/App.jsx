import Cart from "./Pages/Customer/Cart";
import Footer from "./component/Footer";
import Header from "./component/Header";
import { Outlet } from "react-router";
import { CartProvider } from "./Context/CartProvider";
function App() {
  return (
    <CartProvider>
      <Header></Header>
      <Outlet></Outlet>
      {/* <Add_food></Add_food> */}
      <Footer></Footer>
    </CartProvider>
  );
}

export default App;
