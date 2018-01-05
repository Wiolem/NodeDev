const express = require('express');
const router = express.Router();
const userController = require('../controller/user.js');
const positionController = require('../controller/position.js')
const personController = require('../controller/person.js')

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/isLogin', userController.isLogin);
router.get('/logout', userController.logout);

router.post('/addPosition', positionController.addPosition)
router.post('/getListInfo', positionController.getListInfo)
router.get('/deletePosition', positionController.deletePositionById)
router.get('/getPosition', positionController.getPositionById)
router.post('/updatePosition', positionController.updatePositionById)
router.get('/getSalaryList',positionController.getSalaryList)

router.post('/addPerson', personController.addPerson)
router.post('/getPersonListInfo', personController.getPersonListInfo)
router.get('/deletePerson', personController.deletePersonById)
router.get('/getPerson', personController.getPersonById)
router.post('/updatePerson', personController.updatePersonById)



module.exports = router;