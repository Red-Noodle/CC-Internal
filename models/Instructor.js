const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Cohort Model
const Cohort = require("./Cohort");

//Instructor schema defined
const instructorSchema = new Schema({
  name: {
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true }
  },
  email: { type: String, trim: true, required: true },
  address: {
    street: { type: String, trim: true, default: "" },
    city: { type: String, trim: true, default: "" },
    state: { type: String, default: "" },
    zip: { type: String, trim: true, default: "" }
  },
  phone: { type: String, trim: true, default: "" },
  cohort: [{ type: mongoose.Types.ObjectId, ref: "Cohort" }]
});

//Student schema set to a model
var Instructor = mongoose.model("Instructor", instructorSchema);

module.exports = Instructor;
