const express = require('express');
const router = express.Router();
const passport = require("../config/auth/passport");
const sitecontroller = require('./../app/controllers/SiteController')
const authcontroller = require('../app/controllers/AuthController')


router.get('/', sitecontroller.index);
router.get('/login', authcontroller.login)
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash : true
}));
router.get('/logout', authcontroller.logout);


module.exports=router;