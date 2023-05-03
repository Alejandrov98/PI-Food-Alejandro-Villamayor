const initialState = {
  recipes: [],
  filterRecipes: [],
  diets: [],
  detail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_RECIPES":
      return {
        ...state,
        recipes: action.payload,
        filterRecipes: action.payload,
      };
    case "FILTER_BY_DIETS":
      const allRecipes = state.filterRecipes;
      const dietsFiltered = allRecipes.filter((r) =>
        r.diets.find((d) => d === action.payload)
      );
      //console.log(dietsFiltered);
      return {
        ...state,
        recipes: action.payload === "All" ? allRecipes : dietsFiltered,
      };
    case "POST_RECIPE":
      return {
        ...state,
      };
    case "GET_DIETS":
      return {
        ...state,
        diets: action.payload,
      };
    case "FILTER_CREATED":
      const allRecipes_2 = state.filterRecipes;
      let createdFilterDB = [];
      let createdFilterAPI = [];
      if (action.payload === "created") {
        createdFilterDB = allRecipes_2.filter((r) =>
          r.hasOwnProperty("createDB")
        );
      } else if (action.payload === "api") {
        createdFilterAPI = allRecipes_2.filter((r) => !r.createDB);
      }
      return {
        ...state,
        recipes:
          action.payload === "All"
            ? allRecipes_2
            : action.payload === "created"
            ? createdFilterDB
            : action.payload === "api"
            ? createdFilterAPI
            : allRecipes_2,
        //recipes: action.payload === 'All' ? allRecipes_2 : createdFilter
      };
    // const createdFilter = action.payload === "created" ? allRecipes_2.filter(r => r.hasOwnProperty("createDB")) : action.payload === 'api' ? allRecipes_2.filter(r => !r.createDB) : allRecipes_2
    // console.log(createdFilter);

    case "ORDER_ALPHABETICALLY":
      let sortedArr =
        action.payload === "asc"
          ? state.recipes.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            }) //sino me hace el descendente en las siguientes lineas
          : state.recipes.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: sortedArr,
      };
    case "GET_NAME_RECIPES":
      return {
        ...state,
        recipes: action.payload,
      };
    case "GET_DETAILS":
      return {
        ...state,
        detail: action.payload,
      };
    case "CLEAN":
      return {
        ...state,
        detail: [],
      };

    default:
      return state;
  }
}

// CASE PARA EL DELETE
// case "DELETE_RECETA": return {
//     ...state,
//     recipes: state.allRecipes.filter(r => r.id !== action.payload)
//     filterRecipes: state.allRecipes.filter(r => r.id !== action.payload)
// }

export default rootReducer;
