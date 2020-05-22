require('dotenv').config();
const { Topic } = require('../models/Topic');

class TopicController {
  async index(req, res) {
    const { key } = req.query;

    if (key !== process.env.APP_ADMIN_KEY || !process.env.APP_ADMIN_KEY)
      return res.status(401).json({
        type: 'error',
        value: 'Unauthorized.',
      });

    const topics = await Topic.findAndCountAll({ order: [['id', 'DESC']] });

    return res.json(topics);
  }
}

module.exports = {
  TopicController: new TopicController(),
};
