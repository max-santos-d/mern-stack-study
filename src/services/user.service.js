import userRepositories from "../repositories/user.repositories.js";

const store = async ({ name, username, email, password, avatar, background }) => {
    if (!name || !username || !email || !password || !avatar || !background)
        throw new Error("Campos obrigatórios em falta! -> <name, username, email, password, avatar, background> ")

    const user = await userRepositories.storeRepository(
        {
            name,
            username,
            email,
            password,
            avatar,
            background
        });

    if (!user) throw new Error('Erro ao criar usuario')

    return user;
};

const index = async () => {
    const users = await userRepositories.indexRepository();

    if (users.length === 0) throw new Error('Não há usuários cadastrados.')

    return users;
};

const show = async (userId) => {
    const user = userRepositories.showRepository(userId);
    if (!user) throw new Error('Usuário não encontrado!');
    return user;
};

const update = async (userId, { name, username, email, password, avatar, background }) => {

    if (!name && !username && !email && !password && !avatar && !background)
        throw new Error('Pelo menos um campo deve ser informado para atualização!')

    const user = await userRepositories.indexRepository();

    if (!user) throw new Error('Usuário não encontrado!');

    // implementar funcionalidade para mudança de password

    const response = await userRepositories.updateRepository(
        userId,
        name,
        username,
        email,
        password,
        avatar,
        background,
    );

    return { message: 'Usuário atualizado!',  response};
};

export default {
    store,
    index,
    show,
    update
};