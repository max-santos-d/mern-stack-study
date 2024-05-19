import bcrypt from 'bcrypt';

import { loginService } from '../services/auth.service.js'

const login = async (req, res) => {

    const { email, password } = req.body

    if (!email || !password) return res.status(404).send({ message: 'Email e senha requerido.' });

    try {
        const user = await loginService(email);        

        if (!user) return res.status(404).send({ message: 'Usuário ou senha incorreto.' });

        const passwordIsValid = bcrypt.compareSync(password, user.password);

        if (!user || !passwordIsValid) return res.status(404).send({ message: 'Usuário ou senha incorreto.' });

        res.status(200).send({ message: 'Login realizado!', user });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Erro ao realizar login' });
    }
};

export { login };