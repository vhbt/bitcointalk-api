require('dotenv').config();

module.exports = {
  dialect: 'postgres',
  url: process.env.DATABASE_URL,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
  dialectOptions: {
    useUTC: true,
  },
  timezone: '+00:00',
  logging: false,
};
