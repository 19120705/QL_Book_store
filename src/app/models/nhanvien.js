const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('nhanvien', {
    MANV: {
      type: DataTypes.STRING(6),
      allowNull: false,
      primaryKey: true
    },
    TenNV: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
    PASS: {
      type: DataTypes.STRING(10),
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
