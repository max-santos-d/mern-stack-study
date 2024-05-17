const express = require("express");
const app = express();

const userRoutes = require('./src/routes/user.routes');

app.use('/soma', userRoutes);

app.listen(3000, () => {

    console.log('')
    console.log('Servidor rodando na porta http://localhost:3000');
    console.log('');
});
