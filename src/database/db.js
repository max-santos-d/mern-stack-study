// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const connectDatabase = () => {

    console.log('conectando...');

    mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log('MongoDB Atlas Conectado'))
        .catch((err) => { console.log(err) });
};

export default connectDatabase;