var should = require("should");

describe("Validation < Types::StringType", function(){
  it("should be loaded as a preset", function(done){
    // TODO:
    done()
  })
  
  describe("#validateParam", function(){
    it("should validating a StringType param", function(done){
      var param = "WALMART";
      var expectedType = "string";
      
      Validation.validateParam(param, expectedType, function(err){
        should.not.exist(err);
        done();
      })
    })
  })
  
  describe("#validateData", function(){
    // it("should validate ")
  })
})

describe("Hapi Query Validation", function(){
  var endpoints, query, testHandler;
  
  it("should accept a StringType in routes", function(done){
    query = [
      "String#password < String#username", // Strings 'password' depends on 'username' (one to one rel)
      "String#csrf?", // String 'csrf' is optional
      "String#address < String#address2 + String#city + String#zipcode + String#country?", // One to many
      ""
    ]
    testHandler = function(req, res, next){
      next();
    }
    endpoints = [
      { method: "GET", path: "/testQuery", handler: testHandler, query: query}
    ]
    done(); // TODO: 
  })
})