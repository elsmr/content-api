module.exports = (error, statusCode) => {
  let message = error ||  'Internal server error'
  let code = statusCode || 500
  let state = {
    error: {
      code,
      message
    }
  }
  return state
}
