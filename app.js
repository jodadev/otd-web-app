// Dependencies 
const path = require('path');
const public = path.join(__dirname, './public');
const express = require('express');
const app = express();
const router = require('./routes/index');

// Set up the view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));

// App uses
app.use(express.urlencoded({ extended: false}));
app.use(express.static(public));
app.use(express.json());
app.use('/', router);


module.exports = app;