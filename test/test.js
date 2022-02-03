process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
const nock = require('nock');
let should = chai.should();
const { expect } = require('chai');
const res = require('express/lib/response');

chai.use(chaiHttp);

var mock = [
  {
    title: 'Deadpool',
    release: 2016,
    score: 11,
    reviewer: 'Robert Smith'
  }
];


//Our parent block
describe('API', () => {

  /*
    * Test the /GET route
    
    describe('/GET movies', () => {
        it('it should GET any reply', (done) => {
          chai.request(server)
              .get('/movies')
              .end((err, res) => {
                  res.should.have.status(200);
                done();
              });
        });
    });
  */

  describe('/GET movies', function ()  {
    it('it should GET any reply', function (done) {
    nock('http://localhost:3000')
      .get('/movies')
      .reply(200, {
        "status": 200,
        "message": "This is a mocked response"
      });

    let result = chai.request(server).get('/movies');
    console.log(result)
        done();
         
        expect(result.code).to.equal(200);
  //expect(result.body).to.deep.equal({ mock });
  //expect(result.body[0].title).to.equal('batman');
});
    });



      /*
      describe('/GET reviewers', () => {
        it('it should GET any reply', (done) => {
          chai.request(server)
              .get('/reviewers')
              .end((err, res) => {
                  res.should.have.status(200);
                done();
              });
        });
      });
      */

    });