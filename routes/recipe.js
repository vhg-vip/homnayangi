const express = require('express');
const route = express.Router();

const recipecontroller = require('../controller/RecipeController');

route.get('', recipecontroller.getRecipes);
route.get('/ingredient', recipecontroller.getIngredients);
route.get('/suggestion', recipecontroller.getRecipeSuggestion);
route.get('/:id', recipecontroller.getRecipeById);


module.exports = route;