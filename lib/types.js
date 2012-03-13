/**
 * Module dependencies.
 */
var Utils = require("./utils");
var path = require("path");
var async = require("async");

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
  var correctType = "function"; // or was it "object"?
  if (typeof baseObj !== correctType){
    return "Type " + name + " must be of type " + correctType + " (was " + typeof baseObj + ")";
  }
  
  // Must provide validate function
  if (typeof baseObj().validate == "undefined" || baseObj().validate === null || typeof baseObj().validate !== "function"){
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
    var err = this.isInvalidType(name, baseObj);
    
    if (err){
      throw err;
    }
    
    if (!Utils.DNE(this.registry[name])){
      // TODO: Log.warn overwriting...
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
  Utils.File.walk(cwd, {includeOnly: [/.*\.js/], excludeOnly: ["base.js"]}, function(err, files){
    if (err) throw err;
    
    for(var i in files){
      var p = files[i];
      var presetType = require(p);
      self.set(presetType.__name, presetType);
    }
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


/*
 *
 *
 *
 *
 */
Types.prototype.validateCollection = function(request, config, callback){
  // TODO: check that args are valid (perhaps do on server boot?)
  var collection = request.query ? Utils.clone(request.query) : {}; // TODO: parse route
  
  var uri = config.path;
  var rules = config.query || {};
  var process = (rules instanceof Array) ? this.validateDSL : this.validateNormal;
  var requiredParams = {};
  var missingParams;
  var state = {}; // TODO: might not be necessary
  var depGraph = {}; // dependency Graph (maps any relationships between variables)
    
  // Parse route/URI and treat as part of collection
  if (uri.indexOf(":") >= 0){
    var fragments = uri.split("/");
    for(var f in fragments){
      var pathfrag = fragments[f];
      if (pathfrag[0] == ":"){
        var key = pathfrag.slice(1);
        var val = request.params[key];
        if (val !== null){
          collection[key] = val;
        }
      }
    }
  }
  
  for(var r in rules){
    if (rules.hasOwnProperty(r)){
      if (rules[r].required === true){
        // requiredCount++;
        requiredParams[r] = 1;
      }
      
      // TODO: populate depGraph with relationships
      if (!Utils.DNE(rules[i].group)){
        // TODO: determine which type of group
        // depGraph["&"][rules[i].group].push(i);
        // depGraph["|"][rules[i].group].push(i);
      }
    }
  }
  
  for(var i in collection){
    if (collection.hasOwnProperty(i)){
      if (typeof rules[i] !== "object"){
        continue; // No rules supplied => no validation, skip
      }
      
      if (rules[i].required === true){
        delete requiredParams[i];
      }
      
      var err = this.get(rules[i].type)(collection[i]).validate()
      // console.log(i, err)
      // var err = process(i, collection, rules, state, depGraph); // TODO: expand
      if (err !== null){
        return callback(err);
      }
    }
  }
  
  // Report missing required params  
  missingParams = Object.keys(requiredParams);
  if (missingParams.length !== 0){
    return callback("The following required parameters are missing: " + missingParams.toString());
  }
  
  // TODO: Report missing relationships
  
  callback(null)
}


// Module exports
module.exports = new Types();