module.exports = {
  shortText: {
    errorMessage: 'This text must be between 0 and 100 characters',
    validator: (x) => {
      let strlen = ('' + x).length
      return strlen > 0 && strlen <= 140
    }
  },
  longText: {
    errorMessage: 'This text must be between 0 and 10000 characters',
    validator: (x) => {
      let strlen = ('' + x).length
      return strlen > 0 && strlen <= 10000
    }
  },
  hexColor: {
    errorMessage: 'Not a valid color code',
    validator: (x) => {
      let str = '' + x
      return (/^#([0-9a-f]{3}){1,2}$/i).test(str)
    }
  },
  image: {
    errorMessage: 'File type is not supported. Supported image types are: .jpg,.png and .gif',
    validator: (x) => {
      let str = '' + x
      return (/\.(gif|jpe?g|png)$/i).test(str)
    }
  },
  video: {
    errorMessage: 'File type is not supported. Supported video types are: .mp4,.webm and .ogg',
    validator: (x) => {
      let str = '' + x
      return (/\.(webm|mp4|ogg)$/i).test(str)
    }
  },
  audio: {
    errorMessage: 'File type is not supported. Supported audio types are: .mp3,.wav and .ogg',
    validator: (x) => {
      let str = '' + x
      return (/\.(wav|mp3|ogg)$/i).test(str)
    }
  }
}
