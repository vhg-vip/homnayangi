const mysql = require('../tools/mysql');
const usermodel = require('../model/UserModel');
const express = require('express');

let getUsers = async (req, res, next) => {
    let result = await mysql.getUsers();
    // res.json(result);
    res.render('page/index.ejs', { users: result});
}

module.exports = {
    getUsers
}