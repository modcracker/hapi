var Utils = require("../utils");

/*
 *
 * Usage:
 *   var StringType = Types.get("string");
 *   var x = new StringType("walton");
 *
 */
var StringType = exports.String = function(str, options){
  // this.value = str.toString() || "";
  // this.options = Utils.merge(this.defaultOpts, options); 
  
  
}

StringType.prototype.verboseName = "String";

StringType.prototype.defaultOpts = {}

StringType.prototype.validate = function(){}