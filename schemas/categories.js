const mongoose = require('mongoose');

const Categories = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
},{ 
    timestamps: true
});

module.exports = Categories;