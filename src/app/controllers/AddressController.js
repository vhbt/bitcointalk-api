// const { Post } = require('../models/Post');
const { Address } = require('../schemas/Address');

class AddressController {
  async index(req, res) {
    const addresses = await Address.aggregate([
      {
        $group: {
          _id: '$address',
          author: { $addToSet: '$author' },
          entries: { $push: { post_id: '$post_id', author: '$author' } },
        },
      },
    ]);

    return res.json(addresses);
  }
}

module.exports = {
  AddressController: new AddressController(),
};
