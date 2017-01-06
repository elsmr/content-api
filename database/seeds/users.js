const userModel = require('../../models/user')
const bcrypt = require('bcrypt')

module.exports = {
  up: (db, next) => {
    db.createCollection('users')
      .then((coll) => {
        bcrypt.hash('root', 10, (err, hash) => {
          const admin = {
            username: 'admin',
            password: hash,
            permissions: {
              admin: true,
              media: {read: true, write: true},
              collections:{
                _default: {write: true, read:true}
              }
            }
          }
          coll.insertOne(userModel(admin), next)
        })
      })
  },
  down: (db, next) => {
    db.dropCollection('users', next)
  }
}
