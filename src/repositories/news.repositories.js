import News from '../models/News.js';

const store = (body) => News.create(body);

const index = () => News.find();

const indexPage = (limit, offset) => News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate('user');

const show = (id) => News.findById(id).populate('user');

const showLast = () => News.findOne().sort({ _id: -1 }).populate('user');

const showByTitle = (title) => News.find({
    title: { $regex: `${title || ''}`, $options: 'i' },
}).sort({ _id: -1 }).populate('user');

const userMessages = (id) => News.find({ user: id }).sort({ _id: -1 }).populate('user');

const contNews = () => News.countDocuments();

const update = (id, title, text, banner) => News.findByIdAndUpdate({ _id: id }, { title, text, banner });

const erase = (id) => News.findByIdAndDelete({ _id: id });

const like = (newsId, userId) => News.findOneAndUpdate(
    { _id: newsId, 'likes.userId': { $nin: [userId] } },
    { $push: { likes: { userId, createdAt: new Date() } } }
);

const deleteLike = (newsId, userId) => News.findOneAndUpdate(
    { _id: newsId },
    { $pull: { likes: { userId } } }
);

export default {
    store,
    index,
    indexPage,
    show,
    showLast,
    showByTitle,
    userMessages,
    contNews,
    update,
    erase,
    like,
    deleteLike,
};