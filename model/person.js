var mongoose = require('../utils/database.js')

var Person = mongoose.model('person', {
    username: String,
    position: String,
    salary: String,
    address: String,
    filename: String
});
module.exports = {
    addPerson(username, position, salary, address, filename, callback) {
        var person = new Person({
            username,
            position,
            salary,
            address,
            filename
        });
        person.save(err => callback(err))
    },
    getPersonListInfo(params, callback) {
        Person.find(params)
            .then(res => callback(res))
            .catch(() => callback("error"))
    },
    getPersonByPage(size, page, callback) {
        Person.find({})
            .limit(parseInt(size))
            .skip((page - 1) * size)
            .then((res) => callback(res))
            .catch(() => callback("error"))
    },
    deletePersonById(id, callback) {
        Person.findByIdAndRemove(id)
            .then(result => callback(result))
            .catch(() => callback("error"));
    },
    getPersonById(id, callback) {
        Person.findById(id)
            .then(result => callback(result))
            .catch(() => callback("error"))
    },
    updatePersonById(id, params, callback) {
        Person.findByIdAndUpdate(id, params)
            .then((result) => callback(result))
            .catch(() => callback("error"))
    }
}