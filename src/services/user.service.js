const User = require('../models/User');

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

module.exports = {
    storeService,
    indexService,
    showService,
    updateService,
}