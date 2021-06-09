const express = require('express');
const route = express.Router();
const authMiddleware = require('../middleware/auth.middleware');


const usercontroller = require('../controller/UserController');

route.get('', usercontroller.getUsers);
route.get('/login', usercontroller.getUserLogin);
route.post('/login', usercontroller.postLogin);
route.get('/signup', usercontroller.renderSignup);
route.post('/signup', usercontroller.addNewUser);
route.get('/favorite', usercontroller.getFavoriteRecipe);
route.get('/profile', usercontroller.getProfile);
route.get('/change-password', authMiddleware.requireAuth, usercontroller.renderChangePassword);
route.post('/change-password', usercontroller.postChangePassword);
route.get('/forgot-password', usercontroller.renderForgotPassword);
route.post('/forgot-password', usercontroller.getVerifyCode);;
route.get('/change-forgot-password', usercontroller.renderChangeForgotPassword);
route.post('/change-forgot-password', usercontroller.postForgotPassword);


module.exports = route;