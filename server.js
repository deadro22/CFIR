const express = require("express");
const app = express();
const exphs = require("express-handlebars");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const jwt = require("jsonwebtoken");

app.use(express.static(__dirname + "/javascript"));
app.use(express.static(__dirname + "/pages"));
app.use(express.static(__dirname + "/styles"));
app.use(express.static(__dirname + "/images"));
app.engine("handlebars", exphs());
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: "_5%QRfY[&P=!/83#XVY@I:y^9yg)zn",
    resave: false,
    saveUninitialized: false,
    cookie: { httpOly: true, secure: process.env.NODE_ENV === "production" }
  })
);
app.use(flash());
app.use(function(req, res, next) {
  res.locals.err_msg = req.flash("err_msg");
  next();
});
mongoose
  .connect(
    "mongodb://heroku_bf88kghv:vehv4oianul506nrhl4u0d3kfk@ds261096.mlab.com:61096/heroku_bf88kghv",
    { useNewUrlParser: true }
  )
  .then(function() {
    console.log("connected");
  });

const webdt = mongoose.Schema({
  dt_type: { type: String, required: true },
  f_text: { type: String, required: true },
  s_text: { type: String },
  image: { type: String }
});
const webvid = mongoose.Schema({
  videoTitle: { type: String, required: true },
  videoLink: { type: String, required: true },
  videoDescription: { type: String, required: true }
});
const chatrooms = mongoose.Schema({
  room_id: { type: String, required: true },
  room_name: { type: String, required: true },
  room_owner: { type: String, required: true },
  room_messages: [
    {
      message: { type: String },
      st_by: { type: String }
    }
  ]
});
const webdats = mongoose.model("webdt", webdt);
const webvids = mongoose.model("webvid", webvid);

app.get(["/", "/home"], function(req, res) {
  webvids.find({}).then(function(vids) {
    res.render(__dirname + "/pages/home.ejs", { vids });
  });
});
app.get("/activities/:dt_type", function(req, res) {
  webdats.find({ dt_type: req.params.dt_type }).then(function(wb_data) {
    var re_type = "";
    if (req.params.dt_type == "training") {
      re_type = "دورات تكوينية";
      res.render(__dirname + "/pages/Training.ejs", { wb_data, re_type });
    } else if (req.params.dt_type == "trips") {
      re_type = "رحلات علمية";
      res.render(__dirname + "/pages/Training.ejs", { wb_data, re_type });
    } else if (req.params.dt_type == "lectures") {
      re_type = "محاضرات";
      res.render(__dirname + "/pages/Training.ejs", { wb_data, re_type });
    }
  });
});

app.get("/banking", function(req, res) {
  res.render(__dirname + "/pages/progress.ejs");
});
app.get("/docs", function(req, res) {
  res.render(__dirname + "/pages/progress.ejs");
});
app.get("/forum", function(req, res) {
  res.render(__dirname + "/pages/forum.ejs");
});
app.get("/www.", function(req, res) {
  res.redirect("/home");
});
app.get("/admin/dashboard/post/:code", function(req, res) {
  var ac_code = "z70401vYsM";
  if (req.params.code == ac_code) {
    res.render(__dirname + "/pages/admin.ejs");
  } else {
    res.status(404).render(__dirname + "/pages/error.ejs");
  }
});
app.get("*", function(req, res) {
  res.status(404).render(__dirname + "/pages/error.ejs");
});
app.post("/content/add", function(req, res) {
  if (
    !req.body.title ||
    !req.body.p_type ||
    !req.body.s_title ||
    !req.body.image_lnk
  ) {
    req.flash("err_msg", "All fields are required");
    res.redirect("back");
  } else {
    const nweb_dt = new webdats({
      dt_type: req.body.p_type,
      f_text: req.body.title,
      s_text: req.body.s_title,
      image: req.body.image_lnk
    });
    nweb_dt.save().then(function(svd) {
      res.render(__dirname + "/pages/added.ejs", { svd });
    });
  }
});
app.post("/video/add", function(req, res) {
  if (!req.body.videoTl || !req.body.VideoL || !req.body.videoDesc) {
    req.flash("err_msg", "All fields are required");
    res.redirect("back");
  } else {
    const nweb_vid = new webvids({
      videoTitle: req.body.videoTl,
      videoLink: req.body.VideoL,
      videoDescription: req.body.videoDesc
    });
    nweb_vid.save().then(function(svd) {
      res.redirect("/");
    });
  }
});
app.post("/content/delete", function(req, res) {
  if (!req.body.ContentTl || !req.body.p_type) {
    req.flash("err_msg", "Field Required");
    res.redirect("back");
  } else {
    webdats
      .findOneAndDelete({
        dt_type: req.body.p_type,
        f_text: req.body.ContentTl
      })
      .then(function(c_data) {
        res.redirect("/activities/" + req.body.p_type);
      });
  }
});
app.post("/video/delete", function(req, res) {
  if (!req.body.videoTl) {
    req.flash("err_msg", "Field Required");
    res.redirect("back");
  } else {
    webvids
      .findOneAndDelete({
        videoTitle: req.body.videoTl
      })
      .then(function(c_data) {
        res.redirect("/home");
      });
  }
});

app.listen(process.env.PORT || 80, function() {
  console.log("LISTENING!");
});
