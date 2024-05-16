import React, { useEffect, useState } from "react";
import style from "../style/Header.module.css";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [count, setcount] = useState(0);
  const navigate = useNavigate();
  const logouthandler = () => {
    localStorage.removeItem("authtoken");
    navigate("/SignIn");
  };
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("cart"))) {
      const cart = JSON.parse(localStorage.getItem("cart")).length;
      setcount(cart);
    } else {
      setcount(0);
    }
  }, []);
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
              <Link to={"/"} className={style.nav_link}>
                Add Cart
              </Link>
            )}
          </li>
        </ul>
      </div>
      {!localStorage.getItem("authtoken") ? (
        <div>
          <Link to="/SignIn" className={style.nav_btn}>
            Login
          </Link>
          <button>
            <Link to={"/SignUp"} className={style.nav_btn}>
              Sign Up
            </Link>
          </button>
        </div>
      ) : (
        <div>
          <button className="bg-white rounded-md align-middle p-2 mr-10">
            <Link to="/Cart" className={style.nav_btn}>
              My Cart{" "}
              <span className=" bg-red-400 rounded-full m-2 p-2">{count}</span>
            </Link>
          </button>
          <button
            className="bg-white rounded-md align-middle p-2"
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
