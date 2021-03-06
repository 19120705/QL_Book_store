var DataTypes = require("sequelize").DataTypes;
var _ct_hoadon = require("./ct_hoadon");
var _ct_phieunhap = require("./ct_phieunhap");
var _hoadonbansach = require("./hoadonbansach");
var _khachhang = require("./khachhang");
var _loaisach = require("./loaisach");
var _nhanvien = require("./nhanvien");
var _phieunhapsach = require("./phieunhapsach");
var _phieuthutien = require("./phieuthutien");
var _quydinh = require("./quydinh");
var _sach = require("./sach");
var _tonno = require("./tonno");


function initModels(sequelize) {
  var ct_hoadon = _ct_hoadon(sequelize, DataTypes);
  var ct_phieunhap = _ct_phieunhap(sequelize, DataTypes);
  var hoadonbansach = _hoadonbansach(sequelize, DataTypes);
  var khachhang = _khachhang(sequelize, DataTypes);
  var loaisach = _loaisach(sequelize, DataTypes);
  var nhanvien = _nhanvien(sequelize, DataTypes);
  var phieunhapsach = _phieunhapsach(sequelize, DataTypes);
  var phieuthutien = _phieuthutien(sequelize, DataTypes);
  var quydinh = _quydinh(sequelize, DataTypes);
  var sach = _sach(sequelize, DataTypes);
  var tonno = _tonno(sequelize, DataTypes);

  sach.belongsTo(loaisach, {foreignKey: "LOAISACH", targetKey: 'MALOAI'});
  loaisach.hasMany(sach, {foreignKey: "LOAISACH", sourceKey: 'MALOAI'});
  

  hoadonbansach.belongsTo(khachhang, {foreignKey: "MAKH", targetKey: 'MAKH'});
  khachhang.hasMany(hoadonbansach, {foreignKey: "MAKH", sourceKey: 'MAKH'});

  ct_hoadon.belongsTo(hoadonbansach, {foreignKey: "MAHD", targetKey: 'MAHD'});
  hoadonbansach.hasMany(ct_hoadon, {foreignKey: "MAHD", sourceKey: 'MAHD'})


  phieunhapsach.belongsTo(nhanvien, {foreignKey: "NHANVIENNHAP", targetKey: 'MANV'});
  nhanvien.hasMany(phieunhapsach, {foreignKey: "NHANVIENNHAP", sourceKey: 'MANV'});

  ct_phieunhap.belongsTo(sach, {foreignKey: "MASACH", targetKey: 'MASACH'});
  sach.hasMany(ct_phieunhap, {foreignKey: "MASACH", sourceKey: 'MASACH'})

  return {
    ct_hoadon,
    ct_phieunhap,
    hoadonbansach,
    khachhang,
    loaisach,
    nhanvien,
    phieunhapsach,
    phieuthutien,
    quydinh,
    sach,
    tonno
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
