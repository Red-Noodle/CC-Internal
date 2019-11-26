const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Cohort Scchema
const Cohort = require("./Cohort");

//Student schema defined
const studentSchema = new Schema({
  name: {
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true }
  },
  email: { type: String, trim: true, required: true },
  address: {
    street: { type: String, default: "" },
    city: { type: String, trim: true, default: "" },
    state: { type: String, default: "" },
    zip: { type: String, trim: true, default: "" }
  },
  phone: { type: String, trim: true, default: "" },
  cohort: { type: mongoose.Types.ObjectId, ref: "Cohort" }
});
//Student schema set to a model
const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
