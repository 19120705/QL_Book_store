const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sach', {
    MASACH: {
      type: DataTypes.STRING(6),
      allowNull: false,
      primaryKey: true
    },
    TENSACH: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    TACGIA: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    DONGIA: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    LUONGTON: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    LOAISACH: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'loaisach',
            key: 'MaLoai'
          }
    }
  }, {
    sequelize,
    tableName: 'sach',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MASACH" },
        ]
      },
      {
        name: "FK_SACH_LOAISACH",
        using: "BTREE",
        fields: [
          { name: "MaLoai" },
        ]
      },
    ]
  });
};
