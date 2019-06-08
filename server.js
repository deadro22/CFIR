var express = require("express");
var app = express();
var exphs = require("express-handlebars");
app.use(express.static(__dirname + "/javascript"));
app.use(express.static(__dirname + "/pages"));
app.use(express.static(__dirname + "/styles"));
app.use(express.static(__dirname + "/images"));
app.engine("handlebars",exphs());
app.set("view engine","handlebars");


app.get("/",function(req,res){
  res.render(__dirname +"/pages/home.ejs");
});
app.get("/home",function(req,res){
  res.render(__dirname +"/pages/home.ejs");
});
app.get("/activities/Training",function(req,res){
  res.render(__dirname +"/pages/Training.ejs");
});
app.get("/activities/Lectures",function(req,res){
  res.render(__dirname +"/pages/Lectures.ejs");
});
app.get("/activities/Trips",function(req,res){
  res.render(__dirname +"/pages/trips.ejs");
});
app.get("/banking",function(req,res){
  res.render(__dirname +"/pages/progress.ejs");
});
app.get("/docs",function(req,res){
  res.render(__dirname +"/pages/progress.ejs");
});
app.get("/contact",function(req,res){
  res.render(__dirname +"/pages/progress.ejs");
});
app.get("*",function(req,res){
  res.render(__dirname +"/pages/error.ejs");
});
app.listen(80);

