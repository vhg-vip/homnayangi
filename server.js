const express = require('express');
const http = require('http');
const userRoute = require('./routes/user');
var bodyParser = require('body-parser');
const path = require('path');

const app = express();
let port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

app.use(express.json());
app.use('/user', userRoute);

// app.get('/', function(req, res) {
//     res.render('./page/index.ejs');
// });

var server = http.createServer(app);

server.listen(port);