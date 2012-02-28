var Utils = require("../utils");
var TypeFactory = require("./base").TypeFactory;
var CondenseError = require("./base").CondenseError;
var Validator = require('validator');
var EnumType;

/*
 *
 * Usage:
 *   var EnumType = Types.get("Enum");
 *   var x = EnumType(100);
 *
 */
EnumType = (function(){
  var defaults = {
    // required: true,
  }
  
  EnumType = function(n){
    // var o = new String(n);
    
    // o.validate = function(options){
    //   options = Utils.merge(defaults, options);
      
    //   // TODO: validate options obj
      
    //   var url = this.toString();
    //   var check = Validator.check(url);
      
    //   return CondenseError(check.isUrl, check);
    // }
    
    // return o;
  }
  
  EnumType.__name = "Enum";
  
  return EnumType;
})();

module.exports = EnumType;