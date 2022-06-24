const { models } = require("../../config/db");
const { Op } = require("sequelize");

exports.list = (title, Month, page, itemPerPage) => {
    var condition = title;
    var secondCondition = "";

    if (Month) {
        secondCondition = Month;
    }
    if (condition) {
        return models.tonno.findAll({
            offset: page * itemPerPage,
            limit: itemPerPage,
            raw: true,
        });
    } else {
        return models.tonno.findAndCountAll({
            offset: page * itemPerPage,
            limit: itemPerPage,
            raw: true,
        });
    }
};

exports.listMonth = (Month) => {
    var secondCondition = "";
    if (Month) {
        secondCondition = Month;
    }
    return models.tonno.findAll({
        where: {
            [Op.or]: [
                {
                    NGAYTHANG: {
                        [Op.like]: secondCondition,
                    },
                },
            ],
        },
        raw: true,
    });
};
