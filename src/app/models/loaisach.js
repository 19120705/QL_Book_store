const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('loaisach', {
    MALOAI: {
      type: DataTypes.STRING(4),
      allowNull: false,
      primaryKey: true
    },
    TENLOAI: {
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
          { name: "MALOAI" },
        ]
      },
    ]
  });
};
