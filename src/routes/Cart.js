const express = require('express');
const router = express.Router();
const cartcontroller = require('../app/controllers/cartController')

router.get('/resfesh', cartcontroller.resfesh)
router.get('/',cartcontroller.cartList)
router.post('/add',cartcontroller.add)
router.get('/remove/:id',cartcontroller.remove)
router.get('/listUser',cartcontroller.listCust)

module.exports = router