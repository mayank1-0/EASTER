// models/Author.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const Book = require('./Book');

const Author = sequelize.define('Author', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Define other columns...
});

Author.hasMany(Book); // An author can have many books

module.exports = Author;
