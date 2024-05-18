import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./component/Home.jsx";
import SignIn from "./Pages/SignIn.jsx";
import SignUp from "./Pages/SignUp.jsx";
import Cart from "./Pages/Customer/Cart.jsx";
import Myorder from "./Pages/Customer/Myorder.jsx";
import ProtectedRoute from "./component/ProtectedRoute.jsx";
const rout = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App></App>}>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/SignIn" element={<SignIn></SignIn>}></Route>
      <Route path="/SignUp" element={<SignUp></SignUp>}></Route>
      {/* <Route path="/Cart" element={<Cart></Cart>}></Route>
      <Route
        path="/Myorder"
        element={<ProtectedRoute component={Myorder} />}
      ></Route> */}
      <Route path="/Myorder" element={<Myorder></Myorder>}></Route>
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={rout}></RouterProvider>
  </React.StrictMode>
);
