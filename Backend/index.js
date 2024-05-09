require("dotenv").config();
const express = require("express");
const Userrouter = require("./router/User.router.js");
const MongoConnection = require("./connection.js");
const cors = require('cors');
const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true // If you are sending cookies or authorization headers
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
MongoConnection(process.env.MONGO_DB);


app.use("/user", Userrouter);


app.listen(process.env.PORT || 8000, () =>
  console.log(`server are running on http://localhost:${process.env.PORT}`)
);
