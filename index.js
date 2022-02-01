const bodyParser = require('body-parser');
const express = require('express');
const hbs = require('hbs');
const morgan = require('morgan'); 
const mysql = require('mysql');
const path = require('path');

// App config
const environment = process.env.ENVIRONMENT || 'development';
const port = process.env.PORT || 3000;
const mariadb = {
    mariadb_host: process.env.STACK
}

const api = require('./routes/api');
const routes = require('./routes/router');



const app = express();
app.set('view engine', hbs);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

app.use('/api', api);
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist')));
// app.use('/popper', express.static())
// require('./node_modules/@popperjs/core/dist/cjs/popper');
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index.hbs');
});




app.listen(port, console.log(`Listening on port ${port}!`));