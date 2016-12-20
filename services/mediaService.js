const db = require('../database/database')

module.exports = {
  getAll: () => {
    return db.get().collection('media').find({})
  }
}
