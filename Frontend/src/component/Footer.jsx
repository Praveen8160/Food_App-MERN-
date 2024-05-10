import React from "react";
import style from "../style/Footer.module.css";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <>
      <div className={style.footer}>
        <Link className="mr-2 hover:underline" to={"/"}>Home</Link>
        <Link className="mr-2 hover:underline" to={"/SignIn"}>Sign In</Link>
        <Link className="hover:underline" to="/SignUp">Sign Up</Link>
      </div>
    </>
  );
}

export default Footer;
