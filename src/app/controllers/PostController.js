const { Op } = require('sequelize');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const { Post } = require('../models/Post');

dayjs.extend(utc);

class PostController {
  async index(req, res) {
    const { query } = req;
    const where = {};
    const page = query.page || 1;
    const limit = query.limit || 15;
    const offset = Math.max(limit * (page - 1), 0);

    if (query.author) {
      where.author = query.author;
    }

    if (query.id && !Number.isNaN(Number(query.id))) {
      where.id = query.id;
    }

    if (query.content) {
      where.content_full = { [Op.iLike]: `%${query.content}%` };
    } else if (query.exact) {
      where.content_full = query.exact;
    }

    if (query.topic) {
      where.link = { [Op.like]: `%topic=${query.topic}.msg%` };
    }

    if (query.from || query.to) {
      where.date = {
        [Op.between]: [
          dayjs.utc(query.from).toISOString(),
          query.to
            ? dayjs.utc(query.to).toISOString()
            : dayjs.utc().toISOString(),
        ],
      };
    }

    const attributes = [
      'id',
      'title',
      'date',
      'author',
      'link',
      'content_full',
    ];

    const posts = await Post.findAndCountAll({
      limit,
      attributes,
      where,
      order: [['id', 'DESC']],
      offset,
    });

    return res.json(posts);
  }
}

module.exports = {
  PostController: new PostController(),
};
