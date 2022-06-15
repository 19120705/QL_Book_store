const siteRouter = require('./site');
const adminRouter=require('./admin');
const accountsRouter = require('./Accounts');
const RouterCustomer = require('./Customers')


function route(app){
  app.use('/',siteRouter)
  app.use('/login',siteRouter)
  app.use('/admin',adminRouter)
  app.use('/accounts',accountsRouter)
  app.use('/customers',RouterCustomer)
}

module.exports=route;