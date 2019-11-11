const express = require('express');
const path = require('path');
const passport = require('passport');
const Strategy = require('passport-local').Stretegy;
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');

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
app.use(express.json());

// Express Session
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
  })
);

// Connect flash
app.use(flash());

// Use Cors
app.use(cors());

// Routes
app.use('/', require('./routes/index'));
app.use('/students', require('./routes/students'));
app.use('/instructors', require('./routes/instructors'));
app.use('/cohorts', require('./routes/cohorts'));
app.use('/admins', require('./routes/admins'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
