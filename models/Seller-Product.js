const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Product = sequelize.define("Seller-Products", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  price: Sequelize.INTEGER,
  productname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Product;
