import {Router} from 'express';

import newsController from '../controllers/news.Controller.js';
import {authMiddleware} from '../middlewares/auth.middleware.js';

const routes = Router();

routes.post('/', authMiddleware, newsController.store);
routes.get('/', newsController.index);
routes.get('/last', newsController.show);
routes.get('/:id', newsController.show);
// routes.patch('/:id', newsController.update);

export default routes;