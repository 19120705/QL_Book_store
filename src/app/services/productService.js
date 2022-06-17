//const { options, report } = require('.');
const {models} = require('../../config/db');
const { Op } = require('sequelize');
exports.getTL = () =>{
        return models.loaisach.findAll({})
}


exports.list = (title , page, itemPerPage) => {
    var condition = '';
    if (title) {
      condition = title;
    }
    return models.sach.findAndCountAll({ 
        offset: page*itemPerPage, 
        limit: itemPerPage, 
        raw: true,
        include:[{
            model: models.loaisach,
        }],
        where: {
          TENSACH :{
            [Op.like]: '%' + condition + '%',
         }
     }
    });
};  

exports.genKeybook = async () => {
    var books = await models.sach.findAll({paranoid: false,});
    var i = 1;
    var check = true;
    var str = '';
    while (str.length < 4) {
      str = 0 + str;
    }
    while (true) {
      check = true;
      s_key = str + i;
      for (let index = 0; index < books.length; index++) {
        if (books[index]['masach'] === s_key) {
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

exports.store = async(req) => {
    const h =  await models.sach.findOrCreate({
        where: {
            MASACH: req.body.masach,
            TENSACH: req.body.tensach,
            TACGIA: req.body.tacgia,
            DONGIA: req.body.dongia,
            LUONGTON: 0,
            LOAISACH: req.body.maloai,
        }
    });
    return h;
}
exports.update = (req) => {
    return models.sach.findOne({
        where: {
            MASACH: req.params.id
        },
    });
}
exports.saveUpdate = async(req) => {
    const book = await models.sach.findOne({where: {MASACH: req.params.id}});

    if (req.body.category) {
      req.body.category.forEach(async (element) => {
      });
    }
    book.set(req.body)
    await book.save()
}
exports.saveDelete = async (req) => {
    const book = await models.sach.findOne({where: {MASACH: req.params.id}});
    await book.destroy()
}

exports.getBooks = (title) => {
    var condition = '';
    if (title) {
      condition = title;
    }
    return models.sach.findAll({
      where: {
        TENSACH: {
          [Op.like]: '%' + condition + '%',
        },
      },
    });
  };

exports.catofbook = (req) => {
  return models.loaisach.findAll({where: { MASACH : req.params.id} , raw: true})
}