const express = require('express');
const http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
const path = require('path');


const userRoute = require('./routes/user');
const recipeRoute = require('./routes/recipe');

const app = express();
let port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.json());
app.use('/user', userRoute);
app.use('/recipe', recipeRoute);

// app.get('/', function(req, res) {
//     res.render('./page/index.ejs');
// });

var server = http.createServer(app);

server.listen(port);