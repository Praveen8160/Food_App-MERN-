import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Footer from "./component/Footer";
import Header from "./component/Header";
import Home from "./component/Home";
import { Outlet } from "react-router";
function App() {
  return (
    <>
    <Header></Header>
    <Outlet></Outlet>
    <Footer></Footer>
    </>
  );
}

export default App;
