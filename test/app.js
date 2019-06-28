const request = require('supertest');
const app = require('../app.js');

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
chai.should();

describe("Home", ()=>{
  describe("GET /", ()=>{
    it("Home site should return", (done)=>{
      chai.request(app)
        .get('/')
        .end((err, res)=>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            console.log(res.body);
            done();
        })
    })
  })
})

describe("Student", ()=>{
  describe("GET /bird", ()=>{
    it("student list should return objects", (done)=>{
      chai.request(app)
        .get('/')
        .end((err, res)=>{
            //res.should.have.status(200);
            //res.body.should.be.a('object');
            expect(res).to.have.status(200);            
            done();
        })
    })
  })
})



/*
describe('GET /', () => {
  it('should return something', (done)=>{
    request(app)
      .get('/')
      .expect(200,done);
  })
  it()
})


describe('GET /coach', () =>{

})

*/

/*
describe('GET /', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get('/')
      .expect(200, done);
  });
});


describe('GET /login', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get('/login')
      .expect(200, done);
  });
});

describe('GET /signup', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get('/signup')
      .expect(200, done);
  });
});

describe('GET /api', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get('/api')
      .expect(200, done);
  });
});

describe('GET /contact', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get('/contact')
      .expect(200, done);
  });
});
*/