const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('phieuthutien', {
    MAPTT: {
      type: DataTypes.STRING(6),
      allowNull: false,
      primaryKey: true
    },
    NGAYTHUTIEN: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    SOTIENTHU: {
        type: DataTypes.INTEGER,
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
    tableName: 'phieuthutien',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MAPTT" },
        ]
      },
      {
        name: "FK_PTHUTIEN_KHACHHANG",
        using: "BTREE",
        fields: [
          { name: "MAKH" },
        ]
      },
      {
        name: "FK_PTHUTIEN_NHANVIEN",
        using: "BTREE",
        fields: [
          { name: "MANV" },
        ]
      },
    ]
  });
};
