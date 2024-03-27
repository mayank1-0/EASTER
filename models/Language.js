// models/Language.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const Book = require('./Book');

const Language = sequelize.define('Language', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Define other columns...
});

Language.hasMany(Book); // A language can have many books

module.exports = Language;
