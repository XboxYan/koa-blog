const mongoose = require('mongoose');

const categoriesSchema = require('../schemas/categories');

module.exports = mongoose.model('Categories', categoriesSchema);