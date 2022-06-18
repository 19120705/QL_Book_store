const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('quydinh', {
    SoLuongNhapMin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    LuongTonMinTruocNhap: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    TienNoMax: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    LuongTonMinSauBan: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'quydinh',
    timestamps: false,
    indexes:[{
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "SoLuongNhapMin" },
      ]
    }
    ]
  });
};
