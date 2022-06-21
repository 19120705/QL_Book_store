const express = require('express');
const router = express.Router();
const billController = require('../app/controllers/billController');

//list bill
router.get('/', billController.list)
// add order
router.get('/add', billController.add);
router.post('/addcthoadon', billController.addCT_HoaDon);
//[POST]:importOrder/add
router.post('/addhoadon', billController.addHoaDon);
// view order
router.get('/view/:id', billController.view);

//remove ct_hoadon
router.get('/remove/:id',billController.remove);
//print order
router.get('/print/:id', billController.print);

module.exports = router;