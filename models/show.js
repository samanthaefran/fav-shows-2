// require dependencies
const mongoose = require('mongoose')


// shortcut variable
const Schema = mongoose.Schema;

// define the schema
const showSchema = new Schema({
  title: { type: String, required: true },
  yearReleased: { type: String, required: true },
  starring: { type: String, required: true },
})



const Show = mongoose.model('Show', showSchema)

module.exports = Show