import News from '../models/News.js';

const store = (body) => News.create(body);

const indexService = () => News.find();

const indexPageService = (limit, offset) => News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate('user');

const showService = (id) => News.findById(id).populate('user');

const showLastService = () => News.findOne().sort({ _id: -1 }).populate('user');

const showByTitleService = (title) => News.find({
    title: { $regex: `${title || ''}`, $options: 'i' },
}).sort({ _id: -1 }).populate('user');

const userMessagesService = (id) => News.find({ user: id }).sort({ _id: -1 }).populate('user');

const contNews = () => News.countDocuments();

const updateService = (id, title, text, banner) => News.findByIdAndUpdate({ _id: id }, { title, text, banner });

export default {
    store,
    indexService,
    indexPageService,
    showService,
    showLastService,
    showByTitleService,
    userMessagesService,
    contNews,
    updateService,
};
