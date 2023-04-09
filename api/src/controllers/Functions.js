require("dotenv").config(); //genera todos los cambios necesarios en el objeto process a travez de su método config(), consumiendo el archivo . env.

const { Recipe, Diets } = require("../db");
const { API_KEY } = process.env; //info sensible </3
const axios = require("axios"); // para realizar las peticiones http

async function getRecipesForApi() {
  try {
    const Information = await axios(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    );
    const infoMain = Information.data?.results.map((i) => {
      return {
        id: i.id,
        name: i.title,
        summary: i.summary,
        healthScore: i.healthScore,
        image: i.image,
        steps:
          i.analyzedInstructions[0] && i.analyzedInstructions[0].steps
            ? i.analyzedInstructions[0].steps.map((s) => s.step).join(" \n")
            : "", // entro a la propiedad analyse.intrucciones y si existe y estan los steps, los concateno con un salto de linea ("\n ") Para ordenarlo
        diets: i.diets, // me traigo tambien su relacion.
      };
    });
    return infoMain;
  } catch (error) {
    console.log("Error: ", error);
  }
};


async function getDbRecipes() {
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
};


async function giveMeAllRecipes() {
  //Utilizamos la funcion que pido los datos de la api y la funcion que pide las recetas de la DB
  const saveApiInformation = await getRecipesForApi(); // 
  const saveDbInformation = await getDbRecipes();
  const allRecipes = await saveApiInformation.concat(saveDbInformation);

  return allRecipes;
};


async function crearID(){
  const allRecipes = await Recipe.findAll();
  const allID = allRecipes.map(r => { return r.id })
  let id = Math.floor(Math.random()*123456)
  while(allID.includes(id)){
      id = Math.floor(Math.random()*123456)
  }
  return id
};


async function createRecipe(name, summary, healthScore, image, steps, typeDiets){
  const id = await crearID()
  console.log("entrando al controlador de creacion de receta");
  const recipe = await Recipe.create({
      id: id,
      name: name,
      summary: summary,
      healthScore: healthScore,
      image: image,
      steps: steps
  })
  console.log("se creo la receta en la base de datos");
  typeDiets.map(async(diet) => {const dietName = await Diets.findOne({ where: { name: diet }})
  await recipe.addDiets(dietName); })
  console.log("se asociaron las dietas a la receta");
  return recipe
};

function validateAttributes(name, summary, healthScore, image, steps){
  if (!name || (typeof name !== "string") || (name.length < 0) ){
      return "El nombre de la receta debe existir y debe ser una cadena de caracteres"
  } else if (!summary || (typeof summary !== "string") || (summary.length < 0) ){
      return "El summary de la receta debe existir y debe ser una cadena de texto"
  } else if (healthScore && typeof healthScore !== "number"){
      return "EL nivel de salud de la receta debe ser un numero o estar vacio"
  } else if (image && typeof image !== "string"){
      return "La image de la receta debe ser un link o estar vacia"
  } else if (steps && typeof steps !== "string" ){
      return "Los steps a seguir de la receta debe ser una cadena de texto o estar vacios"
  } else {
    console.log("todos los atributos son correctos");
      return true
  }
};

async function saveDietsInDb(){
  const Information = (await axios(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
  )).data?.results;
  const infoMain = Information.map(async(recipe)=>{
    recipe.diets.map(async(diet)=>{
      await Diets.findOrCreate({
        where: { name: diet },
        defaults: { name: diet }
      })
    })
  });
  return 
};


async function giveMeAllDiets(){
  const allDiets = await Diets.findAll();
  return allDiets
};

module.exports = {
    giveMeAllRecipes,
    createRecipe,
    crearID,
    validateAttributes,
    saveDietsInDb,
    giveMeAllDiets,
}
