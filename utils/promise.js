module.exports = (promise, res) => {
  promise
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      res.status(err.error.status).json(err)
    })
}