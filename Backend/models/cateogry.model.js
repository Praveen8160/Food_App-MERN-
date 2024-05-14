const mongoose = require("mongoose");

const categoryschema = mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
});

const categorymodel = mongoose.model("category", categoryschema);

module.exports = categorymodel;
