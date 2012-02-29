/**
 * Module dependencies.
 */
var Utils = require("./utils");
var path = require("path");

/**
 * Types constructor
 *
 * @api public
 */
function Types(){
  this.registry = {};
  
  // Configure aliases for Types.get()
  this.mutatorAliases = ["set", "register"];
  for(var i in this.mutatorAliases){
    Types.prototype[this.mutatorAliases[i]] = Types.prototype.get;
  }
  
  // Pre-load module-level default Type presets
  this.load(path.join(__dirname, "./type/"));
  
  return this;
}

/*
 * Returns error string if baseObj is invalid; else null
 *
 * @param {String} name
 * @param {Object} baseObj
 * @api public
 */
Types.prototype.isInvalidType = function(name, baseObj){
  // Must have a non-blank name
  if (typeof name === "undefined" || name === null || name === ""){
    return "The name of a Type cannot be undefined, null, or blank";
  }
  
  // Must be an object
  if (typeof baseObj !== "object"){
    return "Type " + name + " must be of type object";
  }
  
  // Must provide validate function
  if (typeof baseObj.validate == "undefined" || baseObj.validate === null || typeof baseObj.validate !== "function"){
    return "The '" + name + "' Type must provide a .validate() function";
  }
  
  return null;
}

/**
 * Get/Set types
 *
 * @param {String} name
 * @param {Object} baseObj
 * @return {Object|null} the baseObj for the given type (or null)
 * @api public
 */
Types.prototype.get = function(name, baseObj){
  if (typeof baseObj !== "undefined" && baseObj !== null){
    var err = null;
    
    if (err = this.isInvalidType(name, baseObj)){
      throw err;
    }
    this.registry[name] = baseObj;
  }
  
  return this.registry[name];
}


/*
 * Unset a Type from registry
 *
 * @param {String} name
 * @api public
 */
Types.prototype.unset = function(name){
  if (typeof this.registry[name] !== "undefined") {
    delete this.registry[name];
  }
  
  return this;
}

/*
 * Load Type files for given path
 *
 * @param {String} cwd
 * @api public
 */
Types.prototype.load = function(cwd){
  var self = this;
  Utils.File.walk(cwd, {includeOnly: [/.*\.js/]}, function(err, files){
    // TODO: 
    // self.get()
    // console.log(files)
  });
  
  return this;
}

/*
 * Hapi validateQuery interface (generates options in validate(options))
 *
 * @param {String|Object} typeStr String name of registered type to use or options object.
 * @param {Object} options (optional)
 * @api public
 */
Types.prototype.ensure = function(typeStr, options){
  options = options || {};
  
  if (typeof typeStr === "string"){
    options.type = typeStr;
  } else if (typeof typeStr === "object"){
    options = Utils.merge(options, typeStr);
  } else {
    throw "Unexpected type passed to Types.ensure(type[, options]); expected"
  }
  
  if (options.type === null){
    options.type = "String"; // default to StringType
  }
  
  return options;
}


// Types.prototype.resolveType = function(collection){
//   // Treat Array as special case
//   if (collection instanceof Array){
//     return "array";
//   }
  
//   return typeof collection;
// }

/*
 *
 *
 *
 *
 */
Types.prototype.validateCollection = function(collection, rules, callback){
  // TODO: check that args are valid
  var process = (rules instanceof Array) ? this.validateDSL : this.validateNormal;
  var requiredParams = {};
  var missingParams;
  var state = {}
  var depGraph = {};
  
  for(var r in rules){
    if (rules.hasOwnPropery(r)){
      if (rules[r].required === true){
        // requiredCount++;
        requiredParams[r] = 1;
      }
      
      // TODO: populate depGraph with relationships
    }
  }
  
  for(var i in collection){
    if (typeof rules[i] === "undefined" || rules[i] === null || typeof rules[i] !== "object"){
      continue; // No rules supplied => no validation, skip
    }
    
    if (rules[i].required === true){
      delete requiredParams[i];
    }
    
    process(i, collection, rules)
  }
  
  // Report missing required params  
  missingParams = Object.keys(requiredParams);
  if (missingParams.length !== 0){
    return callback("The following required parameters are missing: " + missingParams.toString());
  }
  
  // TODO: Report missing relationships
}


// Module exports
module.exports = new Types();