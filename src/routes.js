const { Router } = require('express');

const { PostController } = require('./app/controllers/PostController');

const routes = new Router();

routes.get('/posts', PostController.index);

module.exports = {
  routes,
};
