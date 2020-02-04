module.exports = function(sequelize, DataTypes) {
  const Balanza = sequelize.define("Balanza", {
    balanzaId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    auditId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    month: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cuentaContable: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cuentaDescripción: {
      type: DataTypes.STRING,
      allowNull: false
    },
    saldoInicial: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    cargos: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    abonos: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    saldoFinal: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  });

  Balanza.associate = function(models) {
    Balanza.belongsTo(models.Audit, { foreignKey: "auditId" });
  };

  return Balanza;
};
