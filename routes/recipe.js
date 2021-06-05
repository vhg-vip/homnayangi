const express = require('express');
const route = express.Router();

const recipecontroller = require('../controller/RecipeController');

route.get('', recipecontroller.getRecipes);
route.get('/suggestion', recipecontroller.getIngredients);
route.get('/:id', recipecontroller.getRecipeById);


module.exports = route;