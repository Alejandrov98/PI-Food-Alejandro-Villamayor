import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, filterRecipesByDiets, filterCreated, orderAlphabetically } from "../redux/actions";
import { Link } from "react-router-dom";
import RecipeCard from "./card";
import Paginated from "./Paginated";
import SearchBar from "./searchBar";
import style from "../components/card.module.css"

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  const [ordered, setOrdered] =useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(9); //cantidad de recetas que me pide el readme
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOffFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = allRecipes.slice(
    indexOffFirstRecipe,
    indexOfLastRecipe
  );

  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  function handleClick(arg) {
    arg.preventDefault(); //Queremos evitar que cargue de nuevo la pagina
    dispatch(getRecipes());
  }

  function handleFilterDiets(diet) {
    dispatch(filterRecipesByDiets(diet.target.value))
  }

  function handleFilterCreated(event){
    dispatch(filterCreated(event.target.value))
  }

  function handleSort(abc){
    abc .preventDefault();
    dispatch(orderAlphabetically(abc.target.value))
    setCurrentPage(1) // Para hacerlo desde la pagina 1
    setOrdered(`ordered ${abc.target.value}`)
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
        <SearchBar/>

      <div>
        <select onChange={abc => handleSort(abc)}>
          <option value="asc">upward</option>
          <option value="desc">downward</option>
        </select>
        <select onChange={diet => handleFilterDiets(diet)}>
          <option value="All">All</option>
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
        <select onChange={event => handleFilterCreated(event)}>
          <option value="All">All</option>
          <option value="created">Created</option>
          <option value="api">Existing</option>
        </select>

        <Paginated
          recipesPerPage={recipesPerPage}
          allRecipes={allRecipes.length}
          paginated={paginated}
        />

        {currentRecipes?.map((el) => {
          return (
            <fragment>
              <Link className={style.h3}  to={"/recipes/" + el.id}>
              <RecipeCard name={el.name} image={el.image} diets={el.diets} />
              </Link>
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
