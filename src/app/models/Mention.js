const { Sequelize, DataTypes, Model } = require('sequelize');
const databaseConfig = require('../../config/database');

const sequelize = new Sequelize(databaseConfig.url, databaseConfig);

class Mention extends Model {}

Mention.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    chat_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    enable_mentions: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uid: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    enable_merits: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alt_username: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Mention',
  }
);

module.exports = {
  Mention,
};
