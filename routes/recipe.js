const express = require('express');
const route = express.Router();

const recipecontroller = require('../controller/RecipeController');

route.get('', recipecontroller.getRecipes);


module.exports = route;