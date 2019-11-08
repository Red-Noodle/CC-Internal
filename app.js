const express = require('express');
const path = require('path');
const passport = require('passport');
const Strategy = require('passport-local').Stretegy;
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const app = express();


// DB connection
mongoose.connect('mongodb://localhost/cc_admin', { useUnifiedTopology: true, useNewUrlParser: true })
.then(() => console.log('DB connected...'))
.catch((err) => {console.log(err)});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Express bodyparser
app.use(express.urlencoded({extended: true}));

// Express Session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

// Connect flash
app.use(flash());

app.use((req, res, next) => {
    res.locals.loggedIn = req.isAuthenticated();
    next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/students', require('./routes/students'));
app.use('/instructors', require('./routes/instructors'));
app.use('/cohorts', require('./routes/cohorts'));
app.use('/admins', require('./routes/admins'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

