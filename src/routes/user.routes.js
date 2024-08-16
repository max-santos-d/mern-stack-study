import { Router } from 'express';

import userController from '../controllers/user.controller.js';
import isValid from '../middlewares/global.middlewares.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const userRoutes = Router();

userRoutes.post('/', userController.store);
userRoutes.get('/', userController.index);
userRoutes.get('/:id', authMiddleware, isValid, userController.show);
userRoutes.patch('/:id', authMiddleware, isValid, userController.update);

export default userRoutes;
