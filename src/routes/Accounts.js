const express = require('express');
const router = express.Router();
const accountController = require('../app/controllers/accountController');
//const upload = require('../app/middlewares/uploadIMG/multer')

router.get('/:id/edit',accountController.edit)
router.get('/:id/save',accountController.save)




module.exports = router;