const user = require('../../models/user')
const bcrypt = require('bcrypt')

module.exports = {
  up: (db, next) => {
    db.createCollection('users')
      .then((coll) => {
        bcrypt.hash('root', 10, (err, hash) => {
          coll.insertOne(user('admin', hash, {type: 'admin',collections:{all: {write: true, read:true}}}), next)
        })
      })
  },
  down: (db, next) => {
    db.dropCollection('users', next)
  }
}
