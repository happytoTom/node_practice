const Sequelize = require("sequelize");
module.exports.initModel = async (sequelize) => {
  // ##BEGIN## 代码已加密
  // 暗号:哈希算法
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  const Product = sequelize.define("product", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    attributes: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });
  User.Product = User.belongsToMany(Product, {
    through: "Product",
  });
  await sequelize.sync({ force: false });
  // ##END##
  return { User, Product };
};
