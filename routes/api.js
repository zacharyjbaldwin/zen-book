const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Hello from the API!');
});

module.exports = router;