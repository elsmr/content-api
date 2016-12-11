const db = require('../database/database')
const user = require('../models/user')

module.exports = {
  authenticate: (username, password) => {
    return {username, password}
  }
}
