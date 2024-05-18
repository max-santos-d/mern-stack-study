const userService = require('../services/user.service');

const create = async (req, res) => {
    const { name, username, email, password, avatar, background } = req.body;

    console.log(name, username, email, password, avatar, background);

    if (!name || !username || !email || !password || !avatar || !background) return res.send({ message: "Campos obrigatórios em falta!" });

    const user = await userService.create(req.body);

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

module.exports = { create };