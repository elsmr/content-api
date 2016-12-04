process.env.NODE_ENV = 'test';

const seed = require('../database/seed')
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const should = chai.should()

chai.use(chaiHttp);

describe('Collections', () => {
  before((done) => {
    seed.down(done)   
  })

  describe('GET /collections', () => {
    it('it should GET all the collections', (done) => {
      chai.request(app)
        .get('/collections')
        .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object');
            res.body.should.have.property('data')
            res.body.data.should.be.a('array')
            res.body.data.length.should.be.eql(0)
          done()
        })
    })
  })
  describe('POST /collections', () => {
    it('it should create a new collection and return it', (done) => {
      let collection = {
        "_id": "58441dd14e5c80463eb8526a",
        "name": "books",
        "lang": [
          "en"
        ],
        "fields": [
          {
            "name": "name",
            "type": "shortText"
          },
          {
            "name": "content",
            "type": "longText"
          }
        ]
      }
      chai.request(app)
        .post('/collections')
        .send(collection)
        .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('data')
            res.body.data.should.be.a('object')
          done()
        })
    })

  });
})