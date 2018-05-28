const mongoose = require('mongoose');

const Schema = mongoose.Schema;

module.exports = new Schema({

    //标题
    title: {
        type: String,
        required:true 
    },

    //作者Id
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    //添加时间
    addTime: {
        type: Date,
        default: new Date
    },

    //阅读量
    views: {
        type: Number,
        default: 0
    },

    description: String,

    content: String,

});