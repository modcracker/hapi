var Utils = require("../utils");
var TypeFactory = require("./base").TypeFactory
var CondenseError = require("./base").CondenseError
var Validator = require("validator");
var StringTypeFactory, StringType;

/*
 *
 * Usage:
 *   var StringType = Types.get("string");
 *   var x = StringType("walton");
 *   x.validate(options) // returns null for valid; err string for invalid
 *
 */
StringTypeFactory = (function(){
  var defaults = {
    allowEmpty: false,
    // allowNumeric: false, // Deprecated
    min: 0,
    max: null
  }
  
  StringType = function(n){
    var o = new String(n);
    
    // s.__name = "String";
    
    o.validate = function(options){
      options = Utils.merge(Utils.clone(defaults), options);
      
      // TODO: validate options obj
      
      var str = this.toString();
      var check = Validator.check(str);
      
      if (options.allowEmpty === false && this.toString() == ""){
        return "This String cannot be blank.";
      }
      
      if (options.max !== null){
        return CondenseError(check.len, check, [options.min, options.max])
      } else {
        var err = CondenseError(check.len, check, [options.min]);
        if (err) {
          return err;
        }
      }
      
      // TODO: add more checks?
      
      return null; // No errors; valid.
    }
    
    return o;
  }
  
  StringType.__name = "String";
  
  return StringType;
});

module.exports = new StringTypeFactory();
module.exports.StringType = StringTypeFactory;