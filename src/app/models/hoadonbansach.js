const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('hoadobansach', {
    MAHD: {
      type: DataTypes.STRING(6),
      allowNull: false,
      primaryKey: true,
    },
    TONGTIEN: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    NGAYLAPHOADON: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    MAKH: {
        type: DataTypes.STRING(6),
        allowNull: true,
        references: {
            model: 'khachhang',
            key: 'MAKH'
        }
    },
    MANV: {
        type: DataTypes.STRING(6),
        allowNull: true,
        references: {
            model: 'nhanvien',
            key: 'MANV'
        }
    }
  }, {
    sequelize,
    tableName: 'hoadonbansach',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MAHD" }
        ]
      },
      {
        name: "FK_HOADON_KHACHHANG",
        using: "BTREE",
        fields: [
          { name: "MAKH" },
        ]
      },
      {
        name: "FK_HOADON_NHANVIEN",
        using: "BTREE",
        fields: [
          { name: "MANV" },
        ]
      },
    ]
  });
};
