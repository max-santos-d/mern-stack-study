import userService from '../services/user.service.js';

const store = async (req, res) => {
    try {
        const { name, username, email, password, avatar, background } = req.body;

        if (!name || !username || !email || !password || !avatar || !background) 
            return res.send({ message: "Campos obrigatórios em falta!" });

        const user = await userService.storeService(req.body);

        if (!user) return res.status(400).send({ error: 'Erro ao criar usuario' })

        res.status(200).send({
            message: 'Usuário criado com sucesso',
            user
        });
    } catch (err) {
        res.status(400).send({ message: err.message });
        console.log(err);
    };
};

const index = async (req, res) => {
    try {
        const users = await userService.indexService();

        if (users.length === 0) return res.status(400).send({ message: 'Não há usuários cadastrados.' });

        return res.status(200).send(users);
    } catch (err) {
        res.status(500).send({ message: err.message });
        console.log(err);
    };
};

const show = async (req, res) => {
    try {
        const user = req.user;
        return res.status(200).send(user);
    } catch (err) {
        res.status(500).send({ message: err.message });
        console.log(err);
    }
};

const update = async (req, res) => {
    try {
        const id = req.user._id;
        const { name, username, email, password, avatar, background } = req.body;

        if (!name && !username && !email && !password && !avatar && !background) return res.send({ message: "Pelo menos um campo deve ser informado para update!" });

        const newUser = await userService.updateService(
            id,
            name,
            username,
            email,
            password,
            avatar,
            background,
        );

        return res.status(200).send({ message: 'Usuário atualizado!' });
    } catch (err) {
        res.status(500).send({ message: err.message });
        console.log(err);
        ;
    }

};

export default { store, index, show, update };