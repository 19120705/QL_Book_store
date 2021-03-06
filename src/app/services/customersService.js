const { models } = require("../../config/db");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

exports.list = (title, page, itemPerPage) => {
    var condition = "";
    if (title) {
        condition = title;
    }
    return models.khachhang.findAndCountAll({
        where: {
            [Op.or]: [
                {
                    MAKH: {
                        [Op.like]: "%" + condition + "%",
                    },
                },
                {
                    HOTEN: {
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

exports.add = async (req) => {
    req.body.MAKH = await genKeyCus("KH");
    return await models.khachhang.create({
        MAKH: req.body.MAKH,
        HOTEN: req.body.HOTEN,
        DIACHI: req.body.DIACHI,
        EMAIL: req.body.EMAIL,
        SDT: req.body.SDT,
    });
    ;
};

genKeyCus = async (role) => {
    var Cus = await models.khachhang.findAll({paranoid: false,});
    var i = 1;
    var check = true;
    var str = "";
    while (true) {
        check = true;
        str = "" + i;
        while (str.length < 4) {
            str = 0 + str;
        }
        s_key = role + str;
        for (let index = 0; index < Cus.length; index++) {
            if (Cus[index]["MAKH"] === s_key) {
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
    await models.khachhang.destroy({
        where: {
            MAKH: req.params.id,
        },
    });
};

exports.countBin = () => {
    return models.khachhang.count({
        where: {
            deletedAt: {
                [Op.ne]: null,
            },
        },
        paranoid: false,
    });
};

exports.binList = (title, page, itemPerPage) => {
    var condition = "";
    if (title) {
        condition = title;
    }
    return models.khachhang.findAndCountAll({
        where: {
            [Op.and]: [
                {
                    deletedAt: {
                        [Op.ne]: null,
                    },
                },
                {
                    [Op.or]: [
                        {
                            MAKH: {
                                [Op.like]: "%" + condition + "%",
                            },
                        },
                        {
                            HOTEN: {
                                [Op.like]: "%" + condition + "%",
                            },
                        },
                    ],
                },
            ],
        },
        paranoid: false,
        offset: page * itemPerPage,
        limit: itemPerPage,
        raw: true,
    });
};

exports.destroyDelete = async (makh) => {
    return await models.khachhang.destroy({
        where: { MAKH: makh },
        force: true,
    });
};

exports.Restore = async (makh) => {
    return await models.khachhang.restore({
        where: {
            MAKH: makh,
        },
    });
};

exports.getInfor = async (makh) => {
    return await models.khachhang.findOne({ where: { MAKH: makh }, raw: true });
};

exports.updateSave = async (req) => {
    const KhachHang = await models.khachhang.findOne({where: {MAKH: req.params.id}});
    KhachHang.set(req.body)
    await KhachHang.save()
}

exports.getdebt = async (makh) => {
    return await models.tonno.findOne({ where: { MAKH: makh }, raw: true });
};