const { Router } = require('express');

const { PostController } = require('./app/controllers/PostController');
const { MentionController } = require('./app/controllers/MentionController');
const { TopicController } = require('./app/controllers/TopicController');
const { AuthController } = require('./app/controllers/AuthController');
const { LogController } = require('./app/controllers/LogController');
const { AddressController } = require('./app/controllers/AddressController');

const routes = new Router();

const { auth } = require('./app/services/Auth');

routes.get('/posts', PostController.index);

routes.get('/addresses', AddressController.index);

routes.post('/admin/auth', AuthController.create);
routes.post('/admin/mentions', auth, MentionController.index);
routes.post('/admin/topics', auth, TopicController.index);

routes.post('/admin/logs', auth, LogController.index);

module.exports = {
  routes,
};
