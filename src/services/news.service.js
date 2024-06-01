import News from '../models/News.js';

const store = (body) => News.create(body);

const indexService = (limit, offset) =>
    News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate('user');

const showService = (id) => News.findById(id).populate('user');

const showLastService = () => News.findOne().sort({ _id: -1 }).populate('user');

const contNews = () => News.countDocuments();


export default {
    store,
    indexService,
    showService,
    showLastService,
    contNews,
};
