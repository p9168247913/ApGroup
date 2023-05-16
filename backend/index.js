require("dotenv").config();
const express = require("express");
const cors = require('cors');
const connection = require("./config/db");
const { auth } = require("./middlewares/auth");
const employeeRoute = require("./router/employeeRouter");
const companyRoute = require("./router/companyRouter");
const userRouter = require("./router/userRouter");


const app =  express();
app.use(cors({origin:"*"}))
app.use(express.json());

app.use(express.urlencoded({extended:true}))

app.use("/user", userRouter)

app.use("/employee", employeeRoute)

app.use("/company", companyRoute)


// If you want to make private Routes add below auth middleware

app.use(auth)

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to Mongo Atlas");
  } catch (err) {
    console.log(err)
    console.log("Couldn't connect to Mongo Atlas");
  }
  console.log(`Server started on port ${process.env.port}`);
});
