const express = require('express');
const router = express.Router();
const upload = require("../utils/uploads.js");
const userController = require('../controller/user.js');
const positionController = require('../controller/position.js');
const personController = require('../controller/person.js');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/isLogin', userController.isLogin);
router.get('/logout', userController.logout);

router.post('/addPosition', upload.single('logo'), positionController.addPosition)
router.post('/getListInfo', positionController.getListInfo)
router.get('/deletePosition', positionController.deletePositionById)
router.get('/getPosition', positionController.getPositionById)
router.post('/updatePosition', upload.single('logo'), positionController.updatePositionById)
router.get('/getSalaryList', positionController.getSalaryList)

router.post('/addPerson', upload.single('avatar'), personController.addPerson)
router.post('/getPersonListInfo', personController.getPersonListInfo)
router.get('/deletePerson', personController.deletePersonById)
router.get('/getPerson', personController.getPersonById)
router.post('/updatePerson', upload.single('avatar'), personController.updatePersonById)

module.exports = router;