require('dotenv').config();
const jwt = require('jsonwebtoken');

class AuthController {
  async create(req, res) {
    const { ADMIN_PASSWORD } = process.env;
    const { password } = req.body;

    if (!ADMIN_PASSWORD || !password) {
      return res.status(401).json({ type: 'error', message: 'Unauthorized.' });
    }

    if (ADMIN_PASSWORD !== password) {
      return res.status(401).json({ type: 'error', message: 'Unauthorized.' });
    }

    const token = jwt.sign({ key: password }, process.env.APP_KEY);

    return res.json({ type: 'success', message: { token } });
  }
}

module.exports = {
  AuthController: new AuthController(),
};
