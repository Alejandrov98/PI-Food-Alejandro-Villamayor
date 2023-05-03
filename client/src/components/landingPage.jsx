import React from "react";
import { Link } from "react-router-dom";
import style from "./landingPage.module.css"
import styleB from "./button.module.css"

export default function LandingPage() {
  return (
    <div>
      <h1 className={style.text}>Welcome Chef...!</h1>
      <Link to="/loading">
        <button  className={styleB.bot} >Lets go cook!</button>
      </Link>
    </div>
  );
}
