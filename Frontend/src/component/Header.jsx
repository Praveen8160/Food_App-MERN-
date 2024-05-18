import React, { useContext, useEffect, useState } from "react";
import style from "../style/Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { cartcount } from "../Context/CartProvider";

function Header() {
  const { count } = useContext(cartcount);
  const navigate = useNavigate();
  const logouthandler = () => {
    localStorage.removeItem("authtoken");
    localStorage.removeItem("email");
    navigate("/SignIn");
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
            <Link to={"/"} className={style.nav_link}>
              Home
            </Link>
            {localStorage.getItem("authtoken") && (
              <Link to={"/Myorder"} className={style.nav_link}>
                My Order
              </Link>
            )}
          </li>
        </ul>
      </div>
      {!localStorage.getItem("authtoken") ? (
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
          <button className="bg-white rounded-md align-middle p-2 mr-10 hover:bg-slate-400">
            <Link to="/Cart" className={style.nav_btn}>
              My Cart{" "}
              <span className=" bg-red-400 rounded-full m-2 p-2">{count}</span>
            </Link>
          </button>
          <button
            className="bg-white rounded-md align-middle p-2 hover:bg-slate-400"
            onClick={logouthandler}
          >
            <Link to="/" className={style.nav_btn}>
              Logout
            </Link>
          </button>
        </div>
      )}
    </nav>
  );
}

export default Header;
