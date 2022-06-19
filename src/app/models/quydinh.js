const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('quydinh', {
    ID:{
      type: DataTypes.STRING(6),
      allowNull: false,
      primaryKey: true
    },
    SoLuongNhapMin: {
      type: DataTypes.INTEGER,
      allowNull: true
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
    indexes: [
    ]
  });
};
