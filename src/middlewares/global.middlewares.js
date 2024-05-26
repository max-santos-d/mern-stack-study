import mongoose from 'mongoose';

import userService from '../services/user.service.js';

const isValid = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send({ message: 'ID de Usuário inválido' });

        const user = await userService.showService(req.params.id);

        if (!user) return res.status(400).send({ message: 'ID de Usuário não encontrado!' });

        req.user = user;
        next();
    } catch (err) {
        res.status(500).send({ message: err.message });
        console.log(err);
    }

};

export default isValid;
