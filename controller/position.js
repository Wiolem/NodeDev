const positionModel = require("../model/position.js")

module.exports = {
    addPosition(req, res) {
        const {
            company,
            position,
            salary,
            address
        } = req.body;
        positionModel.addPosition(company, position, salary, address, (err) => {
            res.json({
                ret: true,
                data: {
                    inserted: !err
                }
            })
        })
    },
    getListInfo(req, res) {
        const {
            size,
            page
        } = req.body;
        let totalPage = 0;
        positionModel.getPosition({}, (result) => {
            if (result && result !== "error") {
                totalPage = Math.ceil(result.length / size);
                positionModel.getPositionByPage(size, page, (result) => {
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
    }
}