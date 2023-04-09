const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const {
  giveMeAllRecipes,
  crearReceta,
  validarAtributos,
  getDietsHandler,
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

router.get("/diets", async (req, res) => {
  try {
    
  } catch (error) {
    return res.status(400).send("Error ", error);
  }
});



router.post("/recipes", async(req, res, next)=>{
  try {
      const { name, summary, healthScore, image, steps, diets } = req.body;
      const validacion = validarAtributos(name, summary, healthScore, image, steps, diets);
      if (validacion === true){
          const receta = await crearReceta(name, summary, healthScore, image, steps, diets)
          if(receta){
              return res.status(201).json(receta)
          } 
      } else {
          return res.status(404).send(validacion)
      }
  } catch (err){
      next(err)
  }
});


module.exports = router;
