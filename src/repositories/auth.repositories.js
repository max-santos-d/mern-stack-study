import jwt from 'jsonwebtoken';

import User from '../models/User.js';

const login = (email) => 
    User.findOne({ email }).select('+password');

const generateToken = (id) => 
    jwt.sign({ id }, process.env.SECRET_JWT, { expiresIn: 86400 });

export default {
    login,
    generateToken
};