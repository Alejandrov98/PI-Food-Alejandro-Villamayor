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
}

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
}

async function giveMeAllRecipes() {
  //Utilizamos la funcion que pido los datos de la api y la funcion que pide las recetas de la DB
  const saveApiInformation = await getRecipesForApi(); // 
  const saveDbInformation = await getDbRecipes();
  const allRecipes = await saveApiInformation.concat(saveDbInformation);

  return allRecipes;
}

async function createDiets(){
  const tipos = ["gluten free", "dairy free", "lacto ovo vegetarian", "vegan", "paleolithic", "primal", "whole 30",
  "fodmap friendly", "vegetarian", "pescatarian", "ketogenic"];
  let id = 0;
  tipos.forEach(dieta => {
      Diets.findOrCreate({ where: { id: ++id, name: dieta }})
  })
  const types_of_diet = await Diets.findAll();
  return (types_of_diet)
};

const getDietsHandler = async (req, res) => {
  try {
    let dietsArray = []
    const apiDiets = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)).data.results;
    const dietsMap = apiDiets.map(d => {
      // dietsArray.push(d.diets)
      // const dietsSet = new Set diets
      Diets.findOrCreate( { where: { name: d.diets }})
    })
    console.log(dietsMap);
    return dietsMap
  } catch (error) {
    console.log(error)
  }
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


// async function createRecipe(name, summary, healthScore, image, steps, types_of_diet ){
//   const receta  = await Recipe.create({
//     name: name,
//     summary: summary,
//     healthScore: healthScore,
//     image: image,
//     steps: steps
//   })
//   types_of_diet.map(async(type)=>{ const dieta = await Diets.findOne({ whare: {name: type}} )
//     await receta.addDiets(dieta)
//   })
//   return receta
//}

async function crearReceta(name, summary, healthScore, image, steps, tipoDietas){
  const id = await crearID()
  const receta = await Recipe.create({
      id: id,
      name: name,
      summary: summary,
      healthScore: healthScore,
      image: image,
      steps: steps
  })
  tipoDietas.map(async(diet) => {const dieta = await Diets.findOne({ where: { name: diet }})
  await receta.addDiets(dieta); })
  return receta
}

function validarAtributos(name, summary, healthScore, image, steps, tipoDietas){
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
      return true
  }
}

module.exports = {
    giveMeAllRecipes,
    createDiets,
    crearReceta,
    crearID,
    validarAtributos,
    getDietsHandler,
}
