module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("User", {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    firebase_uid: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstSurname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    secondSurname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  User.associate = function(models) {
    User.hasMany(models.AuditVisit, { foreignKey: "userId" });
  };

  return User;
};
