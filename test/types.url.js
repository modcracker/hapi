var should = require("should");
var UrlType = require("../lib/types/url");

var caseValid, casesInvalid;

describe("UrlType", function(){
  caseValid = "http://walmart.com";
  casesInvalid = ["http://walmart.website", "store://walmart.com", "ws://walmart.mobile"];
  
  it("should be able to create new objects of type EmailType", function(done){
    (function(){
      var experimental = UrlType(caseValid);
    }).should.not.throw();
    done();
  })
  
  it("should exhibit normal String behavior (inherits from String)", function(done){
    var samples = [1, "ç", undefined, null, caseValid];
    for(var i in samples){
      UrlType(samples[i]).toString().should.equal(String(samples[i]))
    }
    done();
  })
  
  describe("#__* (meta variables)", function(){
    it("should have an __name", function(done){
      should.exist(UrlType.__name)
      done();
    })
  })
  
  describe("#validate", function(){
    it("should validate without errors for known good url", function(done){
      var experimental = UrlType(caseValid);
      should.not.exist(experimental.validate());  // should be error free
      done();
    });
    
    it("should validate with errors for known bad urls", function(done){
      for(var i in casesInvalid){
        should.exist(UrlType(casesInvalid[i]).validate());
      }
      done();
    });
    
    it("should throw error on invalid options", function(done){
      // TODO:
      done();
    })
  });
});