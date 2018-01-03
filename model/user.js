const mongoose = require("../utils/database.js");
const User = mongoose.model('user', {
    username: String,
    password: String
});
module.exports = {
    register(username, password, callback) {
        const user = new User({
            username,
            password
        });
        user.save(err => callback(err));
    },
    findUser(findParams, callback) {
        User.findOne(findParams)
            .then(res => callback(res))
            .catch(() => callback("error"));
    }
}