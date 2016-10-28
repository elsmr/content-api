const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	let db = req.db;
	let users = db.get('users');
	users.find({},{}, (e, docs) => {
		res.render('users', {'users': docs});
	})
});

router.get('/add', (req, res) => {
  res.render('newuser', { title: 'Add New User' });
});

router.post('/add', (req, res) => {
  // Get form values
  let userName = req.body.username;
  let userEmail = req.body.email;

  // Set our collection
  let collection = req.db.get('users');

  // Submit to the DB
  collection.insert({"username" : userName, "email" : userEmail}, (err, doc) => {
    if (err) {
      res.send("There was a problem adding the information to the database.");
    }
    else {
      res.redirect('/users');
    }
  });
});

module.exports = router;
