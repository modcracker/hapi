var should = require("should");
var NumberType = require("../lib/type/number");

// var caseValid, caseNumeric, caseMin, caseMax;
var caseValid;

describe("NumberType", function(){
  caseValid = 1000;
  caseNaN = "x";
  
  it("should be able to create new objects of type NumberType", function(done){
    (function(){
      var experimental = NumberType(caseValid);
    }).should.not.throw();
    done();
  })
  
  it("should exhibit normal Number behavior", function(done){
    var samples = [1, -158, 1.53, 1.123232];
    for(var i in samples){
      NumberType(samples[i]).valueOf().should.equal(Number(samples[i]))
    }
    done();
  })
  
  describe("#__* (meta variables)", function(){
    it("should have an __name", function(done){
      should.exist(NumberType.__name)
      done();
    })
  })
  
  describe("#validate", function(){
    it("should validate without errors for known good number", function(done){
      (function(){
        var experimental = NumberType(caseValid);
      }).should.not.throw();
      done();
    });
    
    it("should not validate for num < min", function(done){
      var experimental = NumberType(caseValid);
      should.exist(experimental.validate({min: 5000}));
      done();
    })
    
    it("should validate for num >= min", function(done){
      var experimental = NumberType(caseValid);
      should.not.exist(experimental.validate({min: 50}));
      should.not.exist(experimental.validate({min: 1000}));
      done();
    })
    
    it("should not validate for num > max", function(done){
      var experimental = NumberType(caseValid);
      should.exist(experimental.validate({max: 900}));
      done();
    })
    
    it("should validate for num <= max", function(done){
      var experimental = NumberType(caseValid);
      should.not.exist(experimental.validate({max: 2000}));
      should.not.exist(experimental.validate({max: 1000}));
      done();
    })
    
    it("should not validate NaN by default (allowNaN false)", function(done){
      var experimental = NumberType(caseNaN);
      should.exist(experimental.validate());
      done();
    })
    
    it("should validate NaN if allowNaN enabled", function(done){
      var experimental = NumberType(caseNaN);
      should.not.exist(experimental.validate({allowNaN: true}));
      done();
    })
    
    it("should throw error on invalid options", function(done){
      // TODO:
      done();
    })
  });
});