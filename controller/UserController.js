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

module.exports = {
    getUsers,
    getUserLogin,
    getFavoriteRecipe,
    renderSignup,
    getProfile,
    renderChangePassword,
    renderForgotPassword,
    renderChangeForgotPassword
}