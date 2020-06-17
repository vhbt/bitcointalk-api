require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const LogSchema = new mongoose.Schema(
  {
    timestamp: {
      type: Date,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    meta: {
      type: {
        type: String,
        required: true,
      },
      process: {
        type: String,
        required: true,
      },
      chat_id: {
        type: Number,
      },
    },
  },
  { collection: 'log' }
);

module.exports = {
  Log: mongoose.model('Log', LogSchema),
};
