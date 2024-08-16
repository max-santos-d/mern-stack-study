import bcrypt from 'bcrypt';

import authRepository from '../repositories/auth.repositories.js'

const login = async (email, password, userPassword, userId) => {

    if (!email || !password) throw new Error('Email e senha requerido.');

    const user = await authRepository.login(email);

    if (!user) throw new Error('Usuário ou senha incorreto.'); 
    
    const passwordIsValid = bcrypt.compareSync(password, userPassword);

    if (!passwordIsValid) return res.status(404).send({ message: 'Usuário ou senha incorreto.' });

    const token = generateToken(userId);

    return ({ token });
};

export default { login };