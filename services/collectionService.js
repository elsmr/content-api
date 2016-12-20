const db = require('../database/database')
const error = require('../models/error')

module.exports = {
  getCollections: () => {
    return new Promise((resolve, reject) => {
      db.get().collection('collections').find({}).toArray()
        .then((docs) => {
          resolve({data: docs})
        })
        .catch(() => {
          reject(error())
        })
    })
  },

  addCollection: (body) => {
    // todo: validate body
    delete body._id
    return new Promise((resolve,reject) => {
      db.get().createCollection(body.name)
        .catch((err) => {
          reject(err)
        })
      db.get().collection('collections').insertOne(body)
        .then(() => {
          resolve({data: body})
        }).catch((err) => {
          if(err.code === 11000) {
            reject(error(`Collection named '${body.name}' already exists`, 409))
          }
          reject(error())
        })
    })
  },

  updateCollection: (name, body) => {
    // todo: validate body
    delete body._id
    return new Promise((resolve,reject) => {
      db.get().collection('collections').findOneAndUpdate({name}, body)
        .then((docs) => {
          if(!docs.value) {
            reject(error(`No collection named '${name}'`, 404))
          }
          body._id = docs.value._id
          resolve({data: {old: docs.value, new: body}})
        })
        .catch(() => {
          reject(error())
        })
    })
  },

  deleteCollection: (name) => {
    return new Promise((resolve,reject) => {
      db.get().collection('collections').findOneAndDelete({name})
        .then((docs) => {
          if(!docs.value) {
            reject(error(`No collection named '${name}'`, 404))
          }
          db.get().dropCollection(name)
            .then(() => {
              resolve({data: docs.value})
            }).catch(() => {
              reject(error())
            })
        }).catch(() => {
          reject(error())
        })
    })
  },

  getItems: (name) => {
    return new Promise((resolve, reject) => {
      db.get().collection('collections').findOne({name})
        .then((docs) => {
          if(!docs) {
            reject(error(`No collection named '${name}'`, 404))
          }
          db.get().collection(name).find({}).toArray()
            .then((docs) => {
              resolve({data: docs})
            })
            .catch(() => {
              reject(error())
            })
        })
        .catch(() => {
          reject(error())
        })
    })
  },

  addItem: (name, body) => {
    // todo: validate body
    delete body._id
    return new Promise((resolve,reject) => {
      db.get().collection(name).insertOne(body)
        .then(() => {
          resolve({data: body})
        }).catch(() => {
          reject(error())
        })
    })
  }
}
