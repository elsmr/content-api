const mongo = require('mongodb');
const monk = require('monk');
const config = require('../config');

var db;
if ("cred" in config.db) {
  db = monk(`mongodb://${config.db.cred.username}:${config.db.cred.password}@${config.db.host}:${config.db.port}/${config.db.db_name}`);
} else {
  db = monk(`${config.db.host}:${config.db.port}/${config.db.db_name}`);
}

module.exports = db;
