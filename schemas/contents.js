const mongoose = require('mongoose');

const Schema = mongoose.Schema;

module.exports = new Schema({

    //标题
    title: {
        type: String,
        required:true 
    },

    //关联作者
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    
    //阅读量
    views: {
        type: Number,
        default: 0
    },

    //类别
    categories: [{
        type: String,
        default: '未分类'
    }],

    description: String,

    content: String,

},{ 
    timestamps: true
});