const mongoose = require('mongoose');

const commentsSchema = require('../schemas/contents');

module.exports = mongoose.model('Comments', commentsSchema);