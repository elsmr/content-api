const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
require('./collectionTest')
let authJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiYWRtaW4iLCJwZXJtaXNzaW9ucyI6eyJhZG1pbiI6dHJ1ZSwibWVkaWEiOnsicmVhZCI6dHJ1ZSwid3JpdGUiOnRydWV9LCJjb2xsZWN0aW9ucyI6eyJfZGVmYXVsdCI6eyJ3cml0ZSI6dHJ1ZSwicmVhZCI6dHJ1ZX19fX0sImlhdCI6MTQ4MjI0MzM5OH0.sT2k4xZ61u50hacnTby_hCps2cMDUIEiWdDdqWdzjKE'

chai.should()
chai.use(chaiHttp)

describe('Authentication & authorization', () => {
  describe('Retrieve JWT from authentication route', () => {
    it('it should fail to authenticate because of empty credentials', (done) => {
      chai.request(app)
        .post('/auth')
        .end((err, res) => {
          res.should.have.status(400)
          res.body.should.be.a('object')
          res.body.should.have.property('error')
          res.body.error.should.be.a('object')
          done()
        })
    })
    it('it should fail to authenticate because of faulty credentials', (done) => {
      chai.request(app)
        .post('/auth')
        .end((err, res) => {
          res.should.have.status(400)
          res.body.should.be.a('object')
          res.body.should.have.property('error')
          res.body.error.should.be.a('object')
          done()
        })
    })
    it('it should succesfully authenticate and return a JWT', (done) => {
      chai.request(app)
        .post('/auth')
        .send({username: 'admin', password: 'root'})
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('data')
          res.body.data.should.be.a('string')
          done()
        })
    })
  })
  describe('Access protected route', () => {
    it('it should not return the collections because there is no JWT', (done) => {
      chai.request(app)
        .get('/collections')
        .end((err, res) => {
          res.should.have.status(400)
          res.body.should.be.a('object')
          res.body.should.have.property('error')
          res.body.error.should.be.a('object')
          done()
        })
    })
    it('it should not return the collections because the JWT is invalid', (done) => {
      chai.request(app)
        .get('/collections')
        .set('Authorization', 'Bearer randomStringNotAJWT894jhKFal')
        .end((err, res) => {
          res.should.have.status(400)
          res.body.should.be.a('object')
          res.body.should.have.property('error')
          res.body.error.should.be.a('object')
          done()
        })
    })
    it('it should return the collections because there is a valid JWT', (done) => {
      chai.request(app)
        .get('/collections')
        .set('Authorization', `Bearer ${authJWT}`)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('data')
          res.body.data.should.be.a('array')
          done()
        })
    })
  })
})
