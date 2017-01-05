const user = require('../../models/user')
const bcrypt = require('bcrypt')

module.exports = {
  up: (db, next) => {
    db.createCollection('users')
      .then((coll) => {
        bcrypt.hash('root', 10, (err, hash) => {
          const x = user('admin', hash, {admin: true, media: {read: true, write: true}, collections:{_default: {write: true, read:true}}})
          coll.insertOne(x, next)
        })
      })
  },
  down: (db, next) => {
    db.dropCollection('users', next)
  }
}
