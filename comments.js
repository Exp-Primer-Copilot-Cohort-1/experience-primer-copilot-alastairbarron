// create web server
// npm install express --save
// npm install body-parser --save
// npm install mongoose --save
// npm install morgan --save

// 1. load module
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');

// 2. create web server
var app = express();

// 3. set port
var port = process.env.PORT || 3000;

// 4. connect to database
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    console.log('Connected to mongod server');
});
mongoose.connect('mongodb://localhost/mongodb_tutorial');

// 5. use body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 6. use morgan
app.use(morgan('dev'));

// 7. set router
var router = require('./routes')(app, Comment);

// 8. run server
var server = app.listen(port, function(){
    console.log("Express server has started on port " + port);
});

// 9. create model
var Comment = require('./models/comment');