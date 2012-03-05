var Utils = require("../utils");
var TypeFactory = require("./base").TypeFactory;
var CondenseError = require("./base").CondenseError;
var Validator = require('validator');
var UrlType;

/*
 *
 * Usage:
 *   var UrlType = Types.get("Url");
 *   var x = UrlType(100);
 *
 */
UrlType = (function(){
  var defaults = {
    // required: true,
  }
  
  UrlType = function(n){
    var o = new String(n);
    
    o.validate = function(options){
      options = Utils.merge(Utils.clone(defaults), options);
      
      // TODO: validate options obj
      
      var url = this.toString();
      var check = Validator.check(url);
      
      return CondenseError(check.isUrl, check);
    }
    
    return o;
  }
  
  UrlType.__name = "Url";
  
  return UrlType;
})();

module.exports = UrlType;