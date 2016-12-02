const db = require('../database').getDb()

module.exports = {
  updateItem: (name,id) => {
    return db.collection(name).updateOne(id, body)
  },

  deleteItem: (name,id) => {
    return db.collection(name).deleteOne(id);
  }
}
