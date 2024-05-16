import Cart from "./Pages/Customer/Cart";
import Footer from "./component/Footer";
import Header from "./component/Header";
import { Outlet } from "react-router";
function App() {
  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
      {/* <Add_food></Add_food> */}
      <Footer></Footer>
    </>
  );
}

export default App;
