const mongoose = require("mongoose");
const fs = require('fs');
const path = require('path');

const employeeSchema = new mongoose.Schema({
  unique_Id:{
    type:Number
  },
  image: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true 
  },
  mobile: {
    type: Number, 
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  course: {
    type: [String], 
    required: true
  }
}, { timestamps: true });

//post middlewre for delete for image from server storage
employeeSchema.post('findOneAndDelete', function (employee) {
  if (employee.image) {
    const imagePath = path.join(__dirname, '../', employee.image); 
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Error deleting image:", err);
      } 
    });
  }
});

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
