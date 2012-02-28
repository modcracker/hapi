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
    offset: 0,
    choices: [],
  }
  
  EnumType = function(n){
    var o = new String(n);
    
    o.valueOf = function(options){
      var key = this.toString();
      var index = options.choices.indexOf(key);
      return index + options.offset;
    }
    
    o.validate = function(options){
      options = Utils.merge(defaults, options);
      
      // TODO: validate options obj
      
      var enumValue = this.valueOf(options);
      
      if (enumValue <= 0){
        return "This Enum has no such key";
      }
      
      // TODO: any other checks?
      
      return null;
    }
    
    return o;
  }
  
  EnumType.__name = "Enum";
  
  return EnumType;
})();

module.exports = EnumType;