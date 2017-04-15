var mongoose = require('mongoose');
var detailsSchema = new mongoose.Schema({
    id: Number
});

module.exports = mongoose.model('Details', detailsSchema);