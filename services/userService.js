const db = require('../database/database')
const config = require('config')
const jwt = require('jsonwebtoken')
const error = require('../models/error')
const bcrypt = require('bcrypt')

module.exports = {
  authenticate: (username, password) => {
    return new Promise((resolve, reject) => {
      db.get().collection('users').findOne({username})
        .then((docs) => {
          let err = error('Authentication failed', 400)
          if(!docs) {
            reject(err)
          } else {
            bcrypt.compare(password, docs.password, (e, res) => {
              if(e) {
                reject(err)
              } else if(res) {
                delete docs.password
                docs.id = docs._id
                delete docs._id
                resolve({data: jwt.sign({data: docs}, config.secret)})
              }
              reject(err)
            })
          }
        })
        .catch((err) => {
          reject(error(err))
        })
    })
  }
}
