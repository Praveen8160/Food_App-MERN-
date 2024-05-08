const express = require("express");
const port = 4000;
const Userrouter = require("./router/User.router.js");
const MongoConnection = require("./connection.js");
const cors = require('cors');
const app = express();

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-origin", "http://localhost:4000");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true // If you are sending cookies or authorization headers
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
MongoConnection("mongodb://localhost:27017/Food_App");

app.use("/user", Userrouter);

app.listen(port, () =>
  console.log(`server are running on http://localhost:${port}`)
);
