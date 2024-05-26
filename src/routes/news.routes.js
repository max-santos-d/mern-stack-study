import {Router} from 'express';

import newsController from '../controllers/news.Controller.js';

const routes = Router();

routes.post('/', newsController.store);
routes.get('/', newsController.index);
// routes.get('/:id', newsController.show);
// routes.patch('/:id', newsController.update);

export default routes;