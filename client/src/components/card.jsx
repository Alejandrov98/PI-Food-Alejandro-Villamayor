import React from "react";
import style from "./card.module.css"

export default function RecipeCard({ name, image, diets}) {
    return (
        <div className={style.contain}>
            <h3 className={style.h3}>{name}</h3>
            <h5 className={style.h5}>{diets[0]?.name ? diets.map(d => <span>{d.name} / </span>) : diets.map(d => <span>{d} / </span>)}</h5>
            <img className={style.img} src={image} alt="recipe image"/>
        </div>
    )
}