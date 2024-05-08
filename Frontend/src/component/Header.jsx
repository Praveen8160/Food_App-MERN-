import React from "react";
import style from "../style/Header.module.css";
function Header() {
  return <>
   <nav class={style.navbar}>
        <div class={style.container}>
            <img href="https://assets.materialup.com/uploads/61d86780-be13-47fa-81a6-226aac22db27/preview.jpg" class={style.logo}/>
            <ul class={style.nav_links}>
                <li><a href="#" class={style.nav_link}>Home</a></li>
                <li><a href="#" class={style.nav_link}>Login</a></li>
                <li><a href="#" class={style.nav_link}>Sign Up</a></li>
            </ul>
        </div>
    </nav>
  </>;
}

export default Header;
