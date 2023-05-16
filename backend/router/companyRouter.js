const express = require("express")
const companyRoute = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const CompanyModel = require("../model/companyModel");

companyRoute.get("/", async (req, res) => {
    try {
        const data = await CompanyModel.find();
        res.send(data);
    } catch (error) {
        res.send(error);
    }
});

companyRoute.post("/add", async (req, res) => {
    try {
        const data = new CompanyModel(req.body);
        await data.save();
        res.send({ msg: "Company Added" });
    } catch (error) {
        res.send(error);
    }
});

companyRoute.patch("/update/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const payload = req.body
        await CompanyModel.findByIdAndUpdate(id, { ...payload });
        let UpdateCompany = await CompanyModel.findById(id);
        res.send({ msg: "Company Updated", Updated_Post: UpdateCompany });
    } catch (e) {
        res.send({ msg: e.message });
    }
})

companyRoute.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        let cart = await CompanyModel.findOneAndDelete({ _id: id });
        res.status(200).send("Company deleted");
    } catch (err) {
        res.send({ msg: e.message });
    }
});

module.exports = companyRoute