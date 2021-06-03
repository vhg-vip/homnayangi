const express = require('express');
const route = express.Router();

const usercontroller = require('../controller/UserController');

route.get('', usercontroller.getUsers);

module.exports = route;