module.exports = {
  errorMessage: 'This text must be between 0 and 140 characters',
  shortText: {
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
  img: {
    errorMessage: 'File type is not supported. Supported image types are: .jpg,.png and .gif',
    validator: (x) => {
      let str = '' + x
      return (/\.(gif|jpe?g|png)$/i).test(str)
    }
  }
}
