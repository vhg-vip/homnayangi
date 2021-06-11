const express = require('express');
const route = express.Router();
const authMiddleware = require('../middleware/auth.middleware');


const admincontroller = require('../controller/AdminController');

route.get('/user', admincontroller.renderAdminUser);
route.get('/recipe', admincontroller.renderAdminRecipe);


module.exports = route;