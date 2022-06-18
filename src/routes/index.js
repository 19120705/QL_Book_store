const siteRouter = require('./site');
const accountsRouter = require('./Accounts');
const RouterCustomer = require('./Customers');
const RouterProduct = require('./Products');
const RouterOrder = require('./Order');
const RouterCart = require('./Cart')
const RouterRule = require('./Rule')

function route(app){
  app.use('/',siteRouter)
  app.use('/login',siteRouter)
  app.use('/accounts',accountsRouter)
  app.use('/customers',RouterCustomer)
  app.use('/products',RouterProduct)
  app.use('/importOrder',RouterOrder)
  app.use('/cart', RouterCart)
  app.use('/rule',RouterRule)
}

module.exports=route;