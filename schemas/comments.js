const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = new mongoose.Schema({
    
    content: String,

    //作者Id
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    //所属文章Id
    articleId: {
        type: Schema.Types.ObjectId,
        ref: 'Contents'
    },

    //作者Id
    username: {
        type: String,
        required: true
    },

    //发布时间
    createAt: {
        type: Date,
        default: new Date
    }

});