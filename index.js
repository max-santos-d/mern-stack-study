const express = require("express");
const app = express();

const userRoutes = require('./src/routes/user.routes');

const port = 3000;

app.use(express.json());

app.use('/user', userRoutes);

app.listen(port, () => {

    console.log('')
    console.log(`Servidor rodando na porta http://localhost:${port}`);
    console.log('');
});
