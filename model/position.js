var mongoose = require('../utils/database.js')

var Position = mongoose.model('position', {
    company: String,
    position: String,
    salary: String,
    address: String
});

module.exports = {
    addPosition(company, position, salary, address, callback) {
        var position = new Position({
            company,
            position,
            salary,
            address
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
    }
}