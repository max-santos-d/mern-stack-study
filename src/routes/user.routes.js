const express = require('express');
const route = express.Router();

const userController = require("../controllers/user.controller");

route.post('/', userController.store);
route.get('/', userController.index);
route.get('/:id', userController.show);
route.patch('/:id', userController.update);
// route.delete('/', userController.destroy);

module.exports = route;
