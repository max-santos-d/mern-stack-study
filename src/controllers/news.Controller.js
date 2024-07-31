import mongoose from 'mongoose';
import newsService from '../services/news.service.js';

const store = async (req, res) => {
    try {
        const { title, text, banner } = req.body;

        if (!title || !text || !banner)
            return res.send({ message: "Campos obrigatórios em falta!" });

        await newsService.store({
            title,
            text,
            banner,
            user: req.userId,
        });

        return res.status(201).send({ message: 'Notícia cadastrada!' });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ message: err.message })
    }
};

const index = async (req, res) => {

    try {
        const { limit, offset } = req.query;

        if (limit || offset) {

            const news = await newsService.indexPageService(limit, offset);
            const total = await newsService.contNews();
            const next = offset + limit;
            const nextUrl = next < total ? `${req.baseUrl}?limit=${limit}&offset=${next}` : null;
            const previous = offset - limit < 0 ? null : offset - limit;
            const previousUrl = previous != null ? `${req.baseUrl}?limit=${limit}&offset=${previous}` : null;

            return res.status(200).send({
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
            });
        };

        const news = await newsService.indexService(limit, offset);
        return res.status(200).send(news);

    } catch (err) {
        console.log(err);
        return res.send({ message: 'Não há notícias cadastradas!' })
    };
};

const show = async (req, res) => {

    try {
        if (req.query.last) {
            if (req.query.last.toLowerCase() === 'true') {
                const news = await newsService.showLastService();

                if (!news) return res.statatus(400).send({ message: 'Não há notícias cadastradas!' });

                return res.status(200).send({
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
        };

        if (req.query.id) {
            const news = await newsService.showService(req.query.id);

            if (!news) return res.statatus(400).send({ message: 'Noticia não encontrada!' });

            return res.status(200).send({
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

        if (req.query.title) {
            const news = await newsService.showByTitleService(req.query.title);

            if (!news) res.status(400).send({ message: 'Nenhuma noticia com o título' });

            return res.status(200).send({
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

        return res.status(400).send({ message: 'Nenhum parâmetro informado.' });

    } catch (err) {
        console.log(err);
        return res.send({ message: 'Noticia não encontrada!' })
    };
};

const update = async (req, res) => {
    try {
        const { title, text, banner } = req.body;
        const id = req.params.id || '';
        const userIdToken = req.userId || '';

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send({ message: 'ID de News inválida!' });

        const news = await newsService.showService(id);

        if(!news) return res.status(400).send({message: 'News não encontrada!'});
        if (String(news.user._id) !== String(userIdToken)) return res.status(400).send({message: 'Não autenticado como usuário da News.'});
        if (!title && !text && !banner) return res.status(400).send({ message: 'Ao menos um campo obrigatório deve ser informado: title, text ou banner.' })

        await newsService.updateService(
            id,
            title,
            text,
            banner,
        );

        return res.status(200).send({ message: 'News atualizada!' });
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: err.message });
    }
};

const erase = async (req, res) => {
    try {
        const id = req.params.id;
        
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send({ message: 'ID News inválida!' });
        
        const userIdToken = req.userId;
        const news = await newsService.showService(id);

        if(!news) return res.status(400).send({message: 'News não encontrada!'});
        if (String(news.user._id) !== String(userIdToken)) return res.status(400).send({message: 'Não autenticado como usuário da News.'});

        await newsService.eraseService(id);

        res.status(200).send({message: 'News Apagada!'});

    }catch (err) {
        console.log(err);
        res.status(400).send({message: err.message});
    }
    
};

const messages = async (req, res) => {
    try {
        const userId = req.userId
        const news = await newsService.userMessagesService(userId);

        if (!news) return res.status(400).send({ message: 'Nenhuma News encontrada!' });

        return res.status(200).send({
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
    } catch (err) {
        console.log(err);
    };
};

const like = async (req, res) => {
    const id = req.params.id;
    const userIdToken = req.userId;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send({ message: 'ID News inválida!' });

    const like = await newsService.likeService(id, userIdToken);

    if(!like) {
        await newsService.deleteLikeService(id, userIdToken);
        return res.status(200).send({message: 'LIKE removido!'})
    }; 

    console.log(like);    

    return res.status(200).send({message: 'LIKE adicionado!'});
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