var should = require("should");
var StringType = require("../lib/types/string");

var caseValid, caseNumeric, caseMin, caseMax;

describe("StringType", function(){
  caseValid = "WALMART";
  caseNumeric = 1000;
  caseMin = "1";
  caseMax = "1111111111";
  
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
  
  it("should not validate for numeric if disallowNumerics set", function(done){
    var experimental = StringType(caseNumeric); // TODO: factor out
    var errors = experimental.validate({disallowNumerics: true});
    should.exist(errors)
    done();
  })
  
  // it("should not validate for min length if length[0] set", function(done){
    
  // })
  
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