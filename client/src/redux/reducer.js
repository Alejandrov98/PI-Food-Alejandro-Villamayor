const initialState = {
  recipes: [],
  filterRecipes: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_RECIPES":
      return {
        ...state,
        recipes: action.payload,
        filterRecipes: action.payload
      };
    case "FILTER_BY_DIETS":
      const allRecipes = state.filterRecipes;
      let dietsApi = [];
      let dietsDB = [];

      allRecipes.forEach((e) => {
        if (e.hasOwnProperty("diets") && e.diets.includes(action.payload)) {
          dietsApi.push(e);
        }
      });
      allRecipes.forEach((e) => {
        if (
          e.hasOwnProperty("diets") &&
          e.diets.find((c) => c.name === action.payload)
        ) {
          dietsDB.push(e);
        }
      });
      const dietFilter = dietsApi.concat(dietsDB);
      return {
        ...state,
        allRecipes: action.payload === "All" ? allRecipes : dietFilter,
      };
    default:
      return state;
  }
}

export default rootReducer;
