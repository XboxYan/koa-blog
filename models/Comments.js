const mongoose = require('mongoose');

const commentsSchema = require('../schemas/comments');

module.exports = mongoose.model('Comments', commentsSchema);