var Utils = require("../utils");
var TypeFactory = require("./base").TypeFactory
var NumberType;

/*
 *
 * Usage:
 *   var NumberType = Types.get("Number");
 *   var x = NumberType(100);
 *
 */
NumberType = (function(){
  var defaults = {};
  
  NumberType = TypeFactory(Number);
  
  NumberType.prototype.__name = "Number";
  
  NumberType.prototype.validate = function(options){
    options = Utils.merge(defaults, options);
    
    
  }
  
  return NumberType;
})();

module.exports = NumberType;