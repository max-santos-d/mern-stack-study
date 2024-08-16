import express from 'express';
import 'dotenv/config';
import cors from 'cors';    // adicionando configuração cors

import connectDatabase from './src/database/db.js';
import routes from './src/routes/index.routes.js';

connectDatabase();
const app = express();

app.use(cors());    // utilizando cors para solução de erro que acontecia no acesso pelo front > resolução em: https://stackoverflow.com/questions/57009371/access-to-xmlhttprequest-at-from-origin-localhost3000-has-been-blocked
app.use(express.json());
app.use(routes);

export default app;