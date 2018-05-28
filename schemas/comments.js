const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    
    contents: String,

    //作者
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    //所属文章
    article: {
        type: Schema.Types.ObjectId,
        ref: 'Contents'
    },

    createAt: {
        type: Date,
        default: new Date
    }

});