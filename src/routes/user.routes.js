const express = require('express');
const route = express.Router();

const userController = require("../controllers/user.controller");

route.post('/', userController.create);
route.get('/', userController.index);
route.get('/:id', userController.show);
// route.patch('/', userController.update);
// route.delete('/', userController.destroy);

module.exports = route;
