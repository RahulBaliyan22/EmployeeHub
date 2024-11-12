const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const employeeRoutes = require("./routes/employee");
const seedb = require("./seed");

const methodOverride = require("method-override");
const bodyParser = require('body-parser')

var passport = require('passport');
var LocalStrategy = require('passport-local');

const User = require("./models/Login");
var session = require('express-session')

var flash = require('connect-flash');

const app = express();


//session configure
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

//configure Passport
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// //connect to DB
mongoose
  .connect("mongodb://127.0.0.1:27017/workHub")
  .then(() => {
    console.log(`Connected to DataBase`);
  })
  .catch((err) => {
    console.log(`DataBase Error: ${err}`);
  });


// //views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");



//body parsers
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});


//public
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(methodOverride("_method"));



//routes
app.use(authRoutes);
app.use(employeeRoutes);

//seed data
// seedb()

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`connected to server ${PORT}`);
});
