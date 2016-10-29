const router = require('express').Router();
const UserController  = require('../controllers/users.js');

router.get('/', (req, res) => { UserController.index(res); });
router.get('/add', (req, res) => { UserController.renderAddUser(res) });
router.post('/add', (req, res, next) => { UserController.addUser(req, res, next)});

module.exports = router;
