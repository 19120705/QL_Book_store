const rulesService = require('../services/rulesService');
const {multipleSequelizeToObject,SequelizeToObject} = require('../../util/sequelize');

 //[GET]:rule/edit
 class RuleController{
     async edit(req, res, next){
        if(req.user){
            if(req.user.LOAINV == 'adm') {
                try {
                    var rules1 = await rulesService.getRules()
                    res.render('rules/inforRule',{rules:SequelizeToObject(rules1)})
                } catch (error) {
                    next(error)
                }
            }
        } else{
            res.redirect('/');
        }
    }

    async update(req, res, next){
        if(req.user){
            if(req.user.LOAINV == 'adm') {
                try {
                    await rulesService.updateSave(req);
                    res.redirect("/rule");
                } catch (error) {
                    next(error)
                }
            }
        } else{
            res.redirect('/');
        }
    }


}

module.exports = new RuleController