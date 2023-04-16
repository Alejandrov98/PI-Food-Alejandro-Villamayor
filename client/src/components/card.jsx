import React from "react";

export default function RecipeCard({ name, image, diets}) {
    return (
        <div>
            <h3>{name}</h3>
            <h5>{diets[0].name? diets.map(d => <span>{d.name} / </span>) : diets.map(d => <span>{d} / </span>)}</h5>
            <img src={image} alt="recipe image"/>
        </div>
    )
}