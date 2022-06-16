const { models } = require("../../config/db");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

exports.list = (title, page, itemPerPage) => {
  var condition = '';
    if (title) {
      condition = title;
    }
    return models.nhanvien.findAndCountAll({
        where: {
          MANV :{
              [Op.like]: '%' + condition + '%',
          }
        },
        offset: page * itemPerPage,
        limit: itemPerPage,
        raw: true,
    });
};

exports.add = async (req) => {
    if (req.body.PASS !== req.body.REPASS) {
        return "wrong password";
    }
    req.body.MANV = await genKeyAccount(req.body.LOAINV);
    req.body.PASS = await bcrypt.hash(req.body.PASS, 10);
    await models.nhanvien.create({
        MANV: req.body.MANV,
        TENNV: req.body.TENNV,
        PASSWORD: req.body.PASS,
        DIACHI: req.body.DIACHI,
        GIOITINH: req.body.GIOITINH,
        EMAIL: req.body.EMAIL,
        SDT: req.body.SDT,
        LOAINV: req.body.LOAINV,
    });
    return "add success";
};

genKeyAccount = async (role) => {
    var accounts = await models.nhanvien.findAll({paranoid: false,});
    var i = 1;
    var check = true;
    var str;
    while (true) {
        check = true;
        str = "" + i;
        while (str.length < 3) {
            str = 0 + str;
        }
        s_key = role + str;
        for (let index = 0; index < accounts.length; index++) {
            if (accounts[index]["MANV"] === s_key) {
                check = false;
                break;
            }
        }
        if (check) {
            return s_key;
        }
        i++;
    }
};

exports.softDelete = async (req) => {
    await models.nhanvien.destroy({
        where: {
            MANV: req.params.id,
        },
    });
};

exports.countBin = () => {
    return models.nhanvien.count({
        where: {
            deletedAt: {
                [Op.ne]: null,
            },
        },
        paranoid: false,
    });
};

exports.binList = (title, page, itemPerPage) => {
    var condition = '';
    if (title) {
      condition = title;
    }
    return models.nhanvien.findAndCountAll({
        where: {
            deletedAt: {
                [Op.ne]: null,
            },
            MANV :{
                [Op.like]: '%' + condition + '%',
            }
        },
        paranoid: false,
        offset: page * itemPerPage,
        limit: itemPerPage,
        raw: true,
    });
};

exports.destroyDelete = async (manv) => {
  var Nhanvien = await models.nhanvien.findOne({ where: { MANV: manv } ,paranoid: false });
  return await models.nhanvien.destroy({ 
    where: {MANV : manv},
    force: true,
  });
};

exports.Restore = async (manv) => {
  return await models.nhanvien.restore({
    where: {
      MANV: manv,
    },
  });
};

exports.getInfor= async (manv) =>{
    return await models.nhanvien.findOne({ where: { MANV: manv } , raw : true});
}

exports.resetPass = async (manv) =>{
    const nhanvien =  await models.nhanvien.findOne({ where: { MANV: manv }, raw : true});
    var password = await bcrypt.hash(nhanvien.SDT, 10)
    await models.nhanvien.update({PASS : password},
                                 { where: { MANV: manv }});
}