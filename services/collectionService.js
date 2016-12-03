const db = require('../database/database')

module.exports = {
  getCollections: () => {
    return db.get().collection('collections').find({}).toArray()
  },

  addCollection: (body) => {
    // todo: validate body
    db.get().createCollection(body.name)
    return db.get().collection('collections').insertOne(body)
  },

  updateCollection: (body) => {
    // todo: validate body
    return db.get().collection('collections').updateOne({"_id": body._id}, body)
  },

  deleteCollection: (name) => {
    db.get().dropCollection(name)
    db.get().collection('collections').deleteOne({"name": name})
  },

  getItems: (name) => {
    console.log(name)
    return db.get().collection(name).find({}).toArray()
  },

  addItem: (name, body) => {
    return db.get().collection(name).insertOne(body)
  }
}
