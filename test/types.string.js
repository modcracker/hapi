var should = require("should");
var StringType = require("../lib/type/string");

var caseValid, caseNumeric, caseMin, caseMax;

describe("StringType", function(){
  caseValid = "WALMART";
  caseLength = "1111111111";
  
  it("should be able to create new objects of type StringType", function(done){
    (function(){
      var experimental = StringType(caseValid);
    }).should.not.throw();
    done();
  })
  
  it("should exhibit normal String behavior", function(done){
    var samples = [1, "ç", undefined, null, caseValid];
    for(var i in samples){
      StringType(samples[i]).toString().should.equal(String(samples[i]))
    }
    done();
  })
  
  it("should be able to create new version of itself", function(done){
    should.exist(StringType.StringType);
    var StringTypeClone = new StringType.StringType();
    should.exist(StringTypeClone);
    StringTypeClone(caseValid).toString().should.equal(StringType(caseValid).toString())
    done();
  })
  
  describe("#__* (meta variables)", function(){
    it("should have an __name", function(done){
      should.exist(StringType.__name)
      done();
    })
  })
  
  describe("#validate", function(){
    it("should validate without errors for known good string", function(done){
      var experimental = StringType(caseValid);
      should.not.exist(experimental.validate());  // should be error free
      done();
    });
    
    it("should not validate blank input by default (allowEmpty false)", function(done){
      var experimental = StringType("");
      should.exist(experimental.validate());
      done();
    })
    
    it("should validate blank input if allowEmpty enabled", function(done){
      var experimental = StringType("");
      should.not.exist(experimental.validate({allowEmpty: true}));
      done();
    })
    
    it("should not validate for length < min", function(done){
      var experimental = StringType(caseLength);
      should.exist(experimental.validate({min: 15}));
      done();
    });
    
    it("should not validate for length > max", function(done){
      var experimental = StringType(caseLength);
      should.exist(experimental.validate({max: 5}));
      done();
    });
    
    it("should validate for length >= min", function(done){
      var experimental = StringType(caseLength);
      should.not.exist(experimental.validate({min: 5}));
      done();
    });
    
    it("should validate for length <= max", function(done){
      var experimental = StringType(caseLength);
      should.not.exist(experimental.validate({max: 50}));
      done();
    });
    
    it("should throw error on invalid options", function(done){
      // TODO:
      done();
    })
  });
});