const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Students = require('./Student.js');
const Instructors = require('./Instructor.js');

const cohortSchema = new Schema({
    name: String,
    dateStart: String,
    dateEnd: String,
    students: [Student],
    instructors: [Instructors]
});