const mongoose = require('mongoose');

const exampleSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number
});

module.exports = mongoose.model('Example', exampleSchema);