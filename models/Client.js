module.exports = function(sequelize, DataTypes) {
  const Client = sequelize.define("Client", {
    clientId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: {
        msg: "ERROR => El nombre de este Cliente ya existe"
      }
    },
    abbreviation: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: {
        msg: "ERROR => Esta abreviatura ya está asignada a otro Cliente"
      }
    },
    rfc: {
      type: DataTypes.STRING(12),
      allowNull: false,
      validate: {
        len: [12, 12]
      },
      unique: {
        msg: "ERROR => Este RFC ya está asignado a otro Cliente"
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Client.associate = function(models) {
    Client.hasMany(models.Audit, { foreignKey: "clientId" });
  };

  return Client;
};
