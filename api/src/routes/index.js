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

router.get("/recipes", async (req, res) => { //define una ruta endpoint GET para la url /recipes se ejecuta la funcion middleware que se proporciona como segundo argumento en el router que es una funcion asincrona
  try {
    const { name } = req.query; // utiliza destructuring para extraer la propiedad "name" del objeto "query" de la solicitud recibida
    const giveMeRecipes = await giveMeAllRecipes(); 
    if (name) {
      const recipesFiltered = giveMeRecipes.filter((recipes) =>
        recipes.name.toLowerCase().includes(name.toLowerCase())
      ); // Si la consulta recibida incluye un valor para "name" (es decir, si se está buscando una receta específica), se filtran las recetas obtenidas anteriormente para incluir solo las recetas que contengan el valor de "name" en su nombre, independientemente de mayúsculas y minúsculas.
      if (recipesFiltered.length > 0) {
        return res.status(200).json(recipesFiltered);
      } else {
        return res.status(400).json("No se han encontrado coincidencias");
      }
    } else {
      return res.status(200).json(giveMeRecipes); //Si no se proporciona ningún valor para "name" (es decir, si no se está buscando una receta específica), se devuelven todas las recetas obtenidas anteriormente.
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
        (i) => i.id.toString() === id.toString() // Si se proporciona un valor para "id", se filtran las recetas obtenidas anteriormente para incluir solo la receta que tenga el mismo valor de "id".
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
      //const validation =  validateAttributes(name, summary, healthScore, image, steps);
      const validation = true; 
      if (validation === true){
        const newRecipe = await createRecipe(name, summary, healthScore, image, steps, diets)
        if(newRecipe){
            return res.status(201).json(newRecipe)
        } 
      } else {
          return res.status(404).send(validation)
      }
  } catch (error){
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

// Intento de hacer la funcion de la ruta del DELETE
// router.delete("/recipes:id", async(req, res, next)=>{
//     try {
//             const { id } = req.params.id //req.body
//         const Recipes = await getAllRecipes();
//         if(!id){
//             return res.status(404).send("El ID solicitado es incorrecto")
//         } 
//         const recipeDLT = Recipes.find(r => r.id.toString() === id.toString())
//         if(!recipeDLT){
//             return res.status(404).send("No existe una receta que tenga el ID indicado")
//         }
//         const newRecipes = Recipes.filter(r => r.id !== recetaDLT.id)
//         return res.status(201).send("Se han actualizado las Recipes")
//     } catch (err){
//         next(err)
//     }
// };


module.exports = router;
