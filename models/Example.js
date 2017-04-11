var mongoose = require('mongoose');
var examplesSchema = new mongoose.Schema({
    link: String,
    img: String,
    title: String,
    des: String,
    tag: Array,
    see: Number,
    love: Number
});

module.exports = mongoose.model('Examples', examplesSchema);