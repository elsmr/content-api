const db = require('../database/database')
const error = require('../models/error')
var ObjectId = require('mongodb').ObjectID

module.exports = {
  getItem: (name,id) => {
    return new Promise((resolve,reject) => {
      db.get().collection(name).findOne({_id: new ObjectId(id)})
        .then((docs) => {
          if(!docs) {
            reject(error(`No item with id '${id}'`, 404))
          }
          resolve({data: docs})
        })
        .catch((err) => {
          console.log(err)
          reject(error())
        })
    })
  },

  updateItem: (name, id, body) => {
    // todo: validate body
    delete body._id
    return new Promise((resolve,reject) => {
      db.get().collection(name).findOneAndUpdate({_id: new ObjectId(id)}, body)
        .then((docs) => {
          if(!docs.value) {
            reject(error(`No item with id '${id}'`, 404))
          }
          body._id = docs.value._id
          resolve({data: {old: docs.value, new: body}})
        })
        .catch(() => {
          reject(error())
        })
    })
  },

  deleteItem: (name, id) => {
    return new Promise((resolve,reject) => {
      db.get().collection(name).findOneAndDelete({_id: new ObjectId(id)})
        .then((docs) => {
          if(!docs.value) {
            reject(error(`No item with id '${id}'`, 404))
          }          
          resolve({data: docs.value})
        }).catch(() => {
          reject(error())
        })
    })
  }
}
