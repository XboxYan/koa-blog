const mongoose = require('mongoose');

const Categories = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    //添加时间
    addTime: {
        type: Date,
        default: Date.now
    }
});

module.exports = Categories;