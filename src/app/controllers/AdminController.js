
//const { mutipleMongooseToObject } = require('../../util/mongoose.js');

class AdminController{
    admin(req,res,next){
      res.render('admin');

    }
    //[GET] /admin/create
    create(req,res,next){
      res.render('courses/create');
    }
    //[GET] /admin/store
    store(req,res,next){
      const formData=req.body;  
      const course= new Course(formData);
      course.save();
      res.send('Data saved')
    }
}

module.exports=new AdminController;