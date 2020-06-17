const { Log } = require('../schemas/Log');

class LogController {
  async index(req, res) {
    const { query } = req;

    const logs = await Log.find(query).sort({ timestamp: 'desc' }).limit(100);

    return res.json(logs);
  }
}

module.exports = {
  LogController: new LogController(),
};
