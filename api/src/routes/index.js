const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const {giveMeAllRecipes} = require('../controllers/Functions')
const {Recipe, Diets} = require('../db')

router.get('/recipes', async(req, res) => {
    try {
        const giveMeRecipes = await giveMeAllRecipes()
        return res.status(200).json(giveMeRecipes)
    } catch (error) {
       return res.status(400).send("No se ha encontrado")
    }
})


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
