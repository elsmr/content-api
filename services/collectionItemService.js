const db = require('../database/database')

module.exports = {
  updateItem: (name,id) => {
    return db.get().collection(name).updateOne(id, body)
  },

  deleteItem: (name,id) => {
    return db.get().collection(name).deleteOne(id);
  }
}
