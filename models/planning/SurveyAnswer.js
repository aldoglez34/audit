module.exports = function(sequelize, DataTypes) {
  const SurveyAnswer = sequelize.define("SurveyAnswer", {
    surveyAnswerId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    auditId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    surveyId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  SurveyAnswer.associate = function(models) {
    SurveyAnswer.belongsTo(models.Audit, { foreignKey: "auditId" });
    SurveyAnswer.belongsTo(models.Survey, { foreignKey: "surveyId" });
  };

  return SurveyAnswer;
};
