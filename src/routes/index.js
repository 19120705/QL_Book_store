const siteRouter = require('./site');
const adminRouter=require('./admin');
const accountsRouter = require('./Accounts');


function route(app){
  app.use('/',siteRouter)
  app.use('/login',siteRouter)
  app.use('/admin',adminRouter)
  app.use('/accounts',accountsRouter)
}

module.exports=route;