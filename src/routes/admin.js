const express = require('express');
const router = express.Router();


const adminController=require('../app/controllers/AdminController');

router.get('/',adminController.admin);
router.get('/create',adminController.create);
router.post('/store',adminController.store);

module.exports=router;