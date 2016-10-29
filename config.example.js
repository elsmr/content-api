const config = {
  "db": {
    "host":"localhost",
    "port": 27017,
    "db_name": "nodeapp",
    "users_collection": "users"
    "cred": { // cred is optional
      "username": "root",
      "password": "password"
    }
  }
};

module.exports = config;