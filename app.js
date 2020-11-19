var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  
  , path = require('path')
  fileUpload = require('express-fileupload');

//var methodOverride = require('method-override');
var session = require('express-session');
var app = express();
var mysql      = require('mysql');
var bodyParser=require("body-parser");
var connection = mysql.createConnection({
              host     : 'localhost',
              user     : 'root',
              password : '',
              database : 'nodeloginjs'
            });
 
connection.connect();
 
global.db = connection;

app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
app.use(session({
              secret: 'keyboard cat',
              resave: false,
              saveUninitialized: true,
              cookie: { maxAge: 60000 }
            }))
 

app.get('/', routes.index);//call for main index page 
  
app.get("/student", function (req, res) { //call for students login page
    res.render("student"); 
}); 
app.get("/staff", function (req, res) { //call for staff login page
    res.render("staff"); 
}); 

app.post('/studentlogin', user.studentlogin);//call for students login post
app.post('/stafflogin', user.stafflogin);//call for staff login post

//app.get('/home/studentdashboard', user.studentdashboard);//call for student dashboard page after login
//app.get('/home/staffdashboard', user.staffdashboard);//call for staff dashboard page after login

app.get('/home/studentprofile',user.studentprofile);//to render users profile
app.get('/home/staffprofile',user.staffprofile);//to render users profile 




app.get('/home/staffprofile/register', user.register);//call for register of students from staff
app.post('/home/staffprofile', user.register);
//app.get("/home/staffprofile/register", function (req, res) { //call for staff login page
 // res.render("register"); 
//}); 

//app.get("/registeredprofile/:id", function (req, res) { //call for staff login page
//  res.render("registeredprofile"); 
//}); 


//app.post('/home/staffprofile/register', user.register);//call for register of students from staff

app.get('/home/studentlogout', user.studentlogout);//call for student logout
app.get('/home/stafflogout', user.stafflogout);//call for staff logout




app.listen(8080)