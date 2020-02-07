module.exports = function(sequelize, DataTypes) {
  const AuditVisit = sequelize.define("AuditVisit", {
    auditVisitId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    auditId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });

  AuditVisit.associate = function(models) {
    AuditVisit.belongsTo(models.Audit, { foreignKey: "auditId" });
    AuditVisit.belongsTo(models.User, { foreignKey: "userId" });
  };

  return AuditVisit;
};
