var Utils = require("../utils");
var TypeFactory = require("./base").TypeFactory
var CondenseError = require("./base").CondenseError
var Validator = require("validator");
var NumberType;

/*
 *
 * Usage:
 *   var NumberType = Types.get("Number");
 *   var x = NumberType(100);
 *
 */
NumberType = (function(){
  var defaults = {
    min: null,
    max: null,
    allowFloat: true,
    allowNaN: false
  };
  
  NumberType = function(n){
    var o = new Number(n);
    
    o.validate = function(options){
      options = Utils.merge(Utils.clone(defaults), options);
      
      // TODO: validate options obj
      
      var num = this.valueOf();
      var check = Validator.check(num);
      
      if (options.allowNaN === false && isNaN(num) === true){
        return "This Number cannot be NaN";
      }
      
      if (options.allowFloat === false && (num % 1 !== 0)){
        return "This Number cannot be a float";
      }
      
      if (options.min !== null && num < options.min){
        return "This Number cannot be less than " + options.min;
      }
      
      if (options.max !== null && num > options.max){
        return "This Number cannot be greater than " + options.max;
      }
      
      return null;
    }
    
    return o;
  }
  
  NumberType.__name = "Number";
  
  return NumberType;
})();

module.exports = NumberType;