module.exports = function(sequelize, DataTypes) {
  const Survey = sequelize.define("Survey", {
    surveyId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  Survey.associate = function(models) {
    Survey.hasMany(models.SurveyAnswer, { foreignKey: "surveyId" });
  };

  return Survey;
};
