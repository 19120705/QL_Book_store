const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('phieunhapsach', {
    MAPNS: {
      type: DataTypes.STRING(6),
      allowNull: false,
      primaryKey: true
    },
    NhanVienNhap: {
        type: DataTypes.STRING(6),
        allowNull: true,
        references: {
          model: 'nhanvien',
          key: 'MANV'
        }
    },
    NGAYNHAP: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
  
  }, {
    sequelize,
    tableName: 'phieunhapsach',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MAPNS" },
        ]
      },
      {
        name: "FK_PHIEUNS_NHANVIEN",
        using: "BTREE",
        fields: [
          { name: "MANV" },
        ]
      },
    ]
  });
};
