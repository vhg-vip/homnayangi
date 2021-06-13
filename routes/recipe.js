const express = require('express');
const route = express.Router();
const authMiddleware = require('../middleware/auth.middleware');

const recipecontroller = require('../controller/RecipeController');

route.get('', authMiddleware.requireAuth, recipecontroller.getRecipes);
route.get('/ingredient', recipecontroller.getIngredients);
route.get('/suggestion', recipecontroller.getRecipeSuggestion);
route.get('/add', recipecontroller.getAddRecipe);
route.get('/add/search', recipecontroller.getSearchIngredient);
route.get('/:id', recipecontroller.getRecipeById);
route.post('/suggestion', recipecontroller.getRecipeByIngredient);


module.exports = route;