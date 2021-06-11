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

    res.render('page/add-recipe.ejs',  {
        ingredients : [],
        query : ""
    }
    );

} 

let getSearchIngredient = async (req, res, next) => {
    let q = req.query.q;
    let ingredients = await mysql.getIngredients();
    let matchedIngredient = ingredients.filter(function(ingredient){
        return ingredient.ingredient_name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('page/add-recipe.ejs', {
        ingredients : matchedIngredient,
        query : q
    });
} 

module.exports = {
    getRecipes,
    getRecipeById,
    getIngredients,
    getRecipeSuggestion,
    getAddRecipe,
    getSearchIngredient
}