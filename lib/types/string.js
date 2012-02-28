var Utils = require("../utils");
var TypeFactory = require("./base").TypeFactory
var Validator = require("validator");
var StringType;

/*
 *
 * Usage:
 *   var StringType = Types.get("string");
 *   var x = StringType("walton");
 *
 */
StringType = (function(){
  var defaults = {
    disallowNumerics: false,
    // length: null,
  }
  
  StringType = function(n){
    var s = new String(n);
    
    s.__name = "String";
    
    s.validate = function(options){
      options = Utils.merge(defaults, options);
      
      var check = Validator.check(this.toString());
      
      if (options.disallowNumerics && check.isNumeric()){
        return "This String cannot contain only numbers.";
      }
      
      // options.length = int (for max)
      //   OR options.length = {min: x, max: y}
      //   OR options.length = [min, max]
      // TODO: factor out check.len
      if (options.length && !check.len.apply(this, options.length)){
        return "This String has an unacceptable length";
      }
      
      // TODO: add more checks?
      
      return null; // No errors; valid.
    }
    
    return s;
  }
  
  return StringType;
})();

module.exports = StringType;