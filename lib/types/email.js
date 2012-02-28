var Utils = require("../utils");
var TypeFactory = require("./base").TypeFactory;
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
  EmailType = TypeFactory(String);
  
  EmailType.prototype.__name = "Email";
  
  EmailType.prototype.validate = function(){
    
  }
  
  return EmailType;
})();

module.exports = EmailType;