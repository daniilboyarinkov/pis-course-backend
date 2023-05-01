const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require('morgan');

const indexRouter = require('./routes/index');
const booksRouter = require('./routes/books');
const readersRouter = require('./routes/readers');
const employeesRouter = require('./routes/employees');
const eventsRouter = require('./routes/events');
const ordersRouter = require('./routes/orders');
const librariesRouter = require('./routes/libraries');
const storeRouter = require('./routes/store');
const loginRouter = require('./routes/login');

const app = express();

app.use(cors());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/books', booksRouter);
app.use('/readers', readersRouter);
app.use('/employees', employeesRouter);
app.use('/events', eventsRouter);
app.use('/orders', ordersRouter);
app.use('/libraries', librariesRouter);
app.use('/store', storeRouter);
app.use('/login', loginRouter);

module.exports = app;
