const { Sequelize, DataTypes, Model } = require('sequelize');
const databaseConfig = require('../../config/database');

const sequelize = new Sequelize(databaseConfig.url, databaseConfig);

class Topic extends Model {}

Topic.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tracking: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: [],
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Topic',
  }
);

module.exports = {
  Topic,
};
