const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

const loginSchema = mongoose.Schema({
  sno: {
    type: Number,
    unique: true, 
    required: true
  },
  email:{
    type: String,
    unique: true 
  },
  eID:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Employee"
  }
});

loginSchema.plugin(plm);

const Login = mongoose.model("Login", loginSchema);
module.exports = Login;
