const personModel = require("../model/person.js")
module.exports = {
    addPerson(req, res) {
        const {
            username,
            position,
            salary,
            address
        } = req.body;
        const filename = req.file ? req.file.filename : "";
        personModel.addPerson(username, position, salary, address, filename, (err) => {
            res.json({
                ret: true,
                data: {
                    inserted: !err
                }
            })
        })
    },
    getPersonListInfo(req, res) {
        const {
            size,
            page
        } = req.body;
        let totalPage = 0;
        personModel.getPersonListInfo({}, (result) => {
            if (result && result !== "error") {
                totalPage = Math.ceil(result.length / size);
                personModel.getPersonByPage(size, page, (result) => {
                    res.json({
                        ret: true,
                        data: {
                            list: (result && result !== "error") ? result : [],
                            totalPage
                        }
                    })
                })
            }
        })
    },
    deletePersonById(req, res) {
        personModel.deletePersonById(req.query.id, (result) => {
            res.json({
                ret: true,
                data: {
                    delete: (result && result !== "error") ? true : false
                }
            })
        })
    },
    getPersonById(req, res) {
        personModel.getPersonById(req.query.id, (result) => {
            res.json({
                ret: true,
                data: {
                    info: (result && result !== "error") ? result : {}
                }
            })
        })
    },
    updatePersonById(req, res) {
        const {
            id,
            username,
            position,
            salary,
            address
        } = req.body;
        const params = {
            username,
            position,
            salary,
            address
        }
        if (req.file && req.file.filename) {
            params.filename = req.file.filename;
        }
        personModel.updatePersonById(id, params, (result) => {
            res.json({
                ret: true,
                data: {
                    update: (result && result !== "error") ? true : false
                }
            })
        })
    }
}