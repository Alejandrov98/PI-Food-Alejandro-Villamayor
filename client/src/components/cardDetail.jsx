import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../redux/actions";
import { useEffect } from "react";

export default function Detail() {
  const dispatch = useDispatch();
  const MyRecipe = useSelector((state) => state.detail);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);


  return (                                 // tuve que usar expression regulara por que me traia caracteres inecesarios en el resumen 
    console.log(MyRecipe[0]),
    <div>
      {MyRecipe.length > 0 ? (
        <div>
          <h1>This is {MyRecipe[0].name}</h1>
          <img src={MyRecipe[0].image} alt="Recipe Image" />
          <h2>Summary: {MyRecipe[0].summary.replace(/<[^>]*>?/g, '')}</h2> 
          <p>Health Score: {MyRecipe[0].healthScore}</p>
          <h4>
            diets:{" "}
            {!MyRecipe[0].createdDB
              ? MyRecipe[0].diets + " "
              : MyRecipe[0].diets.map((el) =>  el.name + (' ')) // por alguna razon todavia me figura Object Object
              
              
              }
          </h4>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Link to="/home">
        <button>Back</button>
      </Link>
    </div>
  );
}
