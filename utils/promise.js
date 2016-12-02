module.exports = (promise, res) => {
  promise
    .then(colls => {
      res.json(colls)
    })
    .catch((err) => {
      res.send(err)
    })
}
