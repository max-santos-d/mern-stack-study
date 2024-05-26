import newsService from '../services/news.service.js';

const store = async (req, res) => {
    try {
        const { title, text, banner } = req.body;
        const userId = req.userId;

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
        const news = await newsService.indexService();

        if (news.length === 0) return res.status(400).send({ message: 'Não há notícias cadastradas.' });

        return res.status(200).send(news);
    } catch (err) {
        console.log(err);
        return res.send({ message: 'Não há notícias cadastradas!' })
    };
};

export default {
    store,
    index,
};