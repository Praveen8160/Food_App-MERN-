require("dotenv").config();
const express = require("express");
const Userrouter = require("./router/User.router.js");
const Foodrouter = require("./router/Food.router.js");
const MongoConnection = require("./connection.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {
  CheckAuthenticationCookie,
} = require("./middlewares/authentication.middleware.js");
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // If you are sending cookies or authorization headers
  })
);
app.use(cookieParser());
app.use(express.json()); //for accept json data
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(CheckAuthenticationCookie);
MongoConnection(process.env.MONGO_DB);

app.use("/user", Userrouter);
app.use("/Food", Foodrouter);

app.listen(process.env.PORT || 8000, () =>
  console.log(`server are running on http://localhost:${process.env.PORT}`)
);
