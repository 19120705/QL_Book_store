
class SiteController{
    async index(req, res, next){
        try {
            if (!req.user) {
                res.redirect('/login');
            }
            else {
                res.render('./home');
            }           
        } catch (error) {
           next(error) 
        } 
    }
}


module.exports = new SiteController;