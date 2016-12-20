const jwt = require('jsonwebtoken')
const error = require('../models/error')
const config = require('config')
const objectHasProps = require('../utils/objectHasProps')

module.exports = {
  authenticate: (req, res, next) => {
    let token = req.body.token || req.query.token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    }
    if (token) {
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          let err = error('Failed to authenticate token.', 400)
          res.status(err.error.code).json(err)
        } else {
          req.user = decoded.data
          next()
        }
      })
    } else {
      let err = error('No token provided.', 400)
      res.status(err.error.code).json(err)
    }
  },
  authorize: (permissions) => {
    return (req,res,next) => {
      let user = req.user
      if(permissions.admin && !user.permissions.admin) {
        let err = error('User is not an administrator.', 403)
        res.status(err.error.code).json(err)
      }
      if(permissions.collections) {
        let def = user.permissions.collections._default
        let perm = Object.assign({}, def, user.permissions.collections[req.params.name])
        if(!objectHasProps(perm, permissions.collections)) {
          let err = error(`User is not authorized to use collection ${req.params.name}.`, 403)
          res.status(err.error.code).json(err)
        }
      }
      if(permissions.media && !objectHasProps(user.permissions.media, permissions.media)) {
        let err = error('User is not authorized to use media.', 403)
        res.status(err.error.code).json(err)
      }
      req.authorized = true
      next()
    }
  }
}
