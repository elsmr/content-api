const db = require('../database/database')
const config = require('config')
const jwt = require('jsonwebtoken')
const error = require('../models/error')
const bcrypt = require('bcrypt')
const images = require('../utils/images')
const jdenticon = require('jdenticon')
const userModel = require('../models/user')

module.exports = {
  authenticate: (username, password) => {
    return new Promise((resolve, reject) => {
      db.get().collection('users').findOne({username})
        .then((docs) => {
          console.log(docs)
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
  },
  addUser: (user, serverUrl) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(user.password, 10)
        .then((hash) => {
          user.password = hash
          user = userModel(user)
          return db.get().collection('users').insertOne(user)
        })
        .then(() => {
          const hash = require('crypto').createHash('md5').update(user._id.toString() + user.username).digest('hex')
          const avatar = jdenticon.toSvg(hash, 512)
          const imagePath = `/static/users/avatars/${user._id}`
          images.write(avatar, imagePath, 'svg')

          const fullImagePath = serverUrl + imagePath + '.svg'
          user.avatar_url = fullImagePath
          return db.get().collection('users').findOneAndUpdate({_id: user._id}, user)
        })
        .then(() => {
          delete user.password
          resolve({data: user})
        })
        .catch(() => {
          reject(error())
        })
    })
  }
}
