const mongoose = require('mongoose');

const userService = require('../services/user.service');

const store = async (req, res) => {
    const { name, username, email, password, avatar, background } = req.body;

    console.log(name, username, email, password, avatar, background);

    if (!name || !username || !email || !password || !avatar || !background) return res.send({ message: "Campos obrigatórios em falta!" });

    const user = await userService.storeService(req.body);

    if (!user) return res.status(400).send({ error: 'Erro ao criar usuario' })

    res.status(200).send({
        message: 'Usuário criado com sucesso',
        user: {
            id: user._id,
            name,
            username,
            email,
            password,
            avatar,
            background
        }
    });
};

const index = async (req, res) => {
    const users = await userService.indexService();

    if (users.length === 0) return res.status(400).send({ message: 'Não há usuários cadastrados.' });

    return res.status(200).send(users);
};

const show = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send({ message: 'ID de Usuário inválido' });

    const user = await userService.showService(id);

    if (!user) return res.status(400).send({ message: 'Usuário não encontrado.' });

    return res.status(200).send(user);
};

const update = async (req, res) => {
    const id = req.params.id;
    const { name, username, email, password, avatar, background } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send({ message: 'ID de Usuário inválido' });

    const user = await userService.showService(id);

    if (!user) return res.status(400).send({ message: 'Usuário não encontrado.' });
    if (!name && !username && !email && !password && !avatar && !background) return res.send({ message: "Pelo menos um campo deve ser informado para update!" });

    await userService.updateService(
        id,
        name,
        username,
        email,
        password,
        avatar,
        background,
    );

    return res.status(200).send({message: 'Usuário atualizado!'});
};

module.exports = { store, index, show, update };