const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ct_hoadon', {
    MAHD: {
      type: DataTypes.STRING(6),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'hoadon',
        key: 'MAHD'
      }
    },
    MASACH: {
      type: DataTypes.STRING(6),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'sach',
        key: 'MASACH'
      }
    },
    SOLUONG: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    DONGIA: {
        type: DataTypes.INTEGER,
        allowNull: false
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
          { name: "MAHD" },
          { name: "MASACH" },
        ]
      },
      {
        name: "FK_CT_HOADON_HOADON",
        using: "BTREE",
        fields: [
          { name: "MAHD" },
        ]
      },
      {
        name: "FK_CT_HOADON_SACH",
        using: "BTREE",
        fields: [
          { name: "MASACH" },
        ]
      },
    ]
  });
};
