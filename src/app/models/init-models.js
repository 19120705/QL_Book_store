var DataTypes = require("sequelize").DataTypes;
var _ct_hoadon = require("./ct_hoadon");
var _ct_phieunhap = require("./ct_phieunhap");
var _hoadon = require("./hoadon");
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
  var hoadon = _hoadon(sequelize, DataTypes);
  var khachhang = _khachhang(sequelize, DataTypes);
  var loaisach = _loaisach(sequelize, DataTypes);
  var nhanvien = _nhanvien(sequelize, DataTypes);
  var phieunhapsach = _phieunhapsach(sequelize, DataTypes);
  var phieuthutien = _phieuthutien(sequelize, DataTypes);
  var quydinh = _quydinh(sequelize, DataTypes);
  var sach = _sach(sequelize, DataTypes);
  var tonno = _tonno(sequelize, DataTypes);
  // Sửa từ đây nha----------------------
/*
  phieumua.belongsToMany(sach, { as: 'MASACH_saches', through: ct_phieumua, foreignKey: "MAPM", otherKey: "MASACH" });
  phieunhap.belongsToMany(sach, { as: 'MASACH_sach_ct_phieunhaps', through: ct_phieunhap, foreignKey: "MAPN", otherKey: "MASACH" });
  sach.belongsToMany(phieumua, { as: 'MAPM_phieumuas', through: ct_phieumua, foreignKey: "MASACH", otherKey: "MAPM" });
  sach.belongsToMany(phieunhap, { as: 'MAPN_phieunhaps', through: ct_phieunhap, foreignKey: "MASACH", otherKey: "MAPN" });
  sach.belongsToMany(theloai, { as: 'maTL_theloais', through: theloaiofsach, foreignKey: "masach", otherKey: "maTL" });
  theloai.belongsToMany(sach, { as: 'masach_saches', through: theloaiofsach, foreignKey: "maTL", otherKey: "masach" });
  nodatra.belongsTo(khachhang, { as: "MAKH_khachhang", foreignKey: "MAKH"});
  khachhang.hasMany(nodatra, { as: "nodatras", foreignKey: "MAKH"});
  nophaitra.belongsTo(khachhang, { as: "MAKH_khachhang", foreignKey: "MAKH"});
  khachhang.hasMany(nophaitra, { as: "nophaitras", foreignKey: "MAKH"});
  phieumua.belongsTo(khachhang, { as: "MAKH_khachhang", foreignKey: "MAKH"});
  khachhang.hasMany(phieumua, { as: "phieumuas", foreignKey: "MAKH"});
  tonno.belongsTo(khachhang, { as: "MAKH_khachhang", foreignKey: "MAKH"});
  khachhang.hasMany(tonno, { as: "tonnos", foreignKey: "MAKH"});
  nophaitra.belongsTo(nhanvien, { as: "MANV_nhanvien", foreignKey: "MANV"});
  nhanvien.hasMany(nophaitra, { as: "nophaitras", foreignKey: "MANV"});
  phieumua.belongsTo(nhanvien, { as: "MANV_nhanvien", foreignKey: "MANV"});
  nhanvien.hasMany(phieumua, { as: "phieumuas", foreignKey: "MANV"});
  phieunhap.belongsTo(nhanvien, { as: "MANV_nhanvien", foreignKey: "MANV"});
  nhanvien.hasMany(phieunhap, { as: "phieunhaps", foreignKey: "MANV"});
  sach.belongsTo(nxb, { as: "manxb_nxb", foreignKey: "manxb"});
  nxb.hasMany(sach, { as: "saches", foreignKey: "manxb"});
  ct_phieumua.belongsTo(phieumua, { as: "MAPM_phieumua", foreignKey: "MAPM"});
  phieumua.hasMany(ct_phieumua, { as: "ct_phieumuas", foreignKey: "MAPM"});
  ct_phieunhap.belongsTo(phieunhap, { as: "MAPN_phieunhap", foreignKey: "MAPN"});
  phieunhap.hasMany(ct_phieunhap, { as: "ct_phieunhaps", foreignKey: "MAPN"});
  ct_phieumua.belongsTo(sach, { as: "MASACH_sach", foreignKey: "MASACH"});
  sach.hasMany(ct_phieumua, { as: "ct_phieumuas", foreignKey: "MASACH"});
  ct_phieunhap.belongsTo(sach, { as: "MASACH_sach", foreignKey: "MASACH"});
  sach.hasMany(ct_phieunhap, { as: "ct_phieunhaps", foreignKey: "MASACH"});
  theloaiofsach.belongsTo(sach, { as: "masach_sach", foreignKey: "masach"});
  sach.hasMany(theloaiofsach, { as: "theloaiofsaches", foreignKey: "masach"});
  tonkho.belongsTo(sach, { as: "masach_sach", foreignKey: "masach"});
  sach.hasMany(tonkho, { as: "tonkhos", foreignKey: "masach"});
  theloaiofsach.belongsTo(theloai, { as: "maTL_theloai", foreignKey: "maTL"});
  theloai.hasMany(theloaiofsach, { as: "theloaiofsaches", foreignKey: "maTL"});
*/
  return {
    ct_hoadon,
    ct_phieunhap,
    hoadon,
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
