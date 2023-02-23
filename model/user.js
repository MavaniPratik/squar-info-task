
module.exports = (sequelize, DataTypes) => {


  const user = sequelize.define("user", {
    firstName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dateofBirth: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    confirmpassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tokens: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {
    timestamps: false,
    modelName: "user"
  }
  )

  return user
}