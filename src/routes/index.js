const siteRouter = require('./site');
const accountsRouter = require('./Accounts');
const billRouter = require('./Bill');
const deptRouter = require('./Debt');
const ruleRouter = require('./Rule');
const RouterCustomer = require('./Customers');
const RouterProduct = require('./Products');


function route(app){
  app.use('/',siteRouter)
  app.use('/login',siteRouter)
  app.use('/accounts',accountsRouter)
  app.use('/bill',billRouter)
  app.use('/debt',deptRouter);
  app.use('/rule',ruleRouter);
  app.use('/customers',RouterCustomer)
  app.use('/products',RouterProduct)

}

module.exports=route;