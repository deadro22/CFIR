require("dotenv").config();
const express = require("express");
const app = express();
const exphs = require("express-handlebars");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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
    cookie: { httpOnly: true, secure: process.env.NODE_ENV === "production" }
  })
);
app.use(flash());
app.use(function(req, res, next) {
  res.locals.err_msg = req.flash("err_msg");
  res.locals.lerr_msg = req.flash("lerr_msg");
  res.locals.l_user = req.userData;
  next();
});

mongoose
  .connect(
    "mongodb://heroku_bf88kghv:" +
      process.env.MONGO_PASS +
      "@ds261096.mlab.com:61096/heroku_bf88kghv",
    { useNewUrlParser: true }
  )
  .then(function() {
    console.log("connected");
  });
const user = mongoose.Schema({
  email: { type: String, required: true },
  uname: { type: String, required: true },
  password: { type: String, required: true }
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
const users = mongoose.model("users", user);

function checkAuth(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    console.log(token);
    next();
  } catch (error) {
    req.flash("lerr_msg", "You need to login to view this page");
    res.redirect("/auth");
  }
}

app.get(["/", "/home"], function(req, res) {
  webvids.find({}).then(function(vids) {
    res.render(__dirname + "/pages/home.ejs", { vids });
  });
});
app.get("/activities/:dt_type", checkAuth, function(req, res) {
  webdats.find({ dt_type: req.params.dt_type }).then(function(wb_data) {
    if (wb_data != "") {
      var re_type =
        req.params.dt_type.charAt(0).toUpperCase() +
        req.params.dt_type.slice(1);
      res.render(__dirname + "/pages/Training.ejs", { wb_data, re_type });
    } else {
      res.redirect("/activities/" + req.params.dt_type + "/error");
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
app.get("/auth", function(req, res) {
  res.render(__dirname + "/pages/register.ejs");
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
app.post("/auth/register", function(req, res) {
  var u_data = {
    email: req.body.rEmail,
    name: req.body.rUsername,
    password: req.body.rPassword,
    confirmPass: req.body.rCPassword
  };
  if (
    !u_data.email ||
    !u_data.name ||
    !u_data.password ||
    !u_data.confirmPass
  ) {
    req.flash("err_msg", "All fields are required");
    res.redirect("back");
  } else if (u_data.password.length < 8) {
    req.flash("err_msg", "Passwords should be at least 8 characters long");
    res.redirect("back");
  } else if (u_data.password != u_data.confirmPass) {
    req.flash("err_msg", "Passwords does not match");
    res.redirect("back");
  } else {
    users
      .findOne({ uname: u_data.name, email: u_data.email })
      .then(function(user) {
        if (user) {
          req.flash("err_msg", "Account already exists");
          res.redirect("back");
        } else {
          const n_user = new users({
            email: u_data.email,
            uname: u_data.name,
            password: u_data.password
          });
          bcrypt.genSalt(10, function(error, salt) {
            bcrypt.hash(n_user.password, salt, function(err, hash) {
              if (err) {
                req.flash(
                  "err_msg",
                  "There was an error creating your account"
                );
                res.redirect("back");
              } else {
                n_user.password = hash;
                n_user.save().then(function(s_us) {
                  res.redirect("/home");
                });
              }
            });
          });
        }
      });
  }
});
app.post("/auth/login", function(req, res) {
  if (!req.body.lEmail || !req.body.lPassword) {
    req.flash("lerr_msg", "All fields are required");
    res.redirect("back");
    res.end();
  } else {
    users.findOne({ email: req.body.lEmail }).then(function(user) {
      if (!user) {
        req.flash("lerr_msg", "Account does not exist");
        res.redirect("back");
      } else {
        bcrypt.compare(req.body.lPassword, user.password, function(
          err,
          isMatch
        ) {
          if (err) {
            res.redirect("back");
          } else if (isMatch) {
            jwt.sign(
              { email: user.email, userId: user._id },
              process.env.JWT_KEY,
              {
                expiresIn: "1h"
              },
              (err, token) => {
                res.status(200).json({
                  msg: "auth success",
                  token: token
                });
              }
            );
          } else {
            req.flash("lerr_msg", "Password incorrect");
            res.redirect("back");
          }
        });
      }
    });
  }
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
