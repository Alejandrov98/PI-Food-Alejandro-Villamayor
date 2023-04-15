import axios from "axios";

export function getRecipes() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/recipes");
    return dispatch({
        type:'GET_RECIPES',
        payload: json.data
    })
  };
}

export function filterRecipesByDiets(payload){
  return {
    type: 'FILTER_BY_DIETS',
    payload 
  }
}


