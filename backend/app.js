const express = require('express');
const passport = require('passport');
const Strategy = require('passport-local').Stretegy;
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');

const app = express();


const PORT = process.env.PORT || 5000;



mongoose.createConnection('mongodb://localhost/cc_admin', { useUnifiedTopology: true, useNewUrlParser: true })
.then(() => console.log('DB connected...'))
.catch((err) => {console.log(err)});

//Routes
app.use('/', require('./routes/index'));
app.use('/students', require('./routes/students'));
app.use('/instructors', require('./routes/instructors'));
app.use('/cohorts', require('./routes/cohorts'));

app.listen(PORT, console.log(`Server started on port ${PORT}`));

