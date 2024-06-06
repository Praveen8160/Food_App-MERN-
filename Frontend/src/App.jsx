import Footer from "./component/Footer";
import Header from "./component/Header";
import { Outlet } from "react-router";
import { CartProvider } from "./Context/CartProvider";
import { AuthProvider } from "./Context/AuthProvider";
function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <div className="overflow-hidden">
          <Header></Header>
          <div className="">
            <Outlet></Outlet>
          </div>
          <Footer></Footer>
        </div>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;
