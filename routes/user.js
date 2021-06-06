const express = require('express');
const route = express.Router();

const usercontroller = require('../controller/UserController');

route.get('', usercontroller.getUsers);
route.get('/login', usercontroller.getUserLogin);
route.get('/signup', usercontroller.renderSignup);
route.get('/favorite', usercontroller.getFavoriteRecipe);
route.get('/profile', usercontroller.getProfile);
route.get('/change-password', usercontroller.renderChangePassword);
route.get('/forgot-password', usercontroller.renderForgotPassword);
route.get('/change-forgot-password', usercontroller.renderChangeForgotPassword);


module.exports = route;