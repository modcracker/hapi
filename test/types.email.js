var should = require("should");
var EmailType = require("../lib/types/email");

var caseValid, caseInvalid;

describe("EmailType", function(){
  caseValid = "vnguyen@walmart.com"; // Can't think of another email to use
  caseInvalid = "vnguyen@walmart";
  
  it("should be able to create new objects of type EmailType", function(done){
    (function(){
      var experimental = EmailType(caseValid);
    }).should.not.throw();
    done();
  })
  
  it("should exhibit normal String behavior (inherits from String)", function(done){
    var samples = [1, "ç", undefined, null, caseValid];
    for(var i in samples){
      EmailType(samples[i]).toString().should.equal(String(samples[i]))
    }
    done();
  })
  
  describe("#__* (meta variables)", function(){
    it("should have an __name", function(done){
      should.exist(EmailType.__name)
      done();
    })
  })
  
  describe("#validate", function(){
    // it("should not validate for blank email if required", function(done){
    //   var experimental = EmailType();
    //   should.exist(experimental.validate());  // should be error free
    //   done();
    // })
    
    it("should validate without errors for known good email", function(done){
      var experimental = EmailType(caseValid);
      should.not.exist(experimental.validate());  // should be error free
      done();
    });
    
    it("should validate with errors for known bad email", function(done){
      var experimental = EmailType(caseInvalid);
      should.exist(experimental.validate());  // should be error free
      done();
    });
    
    it("should throw error on invalid options", function(done){
      // TODO:
      done();
    })
  });
});