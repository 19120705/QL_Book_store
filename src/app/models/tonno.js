const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tonno', {
    MAKH: {
      type: DataTypes.STRING(6),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'khachhang',
        key: 'MAKH'
      }
    },
    Ngaythang: {
      type: DataTypes.STRING(6),
      allowNull: false,
      primaryKey: true
    },
    SoNo: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tonno',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MAKH" },
          { name: "Ngaythang" },
        ]
      },
      {
        name: "FK_KHACHHANG_TONNO",
        using: "BTREE",
        fields: [
          { name: "MAKH" },
        ]
      },
    ]
  });
};
