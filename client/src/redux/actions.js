import axios from "axios";

export function getRecipes() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/recipes");
    return dispatch({
      type: "GET_RECIPES",
      payload: json.data,
    });
  };
}

export function filterRecipesByDiets(payload) {
  console.log(payload);
  return {
    type: "FILTER_BY_DIETS",
    payload,
  };
}

export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

export function orderAlphabetically(payload) {
  return {
    type: "ORDER_ALPHABETICALLY",
    payload,
  };
}

export function getNameRecipes(name) {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/recipes?name=" + name);
    return dispatch({
      type: "GET_NAME_RECIPES",
      payload: json.data,
    });
  };
}

export function postRecipe(payload) {
  return async function (dispatch) {
    const response = await axios.post("http://localhost:3001/recipes", payload);
    return response;
  };
}

export function getDiets() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/diets");
    return dispatch({
      type: "GET_DIETS",
      payload: json.data,
    });
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/recipes/" + id);
      return dispatch({
        type: "GET_DETAILS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
