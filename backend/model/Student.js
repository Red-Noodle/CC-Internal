const mongoose = requrie('mongoose');
const Schema = mongoose.Schema;
const Cohort = requrie('./Cohort.js')

const personSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    address: String,
    phone: String,
    cohortName: Corhort
});