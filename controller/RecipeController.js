const mysql = require('../tools/mysql');
const recipemodel = require('../model/RecipeModel');
const express = require('express');

let getRecipes = async (req, res, next) => {
    // let result = await mysql.getRecipes();
    // res.json(result);
    res.render('page/recipes.ejs');
}


module.exports = {
    getRecipes
}