process.env.NODE_ENV = 'development'

const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const exec = require('child_process').exec
const mongo = require('../database/database')
let authJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiYWRtaW4iLCJwZXJtaXNzaW9ucyI6eyJhZG1pbiI6dHJ1ZSwibWVkaWEiOnsicmVhZCI6dHJ1ZSwid3JpdGUiOnRydWV9LCJjb2xsZWN0aW9ucyI6eyJfZGVmYXVsdCI6eyJ3cml0ZSI6dHJ1ZSwicmVhZCI6dHJ1ZX19fX0sImlhdCI6MTQ4MjI0MzM5OH0.sT2k4xZ61u50hacnTby_hCps2cMDUIEiWdDdqWdzjKE'

chai.should()
chai.use(chaiHttp)

describe('Collections', () => {
  before((done) => {
    mongo.connect()
      .then(() => {
        exec('npm run seed', done)
      })
  })

  describe('GET /collections', () => {
    it('it should get all the collections', (done) => {
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
  describe('POST /collections', () => {
    let collection = {
      'name': 'someCollectionName',
      'lang': [
        'en'
      ],
      'fields': [
        {
          'name': 'name',
          'type': 'shortText'
        },
        {
          'name': 'content',
          'type': 'longText'
        }
      ]
    }
    it('it should create a new collection and return it', (done) => {
      chai.request(app)
        .post('/collections')
        .set('Authorization', `Bearer ${authJWT}`)
        .send(collection)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('data')
          res.body.data.should.be.a('object')
          done()
        })
    })

    it('it should detect a conflict', (done) => {
      chai.request(app)
        .post('/collections')
        .set('Authorization', `Bearer ${authJWT}`)
        .send(collection)
        .end((err, res) => {
          res.should.have.status(409)
          res.body.should.be.a('object')
          res.body.should.have.property('error')
          res.body.error.should.be.a('object')
          done()
        })
    })
  })
})
