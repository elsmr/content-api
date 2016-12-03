const contentTypes = require('./contentTypes')

module.exports = (title, path) => {
  let type = 'file'
  if(contentTypes.image.validator(path)) {
    type = 'image'
  } else if(contentTypes.video.validator(path)) {
    type = 'video'
  } else if (contentTypes.audio.validator(path)) {
    type = 'audio'
  }
  let state = {
    title,
    type,
    path
  }
  return state
}
