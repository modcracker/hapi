var should = require("should");
var EnumType = require("../lib/type/enum");

var caseValid, caseInvalid, choices;

describe("EnumType", function(){
  choices = ["owner", "user", "admin", "anony"];
  caseValid = "user";
  caseInvalid = "turtle";
  
  it("should be able to create new objects of type EnumType", function(done){
    (function(){
      var experimental = EnumType(caseValid);
    }).should.not.throw();
    done();
  })
  
  it("should exhibit normal String behavior (key inherits StringType)", function(done){
    var samples = [1, "ç", undefined, null, caseValid];
    for(var i in samples){
      EnumType(samples[i]).toString().should.equal(String(samples[i]))
    }
    done();
  })
  
  describe("#__* (meta variables)", function(){
    it("should have an __name", function(done){
      should.exist(EnumType.__name)
      done();
    })
  })
  
  describe("#validate", function(){
    it("should validate without errors for known good key & choice set", function(done){
      var experimental = EnumType(caseValid);
      should.not.exist(experimental.validate({choices: choices}));
      done();
    })
    
    it("should not validate for known bad key not in choice set", function(done){
      var experimental = EnumType(caseInvalid);
      should.exist(experimental.validate({choices: choices}));
      done();
    })
  })
})