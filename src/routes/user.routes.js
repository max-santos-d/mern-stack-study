import express from 'express';

import userController from '../controllers/user.controller.js';
import isValid from '../middlewares/global.middlewares.js';

const routes = express.Router();

routes.post('/', userController.store);
routes.get('/', userController.index);
routes.get('/:id', isValid, userController.show);
routes.patch('/:id', isValid, userController.update);
// route.delete('/', userController.destroy);

export default routes;
