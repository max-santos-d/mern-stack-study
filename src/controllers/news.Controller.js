import newsService from '../services/news.service.js';

const store = async (req, res) => {
    try {
        const { title, text, banner } = req.body;
        await newsService.store(title, text, banner, req.userId,);
        return res.status(201).send({ message: 'Notícia cadastrada!' });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: err.message });
    };
};


const index = async (req, res) => {
    const { limit, offset } = req.query;

    try {
        const news = await newsService.index({ limit, offset }, req.baseUrl);
        return res.status(200).send(news);
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Não há notícias cadastradas!' })
    };
};

const show = async (req, res) => {
    try {
        const response = await newsService.show(req.query);
        return res.status(200).send(response);
    } catch (err) {
        console.log(err);
        return res.send({ message: 'Noticia não encontrada!' })
    };
};

const update = async (req, res) => {
    const { title, text, banner } = req.body;
    const id = req.params.id || '';
    const userIdToken = req.userId || '';

    try {
        await newsService.update(title, text, banner, id, userIdToken);
        return res.status(200).send({ message: 'News atualizada!' });
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: err.message });
    }
};

const erase = async (req, res) => {
    const id = req.params.id || '';
    const userIdToken = req.userId || '';

    try {
        await newsService.erase(id, userIdToken);
        res.status(200).send({ message: 'News Apagada!' });
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: err.message });
    };
};

const messages = async (req, res) => {
    const userId = req.userId

    try {
        const response = await newsService.messages(userId);
        return res.status(200).send(response);
    } catch (err) {
        console.log(err);
    };
};

const like = async (req, res) => {
    const id = req.params.id;
    const userIdToken = req.userId;

    try {
        const response = await newsService.like(id, userIdToken);
        return res.status(200).send(response);
    } catch (err) {
        console.log(err);
        return res.status(500).send(err.message);
    }
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