const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Cohort = require('./Cohort');


const instructorSchema = new Schema({
    name: {
        firstName: { type: String, trim: true, required: true },
        lastName: { type: String, trim: true, required: true }
    },
    email: { type: String, trim: true, required: true },
    address: {
        street: { type: String, trim: true, default: ""},
        street2: { type: String, trim: true, default: ""},
        city: { type: String, trim: true, default: ""},
        state: { type: String, default: ""},
        zip: { type: String, trim: true, default: ""}
    },
    phone: { type: String, trim: true, default: ""},
    cohort: [{type: Schema.Types.ObjectId, ref: 'Cohort'}],
    loginKey: String
});

var Instructor = mongoose.model("Instructor", instructorSchema);

module.exports = Instructor;