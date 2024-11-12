
const Employee = require('./models/Employee');
const User = require('./models/Login');
const { userValidationSchema, employeeValidationSchema} = require("./validation")

const validateEmployee = (req,res,next)=>{
  let  { name, email, mobile, designation, gender, course }= req.body;
  if (typeof course === 'string') {
    course = [course];
  }
  const {error,value} = employeeValidationSchema.validate({name, email, mobile, designation, gender, course })
  if(error){
    req.flash('error',error.message);
    return res.redirect('/employee/new',);
  }
  next();
}
const validateUser = (req,res,next)=>{
  let  { email }= req.body;

  const {error,value} = userValidationSchema.validate({ email  })
  if(error){
    req.flash('success',error.message);
    return res.redirect('/signup',);
  }
  next();
}


const isLoggedIn = (req,res,next)=>{
  if(!req.isAuthenticated()){
   req.flash('error','Please Log in')
    return res.redirect('/login');
  }
  next();
}


// isSignup user an employee 
async function isEmployeeEntry(req, res, next) {
  let {email} = req.body;
  let employee = await Employee.findOne({email:email})
  if(!employee){
    req.flash("error","not an employee")
    res.redirect('/signup');
  }else{
    let user = await User.findOne({email:email});
    if(user){
      req.flash("error","Employee Login is Defined")
      res.redirect('/login');
    }else{
    next()

    }
  }
}


//duplicate email
async function checkDuplicateEmail(req, res, next) {
  try {
    const emailExists = await Employee.findOne({ email: req.body.email });
    if (emailExists) {
      req.flash('error', 'Email already exists');
      return res.redirect('/signup');
    }
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
}
async function checkDuplicateEmailLogin(req, res, next) {
  try {
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
      req.flash('error', 'Email already exists');
      return res.redirect('/signup');
    }
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
}

module.exports = {isEmployeeEntry,checkDuplicateEmail,isLoggedIn,validateEmployee,validateUser,checkDuplicateEmailLogin};