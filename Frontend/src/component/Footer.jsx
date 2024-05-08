import React from "react";
import style from "../style/Footer.module.css";
function Footer() {
  return (
    <>
      <div class={style.footer}>
        <a href="#">Home</a>
        <a href="#">Sign In</a>
        <a href="#">Sign Up</a>
      </div>
    </>
  );
}

export default Footer;
