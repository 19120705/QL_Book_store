const siteRouter = require('./site');
const accountsRouter = require('./Accounts');
const RouterCustomer = require('./Customers');
const RouterProduct = require('./Products');

function route(app){
  app.use('/',siteRouter)
  app.use('/login',siteRouter)
  app.use('/accounts',accountsRouter)
  app.use('/customers',RouterCustomer)
  app.use('/products',RouterProduct)
}

module.exports=route;
