import Footer from "./component/Footer";
import Header from "./component/Header";
import { Outlet } from "react-router";
import { CartProvider } from "./Context/CartProvider";
import { AuthProvider } from "./Context/AuthProvider";
function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <Header></Header>
        <Outlet></Outlet>
        <Footer></Footer>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;
