var should = require("should");
var Types = require("../lib/types.js");
var Util = require("../lib/utils");

describe("Types", function(){
  describe("on require()", function(){
    it("should be instantiated", function(done){
      should.exist(Types);
      done();
    })
    
    it("should have a .registry", function(done){
      should.exist(Types.registry);
      // console.log(Types.registry);
      done();
    })
    
    it("should have some presets loaded", function(done){
      (Object.keys(Types.registry).length).should.be.above(1)
      done();
    })
  })
  
  describe("#get/set", function(){
    // Initialize
    var ST, AbstractStringType, StringType, AbstractInvalidType, InvalidType;
    AbstractStringType = function(){}
    AbstractStringType.prototype.validate = function(s, options){
      return typeof s === "string";
    }
    StringType = new AbstractStringType();
    
    AbstractInvalidType = function(){}
    InvalidType = new AbstractInvalidType();
    
    
    afterEach(function(done){
      delete ST;
      done();
    })
    
    
    it("should be able to set a simple Type", function(done){
      ST = Types.get("String");
      
      should.exist(ST);
      should.exist(ST("walmart").validate);
      should.not.exist(ST("walmart").validate());
      
      done();
    })
    
    
    it("should have equivalent aliases for mutator function", function(done){
      for(var i in Types.mutatorAliases){
        Types[Types.mutatorAliases[i]].should.equal(Types.get);
      }
      done();
    })
    
    
    it("should not allow setting a Type with null or undefined name", function(done){
      (function(){
        Types.get(null, StringType);
      }).should.throw();
      done();
    })
    
    
    it("should not allow setting a Type with undefined name", function(done){
      (function(){
        Types.get(undefined, StringType);
      }).should.throw();
      done();
    })
    
    
    it("should not allow setting a Type with blank name", function(done){
      (function(){
        Types.get("", StringType);
      }).should.throw();
      done()
    })
    
    
    it("should not allow setting of Type without a validate function", function(done){
      (function(){
        Types.get("Invalid", InvalidType);
      }).should.throw();
      done();
    })
  })
  
  describe("#isInvalidType", function(){
    it("should exist", function(done){
      should.exist(Types.isInvalidType);
      done();
    })
  })
  
  describe("#validateCollection", function(){
    var req, conf, User;
    // simulate real arguments
    
    
    beforeEach(function(done){
      User = {
        get: function(req, res){}
      }
      req = {
        params: {
          id: "1"
        },
        query: {
          access_token: "SFFi4o/AQXKKTf60Ejke8C/2Lp0m6EF5nvDGfy9tnmQ="
        }
      }
      conf = {
        method: "GET",
        path: "/user/:id",
        handler: User.get,
        query: {
          id: {
            type: "String"
          },
          access_token: {
            type: "String"
          }
        }
      }
      done();
    })
    
    describe("(with just parameters)", function(){})
    
    describe("(with variable arguments in route/path)", function(){
      it("should validate String route arg as String", function(done){
        Types.validateCollection(req, conf, function(err){
          should.not.exist(err);
          done();
        })
      })
      
      it("should not validate String route as Email", function(done){
        conf.query.id.type = "Email";
        Types.validateCollection(req, conf, function(err){
          should.exist(err);
          done();
        })
      })
    }) // TODO:
    
    describe("(with variable arguments in parameters", function(){}) // TODO:
  })
})