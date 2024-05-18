const mongoose = require('mongoose');

const connectDatabase = () => {
    const url = 'mongodb+srv://maxsantos:w1fD6II0s6mgMr7o@cluster0.i2evyqo.mongodb.net/';

    console.log('conectando...');

    mongoose.connect(url)
        .then(() => console.log('MongoDB Atlas Conectado'))
        .catch((err) => { console.log(err) });
};

module.exports = connectDatabase;