var Utils = require("../utils");
var TypeFactory = require("./base").TypeFactory
var CondenseError = require("./base").CondenseError
var Validator = require("validator");
var StringType;

/*
 *
 * Usage:
 *   var StringType = Types.get("string");
 *   var x = StringType("walton");
 *   x.validate(options) // returns null for valid
 *
 */
StringType = (function(){
  var defaults = {
    required: true,
    allowNumeric: false,
    min: 0,
    max: null
  }
  
  StringType = function(n){
    var s = new String(n);
    
    s.__name = "String";
    
    s.validate = function(options){
      options = Utils.merge(defaults, options);
      
      // TODO: validate options obj
      
      var str = this.toString();
      var check = Validator.check(str);
      
      if (options.required === true && this.toString() == ""){
        return "This String is required & cannot be blank.";
      }
      
      // if (options.allowNumeric === false){
      //   try {
      //     check.isNumeric();
      //   } catch (e) {
      //     console.log(e)
      //     return "This String cannot contain only numbers.";
      //   }
      // }
      
      if (options.max !== null){
        return CondenseError(check.len, check, [options.min, options.max])
      } else {
        return CondenseError(check.len, check, [options.min]);
      }
      
      
      // if (options.max !== null){
      //   if (!check.len(options.min, options.max)){
      //     return (str.length < options.min) ? "This String is too short" : "This String is too long";
      //   }
      // } else {
      //   if (!check.len(options.min)){
      //     return "This String is too short.";
      //   }
      // }
      
      // TODO: add more checks?
      
      return null; // No errors; valid.
    }
    
    return s;
  }
  
  return StringType;
})();

module.exports = StringType;