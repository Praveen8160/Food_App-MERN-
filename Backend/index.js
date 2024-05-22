require("dotenv").config();
const express = require("express");
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
app.use(CheckAuthenticationCookie("token"));
MongoConnection(process.env.MONGO_DB);

//Router
const Userrouter = require("./router/User.router.js");
const Foodrouter = require("./router/Food.router.js");
const GetFoodrouter = require("./router/GetFoodData.router.js");
const optRouter = require("./router/Otp.router.js");
const Orderrouter = require("./router/Order.router.js");
const Authenticaterouter = require("./router/Authenication.router.js");
app.use("/user", Userrouter);
app.use("/Food", Foodrouter);
app.use("/api/Food", GetFoodrouter);
app.use("/api/otp", optRouter);
app.use("/Order", Orderrouter);
app.use("/Authentication", Authenticaterouter);

app.listen(process.env.PORT || 8000, () =>
  console.log(`server are running on http://localhost:${process.env.PORT}`)
);
