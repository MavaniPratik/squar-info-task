

const { Sequelize, DataTypes } = require("sequelize")

const sequelize = new Sequelize("pratik", "root", "pratik147789", {
    host: "localhost",
    dialect: "mysql",
    logging: false
})


try {
    sequelize.authenticate
    console.log("database connected successfully")
} catch (error) {
    console.log(error)
}


const db = {}

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.user = require("./user")(sequelize, DataTypes)

db.sequelize.sync({ force: false })
module.exports = db