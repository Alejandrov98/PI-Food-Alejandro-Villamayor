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
  console.log(payload);
  return {
    type: 'FILTER_BY_DIETS',
    payload 
  }
}

export function filterCreated(payload){
  return{
    type: "FILTER_CREATED",
    payload
  }
}

export function orderAlphabetically(payload){
  return{
    type: 'ORDER_ALPHABETICALLY',
    payload
  }
}


