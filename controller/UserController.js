const mysql = require('../tools/mysql');
const usermodel = require('../model/UserModel');
const express = require('express');

let getUsers = async (req, res, next) => {
    let result = await mysql.getUsers();
    // res.json(result);
    res.render('page/index.ejs', { users: result});
}

let getUserLogin = async (req, res, next) => {
    // let result = await mysql.getUsers();
    // res.json(result);
    res.render('page/login.ejs');
}

let renderSignup = async (req, res, next) => {
    res.render('page/signup.ejs');
}

let getFavoriteRecipe = async (req, res, next) => {
    res.render('page/favorite.ejs');
}

let getProfile = async (req, res, next) => {
    res.render('page/profile.ejs');
}

let renderChangePassword = async (req, res, next) => {
    res.render('page/change-password.ejs');
}

let renderForgotPassword = async (req, res, next) => {
    res.render('page/forgot-password.ejs');
}

let renderChangeForgotPassword = async (req, res, next) => {
    res.render('page/change-forgot-password.ejs');
}


let addNewUser = async(req, res, next) => {
    // check user da ton tai 
    try {
        let newUser = usermodel.AddUserFactor(req.body);
        await mysql.addNewUser(newUser);
        res.json("ok");
    } catch (error) {
        res.status(400).json({error: error.message});
    }
    // let name = req.body.user_name;
    // let password = req.body.user_password;
    // let age = req.body.user_age;
    
    // let result = await mysql.addNewUser(name, password, age);
    // res.json(result);
}

module.exports = {
    getUsers,
    getUserLogin,
    getFavoriteRecipe,
    renderSignup,
    getProfile,
    renderChangePassword,
    renderForgotPassword,
    renderChangeForgotPassword,
    addNewUser
}