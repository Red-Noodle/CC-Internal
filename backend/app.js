const error = require('http-errors');

const express = require('express');
const app = express();

const MongoClient = require('mongodb').MongoClient;
const passport = require('passport');
const Strategy = require('passport-local').Stretegy;
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');

mongoose.connect('mongodv://localhost', (err, client) => {
    if(err) throw err;
    const db = client.db('cultivating coders');
    const users = db.collection('users');
    const instructors = db.collection('instructors');
    const cohorts = db.collections('cohorts');
});