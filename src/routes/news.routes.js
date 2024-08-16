import { Router } from 'express';

import newsController from '../controllers/news.Controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const newsRoutes = Router();

newsRoutes.post('/', authMiddleware, newsController.store);
newsRoutes.get('/', newsController.index);
newsRoutes.get('/search', newsController.show);
newsRoutes.patch('/:id', authMiddleware, newsController.update);
newsRoutes.delete('/:id', authMiddleware, newsController.erase);

newsRoutes.get('/messages', authMiddleware, newsController.messages);
newsRoutes.patch('/like/:id', authMiddleware, newsController.like);

/* 
Obs.: se quiser organizar o código para não utilizar sempre um middleware nas rotas pode-se fazer:
    newsRoutes.get('/', newsController.index);
    newsRoutes.get('/search', newsController.show);

    newsRoutes.use(authMiddleware)
    newsRoutes.post('/', newsController.store);
    newsRoutes.patch('/:id', newsController.update);
    newsRoutes.delete('/:id', newsController.erase);
    newsRoutes.get('/messages', newsController.messages);
    newsRoutes.patch('/like/:id', newsController.like);

Assim todas as rotas abaixo da chamada <use> irá utilizar o middleware, assim criando uma cadeia de use e middlewares
*/

export default newsRoutes;