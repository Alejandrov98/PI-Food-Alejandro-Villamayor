import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../redux/actions";
import { useEffect } from "react";
import style from "./cardDetail.module.css"

export default function Detail() {
  const dispatch = useDispatch();
  const MyRecipe = useSelector((state) => state.detail);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);


  return (                                 // tuve que usar expression regular por que me traia caracteres inecesarios en el resumen 
    console.log(MyRecipe[0]),
    <div>
      {MyRecipe.length > 0 ? (
        <div>
          <h1 className={style.title}>This is {MyRecipe[0].name}</h1>
          <img className={style.img} src={MyRecipe[0].image} alt="Recipe" />
          <h2 className={style.summary}>Summary: {MyRecipe[0].summary.replace(/<[^>]*>?/g, '')}</h2> 
          <p className={style.title}>Health Score: {MyRecipe[0].healthScore}</p>
          <h4 className={style.diets}>
            diets:{" "}
            {!MyRecipe[0].createdDB
              ? MyRecipe[0].diets + " "
              : MyRecipe[0].diets.map((el) =>  el.name + (' ')) // por alguna razon todavia me figura Object Object en los de DB
              
              
              }
          </h4>
               <h2 className={style.summary}>Steps: {MyRecipe[0].steps.replace(/<[^>]*>?/g, '')}</h2> 
        </div>
      ) : (
        <p className={style.title}>Loading...</p>
      )}
      <Link to="/home">
        <button className={style.bot}>Back</button>
      </Link>
    </div>
  );
}
