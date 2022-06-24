require('dotenv').config({path: '.env'});
const path = require('path');
const express = require('express');
const handlebars = require('express-handlebars');
const { query } = require('express');
const flash = require('connect-flash');
const methodOverride = require('method-override');

const route=require('./routes');
const db=require('./config/db');

const passport = require('./config/auth/passport');

//conect to DB

//db.connect();

const userOnl = require('./app/middlewares/userOnl')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());


//template emgine
app.engine('hbs', handlebars({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views',path.join(__dirname, 'resource','views'));

//check password login
app.use(methodOverride('_method'));
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
