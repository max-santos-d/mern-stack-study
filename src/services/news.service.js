import mongoose from 'mongoose';
import newsRepositories from '../repositories/news.repositories.js';

const store = async (title, text, banner, userId) => {
    if (!title || !text || !banner) throw new Error('Campos obrigatórios em falta! -> title, text, banner');
    if (!userId) throw new Error('ID de usuário não informado!');

    await newsRepositories.store({
        title,
        text,
        banner,
        user: userId,
    });

    return { message: 'Notícia cadastrada!' };
};

const index = async ({ limit, offset }, baseUrl) => {
    if (limit && offset) {
        const news = await newsRepositories.indexPage(limit, offset);
        const total = await newsRepositories.contNews();
        const next = Number(offset) + Number(limit);
        const nextUrl = next < total ? `${baseUrl}?limit=${limit}&offset=${next}` : null;
        const previous = offset - limit < 0 ? null : offset - limit;
        const previousUrl = previous != null ? `${baseUrl}?limit=${limit}&offset=${previous}` : null;

        return {
            nextUrl,
            previousUrl,
            limit,
            offset,
            total,
            result: news.map(item => ({
                id: item._id,
                title: item.title,
                text: item.text,
                banner: item.banner,
                likes: item.likes,
                comments: item.comments,
                name: item.user.name,
                userName: item.user.username,
                userAvatar: item.user.avatar
            })),
        };
    };

    const news = await newsRepositories.index();
    return news;
};

const show = async (query) => {
    if (query.last) {
        if (query.last.toLowerCase() === 'true') {
            const news = await newsRepositories.showLast();

            if (!news) throw new Error('Não há notícias cadastradas!');

            return ({
                news: {
                    id: news._id,
                    title: news.title,
                    text: news.text,
                    banner: news.banner,
                    likes: news.likes,
                    comments: news.comments,
                    name: news.user.name || '',
                    userName: news.user.username || '',
                    userAvatar: news.user.avatar || '',
                },
            });
        };
    };

    if (query.id) {
        const news = await newsRepositories.show(query.id);

        if (!news) throw new Error('Noticia não encontrada!');

        return ({
            news: {
                id: news._id,
                title: news.title,
                text: news.text,
                banner: news.banner,
                likes: news.likes,
                comments: news.comments,
                name: news.user.name,
                userName: news.user.username,
                userAvatar: news.user.avatar,
            },
        });
    };

    if (query.title) {
        const news = await newsRepositories.showByTitle(query.title);
        if (!news) throw new Error('Nenhuma noticia com o título');

        return ({
            result: news.map(item => ({
                id: item._id,
                title: item.title,
                text: item.text,
                banner: item.banner,
                likes: item.likes,
                comments: item.comments,
                name: item.user.name,
                userName: item.user.username,
                userAvatar: item.user.avatar
            })),
        });
    };

    if(query.userId){      
        const news = await newsRepositories.showByUser(query.userId );

        return news;
    };
    return ([{ message: 'Nenhum parâmetro válido informado' }]);
};

const update = async (title, text, banner, id, userIdToken) => {

    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('ID de News inválida!');

    const news = await newsRepositories.show(id);

    if (!news) throw new Error('Post não encontrado!');

    if (String(news.user._id) !== String(userIdToken)) throw new Error('Não autenticado como usuário do Post.');
    if (!title && !text && !banner) throw new Error('Ao menos um campo obrigatório deve ser informado: title, text ou banner.');

    await newsRepositories.update(
        id,
        title,
        text,
        banner,
    );

    return ({ message: 'News atualizada!' });
};

const erase = async (id, userIdToken) => {

    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('ID News inválida!');

    const news = await newsRepositories.show(id);

    console.log(news._id)
    console.log(userIdToken);

    if (!news) throw new Error('Post não encontrado!');
    if (String(news.user._id) !== String(userIdToken)) throw new Error('Não autenticado como usuário da News.');

    await newsRepositories.erase(id);
    return ({ message: 'Post Apagado!' });
};

const messages = async (userId) => {
    const news = await newsRepositories.userMessages(userId);
    if (!news) throw new Error('Nenhuma News encontrada!');

    return ({
        userId,
        news: news.map(item => ({
            id: item._id,
            title: item.title,
            text: item.text,
            banner: item.banner,
            likes: item.likes,
            comments: item.comments,
            name: item.user.name,
            userName: item.user.username,
            userAvatar: item.user.avatar
        })),
    });
};

const like = async (id, userIdToken) => {

    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('ID News inválida!');

    const news = await newsRepositories.show(id);

    if(!news) return ({ message: 'News não encontrada!' });

    const like = await newsRepositories.like(id, userIdToken);

    if (!like) {
        await newsRepositories.deleteLike(id, userIdToken);
        return ({ message: 'LIKE removido!' })
    };

    return ({ message: 'LIKE adicionado!' });
};

export default {
    store,
    index,
    show,
    update,
    erase,
    messages,
    like,
};