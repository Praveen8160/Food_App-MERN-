import React from "react";
import style from "../style/Header.module.css";
import { Link } from "react-router-dom";
function Header() {
  return <>
   <nav class={style.navbar}>
        <div class={style.container}>
            <img href="https://assets.materialup.com/uploads/61d86780-be13-47fa-81a6-226aac22db27/preview.jpg" class={style.logo}/>
            <ul class={style.nav_links}>
                <li><Link to={"/"} class={style.nav_link}>Home</Link></li>
                <li><Link to="/SignIn" class={style.nav_link}>Login</Link></li>
                <li><Link to={"SignUp"} class={style.nav_link}>Sign Up</Link></li>
            </ul>
        </div>
    </nav>
  </>;
}

export default Header;
