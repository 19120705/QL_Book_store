var express = require('express');


var router = express.Router();


const siteController=require('../app/controllers/SiteController');

router.get('/login',siteController.index);
router.get('/',siteController.index);

module.exports=router;