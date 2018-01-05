var mongoose = require('../utils/database.js')

var Position = mongoose.model('position', {
    company: String,
    position: String,
    salary: String,
    address: String,
    filename: String
});

module.exports = {
    addPosition(company, position, salary, address, filename, callback) {
        var position = new Position({
            company,
            position,
            salary,
            address,
            filename
        });
        position.save(err => callback(err));
    },
    getPosition(params, callback) {
        Position.find(params)
            .then(res => callback(res))
            .catch(() => callback("error"))
    },
    getPositionByPage(size, page, callback) {
        Position.find({})
            .limit(parseInt(size))
            .skip((page - 1) * size)
            .then((res) => callback(res))
            .catch(() => callback("error"))
    },
    deletePositionById(id, callback) {
        Position.findByIdAndRemove(id)
            .then(result => callback(result))
            .catch(() => callback("error"));
    },
    getPositionById(id, callback) {
        Position.findById(id)
            .then(result => callback(result))
            .catch(() => callback("error"))
    },
    updatePositionById(id, params, callback) {
        Position.findByIdAndUpdate(id, params)
            .then((result) => callback(result))
            .catch(() => callback("error"))
    }
}