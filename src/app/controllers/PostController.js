const { Op } = require('sequelize');
const { Post } = require('../models/Post');

class PostController {
  async index(req, res) {
    const { query } = req;
    const where = {};

    if (query.from) {
      where.author = query.from;
    }

    if (query.id) {
      where.id = query.id;
    }

    if (query.content) {
      where.content_full = { [Op.like]: `%${query.content}%` };
    }

    if (query.topic) {
      where.link = { [Op.like]: `%topic=${query.topic}.msg%` };
    }

    const attributes = ['id', 'title', 'date', 'author', 'link'];

    if (parseInt(query.html, 10) === 1) {
      attributes.push('content_full');
    } else {
      attributes.push('content');
    }

    const posts = await Post.findAll({
      limit: 15,
      attributes,
      where,
      order: [['id', 'DESC']],
    });

    return res.json(posts);
  }
}

module.exports = {
  PostController: new PostController(),
};
