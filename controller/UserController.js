const mysql = require('../tools/mysql');
const usermodel = require('../model/UserModel');
const express = require('express');
const nodemailer =  require('nodemailer');
var LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');

let getUsers = async (req, res, next) => {
    let result = await mysql.getUsers();
    // res.json(result);
    res.render('page/index.ejs', { users: result});
}

let getUserLogin = async (req, res, next) => {
    res.clearCookie("userId");
    res.render('page/login.ejs', { 
        error: "",
        values: 'req.body'
    });
}

let postLogin = async (req, res, next) => {
    try {
        // console.log(req.body);
        let loginUser = usermodel.UserLoginFactor(req.body);
        let result = await mysql.getUserLogin(loginUser);
        // console.log(result[0].user_id);
        if(result[0]){
            res.cookie('userId', result[0].user_id);
            // console.log(result[0]);
            if(result[0].isAdmin === 0) res.redirect('/recipe');
            else res.redirect('/admin/user');
        }
        else{
            res.render('page/login.ejs', { 
                error: "Tên đăng nhập hoặc mật khẩu sai",
                values: req.body
            });
        }
    } catch (error) {
        console.log(error);
    }
}

let getUserByUsername = async (username, email) => {
    // console.log(username)
    try {
        let result = await mysql.getUserByUsername(username, email);
        // console.log(result)
        if(result[0]) return true;
        else return false;
    } catch (error) { 
        console.log(error)
    }
}

let renderSignup = async (req, res, next) => {
    res.render('page/signup.ejs', { msg_error : ''});
}

let addNewUser = async(req, res, next) => {
    try {
        let check = await getUserByUsername(req.body.user_name);
        if(!check){
            let newUser = usermodel.AddUserFactor(req.body);
            await mysql.addNewUser(newUser);
            res.redirect('/user/login')
        }
        else{
            res.render('page/signup.ejs', { 
                msg_error: "Tên đăng nhập hoặc email đã tồn tại",
            });
            // res.json("Tên đăng nhập hoặc email đã tồn tại");
        }
    } catch (error) { 
        console.log(error)
        res.status(400).json({error: error.message});
    }
}

let getFavoriteRecipe = async (req, res, next) => {
    let id = req.cookies.userId;
    let result = await mysql.getFavoriteRecipe(id);
    let data = [];
    for(let i of result){
        let recipes = await mysql.getRcipeById(i.recipe_id);
        for(let recipe of recipes){
            let obj = {
                recipe_id: 0,
                recipe_name: '',
                recipe_image: '',
                recipe_tutorior: '',
                recipe_rating: 0,
                user_name: '',
                favorite_user: 0,
                recipe_time: '',
                recipe_ingredient: []
            }
            // console.log(recipe);
            if(recipe.recipe_comfirm === 1){
                let ingredientRecipes = await mysql.getIngredientRecipeByRecipeId(recipe.recipe_id);
                // console.log(ingredientRecipes);
                let spice = 'Gia vị: ';
                for(let item of ingredientRecipes){
                    let ingredients = await mysql.getIngredientById(item.ingredient_id);
                    if(item.ir_amount === 0){
                        spice += ingredients[0].ingredient_name + ", ";
                    }
                    else{
                        let ingredient = ingredients[0].ingredient_name + ": " + item.ir_amount + " " + ingredients[0].ingredient_measure;
                        obj.recipe_ingredient.push(ingredient);
                    }
                }
                obj.recipe_ingredient.push(spice.slice(0, spice.length -2));
                // console.log(obj.recipe_ingredient);
                let user = await mysql.getUserById(recipe.user_id);
                obj.recipe_id = recipe.recipe_id;
                obj.recipe_name = recipe.recipe_name;
                obj.recipe_image = recipe.recipe_image;
                obj.recipe_tutorior = recipe.recipe_tutorior;
                obj.recipe_rating = Number(recipe.rating_point/recipe.rating_count).toFixed(1);
                obj.recipe_time = recipe.recipe_time.toString().slice(4, 15);
                obj.user_name = user[0].user_name;
                obj.favorite_user = id;
                data.push(obj);
            }
        }
    }
    // console.log(data);
    res.render('page/favorite.ejs', { recipes: data });
}

let deleteFavoriteRecipe = async (req, res, next) => {
    await mysql.deleteFavoriteRecipe(req.body.user_id, req.body.recipe_id);
}

let addFavoriteRecipe = async (req, res, next) => {
    console.log(req.body);
    let check = await mysql.checkFavoriteRecipe(req.body.user_id, req.body.recipe_id);
    if(!check){
        await mysql.addFavoriteRecipe(req.body.user_id, req.body.recipe_id);
        console.log("ok");
    }
    else{
        console.log("is exist");
    }
}

let getProfile = async (req, res, next) => {
    res.render('page/profile.ejs');
}

let renderChangePassword = async (req, res, next) => {
    res.render('page/change-password.ejs', { 
        error: "",
        message: '',
        values: '' 
    });
}

let postChangePassword = async (req, res, next) => {
    let id = req.cookies.userId;
    let result = await mysql.getUserById(id);
    // console.log(result[0].user_password);
    if(result[0].user_password !== req.body.old_password){
        res.render('page/change-password.ejs', { 
            error: "Mật khẩu cũ không đúng",
            values: req.body ,
            message: '' 
        });
    }
    else if(req.body.new_password !== req.body.cf_new_password){
        res.render('page/change-password.ejs', { 
            error: "Mật khẩu mới không khớp",
            values: req.body,
            message: '' 
        });
    }
    else{
        await mysql.updatePassword(id, req.body.new_password);
        res.render('page/change-password.ejs', { 
            message: "Đổi mật khẩu thành công",
            error: '',
            values: ''
        });
    }
    console.log(req.body);
}

let renderForgotPassword = async (req, res, next) => {
    res.render('page/forgot-password.ejs', { 
        error: '',
        values: '' 
    });
}

let sendEmail = async (email, code) => {
    var transporter =  nodemailer.createTransport({ // config mail server
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'homnayangi5@gmail.com', //Tài khoản gmail vừa tạo
            pass: 'homnayangi123' //Mật khẩu tài khoản gmail vừa tạo
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    });
    var content = '';
    content += `
        <div style="padding: 10px; background-color: #003375">
            <div style="padding: 10px; background-color: white;">
                <h4 style="color: #0085ff">Mã xác thực của bạn là: ${code}</h4>
            </div>
        </div>
    `;
    var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        from: 'Hôm nay ăn gì?',
        to: email,
        subject: 'Mã xác thực',
        text: 'Your text is here',//Thường thi mình không dùng cái này thay vào đó mình sử dụng html để dễ edit hơn
        html: content //Nội dung html mình đã tạo trên kia :))
    }
    transporter.sendMail(mainOptions, function(err, info){
        if (err) {
            console.log(err);
            req.flash('mess', 'Lỗi gửi mail: '+err); //Gửi thông báo đến người dùng
            res.redirect('/');
        } else {
            console.log('Message sent: ' +  info.response);
            req.flash('mess', 'Một email đã được gửi đến tài khoản của bạn'); //Gửi thông báo đến người dùng
            res.redirect('/');
        }
    });
}

let getVerifyCode = async (req, res, next) => {
    let result = await mysql.getUsernameAndEmail(req.body.user_name, req.body.user_email);
    // console.log(result);
    if(result[0]){
        let userid = result[0].user_id;
        let code = Math.floor(Math.random() * (999999 - 100000) + 100000);
        console.log(code);

        localStorage.setItem('user_id', userid);
        sendEmail(req.body.user_email, code);
        await mysql.updateVerifyCode(userid, code);
        res.redirect('/user/change-forgot-password');
    }
    else{
        res.render('page/forgot-password.ejs', {
            error: "Tên đăng nhập hoặc email không đúng",
            values: req.body
        });
    }
}

let postForgotPassword = async (req, res, next) => {
    // console.log(req.body);
    // console.log(localStorage.getItem('user_id'));
    let id = localStorage.getItem('user_id');
    let result = await mysql.getUserById(id);
    // console.log(id);
    // console.log(result[0]);
    if(req.body.new_password !== req.body.cf_new_password){
        res.render('page/change-forgot-password.ejs', {
            error: "Mật khẩu không khớp",
            values: req.body
        });
    }
    else if(Number(req.body.verify_code) !== result[0].verify_code){
        res.render('page/change-forgot-password.ejs', {
            error: "Mã xác thực không đúng",
            values: req.body
        });
    }
    else{
        await mysql.updatePassword(id, req.body.new_password);
        await mysql.updateVerifyCode(id, 0);
        localStorage._deleteLocation();
        res.redirect('/user/login');
    }
}

let renderChangeForgotPassword = async (req, res, next) => {
    res.render('page/change-forgot-password.ejs', { 
        error: '',
        values: ''
    });
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
    addNewUser,
    postLogin,
    postChangePassword,
    postForgotPassword,
    getVerifyCode,
    deleteFavoriteRecipe,
    addFavoriteRecipe
}