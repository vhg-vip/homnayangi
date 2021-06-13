const express = require('express');
const route = express.Router();
const authMiddleware = require('../middleware/auth.middleware');


const admincontroller = require('../controller/AdminController');

route.get('/user', admincontroller.renderAdminUser);

route.get('/recipe', admincontroller.renderAdminRecipe);
route.post('/delete-recipe', admincontroller.deleteRecipe);
route.post('/comfirm-recipe', admincontroller.comfirmRecipe);

route.get('/ingredient', admincontroller.renderAdminIngredient);
route.post('/delete-ingredient', admincontroller.deleteIngredient);
route.post('/update-ingredient', admincontroller.updateIngredient);
route.post('/add-ingredient', admincontroller.addIngredient);

module.exports = route;