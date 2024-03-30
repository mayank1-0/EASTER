module.exports = (sequelize, Sequelize) => {
  const LanguageModel = sequelize.define("Languages", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      unique: true
    },
    language: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
      // unique: true,
    }
  });

  return LanguageModel;
};
