require('dotenv').config();
const { Topic } = require('../models/Topic');

class TopicController {
  async index(req, res) {
    const topics = await Topic.findAndCountAll({ order: [['id', 'DESC']] });

    return res.json(topics);
  }
}

module.exports = {
  TopicController: new TopicController(),
};
