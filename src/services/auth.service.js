import bcrypt from 'bcrypt';

import authRepository from '../repositories/auth.repositories.js'

const login = async (email, password, userId) => {

    if (!email || !password) throw new Error('Email e senha requerido.');

    const user = await authRepository.login(email);

    if (!user) throw new Error('Usuário ou senha incorreto.'); 
    
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) throw new Error('Usuário ou senha incorreto.');

    const token = authRepository.generateToken(user._id);

    return ({token});
};

export default { login };