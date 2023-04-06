require("dotenv").config(); //genera todos los cambios necesarios en el objeto process a travez de su método config(), consumiendo el archivo . env.

const { Recipe, Diets } = require("../db");
const { API_KEY } = process.env; //info sensible </3
const axios = require("axios"); // para realizar las peticiones http

async function getRecipesForApi() {
  try {
    let Information = await axios(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    );
    let infoMain = Information.data?.results.map((i) => {
      return {
        id: i.id,
        name: i.tittle,
        resumen: i.summary,
        nivelSalud: i.healthScore,
        imagen: i.image,
        pasos:
          i.analyzedInstructions[0] && i.analyzedInstructions[0].steps
            ? i.analyzedInstructions[0].steps.map((s) => s.step).join(" \n")
            : "", // entro a la propiedad analyse.intrucciones y si existe y estan los pasos, los concateno con un salto de linea ("\n ") Para ordenarlo
        dietas: i.diets, // me traigo tambien su relacion.
      };
    });
    return infoMain;
  } catch (error) {
    console.log("Error: ", error);
  }
}

async function getInformation() {
  // Solicito la informacion los elementos en la DB y que incluya informacion del modelo de dietas atravez de un atributo especifico (en este caso el nombre) en este nombre se hara la relacion entre Diets y Recipes
  return await Recipe.findAll({
    include: {
      model: Diets,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
}

async function giveMeAllRecipes() {
  //Utilizamos la funcion que pido los datos de la api y la funcion que pide las recetas de la DB
  const saveApiInformation = await getRecipesForApi(); // 
  const saveDbInformation = await getInformation();
  const allRecipes = await saveApiInformation.concat(saveDbInformation);

  return allRecipes;
}


module.exports = {
    giveMeAllRecipes,
}
