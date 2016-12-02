const db = require('../database').getDb()

module.exports = {
  getCollections: () => {
    console.log(db)
    return db.collection('collections').findAll();
  },

  addCollection: (body) => {
    // todo: validate body
    db.createCollection(body.name)
    return db.collection('collections').insertOne(body)
  },

  updateCollection: (body) => {
    // todo: validate body
    return db.collection('collections').updateOne({"_id": body._id}, body)
  },

  deleteCollection: (name) => {
    db.dropCollection(name)
    db.collection('collections').deleteOne({"name": name})
  },

  getItems: (name) => {
    return db.collection(name).findAll()
  },

  addItem: (name, body) => {
    return db.collection(name).insertOne(body)
  }
}
