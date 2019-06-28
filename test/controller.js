const app = require('../app.js');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

const Students = require('../models/Student');
const studentController = require('../controllers/student');


describe("Routes", ()=>{
  describe("GET Students", ()=>{
    it("should return some students", (done)=>{
        var StudentDb = { find: function(){}};
        var mock = sinon.mock(StudentDb);
        mock.expects("find").once().throws();
        
        let req = {};
        let res = {
            render: sinon.spy(),
        };

       studentController.index(req,res);


       expect(res.render.calledOnce).to.be.true;
       expect(res.render.firstCall.args[1]).not.to.be.empty
       
        done();
    })
  })
})