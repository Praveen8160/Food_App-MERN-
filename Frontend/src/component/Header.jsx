import React, { useContext, useEffect, useState } from "react";
import style from "../style/Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { cartcount } from "../Context/CartProvider";
import { AuthContext } from "../Context/AuthProvider";

function Header() {
  const { count } = useContext(cartcount);
  const { isAuthenticated, logout, Role } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleselect = async (event) => {
    const value = event.target.value;
    if (value === "Logout") {
      try {
        await logout();
        navigate("/SignIn");
      } catch (error) {
        console.error("Error logging out", error);
      }
    } else {
      navigate(`/${value}`);
      event.target.value = "";
    }
  };
  return (
    <nav className={style.navbar}>
      <div className={style.container}>
        <img
          src="https://tse3.mm.bing.net/th?id=OIP.yEF7JTCS1sTJEphGsADZTQHaHa&pid=Api&P=0&h=180"
          alt="logo"
          className={style.logo}
        />
        <ul className={style.nav_links}>
          <li>
            {Role !== "Seller" && (
              <Link to={"/"} className={style.nav_link}>
                Home
              </Link>
            )}
            {isAuthenticated && Role === "Customer" && (
              <>
                <Link to={"/Myorder"} className={style.nav_link}>
                  My Order
                </Link>
              </>
            )}
            {isAuthenticated && Role === "Seller" && (
              <>
                <Link to={"/Dashboard"} className={style.nav_link}>
                  Dashboard
                </Link>

                <select
                  className={`bg-transparent font-bold text-xl ml-4 text-white outline-none ${style.custom_select}`}
                  onChange={handleselect}
                  defaultValue=""
                >
                  <option value="" disabled>
                    More
                  </option>
                  <option value="Add_food" className="text-black">Add Food</option>
                  <option value="View_Order" className="text-black">View Order</option>
                </select>
              </>
            )}
          </li>
        </ul>
      </div>
      {!isAuthenticated ? (
        <div>
          <button className="bg-white rounded-md align-middle p-2 mr-10 hover:bg-slate-400">
            <Link to="/SignIn" className={style.nav_btn}>
              Login{" "}
            </Link>
          </button>
          <button className="bg-white rounded-md align-middle p-2 hover:bg-slate-400">
            <Link to={"/SignUp"} className={style.nav_btn}>
              Sign Up
            </Link>
          </button>
        </div>
      ) : (
        <div>
          {Role === "Customer" && (
            <button className="bg-white rounded-md align-middle p-2 mr-10 hover:bg-slate-400">
              <Link to="/Cart" className={style.nav_btn}>
                My Cart{" "}
                <span className=" bg-red-400 rounded-full m-2 p-2">
                  {count}
                </span>
              </Link>
            </button>
          )}
          <select
            className="bg-white rounded-md align-middle p-3 border-none font-bold text-xl text-black"
            onChange={handleselect}
            defaultValue=""
          >
            <option value="" disabled>
              Account
            </option>
            <option name="" id="" value="Logout">
              Logout
            </option>
            <option name="" id="" value="Profile">
              Profile
            </option>
          </select>
        </div>
      )}
    </nav>
  );
}

export default Header;
