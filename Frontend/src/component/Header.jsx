import React from "react";
import style from "../style/Header.module.css";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const logouthandler = () => {
    localStorage.removeItem("authtoken");
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
              <Link to={"/"} className={style.nav_link}>
                Add Cart
              </Link>
            )}
          </li>
        </ul>
      </div>
      {!localStorage.getItem("authtoken") ? (
        <div>
          <Link to="/SignIn" className={style.nav_link}>
            Login
          </Link>
          <Link to={"/SignUp"} className={style.nav_link}>
            Sign Up
          </Link>
        </div>
      ) : (
        <div>
          <Link to="/" className={style.nav_link}>
            My Cart
          </Link>
          <button className={style.nav_link} onClick={logouthandler}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Header;
