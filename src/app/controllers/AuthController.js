const { models } = require("../../config/db");
const bcrypt = require("bcrypt");
class authController{
    //[GET]: /logout
    logout (req, res ){
        req.logout(function(err) {
            if (err) { return next(err); }
            res.render('logout', { layout: false });
          });
        res.render('logout', { layout: false });
        
    }
    //[GET]: /login 
    login = async (req, res) => {
        res.render('login', {
            layout: false,
            message: req.flash()
        })
    }
}
module.exports = new authController