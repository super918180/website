var mongoose = require('mongoose');
var examplesSchema = new mongoose.Schema({
    link: Number,
    img: String,
    href: String,
    download: String,
    github: String,
    title: String,
    des: String,
    tag: Array,
    see: Number,
    love: Number
});

module.exports = mongoose.model('Examples', examplesSchema);