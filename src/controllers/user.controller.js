import userService from '../services/user.service.js';

const store = async (req, res) => {
    const { name, username, email, password, avatar, background } = req.body;

    try {
        const response = await userService.store({ name, username, email, password, avatar, background });

        res.status(200).send({
            message: 'Usuário criado com sucesso',
            response
        });
    } catch (err) {
        console.log(err)
        if (err.code === 11000) return res.status(500).send({ message: 'username ou e-mail já cadastrado!' });
        if (err.code === E11000) return res.status(500).send({ message: 'username ou e-mail já cadastrado!' });
        return res.status(500).send({ message: err.message });
    };
};

const index = async (req, res) => {
    try {
        const users = await userService.index();
        return res.status(200).send(users);
    } catch (err) {
        res.status(500).send({ message: err.message });
        console.log(err);
    };
};

const show = async (req, res) => {
    try {
        const user = await userService.show(req.user);
        return res.status(200).send(user);
    } catch (err) {
        res.status(500).send({ message: err.message });
        console.log(err);
    }
};

const update = async (req, res) => {
    const id = req.user._id;
    const { name, username, email, password, avatar, background } = req.body;

    try {
        const response = await userService.update(
            id,
            {
                name,
                username,
                email,
                password,
                avatar,
                background,
            }
        );

        return res.status(200).send(response);
    } catch (err) {
        res.status(500).send({ message: err.message });
        console.log(err);
        ;
    }

};

export default {
    store,
    index,
    show,
    update
};
