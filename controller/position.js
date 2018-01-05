const positionModel = require("../model/position.js")

module.exports = {
    addPosition(req, res) {
        const {
            company,
            position,
            salary,
            address
        } = req.body;
        const filename = req.file ? req.file.filename : "";
         console.log(req.body,filename)
        positionModel.addPosition(company, position, salary, address, filename, (err) => {
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
    },
    deletePositionById(req, res) {
        positionModel.deletePositionById(req.query.id, (result) => {
            res.json({
                ret: true,
                data: {
                    delete: (result && result !== "error") ? true : false
                }
            })
        })
    },
    getPositionById(req, res) {
        positionModel.getPositionById(req.query.id, (result) => {
            res.json({
                ret: true,
                data: {
                    info: (result && result !== "error") ? result : {}
                }
            })
        })
    },
    updatePositionById(req, res) {
        const {
            id,
            company,
            position,
            salary,
            address
        } = req.body;
        const params = {id,
            company,
            position,
            salary,
            address}
        if (req.file && req.file.filename) {
            params.filename = req.file.filename;
        }
        positionModel.updatePositionById(id, params , (result) => {
            res.json({
                ret: true,
                data: {
                    update: (result && result !== "error") ? true : false
                }
            })
        })
    },
    getSalaryList(req, res) {
        let salary = req.query.salary;
        // if (salary.includes("+")) {
        //     const min = parseInt(salary, 10),
        //         max = min;
        // } else {
            const min = parseInt(salary.split("-")[0], 10),
                max = parseInt(salary.split("-")[1], 10);
        //}
        let arr = [];
        positionModel.getPosition({}, (result) => {
            if (result && result !== "error") {
                result.forEach((item,index)=>{
                    // console.log(item.salary)
                    // if (item.salary.includes("+")) {
                    //     const itemMin = parseInt(item.salary, 10);
                    //     const itemMax = itemMin;
                    //     console.log(itemMin, itemMax)
                    // } else {
                        const itemMin = parseInt(item.salary.split("-")[0], 10);
                        const itemMax = parseInt(item.salary.split("-")[1], 10);
                    //}
                    if (itemMin >= min && itemMax <= max) {
                        arr.push(item);
                    }
                })
                res.json({
                    ret: true,
                    data: {
                        list: arr
                    }
                })
            }
        })
    }
}