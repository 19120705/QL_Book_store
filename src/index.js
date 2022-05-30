const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const { query } = require('express');


const route=require('./routes');
const db=require('./config/db');


//conect to DB

//db.connect();



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

//routes init
route(app);





app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})