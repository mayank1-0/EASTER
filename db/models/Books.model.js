module.exports = (sequelize, Sequelize) => {
  const BooksModel = sequelize.define("Books", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      unique: true
    },
    author: {
      type: Sequelize.STRING
    },
    title: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING
    },
    publisher: {
      type: Sequelize.STRING
    },
    year: {
      type: Sequelize.INTEGER
    },
    languages: {
      type: Sequelize.STRING
    },
    genre: {
      type: Sequelize.STRING
    },
    borrowed: {
      type: Sequelize.BOOLEAN
    }
  });

  return BooksModel;
};
