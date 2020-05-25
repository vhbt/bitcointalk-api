const { Op } = require('sequelize');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const { Post } = require('../models/Post');

dayjs.extend(utc);

class PostController {
  async index(req, res) {
    const { query } = req;
    const limit = Math.min(query.limit || 30, 50);
    const startId = !Number.isNaN(Number(query.startId))
      ? Number(query.startId)
      : 1;
    let where = {};

    if (query.author) {
      where.author = query.author;
    }

    if (query.id && !Number.isNaN(Number(query.id)) && query.id < 2147483647) {
      where.id = query.id;
    }

    if (query.content) {
      where.content_full = { [Op.iLike]: `%${query.content}%` };
    } else if (query.exact) {
      where.content_full = query.exact;
    }

    if (query.topic) {
      where.link = {
        [Op.like]: `https://bitcointalk.org/index.php?topic=${query.topic}.msg%`,
      };
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

    if (startId !== 0) {
      where = {
        ...where,
        [Op.and]: !query.id ? { id: { [Op.lt]: startId } } : {},
      };
    }

    const posts = await Post.findAll({
      attributes,
      where,
      order: [['id', 'DESC']],
      limit,
    });

    let lastPost = posts.length ? posts[posts.length - 1].id : 0;

    if (posts.length < limit) {
      lastPost = -1;
    }

    return res.json({ last: lastPost, rows: posts });
  }
}

module.exports = {
  PostController: new PostController(),
};
