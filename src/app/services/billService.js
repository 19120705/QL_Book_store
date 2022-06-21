const {models, sequelize}  = require("../../config/db");
const { Op } = require("sequelize");


exports.list = (title,Month,page, itemPerPage,MANV) => {
    var condition = "";
    var secondCondition="";
    if (title) {
        condition = title;
    }
    if (Month){
        secondCondition=Month.split('-');
    }
    var manvcondition = '';
    if(MANV.slice(0,3) == 'emp'){
        manvcondition = MANV
    }
    return models.hoadonbansach.findAndCountAll({
        where: { 
            // [Op.and]:[{
            //     [Op.and]: [
            //         {
            //             [Op.and]: [
            //                 sequelize.where(sequelize.fn('YEAR', sequelize.col('`hoadonbansach`.`NGAYLAPHOADON`')), secondCondition[0]),
            //                 sequelize.where(sequelize.fn('MONTH', sequelize.col('`hoadonbansach`.`NGAYLAPHOADON`')), secondCondition[1])
            //             ]
            //         },
            //         {
            //             MAHD: {
            //                 [Op.like]: "%" + condition + "%",
            //             },
            //         },
            //     ],
            // },{
            //     MANV:{
            //         [Op.like]: "%" + manvcondition + "%",
            //     }
            // }]
        },
            offset: page * itemPerPage,
            limit: itemPerPage,
            raw: true,
        });
};

exports.add = async(req) => {
    try {
        await sequelize.transaction(async (t) => {
            let date=new Date;
            const hoadonbansach = await models.hoadonbansach.create({
                MAKH: req.body.MAKH,
                MAHD: req.body.MAHD,
                NGAYLAPHOADON : date,
                MANV : req.user.MANV,
                TONGTIEN: req.TONGTIEN
            }, {transaction: t});

            if (!Array.isArray(req.body.MASACH)) {
                let sach = await models.sach.findOne(
                    { where: { MASACH: req.body.MASACH }});
                await models.ct_hoadon.create({
                    MAHD: req.body.MAHD,
                    MASACH: req.body.MASACH,
                    SOLUONG: req.body.SOLUONG,
                    DONGIA: sach.DONGIA
                }, {transaction: t})
            }
            else {
                for (var i = 0; i < req.body.MASACH.length; i++) {
                    let sach = await models.sach.findOne(
                        { where: { MASACH: req.body.MASACH[i] }});
                    await models.ct_hoadon.create({
                        MAHD: req.body.MAHD,
                        MASACH: req.body.MASACH[i],
                        SOLUONG: req.body.SOLUONG[i],
                        DONGIA: sach.DONGIA
                    }, {transaction: t})
                }
            }
        })
        return true
    } catch (err) {
        console.log('queries failed', err);
    }
}
exports.getInfor = async (MAHD) =>{
    return await models.hoadonbansach.findOne({ where: { MAHD: MAHD } , raw : true});
}
exports.getBillDetail = async (MAHD, title, page, itemPerPage) => {
    var condition = '';
    if (title) {
      condition = title;
    }
    return await models.ct_hoadon.findAndCountAll(
        {where: {
            [Op.and]: [
                {
                    MAHD: MAHD
                },
                {
                    MASACH: {
                        [Op.like]: "%" + condition + "%",
                    },
                }
            ]
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
            as: 'sach_loaisach'
            // include: [{
            //     model: models.loaisach,
            //     as: 'MaLoai'
            // }]
        }],
        raw : true});
    
}

exports.getListBook = (quantity_min) => {
    return models.sach.findAll({
        where:{
            LUONGTON:{
                [Op.gt]: quantity_min,
            }
        }
    })
};

exports.getBookInfor = async (books_rows) => {
    for (let book of books_rows) {
        book.LOAISACH = ""
        const sach = await this.getBooks(book.MASACH)
        book.TENSACH = sach[0].TENSACH
        book.DONGIA = sach[0].DONGIA
        sach.forEach(theloai => {
            book.LOAISACH = theloai['sach_loaisach.TENLOAI']
            // if (theloai != sach[sach.length - 1]) {
            //     book.LOAISACH += ', '
            // }
        });        
    }
    return books_rows;
}
exports.getEmp = async (nvID) =>{
    return await models.nhanvien.findOne({where: {MANV: nvID}, raw : true})
}

exports.genKeyHD = async () => {
    var order = await models.hoadonbansach.findAll({});
    var i = 1;
    var check = true;
    var str;
    while (true) {
      check = true;
      str = '' + i;
      while (str.length < 5) {
        str = 0 + str;
      }
      s_key = str;
      for (let index = 0; index < order.length; index++) {
        if (order[index]['MAHD'] === s_key) {
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