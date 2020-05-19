const { Router } = require('express');

const { PostController } = require('./app/controllers/PostController');
const { MentionController } = require('./app/controllers/MentionController');

const routes = new Router();

routes.get('/posts', PostController.index);
routes.get('/admin/mentions', MentionController.index);

module.exports = {
  routes,
};
