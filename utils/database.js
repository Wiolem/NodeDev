const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dev');
mongoose.Promise = global.Promise;
module.exports = mongoose;