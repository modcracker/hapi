var should = require("should");
var StringType = require("../lib/types/string");

var caseValid, caseNumeric, caseMin, caseMax;

describe("StringType", function(){
  caseValid = "WALMART";
  caseLength = "1111111111";
  
  it("should be able to create new objects of type StringType", function(done){
    var experimental = StringType(caseValid);
    experimental.toString().should.equal(caseValid);
    done();
  })
  
  it("should validate without errors for known good string", function(done){
    var experimental = StringType(caseValid);
    should.not.exist(experimental.validate());  // should be error free
    done();
  })
  
  it("should not validate for length < min", function(done){
    var experimental = StringType(caseLength);
    should.exist(experimental.validate({min: 15}));
    done();
  })
  
  it("should not validate for length > max", function(done){
    var experimental = StringType(caseLength);
    should.exist(experimental.validate({max: 5}));
    done();
  })
  
  it("should validate for length >= min", function(done){
    var experimental = StringType(caseLength);
    should.exist(experimental.validate({max: 5}));
    done();
  })
  
  it("should validate for length <= max", function(done){
    var experimental = StringType(caseLength);
    should.exist(experimental.validate({max: 50}));
    done();
  })
  
  it("should exhibit normal String behavior", function(done){
    (StringType(1)).toString().should.equal("1");
    (StringType("ç")).toString().should.equal("ç");
    (StringType(undefined)).toString().should.equal("undefined");
    done();
  })
  
  // TODO: flesh out details
  describe("**options", function(){
    // it("should accept a length constraint", function(done){
    //   var x = StringType(strToMatch, {});
    //   done();
    // })
  })
})