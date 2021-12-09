// require dependencies

const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

const showsRouter = require ('./controllers/shows')

// initialize app
const app = express();

// config - 'connect' .env file to server.js
require('dotenv').config()

// database connection
mongoose.connect(process.env.DATABASE_URL)

// database connection error/success
const db = mongoose.connection;
db.on('connected', () => console.log('mongo works!'))
db.on('disconnected', () => console.log('mongo not working'))

// mount middleware
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false}));
app.use(methodOverride("_method"))

// mount routes
app.use('/', showsRouter);

// listener
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`works ${PORT}`));
