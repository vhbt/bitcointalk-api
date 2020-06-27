const { Address } = require('../schemas/Address');

class AddressController {
  async index(req, res) {
    const limit = Number(req.body.limit) || 20;
    const page = Number(req.body.page) || 1;
    const skip = (page - 1) * limit;

    const { address, username, multiples, multiAddresses } = req.body;

    const search = {};

    if (multiples) search.mentions = { $not: { $size: 1 } };
    if (address) search.address = address;
    if (username) search['mentions.author'] = username;

    if (multiAddresses) {
      search.address = { $in: multiAddresses };
    }

    const addresses = await Address.find(search)
      .skip(skip)
      .select({ createdAt: 0, updatedAt: 0, __v: 0, _id: 0, 'mentions._id': 0 })
      .limit(limit);

    return res.json({ count: addresses.length, rows: addresses });
  }
}

module.exports = {
  AddressController: new AddressController(),
};
