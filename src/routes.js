const { Router } = require('express');

const { PostController } = require('./app/controllers/PostController');
const { MentionController } = require('./app/controllers/MentionController');
const { TopicController } = require('./app/controllers/TopicController');

const routes = new Router();

routes.get('/posts', PostController.index);
routes.get('/admin/mentions', MentionController.index);
routes.get('/admin/topics', TopicController.index);

module.exports = {
  routes,
};
