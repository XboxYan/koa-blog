const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = new mongoose.Schema({
    
    content: String,

    //关联作者
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    //关联文章
    article: {
        type: Schema.Types.ObjectId,
        ref: 'Contents'
    },

    //发布时间
    createdAt: {
        type: Date,
        default: Date.now
    }

});