import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';    // adicionando configuração cors

import connectDatabase from './src/database/db.js';
import userRoutes from './src/routes/user.routes.js';
import authRoutes from './src/routes/auth.routes.js';
import newsRoutes from './src/routes/news.routes.js';

dotenv.config();
connectDatabase();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());    // utilizando cors para solução de erro que acontecia no acesso pelo front > resolução em: https://stackoverflow.com/questions/57009371/access-to-xmlhttprequest-at-from-origin-localhost3000-has-been-blocked
app.use(express.json());
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/news', newsRoutes);

app.listen(port, () => {

    console.log('')
    console.log(`Servidor rodando na porta http://localhost:${port}`);
    console.log('');
});
