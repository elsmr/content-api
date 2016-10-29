const UserModel = require('../models/user');

class UserController {
  static index (res) {
    UserModel.getAllUsers()
      .then((docs) => {
        res.render('users', { users: docs });
      })
      .catch((err) => {
        next(err);
      })
      .then(() => {
        UserModel.closeDb();
      });;
  }

  static renderAddUser(res) {
    res.render('newuser', { title: 'Add New User' });
  }

  static addUser(req, res, next) {
    // get form values
    let userName = req.body.username;
    let userEmail = req.body.email;

    // submit to model and handle promise
    UserModel.addUser(userName, userEmail)
      .then((doc) => {
        res.redirect('/users');
      })
      .catch((err) => {
        next(err);
      })
      .then(() => {
        UserModel.closeDb();
      });
  }
}

module.exports = UserController;