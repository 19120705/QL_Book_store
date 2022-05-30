//const accountService = require("../services/accountService");
//const pagination = require("../../public/js/pages/pagination");

class AccountController {
    //[GET]:accounts/
    edit(req,res,next){
        res.render('accounts/editAccount');
    }
    save(req,res,next){
        res.render('accounts/inforAccount');
    }
}

module.exports = new AccountController();
