const { models } = require("../../config/db");
const { Op } = require("sequelize");

exports.getBooks = async() => {
 return await models.sach.findAll({})
}
exports.getSach = async(masach) => {
    return await models.sach.findOne({
        where: {
            MASACH: masach
        },
        raw : true 
    })
}
exports.getlistCust = async() => {
    return await models.khachhang.findAll({raw: true})
}
exports.genImportCartID = async () => {
    var importcart = await models.ct_phieunhap.findAll({paranoid: false,});
    var i = 1;
    var check = true;
    var str = '';
    while (str.length < 4) {
      str = 0 + str;
    }
    while (true) {
      check = true;
      s_key = str + i;
      for (let index = 0; index < importcart.length; index++) {
        if (books[index]['MASACH'] === s_key) {
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

exports.list = async () => {
    return models.ct_phieunhap.findAndCountAll({
        include: [{
            model: models.sach,
        }],
        raw: true,
    })
  }

exports.store = async(req) => {
    const h =  await models.ct_phieunhap.findOrCreate({
        where: {
            MAPNS: req.params.id,
            MASACH: req.body.MASACH,
            SOLUONG: req.body.SOLUONG
        }
    });
    return h;
}
exports.getquantityBook = async(masach) => {
    let date=new Date;
    var month=date.getFullYear().toString()+"-"+('0' + (date.getMonth()+1).toString()).slice(-2);
    month=month.split("-");
    month=month.join('');
    return await models.tonkho.findOne({where: { 
        masach: masach,
        NGAYTHANG:month,
    },raw: true})
}