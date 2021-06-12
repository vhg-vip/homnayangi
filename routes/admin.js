const express = require('express');
const route = express.Router();
const authMiddleware = require('../middleware/auth.middleware');


const admincontroller = require('../controller/AdminController');

route.get('/user', admincontroller.renderAdminUser);
route.get('/recipe', admincontroller.renderAdminRecipe);
route.post('/delete-recipe', admincontroller.deleteRecipe);
route.get('/ingredient', admincontroller.renderAdminIngredient);
route.post('/delete-ingredient', admincontroller.deleteIngredient);
route.post('/update-ingredient', admincontroller.updateIngredient);

module.exports = route;