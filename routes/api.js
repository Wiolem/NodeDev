const express = require('express');
const router = express.Router();
const userController = require('../controller/user.js');
const positionController = require('../controller/position.js')

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/isLogin', userController.isLogin);
router.get('/logout', userController.logout);

router.post('/addPosition', positionController.addPosition)
router.post('/getListInfo', positionController.getListInfo)

module.exports = router;