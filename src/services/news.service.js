import News from '../models/News.js';

const store = (body) => News.create(body);

const indexService = (limit, offset) =>
    News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate('user');

const showService = () => News.findOne().sort({ _id: -1 }).populate('user');

const contNews = () => News.countDocuments();


export default {
    store,
    indexService,
    showService,
    contNews,
};
