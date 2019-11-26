const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Admin schema defined
const adminSchema = new Schema({
  name: {
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true }
  },
  email: { type: String, trim: true, required: true },
  loginKey: String
});

//Admin schema set to a model
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
