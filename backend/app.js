const error = require('http-errors');

const express = require('express');
const app = express();

const MongoClient = require('mongodb').MongoClient;
const passport = require('passport');
const Strategy = require('passport-local').Stretegy;
const session = require('express-session');
const flash = require('connect-flash');

const db = MongoClient.connect('mongodb://localhost');