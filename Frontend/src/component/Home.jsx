import React, { useState } from "react";
import style from "../style/Home.module.css";
import Card from "./Card";
function Home() {
  return (
    <>
    <div className={style.main}>
      <div className={style.head}>
        <p>Order your Food</p>
      </div>
      <div className={style.search}>
        <p>search your food</p>
        <p>search your food</p>
      </div>
    </div>
    <Card></Card>
    </>
  );
}

export default Home;