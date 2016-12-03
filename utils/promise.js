module.exports = (promise, res) => {
  promise
    .then(docs => {
      res.json(docs)
    })
    .catch((err) => {
      res.send(err)
    })
}
