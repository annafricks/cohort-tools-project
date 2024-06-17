const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 8080;
require("dotenv").config();



// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
const cohorts= require("./cohorts.json")
const students= require("./students.json")
const cohortRouter=require("./routes/cohorts.routes.js")
const studentRouter=require("./routes/students.routes.js")
const authRouter=require("./routes/auth.routes.js")
const userRouter=require("./routes/users.routes.js")

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


const MONGODB_URI = "mongodb://127.0.0.1:27017/cohort-tools-api";

mongoose
  .connect(MONGODB_URI)
.then (connection => console.log(connection.connections[0].name))
// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
app.use(
  cors({
    origin: [
      "http://localhost:5173",
    
    ],
  })
);

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});


// app.get("/api/students", (req, res)=>{
//   res.json( students);
// });

app.use("/api/cohorts", cohortRouter)

app.use("/api/students", studentRouter)

app.use("/auth", authRouter)

app.use("/api/users", userRouter)





// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});