const mysql = require('../tools/mysql');
const recipemodel = require('../model/RecipeModel');
const express = require('express');

let getRecipes = async (req, res, next) => {
    // let result = await mysql.getRecipes();
    // res.json(result);
    res.render('page/recipes.ejs');
}

let getRecipeById = async (req, res, next) => {
    res.render('page/detail-recipe.ejs');
}

let getIngredients = async (req, res, next) => {
    res.render('page/suggestion.ejs');
}

let getRecipeSuggestion = async (req, res, next) => {
    res.render('page/recipe-suggestion.ejs');
}
let getAddRecipe = async (req, res, next) => {
    res.render('page/add-recipe.ejs');
} 

module.exports = {
    getRecipes,
    getRecipeById,
    getIngredients,
    getRecipeSuggestion,
    getAddRecipe
}