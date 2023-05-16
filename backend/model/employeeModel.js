const mongoose = require("mongoose")

const employeeSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    company: String,
})
const EmployeeModel = mongoose.model("employee", employeeSchema)
module.exports = EmployeeModel