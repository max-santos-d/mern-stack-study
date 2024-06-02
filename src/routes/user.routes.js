import express from 'express';

import userController from '../controllers/user.controller.js';
import isValid from '../middlewares/global.middlewares.js';
import {authMiddleware} from '../middlewares/auth.middleware.js';

const routes = express.Router();

routes.post('/', userController.store);
routes.get('/', userController.index);
routes.get('/:id', authMiddleware, isValid, userController.show);
routes.patch('/:id', authMiddleware, isValid, userController.update);

export default routes;
