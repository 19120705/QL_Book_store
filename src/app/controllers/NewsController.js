 
class NewsController{
    //[GET] /news
    index(req,res){
        res.render('news');
    }
    //[GET] /new/:slug
    show(req,res){
        res.send('OK')
    }
}

module.exports=new NewsController;

