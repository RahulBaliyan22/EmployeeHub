//initial data load

const Employee = require("./models/Employee");
const employeedata = [
  {
    unique_Id: 1,
    name: "hukum",
    email: "hukum@cstech.in",
    mobile: 9540100044,
    designation: "HR",
    gender: "Male",
    course: ["MCA"],
    image: "/uploads/employee.jpg"
  },
  {
    unique_Id: 2,
    name: "manish",
    email: "manish@cstech.in",
    mobile: 9540100033,
    designation: "Sales",
    gender: "Male",
    course: ["BCA"],
    image: "/uploads/employee.jpg"
  },
  {
    unique_Id: 3,
    name: "yash",
    email: "yash@cstech.in",
    mobile: 9540100022,
    designation: "Manager",
    gender: "Male",
    course: ["BSC"],
    image: "/uploads/employee.jpg"
  },
  {
    unique_Id: 4,
    name: "abhishek",
    email: "abhishek@cstech.in",
    mobile: 9540100011,
    designation: "HR",
    gender: "Male",
    course: ["MCA"],
    image: "/uploads/employee.jpg"
  },
  {
    unique_Id: 5,
    name: "neha",
    email: "neha@cstech.in",
    mobile: 9540100055,
    designation: "Sales",
    gender: "Female",
    course: ["BCA"],
    image: "/uploads/employee.jpg"
  },
  {
    unique_Id: 6,
    name: "ravi",
    email: "ravi@cstech.in",
    mobile: 9540100066,
    designation: "Manager",
    gender: "Male",
    course: ["BSC"],
    image: "/uploads/employee.jpg"
  },
  {
    unique_Id: 7,
    name: "sunita",
    email: "sunita@cstech.in",
    mobile: 9540100077,
    designation: "HR",
    gender: "Female",
    course: ["MCA"],
    image: "/uploads/employee.jpg"
  },
  {
    unique_Id: 8,
    name: "akash",
    email: "akash@cstech.in",
    mobile: 9540100088,
    designation: "Sales",
    gender: "Male",
    course: ["BCA"],
    image: "/uploads/employee.jpg"
  },
  {
    unique_Id: 9,
    name: "priya",
    email: "priya@cstech.in",
    mobile: 9540100099,
    designation: "Manager",
    gender: "Female",
    course: ["BSC"],
    image: "/uploads/employee.jpg"
  },
  {
    unique_Id: 10,
    name: "rohit",
    email: "rohit@cstech.in",
    mobile: 9540100101,
    designation: "HR",
    gender: "Male",
    course: ["MCA"],
    image: "/uploads/employee.jpg"
  },
  {
    unique_Id: 11,
    name: "divya",
    email: "divya@cstech.in",
    mobile: 9540100111,
    designation: "Sales",
    gender: "Female",
    course: ["BCA"],
    image: "/uploads/employee.jpg"
  },
  {
    unique_Id: 12,
    name: "rajesh",
    email: "rajesh@cstech.in",
    mobile: 9540100122,
    designation: "Manager",
    gender: "Male",
    course: ["BSC"],
    image: "/uploads/employee.jpg"
  },
  {
    unique_Id: 13,
    name: "meera",
    email: "meera@cstech.in",
    mobile: 9540100133,
    designation: "HR",
    gender: "Female",
    course: ["MCA"],
    image: "/uploads/employee.jpg"
  },
  {
    unique_Id: 14,
    name: "vikas",
    email: "vikas@cstech.in",
    mobile: 9540100144,
    designation: "Sales",
    gender: "Male",
    course: ["BCA"],
    image: "/uploads/employee.jpg"
  },
  {
    unique_Id: 15,
    name: "sanjana",
    email: "sanjana@cstech.in",
    mobile: 9540100155,
    designation: "Manager",
    gender: "Female",
    course: ["BSC"],
    image: "/uploads/employee.jpg"
  },
  {
    unique_Id: 16,
    name: "anil",
    email: "anil@cstech.in",
    mobile: 9540100166,
    designation: "HR",
    gender: "Male",
    course: ["MCA"],
    image: "/uploads/employee.jpg"
  },
  {
    unique_Id: 17,
    name: "pooja",
    email: "pooja@cstech.in",
    mobile: 9540100177,
    designation: "Sales",
    gender: "Female",
    course: ["BCA"],
    image: "/uploads/employee.jpg"
  },
  {
    unique_Id: 18,
    name: "deepak",
    email: "deepak@cstech.in",
    mobile: 9540100188,
    designation: "Manager",
    gender: "Male",
    course: ["BSC"],
    image: "/uploads/employee.jpg"
  },
  {
    unique_Id: 19,
    name: "rekha",
    email: "rekha@cstech.in",
    mobile: 9540100199,
    designation: "HR",
    gender: "Female",
    course: ["MCA"],
    image: "/uploads/employee.jpg"
  },
  {
    unique_Id: 20,
    name: "arjun",
    email: "arjun@cstech.in",
    mobile: 9540100200,
    designation: "Sales",
    gender: "Male",
    course: ["BCA"],
    image: "/uploads/employee.jpg"
  }
];


async function seedb() {
  await Employee.insertMany(employeedata);
  console.log("Data added successfully");
}

module.exports = seedb;
