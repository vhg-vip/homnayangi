const mysql = require('../tools/mysql');
const recipemodel = require('../model/RecipeModel');
const express = require('express');

let getRecipes = async (req, res, next) => {
    let recipes = await mysql.getRecipes();
    let data = [];
    for(let recipe of recipes){
        let obj = {
            recipe_id: 0,
            recipe_name: '',
            recipe_image: '',
            recipe_tutorior: '',
            user_name: '',
            recipe_time: '',
            recipe_ingredient: []
        }
        // console.log(recipe);
        if(recipe.recipe_comfirm === 1){
            let ingredientRecipes = await mysql.getIngredientRecipeByRecipeId(recipe.recipe_id);
            // console.log(ingredientRecipes);
            let spice = 'Gia vị: ';
            for(let item of ingredientRecipes){
                let ingredients = await mysql.getIngredientById(item.ingredient_id);
                if(item.ir_amount === 0){
                    spice += ingredients[0].ingredient_name + ", ";
                }
                else{
                    let ingredient = ingredients[0].ingredient_name + ": " + item.ir_amount + " " + ingredients[0].ingredient_measure;
                    obj.recipe_ingredient.push(ingredient);
                }
            }
            obj.recipe_ingredient.push(spice.slice(0, spice.length -2));
            // console.log(obj.recipe_ingredient);
            let user = await mysql.getUserById(recipe.user_id);
            obj.recipe_id = recipe.recipe_id;
            obj.recipe_name = recipe.recipe_name;
            obj.recipe_image = recipe.recipe_image;
            obj.recipe_tutorior = recipe.recipe_tutorior;
            obj.recipe_time = recipe.recipe_time.toString().slice(4, 15);
            obj.user_name = user[0].user_name;
            data.push(obj);
        }
        
        // console.log(data);
    }
    
    // res.json(result);
    res.render('page/recipes.ejs', {recipes: data});
}

let getRecipeById = async (req, res, next) => {
    let result = await mysql.getRcipeById(req.params.id);
    let recipe = result[0];
    // console.log(result);
    let obj = {
        recipe_id: 0,
        recipe_name: '',
        recipe_image: '',
        recipe_tutorior: '',
        user_name: '',
        recipe_time: '',
        recipe_ingredient: []
    }
    // console.log(recipe);
    let ingredientRecipes = await mysql.getIngredientRecipeByRecipeId(recipe.recipe_id);
    // console.log(ingredientRecipes);
    let spice = 'Gia vị: ';
    for(let item of ingredientRecipes){
        let ingredients = await mysql.getIngredientById(item.ingredient_id);
        if(item.ir_amount === 0){
            spice += ingredients[0].ingredient_name + ", ";
        }
        else{
            let ingredient = ingredients[0].ingredient_name + ": " + item.ir_amount + " " + ingredients[0].ingredient_measure;
            obj.recipe_ingredient.push(ingredient);
        }
    }
    obj.recipe_ingredient.push(spice.slice(0, spice.length -2));
    // console.log(obj.recipe_ingredient);
    let user = await mysql.getUserById(recipe.user_id);
    obj.recipe_id = recipe.recipe_id;
    obj.recipe_name = recipe.recipe_name;
    obj.recipe_image = recipe.recipe_image;
    obj.recipe_tutorior = recipe.recipe_tutorior;
    obj.recipe_time = recipe.recipe_time.toString().slice(4, 15);
    obj.user_name = user[0].user_name;
    // console.log(obj)
    res.render('page/detail-recipe.ejs', {recipe: obj});
}

let getIngredients = async (req, res, next) => {
    let result = await mysql.getAllIngredients();
    res.render('page/suggestion.ejs', { ingredients: result });
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
const getRecipeByIngredient = async (req, res, next) => {
    const {ingredientList}= await req.body;
  //  console.log(ingredientList);
    result= await mysql.getRecipeByIngredient(ingredientList)
  
    recipeList=[]
    for(let id of result){ 
        console.log(id) 
        recipeList.push(id)
    }
//   console.log(recipeList)
  await res.status(200).send({recipeList})
   
}
const voteStar= async (req, res, next) => {
    const {user_id, recipe_id, points} = req.body;
    //console.log(user_id, recipe_id, points)
    const {status, message, avaragePoints} = await mysql.voteStar(user_id, recipe_id, points);

    if (status === 200) await res.status(status).send({avaragePoints});
     else await res.status(status).send({message});

}

module.exports = {
    getRecipes,
    getRecipeById,
    getIngredients,
    getRecipeSuggestion,
    getAddRecipe,
    getSearchIngredient,
    getRecipeByIngredient,
    voteStar
}