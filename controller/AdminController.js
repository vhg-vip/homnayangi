const mysql = require('../tools/mysql');
const adminmodel = require('../model/AdminModel');

const renderAdminUser = async (req, res,next) => {
    let result = await mysql.getUsers();
    // console.log(result)
    res.render('page/admin-user.ejs', { users: result });
}

const renderAdminIngredient = async (req, res, next) => {
    let result = await mysql.getAllIngredients();
    // console.log(result);
    res.render('page/admin-ingredient.ejs', { ingredients: result });
}

const renderAdminRecipe = async (req, res, next) => {
    let recipes = await mysql.getRecipes();
    let data = [];
    for(let recipe of recipes){
        let obj = {
            recipe_id: 0,
            recipe_name: '',
            recipe_image: '',
            recipe_tutorior: '',
            recipe_comfirm: 0,
            recipe_ingredient: []
        }
        // console.log(recipe);
        let ingredientRecipes = await mysql.getIngredientRecipeByRecipeId(recipe.recipe_id);
        // console.log(ingredientRecipes);
        for(let item of ingredientRecipes){
            let ingredients = await mysql.getIngredientById(item.ingredient_id);
            let ingredient = ingredients[0].ingredient_name + ": " + item.ir_amount + " " + ingredients[0].ingredient_measure;
            obj.recipe_ingredient.push(ingredient);
        }
        // console.log(obj.recipe_ingredient);
        obj.recipe_id = recipe.recipe_id;
        obj.recipe_name = recipe.recipe_name;
        obj.recipe_image = recipe.recipe_image;
        obj.recipe_tutorior = recipe.recipe_tutorior;
        obj.recipe_comfirm = recipe.recipe_comfirm;
        data.push(obj);
    }
    // console.log(data);
    res.render('page/admin-recipe.ejs', {recipes: data});
}

const deleteRecipe = async (req, res, next) => {
    await mysql.deleteRecipe(req.body.recipe_id)
}

const deleteIngredient = async (req, res, next) => {
    await mysql.deleteIngredient(req.body.ingredient_id);
}

const updateIngredient = async (req, res, next) => {
    let data = adminmodel.UpdateIngredientRequest(req.body);
    await mysql.updateIngredient(data);
}

const comfirmRecipe = async (req, res, next) => {
    await mysql.updateComfirmRecipe(req.body.recipe_id);
}

const addIngredient = async (req, res, next) => {
    let data = await adminmodel.InsertIngredientRequest(req.body);
    // console.log(data);
    await mysql.addIngredient(data);
}

const updateRecipe = async (req, res, next) => {
    let data = await adminmodel.UpdateRecipeRequest(req.body);
    // console.log(data);
    await mysql.updateRecipe(data);
}

module.exports = {
    renderAdminUser,
    renderAdminRecipe,
    renderAdminIngredient,
    deleteRecipe,
    deleteIngredient,
    updateIngredient, 
    comfirmRecipe,
    addIngredient,
    updateRecipe
}