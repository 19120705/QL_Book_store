require('dotenv').config({path: '.env'});
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const { query } = require('express');
const flash = require('connect-flash');

const route=require('./routes');
const db=require('./config/db');

const passport = require('./config/auth/passport');

//conect to DB

//db.connect();

const userOnl = require('./app/middlewares/userOnl')

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

//HTTP logger
app.use(morgan('combined'));

//template emgine
app.engine('hbs', handlebars({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views',path.join(__dirname, 'resource','views'));

//check password login
const session = require('express-session');
app.use(session({ secret: process.env.SESSION_SECRET , resave: true,
  saveUninitialized: true }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(userOnl);

//routes init
route(app);

app.listen(port, () => {

  console.log(`Example app listening at http://localhost:${port}`);
})
