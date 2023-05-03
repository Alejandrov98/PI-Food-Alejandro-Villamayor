import React from "react";
import style from "./paginated.module.css"

export default function paginated ({recipesPerPage, allRecipes, paginated}){
    const pageNumbers = []

    for (let i = 0; i<=Math.ceil(allRecipes/recipesPerPage); i++){ //recorro redondeando todas las recetas divididas en las cantidad de recetas por pagina
        pageNumbers.push(i+1)
    }

    return (
        <nav>
            <ul className={style.paginated}>
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







 





// import React, { useState } from "react";
// import style from "./paginated.module.css";

// export default function Paginated({ recipesPerPage, allRecipes, paginated }) {
//   const [currentPage, setCurrentPage] = useState(1);

//   const handleNext = () => {
//     setCurrentPage((prevPage) => prevPage + 1);
//     paginated("next");
//   };

//   const handlePrev = () => {
//     setCurrentPage((prevPage) => prevPage - 1);
//     paginated("prev");
//   };

//   const pageNumbers = [];
//   for (let i = 0; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
//     pageNumbers.push(i + 1);
//   }

//   return (
//     <nav>
//       <ul className={style.paginated}>
//         <li>
//           <button onClick={handlePrev} disabled={currentPage === 1}>
//             Previous
//           </button>
//         </li>
//         {pageNumbers &&
//           pageNumbers.map((number) => (
//             <li className="number" key={number}>
//               <a
//                 onClick={() => paginated(number)}
//                 className={currentPage === number ? "active" : ""}
//               >
//                 {number}
//               </a>
//             </li>
//           ))}
//         <li>
//           <button
//             onClick={handleNext}
//             disabled={currentPage === pageNumbers.length}
//           >
//             Next
//           </button>
//         </li>
//       </ul>
//     </nav>
//   );
// }


