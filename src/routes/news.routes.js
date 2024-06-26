import {Router} from 'express';

import newsController from '../controllers/news.Controller.js';
import {authMiddleware} from '../middlewares/auth.middleware.js';

const routes = Router();

routes.post('/', authMiddleware, newsController.store);
routes.get('/', newsController.index);
routes.get('/search', newsController.show);
routes.patch('/:id', authMiddleware, newsController.update);
routes.delete('/:id', authMiddleware, newsController.erase);

routes.get('/messages', authMiddleware, newsController.messages);
routes.patch('/like/:id', authMiddleware, newsController.like);

export default routes;