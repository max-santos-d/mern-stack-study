import News from '../models/News.js';

const store = (body) => News.create(body);

const indexService = () => News.find();

export default {
    store,
    indexService,
};
