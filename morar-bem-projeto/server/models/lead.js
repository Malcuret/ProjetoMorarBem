'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lead extends Model {}
  Lead.init({
    codigo_imovel: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
    telefone: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } }
  }, { sequelize, modelName: 'Lead' });
  return Lead;
};
