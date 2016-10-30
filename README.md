# express-mongo-mvc-es6

A simple express app using the Model-View-Controller design pattern.
This app does CRUD operations on a list of users in a MongoDB database.

This app uses as much ES6 features as possible (without transpiling) including: 
- Classes
- Arrow functions
- Promises

## Setup

1. setup a mongoDB server and create a collection.
2. rename [config.example.js](config.example.js) to config.js and fill in your mongoDB connection information.
3. install dependencies: `npm install`
4. run express: `npm start`

## config.js examples

### No authentication
```javascript 
const config = {
  "db": {
    "host":"localhost",
    "port": 27017,
    "db_name": "nodeapp",
    "users_collection": "users"
  }
};
```

module.exports = config;

### Authentication

const config = {
  "db": {
    "host":"localhost",
    "port": 27017,
    "db_name": "nodeapp",
    "users_collection": "users"
    "cred": {
      "username": "root",
      "password": "password"
    }
  }
};

module.exports = config;
 
