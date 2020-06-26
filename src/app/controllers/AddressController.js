// const { Post } = require('../models/Post');
const { Address } = require('../schemas/Address');

class AddressController {
  async index(req, res) {
    const limit = Number(req.query.limit) || 100;
    const page = Number(req.query.page) || 1;

    const skip = page * (limit - 1);

    const addresses = await Address.find({}).skip(skip).limit(limit);

    return res.json(addresses);
  }
}

module.exports = {
  AddressController: new AddressController(),
};
