// models/Book.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const Author = require('./Author');
const Genre = require('./Genre');
const Language = require('./Language');

const Book = sequelize.define('Book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  // Define other columns...
});

Book.belongsTo(Author); // A book belongs to an author
Book.belongsTo(Genre); // A book belongs to a genre
Book.belongsTo(Language); // A book belongs to a language

module.exports = Book;
