const db = require('../database').getDb()

module.exports = {
  getAll: () => {
    return db.collection('media').findAll();
  },

  addImage(image) {

  },

  addVideo(video) {

  },

  addAudio(audio) {

  }
}
