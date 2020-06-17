require('dotenv').config();
const { Op } = require('sequelize');
const { Topic } = require('../models/Topic');
const { Mention } = require('../models/Mention');

class TopicController {
  async index(req, res) {
    const topics = await Topic.findAndCountAll({
      order: [['id', 'DESC']],
    });

    const topicsTracking = await Promise.all(
      topics.rows.map(async (topic) => {
        const tracking = topic.tracking.length
          ? await Mention.findAll({
              where: {
                chat_id: {
                  [Op.in]: topic.tracking,
                },
              },
            })
          : [];

        return {
          author: topic.author,
          id: topic.id,
          link: topic.link,
          title: topic.title,
          tracking,
        };
      })
    );

    return res.json(topicsTracking);
  }
}

module.exports = {
  TopicController: new TopicController(),
};
