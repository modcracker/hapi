var StringType = require("../lib/types/string");

describe("StringType", function(){
  it("should be able to create new objects of type StringType", function(done){
    var strToMatch = "WALMART";
    var x = new StringType(strToMatch);
    x.should.equal(strToMatch);
    done();
  })
  
  it("should exhibit normal String behavior", function(done){
    (new StringType(1)).toString().should.equal("1");
    (new StringType("ç")).toString().should.equal("ç");
    (new StringType(undefined)).toString().should.equal("undefined");    
    done();
  })
  
  // TODO: flesh out details
  describe("**options", function(){
    it("should accept a length constraint", function(done){
      var x = new StringType(strToMatch, {});
    })
  })
})