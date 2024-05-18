const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    body : {
        type : String,
        required: true
    }
});

module.exports = mongoose.model('Review', reviewSchema);