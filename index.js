import express from 'express';

import connectDatabase from './src/database/db.js';
import userRoutes from './src/routes/user.routes.js';

const app = express();
const port = 3000;


connectDatabase();

app.use(express.json());
app.use('/user', userRoutes);

app.listen(port, () => {

    console.log('')
    console.log(`Servidor rodando na porta http://localhost:${port}`);
    console.log('');
});
