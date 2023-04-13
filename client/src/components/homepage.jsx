import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../redux/actions";
import { Link } from "react-router-dom";
import RecipeCard from "./card";

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  function handleClick(arg) {
    arg.preventDefault(); //Queremos evitar que cargue de nuevo la pagina
    dispatch(getRecipes());
  }

  return (
    <div>
      <Link to="/recipes">Create a Recipe</Link>
      <h1>What do you want to eat today?</h1>
      <button
        onClick={(arg) => {
          handleClick(arg);
        }}
      >
        Let's see it!
      </button>

      <div>
        <select>
          <option value="asc">upward</option>
          <option value="desc">downward</option>
        </select>
        <select>
          <option value="gluten free">gluten free</option>
          <option value="dairy free">dairy free</option>
          <option value="lacto ovo vegetarian">lacto ovo vegetarian</option>
          <option value="primal">primal</option>
          <option value="whole 30">whole 30</option>
          <option value="pescatarian">pescatarian</option>
          <option value="fodmap friendly">fodmap friendly</option>
          <option value="vegan">vegan</option>
          <option value="paleolithic">paleolithic</option>
          <option value="ketogenic">ketogenic</option>
        </select>
        <select>
          <option value="All">All</option>
          <option value="created">Created</option>
          <option value="api">Existing</option>
        </select>

        {allRecipes?.map((el) => {
          return (
            <fragment>
              <Link to={"/home/" + el.id}></Link>
              <RecipeCard
                name={el.name}
                image={el.img}
                diets={el.diets}
              />
              ;
            </fragment>
          );
        })}
      </div>
    </div>
  );
}

// "gluten free" "dairy free" "lacto ovo vegetarian""primal""whole 30""pescatarian""fodmap friendly""vegan""paleolithic""ketogenic"

{
  /* //Botones/Opciones para filtrar por tipo de dieta, y por si su origen es de la API o de la base de datos (creados por nosotros desde el formulario).
Botones/Opciones para ordenar tanto ascendentemente como descendentemente las recetas por orden alfabético y por "comida saludable" (health score). */
}
