const bodyParser = require('body-parser');
const express = require('express');
const hbs = require('hbs');
const morgan = require('morgan');
const path = require('path');

const api = require('./routes/api');
const routes = require('./routes/router');

const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

app.use('/', routes);
app.use('/api', api);

app.listen(port, console.log(`Listening on port ${port}!`));