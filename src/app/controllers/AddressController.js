// const { Post } = require('../models/Post');
const { Address } = require('../schemas/Address');

class AddressController {
  async index(req, res) {
    const limit = Number(req.query.limit) || 100;
    const page = Number(req.query.page) || 1;
    const skip = (page - 1) * limit;

    const { address } = req.query;

    const search = {};
    search.mentions = { $not: { $size: 1 } };

    if (address) search.address = address;

    const addresses = await Address.find(search).skip(skip).limit(limit);

    return res.json(addresses);
  }
}

module.exports = {
  AddressController: new AddressController(),
};
