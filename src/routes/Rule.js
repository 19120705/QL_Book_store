const express = require('express');
const router = express.Router();
const ruleController = require('../app/controllers/ruleController');

router.get('/',ruleController.edit)
router.put('/edit',ruleController.update)

module.exports =router;