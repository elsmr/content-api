const db = require('./database')

module.exports = {
  addUser: (userName, userEmail) => {
    let users = db.get(config.db.users_collection)
    return users.insert({"username" : userName, "email" : userEmail})
  }

  getAllUsers: () => {
    let users = db.get(config.db.users_collection)
    return users.find()
  }
}
