module.exports = function(sequelize, DataTypes) {
  const Workplan = sequelize.define("Workplan", {
    workplanId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  Workplan.associate = function(models) {
    Workplan.hasMany(models.WorkplanAnswer, { foreignKey: "workplanId" });
  };

  return Workplan;
};
