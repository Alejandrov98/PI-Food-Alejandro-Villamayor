import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameRecipes } from "../redux/actions";

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
    <div>
      <input
        type="text"
        placeholder="Search..."
        onChange={(event) => handleInputChange(event)}
      />
      <button type="submit" onClick={(event) => handleSubmit(event)}>
        Search
      </button>
    </div>
  );
}
