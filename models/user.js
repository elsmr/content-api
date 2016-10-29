const config = require('../config');
const db = require('./database');

class User {
  static addUser(userName, userEmail) {
    // set collection
    let users = db.get(config.db.users_collection);

    // submit to the db, return Promise
    return users.insert({"username" : userName, "email" : userEmail});
  }

  static getAllUsers() {
    // set collection
    let users = db.get(config.db.users_collection);

    // get all users, return Promise
    return users.find();
  }

  static closeDb() {
    db.close();
  }
}

module.exports = User;