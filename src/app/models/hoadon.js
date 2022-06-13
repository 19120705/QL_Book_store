const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('hoadon', {
    MAHD: {
      type: DataTypes.STRING(6),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'hoadon',
        key: 'MAHD'
      }
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
    tableName: 'ct_hoadon',
    hasTrigger: true,
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
