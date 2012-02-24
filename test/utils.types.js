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
      Types.get("String", StringType);
      ST = Types.get("String");
      
      should.exist(ST);
      should.exist(ST.validate)
      ST.validate.should.equal(StringType.validate);
      
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
  
  describe("#assertValidType", function(){
    it("should exist", function(done){
      should.exist(Types.assertValidType);
      done();
    })
  })
  
  describe("usage", function(){
    it("should have correct presets loaded", function(done){
      done();
    })
  })
})