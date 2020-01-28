module.exports = function(sequelize, DataTypes) {
  const Audit = sequelize.define("Audit", {
    auditId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: {
        msg: "ERROR => Una Auditoría con ese mismo nombre ya existe"
      }
    },
    year: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    hasBalanza: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    hasNómina: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  });

  Audit.associate = function(models) {
    Audit.belongsTo(models.Client, { foreignKey: "clientId" });
    Audit.hasMany(models.WorkplanAnswer);
  };

  return Audit;
};
