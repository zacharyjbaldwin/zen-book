const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Hello from the API!');
});

router.get('/view', (req, res) => {

});

module.exports = router;