const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('loaisach', {
    MaLoai: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    TenLoai: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'loaisach',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MaLoai" },
        ]
      },
    ]
  });
};
