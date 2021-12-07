// require dependencies

const express = require('express')
const mongoose = require('mongoose')

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

// listener
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`works ${PORT}`));
