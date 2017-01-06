const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
require('./collectionTest')
let authJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiYWRtaW5AYWRtaW4uY29tIiwiYXZhdGFyX3VybCI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9zdGF0aWMvdXNlcnMvYXZhdGFycy81ODZmZWYyZTdiOThjNTZlYjAxMDkwZmUuc3ZnIiwicGVybWlzc2lvbnMiOnsiYWRtaW4iOnRydWUsIm1lZGlhIjp7InJlYWQiOnRydWUsIndyaXRlIjp0cnVlfSwiY29sbGVjdGlvbnMiOnsiX2RlZmF1bHQiOnsid3JpdGUiOnRydWUsInJlYWQiOnRydWV9fX0sImlkIjoiNTg2ZmYyNGRjNDY5MDc3Njc0ZTdmNTY5In0sImlhdCI6MTQ4MzczNDI1OH0.AQVjq-QtWwe3tBVC8tsLNkPRK9tuv1EBKtUFRJ_RvsY'

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
        .send({username: 'admin@admin.com', password: 'root'})
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
