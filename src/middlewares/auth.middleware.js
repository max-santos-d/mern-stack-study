import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import userService from '../services/user.service.js';

dotenv.config();

export const authMiddleware = (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) return res.sendStatus(401);

        const [schema, token] = authorization.split(' ');

        if (!schema && !token) return res.sendStatus(401);
        if (schema !== 'Bearer') return res.sendStatus(401);

        jwt.verify(token, process.env.SECRET_JWT, async (err, decoded) => {
            if (err) return res.status(401).send({ message: 'Token Inválido!' });

            const user = await userService.showService(decoded.id);

            if (!user || !user._id) return res.status(401).send({ message: 'Usuário Inválido!' });

            req.userId = user._id;
            
            return next();
        });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ message: err.message });
    }
};