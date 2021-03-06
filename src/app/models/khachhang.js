const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('khachhang', {
    MAKH: {
      type: DataTypes.STRING(6),
      allowNull: false,
      primaryKey: true
    },
    HOTEN: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    DIACHI: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    SDT: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    EMAIL: {
      type: DataTypes.STRING(30),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'khachhang',
    hasTrigger: true,
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MAKH" },
        ]
      },
    ]
  });
};
