modules.exports = {
  handlePromise: (promise, res) => {
    promise
      .then(colls => {
        res.json(colls)
      })
      .catch((err) => {
        res.send(err)
      })
  }
}
