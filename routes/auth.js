const express = require('express');
const router = express.Router();
const User = require("../models/Login");
const Employee = require('../models/Employee');
const passport = require('passport');

const {isEmployeeEntry,validateUser,checkDuplicateEmailLogin} = require('../middleware')


//signup 
router.get('/signup',(req,res)=>{
  res.render('auth/signup');
})

router.post('/signup',isEmployeeEntry,validateUser,checkDuplicateEmailLogin,async (req, res, next) => {
  let {username, email , password ,confirmpassword} = req.body;
  if (password !== confirmpassword) {
    req.flash('error', 'Passwords do not match');
    return res.redirect('/signup');
  }

  try {
    const userCount = await User.countDocuments({});
    const sno = userCount + 1;
    let employee = await Employee.findOne({email:email})
    
    const newUser = new User({ sno, email ,username ,eID:employee });
    
   await User.register(newUser, password);
    
    req.login(newUser, (err) => {
      if (err) {
        console.error('Error during auto-login:', err); 
        return next(err); 
      }
      req.flash("success", "Signup successful!");
      res.redirect(`/employee/${req.user._id}`);
    });
  } catch (error) {
    console.error('Signup error:', error); 
    req.flash('error', error.message);
    res.redirect('/signup');
  }
});


// login
router.get('/login',(req,res)=>{
  res.render('auth/login');
})
router.post('/login',passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: true
}),(req,res)=>{
  res.redirect(`/employee/${req.user._id}`);
})

// logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.send('Error logging out');
    req.flash("success","Logout successful")
    res.redirect('/login');
  });
});


module.exports = router;