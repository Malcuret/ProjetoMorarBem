require('dotenv').config();

const baseConfig = {
  use_env_variable: 'DATABASE_URL',
  dialect: 'postgres',
  logging: false,
  dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }
};

module.exports = { development: baseConfig, production: baseConfig };
