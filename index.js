const bodyParser = require('body-parser');
const { resolveNaptr } = require('dns');
const express = require('express');
const hbs = require('hbs');
const morgan = require('morgan'); 
const mysql = require('mysql');
const path = require('path');

// App config
const environment = process.env.ENVIRONMENT || 'development';
const port = process.env.PORT || 3000;
const mariadb_host = process.env.STACKHERO_MARIADB_HOST || require('./devkeys.json').mariadb.host;
const mariadb_user = process.env.MARIADB_USERNAME || require('./devkeys.json').mariadb.user;
const mariadb_password = process.env.STACKHERO_MARIADB_ROOT_PASSWORD || require('./devkeys.json').mariadb.password;
const mariadb_database = 'zenbook';

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

app.post('/search', (req, res) => {
    let text = `<p>You searched for "${req.body.search_query}"</p>`;
    text += '<p><a href="/">Go Back</a></p>';

    res.send(text);
});

app.get('/', (req, res) => {
    res.redirect('/view');
});

app.get('/delete', (req, res) => {
    let connection = mysql.createConnection({
        host: mariadb_host,
        user: mariadb_user,
        password: mariadb_password,
        database: mariadb_database
    });

    let fetchData = new Promise((resolve, reject) => {
        connection.connect();
        connection.query(`DELETE FROM people WHERE id=${req.query.id}`, (err, results) => {
            connection.end();
            if (err) reject(err);
            else resolve(results);
        });
    }).then((results) => {
        console.log(`Deleted user with ID ${req.query.id}`);
    }).catch((err) => {
        res.send(err);
    }).finally(() => {
        res.redirect('/');
    });
});

app.get('/add', (req, res) => {
    res.render('add.hbs');
});

app.post('/add', (req, res) => {
    let connection = mysql.createConnection({
        host: mariadb_host,
        user: mariadb_user,
        password: mariadb_password,
        database: mariadb_database
    });
    let contact = req.body;

    let insertData = new Promise((resolve, reject) => {
        connection.connect();
        connection.query(`INSERT INTO people (firstname, lastname, phonenumber, jobtitle, company) VALUES ("${contact.firstname}", "${contact.lastname}", "${contact.phonenumber}", "${contact.jobtitle}", "${contact.company}")`, (err, results) => {
            connection.end();
            if (err) reject(err);
            else resolve(results);
        });
    }).then((results) => {
        console.log(results);
    }).catch((err) => {
        res.send(err);
    }).finally(() => {
        res.redirect('/');
    });
})

app.get('/view', (req, res) => {
    let connection = mysql.createConnection({
        host: mariadb_host,
        user: mariadb_user,
        password: mariadb_password,
        database: mariadb_database
    });
    let people = [];

    let fetchData = new Promise((resolve, reject) => {
        connection.connect();
        connection.query('SELECT * FROM people;', (err, results) => {
            connection.end();
            if (err) reject(err);
            else resolve(results);
        });
    }).then((results) => {
        console.log(results);
        for (let i = 0; i < results.length; i++) {
            people.push({
                id: results[i].id,
                firstname: results[i].firstname,
                lastname: results[i].lastname,
                title: results[i].jobtitle,
                company: results[i].company,
                phonenumber: results[i].phonenumber
            })
        }
    }).catch((err) => {
        res.send(err);
    }).finally(() => {
        res.render('view.hbs', {
            people: people
        });
    });
});




app.listen(port, console.log(`Listening on port ${port}!`));