const express = require('express');
const router = express.Router();
const ProductController = require('../app/controllers/productController');

/* GET home page. */

// add product
router.post('/store', ProductController.store);
// update product
router.delete('/:id/del',ProductController.delete)
router.get('/update/:id', ProductController.update);
router.put('/saveUpdate/:id', ProductController.saveUpdate);
//list product
router.get('/', ProductController.list);

module.exports = router;