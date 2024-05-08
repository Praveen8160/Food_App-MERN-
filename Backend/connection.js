const mongoose = require("mongoose");

const MongoConnection = async (url) => {
  try {
    await mongoose
      .connect(url)
      .then(() => console.log("connecyion successfull"))
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};

module.exports=MongoConnection
