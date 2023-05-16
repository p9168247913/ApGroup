const mongoose = require("mongoose")

const companySchema = mongoose.Schema({
    companyName: String,
    logoUrl: String,
    companyEmail: String,
    websiteLink: String,
})

const CompanyModel = mongoose.model("company", companySchema)
module.exports = CompanyModel