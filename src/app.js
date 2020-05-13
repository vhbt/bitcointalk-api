const express = require('express');
const cors = require('cors');
const RateLimit = require('express-rate-limit');
const { routes } = require('./routes');

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());

    if (process.env.NODE_ENV !== 'development') {
      this.server.use(
        new RateLimit({
          windowMs: 1 * 60 * 1000,
          max: 20,
        })
      );
    }
  }

  routes() {
    this.server.use(routes);
  }
}

module.exports = {
  app: new App().server,
};
