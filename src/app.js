require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const RateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const { routes } = require('./routes');

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(helmet());
    this.server.use(morgan('tiny'));
    this.server.use(bodyParser.json());
    this.server.use(
      cors(
        process.env.NODE_ENV !== 'development'
          ? { origin: process.env.FRONT_APP_URL }
          : null
      )
    );

    if (process.env.NODE_ENV !== 'development') {
      this.server.use(
        new RateLimit({
          windowMs: 1 * 60 * 1000,
          max: 40,
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
