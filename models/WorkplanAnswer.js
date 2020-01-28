module.exports = function(sequelize, DataTypes) {
  const WorkplanAnswer = sequelize.define("WorkplanAnswer", {
    workplanAnswerId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    auditId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    workplanId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isDone: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });

  WorkplanAnswer.associate = function(models) {
    WorkplanAnswer.belongsTo(models.Audit, { foreignKey: "auditId" });
    WorkplanAnswer.belongsTo(models.Workplan, { foreignKey: "workplanId" });
  };

  return WorkplanAnswer;
};
