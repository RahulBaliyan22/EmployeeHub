const Joi = require('joi');

// User Schema Validation
const userValidationSchema = Joi.object({
  email: Joi.string().email().required()
});


// Employee Schema Validation
const employeeValidationSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  mobile: Joi.number().integer().min(1000000000).max(9999999999).required(),
  designation: Joi.string().required(),
  gender: Joi.string().valid('Male', 'Female', 'Other').required(),
  course: Joi.array().items(Joi.string().required()).min(1).required()
});




module.exports = { userValidationSchema, employeeValidationSchema};
