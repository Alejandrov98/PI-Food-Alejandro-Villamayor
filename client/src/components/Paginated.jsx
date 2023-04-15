import React from "react";

export default function paginated ({recipesPerPage, allRecipes, paginated}){
    const pageNumbers = []

    for (let i = 0; i<=Math.ceil(allRecipes/recipesPerPage); i++){ //recorro redondeando todas las recetas divididas en las cantidad de recetas por pagina
        pageNumbers.push(i+1)
    }

    return (
        <nav>
            <ul className='paginated'>
                {pageNumbers&&
                pageNumbers.map(number =>(
                    <li className="number" key={number}>
                         <a onClick={() => paginated(number)}>{number}</a> {/*// devolvemos el numero que me devuelve el paginado */}
                    </li>
                ))}
            </ul>
        </nav>
    )
}