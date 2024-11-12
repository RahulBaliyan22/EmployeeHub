const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const User = require('../models/Login')

//multer used
const multer = require('multer');
const path = require('path');
const {checkDuplicateEmail,isLoggedIn,validateEmployee} = require('../middleware')
//storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});
//filter
const fileFilter = (req, file, cb) => {
  const filetypes = /jpg|png/; 
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); 

  if (extname) {
    return cb(null, true); 
  } else {
    console.log(extname,mimetype)
    cb(new Error('Only image files are allowed'), false); 
  }
};
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter, 
  limits: { fileSize: 5 * 1024 * 1024 } 
});



//list of employees
router.get("/employees", isLoggedIn, async (req, res) => {
  try {
    const { search, sort = '', page = 1 } = req.query;
    const limit = 10; 
    const skip = (page - 1) * limit; 

    let query = {};
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { designation: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { course: { $regex: search, $options: 'i' } },
          { gender: { $regex: search, $options: 'i' } }
        ]
      };
    }

    let sortOptions = {};
    if (sort === 'name') sortOptions = { name: 1 };
    else if (sort === 'email') sortOptions = { email: 1 };
    else if (sort === 'date') sortOptions = { createdAt: 1 };
    else sortOptions = { unique_Id: 1 };

    const employees = await Employee.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    const totalEmployees = await Employee.countDocuments(query);
    const totalPages = Math.ceil(totalEmployees / limit);

    res.render('employee/employees', {
      employees,
      currentPage: parseInt(page),
      totalPages,
      sort,
      search,
      totalEmployees
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});


// new employee 
router.get("/employee/new",isLoggedIn, (req, res) => {
  res.render('employee/new');
});


router.post('/employees', upload.single('image'),checkDuplicateEmail,validateEmployee, async (req, res) => {
  console.log("in new post")
  try {
    let { name, email, mobile, designation, gender, course } = req.body;
    console.log("in new post try")
    if (!name || !email || !mobile || !designation || !gender || !course) {
      return res.status(400).send('All fields are required');
    }
    const empCount = await Employee.countDocuments({});
    const  unique_Id = empCount+ 1;
    let imgPath = `/uploads/${req.file.filename}`
    const newEmployee = new Employee({
      unique_Id,
      image: imgPath,
      name,
      email,
      mobile,
      designation,
      gender,
      course
    });
    await newEmployee.save();
    console.log("in new post try")
    req.flash('success','New Employee Added Successfully')
    res.redirect('/employees'); 
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating employee");
  }
});

// edit employee
router.get("/employee/:id/edit",isLoggedIn, async (req, res) => {
  try {
    let { id } = req.params;
    let employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).send("Employee not found");
    }
    res.render('employee/edit', { employee });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching employee for edit");
  }
});
router.patch("/employee/:id",upload.single('image'),validateEmployee, async(req, res)=>{
  try{
    let {id} = req.params;
    let employee = await Employee.findById(id);
    
    let { name, email, mobile, designation, gender, course } = req.body;
    let imgPath;
    if(req.file){
    imgPath = `/uploads/${req.file.filename}`; 
  }else{
    imgPath = employee.image;
  }
   await Employee.updateOne({_id:id},{$set:{image:imgPath,name, email, mobile, designation, gender, course }});
   req.flash('success','Employee Info. Updated Successfully')

    res.redirect(`/employees`);
  }catch (error) {
    console.error(error);
    res.status(500).send("Error fetching employee for edit");
  }
})

//dashboard
router.get("/employee/:id",isLoggedIn, async (req, res) => {
  try {
    const { id } = req.params;
    let user = await User.findById(id).populate('eID');
    if (!user) {
      return res.status(404).send("Employee not found");
    }
    res.render('employee/show', { user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching employee details");
  }
});

//delete
router.delete("/employee/:id",async(req,res)=>{
  try{
    let {id} = req.params;
    let employee = await Employee.findByIdAndDelete(id)
    req.flash('success','Employee Deleted Successfully')
    res.redirect("/employees")
  }catch (error) {
    console.error(error);
    res.status(500).send("Error fetching employee details");
  }
})

module.exports = router;
