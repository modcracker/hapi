var Utils = require("../utils");
var TypeFactory = require("./base").TypeFactory;
var CondenseError = require("./base").CondenseError
var Validator = require('validator');
var EmailType;

/*
 *
 * Usage:
 *   var EmailType = Types.get("Email");
 *   var x = EmailType(100);
 *
 */
EmailType = (function(){
  var defaults = {
    // required: true,
  }
  
  EmailType = function(n){
    var o = new String(n);
    
    o.validate = function(options){
      options = Utils.merge(defaults, options);
      
      // TODO: validate options obj
      
      var email = this.toString();
      var check = Validator.check(email);
      
      if (options.required === true && email == ""){
        return "This Email is required and cannot be blank";
      }
      
      return CondenseError(check.isEmail, check);
    }
    
    return o;
  }
  
  EmailType.__name = "Email";
  
  return EmailType;
})();

module.exports = EmailType;