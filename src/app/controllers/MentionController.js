require('dotenv').config();
const { Mention } = require('../models/Mention');

class MentionController {
  async index(req, res) {
    const { key } = req.query;

    if (key !== process.env.APP_ADMIN_KEY)
      return res.status(401).json({
        type: 'error',
        value: 'Unauthorized',
      });

    const mentions = await Mention.findAndCountAll({ order: [['id', 'DESC']] });

    return res.json(mentions);
  }
}

module.exports = {
  MentionController: new MentionController(),
};
