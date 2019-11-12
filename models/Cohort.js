const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Student = require('./Student');
const Instructor = require('./Instructor');

const cohortSchema = new Schema({
    name: { type: String, required: true},
    dateStart: { type: String, trim: true},
    dateEnd: { type: String, trim: true},
    location: {
        city: String,
        state: String,
        country: String
    },
    students: [{type: Schema.Types.ObjectId, ref: 'Student'}],
    instructors: [{type: Schema.Types.ObjectId, ref: 'Instructor'}]
});

const Cohort = mongoose.model("Cohort", cohortSchema);


module.exports = Cohort;