import User from '../models/User.js';

const storeRepository = (
    {
        name,
        username,
        email,
        password,
        avatar,
        background
    }) => User.create({
        name,
        username,
        email,
        password,
        avatar,
        background
    });

const indexRepository = () => User.find();

const showRepository = (id) => User.findById(id);

const updateRepository = (
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
    storeRepository,
    indexRepository,
    showRepository,
    updateRepository,
}