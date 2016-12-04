module.exports = (error, statusCode) => {
  let message = error ||  'Internal server error'
  let status = statusCode || 500
  let state = {
    error: {
      status,
      message
    }
  }
  return state
}
