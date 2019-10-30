const express = require('express');
const app = express();


const PORT = process.env.PORT || 3000;

const passport = require('passport');
const Strategy = require('passport-local').Stretegy;
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');

//Routes
app.use('/', require('./backend/routes/index'));
app.use('/students', require('./backend/routes/students'));
app.use('/instructors', require('./backend/routes/instructors'));
app.use('/cohorts', require('./backend/routes/cohorts'));

app.listen(PORT, console.log(`Server started on port ${PORT}`));

