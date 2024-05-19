const User = require('../models/User');

const createService = (body) => User.create(body);

const indexService = () => User.find();

const showService = (id) => User.findById(id);

module.exports = {
    createService,
    indexService,
    showService,
}