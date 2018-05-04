var mongoose = require('mongoose');
var CategorySchema= require('../schemas/movie');
var Category = mongoose.model('Category', CategorySchema);

module.exports = Category;