import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameRecipes } from "../redux/actions";
import styleB from  "./button.module.css"
import style from "./searchBar.module.css"

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(event) {
    event.preventDefault();
    setName(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(getNameRecipes(name));
  }

  return (
    <div className={style.contain}>
      <input 
        type="text"
        placeholder="Search..."
        onChange={(event) => handleInputChange(event)}
        className={style.input}
      />
      <button className={styleB.bot} type="submit" onClick={(event) => handleSubmit(event)}>
        Search
      </button>
    </div>
  );
}
