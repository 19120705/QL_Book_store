const {models, sequelize} = require('../../config/db')
const { Op } = require("sequelize");

exports.list = (title,Month,page, itemPerPage) => {
    var condition = "";
    var secondCondition="";
    if (title) {
        condition = title;
    }
    if (Month){
        secondCondition=Month.split('-');
    }
    return models.phieunhapsach.findAndCountAll({
        include: [{
            model: models.nhanvien,
        }],
        where: {
            [Op.and]: [
                {
                    [Op.and]: [
                        sequelize.where(sequelize.fn('YEAR', sequelize.col('`phieunhapsach`.`NGAYNHAPSACH`')), secondCondition[0]),
                        sequelize.where(sequelize.fn('MONTH', sequelize.col('`phieunhapsach`.`NGAYNHAPSACH`')), secondCondition[1])
                    ]
                },
                {
                    MAPNS: {
                        [Op.like]: "%" + condition + "%",
                    },
                },
            ],
        },
        offset: page * itemPerPage,
        limit: itemPerPage,
        raw: true,
    });
};

exports.sumQuantity = async(req) => {
    var sum = 0;
    if (!Array.isArray(req.body.MASACH)) {
       sum += Number(req.body.SOLUONG);
    }
    else {
        for (var index = 0; index < req.body.SOLUONG.length; index++)
            sum += Number(req.body.SOLUONG[index]);
    }
    return sum;
}

exports.add = async(req) => {
    try {
        await sequelize.transaction(async (t) => {
            let date=new Date;
            const phieunhap = await models.phieunhapsach.create({
                MAPNS: req.body.MAPNS,
                NGAYNHAPSACH : date,
                NHANVIENNHAP: req.user.MANV,
            }, {transaction: t});
            if (!Array.isArray(req.body.MASACH)) {
                await models.ct_phieunhap.create({
                    MAPNS: req.body.MAPNS,
                    MASACH: req.body.MASACH,
                    SOLUONG: req.body.SOLUONG
                }, {transaction: t})
            }
            else {
                for (var i = 0; i < req.body.MASACH.length; i++) {
                    await models.ct_phieunhap.create({
                        MAPNS: req.body.MAPNS,
                        MASACH: req.body.MASACH[i],
                        SOLUONG: req.body.SOLUONG[i]
                    }, {transaction: t})
                }
            }
        })
        return true
    } catch (err) {
        console.log('queries failed', err);
    }
}
exports.getInfor= async (MAPN) =>{
    return await models.phieunhapsach.findOne({ where: { MAPNS: MAPN } , raw : true});
}
exports.getImportDetail = async (MAPN, title, page, itemPerPage) => {
    var condition = '';
    if (title) {
      condition = title;
    }
    return await models.ct_phieunhap.findAndCountAll({
        include:[{
            model: models.sach,
            where: {
                TENSACH: {
                    [Op.like]: "%" + condition + "%",
                },
            },
            include: [{
                model: models.loaisach,
            }],
        }],
        where: {
            [Op.and]: [{
                MAPNS: MAPN
            },]
        },
        raw : true,
        offset: page*itemPerPage, 
        limit: itemPerPage, 
    })
}
exports.getBooks = async (MASACH) => {
    return await models.sach.findAll({ 
        where: { MASACH: MASACH },
        include: [{
                model: models.loaisach,
        }],
        raw : true});
    
}

exports.genKeyPN = async () => {
    var order = await models.phieunhapsach.findAll({paranoid: false,});
    var i = 1;
    var check = true;
    var str;
    while (true) {
      check = true;
      str = '' + i;
      while (str.length < 3) {
        str = 0 + str; 
      }
      s_key = str;
      for (let index = 0; index < order.length; index++) {
        if (order[index]['MAPNS'] === s_key) {
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