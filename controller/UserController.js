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
    res.render('page/favorite.ejs');
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
    let id = localStorage.getItem('user_id');
    let result = await mysql.getUserById(id);
    // console.log(id);
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
    getVerifyCode
}