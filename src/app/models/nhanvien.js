const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('nhanvien', {
    MANV: {
      type: DataTypes.STRING(6),
      allowNull: false,
      primaryKey: true
    },
    TENNV: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
    PASSWORD: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    DIACHI: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    GIOITINH: {
      type: DataTypes.STRING(4),
      allowNull: false
    },
    EMAIL: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    SDT: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    LOAINV: {
      type: DataTypes.STRING(10),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'nhanvien',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MANV" },
        ]
      },
    ]
  });
};
