class IndexController {
  static index (res) {
    res.render('index', { title: 'Express' });
  }

  static helloWorld (res) {
    res.render('helloworld', { title: 'Hello, World!' });
  }
}

module.exports = IndexController;