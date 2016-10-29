const router = require('express').Router();
const IndexController = require('../controllers/index.js');

router.get('/', (req, res) => { IndexController.index(res); });
router.get('/helloworld', (req, res) => { IndexController.helloWorld(res); });

module.exports = router;