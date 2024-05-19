import User from '../models/User.js';

const storeService = (body) => User.create(body);

const indexService = () => User.find();

const showService = (id) => User.findById(id);

const updateService = (
    id,
    name,
    username,
    email,
    password,
    avatar,
    background,
) => User.findOneAndUpdate(
    { _id: id },
    {
        name,
        username,
        email,
        password,
        avatar,
        background,
    });

export default {
    storeService,
    indexService,
    showService,
    updateService,
}