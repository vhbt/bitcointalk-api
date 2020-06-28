require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const AddressSchema = new mongoose.Schema(
  {
    coin: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    post_id: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = {
  Address: mongoose.model('Address', AddressSchema),
};
