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
import Add_food from "./Pages/Seller/Add_food.jsx";
import Profile from "./Pages/Profile.jsx";
import Dashboard from "./Pages/Seller/Dashboard.jsx";
import View_Order from "./Pages/Seller/View_Order.jsx";
import View_food from "./Pages/Seller/View_food.jsx";
const rout = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App></App>}>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/SignIn" element={<SignIn></SignIn>}></Route>
      <Route path="/SignUp" element={<SignUp></SignUp>}></Route>
      <Route
        path="/Cart"
        element={<ProtectedRoute component={Cart} role={["Customer"]} />}
      ></Route>
      <Route
        path="/Myorder"
        element={<ProtectedRoute component={Myorder} role={["Customer"]} />}
      ></Route>
      {/* <Route path="/Myorder" element={<Myorder></Myorder>}></Route> */}
      <Route
        path="/Add_food"
        element={<ProtectedRoute component={Add_food} role={["Seller"]} />}
      ></Route>
      <Route
        path="/Edit_food/:id"
        element={<ProtectedRoute component={Add_food} role={["Seller"]} />}
      ></Route>
      <Route
        path="/Profile"
        element={
          <ProtectedRoute component={Profile} role={["Seller", "Customer"]} />
        }
      ></Route>
      <Route
        path="/Dashboard"
        element={<ProtectedRoute component={Dashboard} role={["Seller"]} />}
      ></Route>
      <Route
        path="/View_Order"
        element={<ProtectedRoute component={View_Order} role={["Seller"]} />}
      ></Route>
      <Route
        path="/View_food"
        element={<ProtectedRoute component={View_food} role={["Seller"]} />}
      ></Route>
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={rout}></RouterProvider>
  </React.StrictMode>
);
