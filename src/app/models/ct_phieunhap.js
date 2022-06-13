const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ct_phieunhap', {
    MAPNS: {
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
    }
  }, {
    sequelize,
    tableName: 'ct_phieunhap',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MAPNS" },
          { name: "MASACH" },
        ]
      },
      {
        name: "FK_CTPNHAP_PNHAP",
        using: "BTREE",
        fields: [
          { name: "MAPNS" },
        ]
      },
      {
        name: "FK_CTPNHAP_SACH",
        using: "BTREE",
        fields: [
          { name: "MASACH" },
        ]
      },
    ]
  });
};
