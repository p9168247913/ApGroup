const express = require("express")
const employeeRoute = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const EmployeeModel = require("../model/employeeModel");

employeeRoute.get("/", async (req, res) => {
    try {
        const data = await EmployeeModel.find();
        res.send(data);
    } catch (error) {
        res.send(error);
    }

});


employeeRoute.post("/add", async (req, res) => {
    try {
        const data = new EmployeeModel(req.body);
        await data.save();
        res.send({ msg: "Employee added" });
    } catch (error) {
        res.send(error);
    }
});

employeeRoute.patch("/update/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const payload = req.body
        await EmployeeModel.findByIdAndUpdate(id, { ...payload });
        let UpdateEmployee = await EmployeeModel.findById(id);
        res.send({ msg: "Employee Updated", Updated_Employee: UpdateEmployee });
    } catch (e) {
        res.send({ msg: e.message });
    }
})

employeeRoute.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id)
    try {
        let cart = await EmployeeModel.findOneAndDelete({ _id: id });
        res.status(200).send("Employee deleted");
    } catch (err) {
        res.send({ msg: e.message });
    }
});

module.exports = employeeRoute