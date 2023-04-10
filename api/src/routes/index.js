const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const {
  giveMeAllRecipes,
  createRecipe,
  validateAttributes,
  giveMeAllDiets
} = require("../controllers/Functions");
const { Recipe, Diets } = require("../db");

router.get("/recipes", async (req, res) => {
  try {
    const { name } = req.query;
    const giveMeRecipes = await giveMeAllRecipes();
    if (name) {
      const recipesFiltered = giveMeRecipes.filter((recipes) =>
        recipes.name.toLowerCase().includes(name.toLowerCase())
      );
      if (recipesFiltered.length > 0) {
        return res.status(200).json(recipesFiltered);
      } else {
        return res.status(400).json("No se han encontrado coincidencias");
      }
    } else {
      return res.status(200).json(giveMeRecipes);
    }
  } catch (error) {
    return res.status(400).send("Error ", error);
  }
});



router.get("/recipes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const allRecipes = await giveMeAllRecipes();
    if (id) {
      const recipeId = allRecipes.filter(
        (i) => i.id.toString() === id.toString()
      );
      if (recipeId.length > 0) {
        return res.json(recipeId);
      } else {
        return res.status(404).send("No se encontro la receta buscada");
      }
    }
  } catch (error) {
    return res.status(400).send("Error ", error);
  }
});


router.post("/recipes", async(req, res)=>{
  try {
      const { name, summary, healthScore, image, steps, diets } = req.body;
      const validation =  validateAttributes(name, summary, healthScore, image, steps);
      if (validation === true){
        //console.log("SE VALIDARON LOS RATOS DE BODY");
        const newRecipe = await createRecipe(name, summary, healthScore, image, steps, diets)
        //console.log("SE CREO LA RECETA");
        if(newRecipe){
            return res.status(201).json(newRecipe)
        } 
      } else {
          return res.status(404).send(validation)
      }
  } catch (error){
    //console.log("ALGO PASO QUE NO SE CREO LA RECETA");
    return res.status(400).send("Error ", error);
  }
});

router.get("/diets", async (req, res) => {
  try {
    const allDiets = await giveMeAllDiets();
    return res.status(200).json(allDiets);
  } catch (error) {
    return res.status(400).send("Error ", error);
  }
});

module.exports = router;
