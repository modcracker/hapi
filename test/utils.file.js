// var should = require("should");
var path = require("path");
var Types = require("../lib/types.js");
var Utils = require("../lib/utils");

describe("Utils.File", function(){
  var rootPath = path.join(__dirname, "../");
  
  it("should exist", function(done){
    should.exist(Utils.File);
    done();
  })
  
  describe("#walk", function(){
    describe("includeOnly", function(){
      it("should perform exact matches for strings<->filename", function(done){
        var fileToMatch = "Readme.md";
        
        Utils.File.walk(path.join(__dirname, "../"), {includeOnly: [fileToMatch]}, function(err, files){
          should.not.exist(err);
          files.should.have.length(1);
          path.relative(rootPath, files[0]).should.equal(fileToMatch);
          done();
        });
      })
      
      it("should perform regex matches for RegExp<->fullPath", function(done){
        var fileToMatch = "index.js";
        var matchFound = false;
        var filesRelativePaths;
        
        Utils.File.walk(path.join(__dirname, "../"), {includeOnly: [/.*\.js$/]}, function(err, files){
          should.not.exist(err);
          files.length.should.be.above(0);
          filesRelativePaths = files.map(function(d){ return path.relative(rootPath, d); })
          for(var i in filesRelativePaths){
            if (fileToMatch == filesRelativePaths[i]){
              matchFound = true;
              break;
            }
          }
          matchFound.should.be.true;
          done();
        });
      })
    })
    
    describe("excludeOnly", function(){
      
    })
  })
})