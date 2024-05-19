const express = require('express');
const route = express.Router();

const userController = require("../controllers/user.controller");
const {isValid} = require('../middlewares/global.middlewares');

route.post('/', userController.store);
route.get('/', userController.index);
route.get('/:id', isValid, userController.show);
route.patch('/:id', isValid, userController.update);
// route.delete('/', userController.destroy);

module.exports = route;
