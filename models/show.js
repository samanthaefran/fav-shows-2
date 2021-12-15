// require dependencies
const mongoose = require('mongoose')


// shortcut variable
const Schema = mongoose.Schema;

// define the schema
const showSchema = new Schema({
  title: { type: String, required: true },
  rating: {type: String, required: false},
})



const Show = mongoose.model('Show', showSchema)

module.exports = Show