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
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    year: {
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
    rubro: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cuentaDescripción: {
      type: DataTypes.STRING,
      allowNull: false
    },
    saldoInicial: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    cargos: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    abonos: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    saldoFinal: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  });

  Balanza.associate = function(models) {
    Balanza.belongsTo(models.Audit, { foreignKey: "auditId" });
    Balanza.belongsTo(models.Client, { foreignKey: "clientId" });
  };

  return Balanza;
};
