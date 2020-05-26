require('dotenv').config();
const { Mention } = require('../models/Mention');

class MentionController {
  async index(req, res) {
    const mentions = await Mention.findAndCountAll({ order: [['id', 'DESC']] });

    return res.json(mentions);
  }
}

module.exports = {
  MentionController: new MentionController(),
};
