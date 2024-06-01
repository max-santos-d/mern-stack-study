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
        let { limit, offset } = req.query;
        limit = Number(limit) || Number(5);
        offset = Number(offset) || Number(0);


        const news = await newsService.indexService(limit, offset);
        const total = await newsService.contNews();
        const next = offset + limit;
        const nextUrl = next < total ? `${req.baseUrl}?limit=${limit}&offset=${next}` : null;
        const previous = offset - limit < 0 ? null : offset - limit;
        const previousUrl = previous != null ? `${req.baseUrl}?limit=${limit}&offset=${previous}` : null;

        if (news.length === 0) return res.status(400).send({ message: 'Não há notícias cadastradas.' });

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
    } catch (err) {
        console.log(err);
        return res.send({ message: 'Não há notícias cadastradas!' })
    };
};

export default {
    store,
    index,
};