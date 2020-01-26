module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("User", {
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

  return User;
};
