
class SiteController{
    //[GET] / or /login
    index(req,res,next){
        res.render('login')
        
    }

}

module.exports=new SiteController;