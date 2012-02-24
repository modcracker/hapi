/*
 * Module dependencies
 */
var async = require("async");
var fs = require("fs");
var Utils = require("../utils");
var path = require("path");
var walkSettings = {
  includeOnly: [], 
  excludeOnly: [],
  recursive: true,
  ignoreDotFiles: true
};

/*
 * Tests a string vs an array of strings or RegExps
 *
 * TODO: move out of file.js
 */
exports.include = function(fullPath, filename, list){
  var matchFound = false;
  for (var p in list){
    var pattern = list[p];
    
    if (pattern instanceof RegExp){
      matchFound += path.join(fullPath, filename).match(pattern) ? 1 : 0;
    } else if (typeof pattern === "string"){
      matchFound += pattern === path.basename(filename) ? 1 : 0;
    } else {
      throw "Unexpected type given to include()";
    }
  }
  
  return (matchFound > 0);
}

/*
 * Recursively generates list of files TODO: document
 */
exports.recursiveWalkSync = recursiveWalkSync = function(pwd, options, selected_files){
  options = Utils.merge(walkSettings, options);
  selected_files = selected_files || [];
  
  try {
    var files = fs.readdirSync(pwd);
  } catch (err) {
    throw err;
  }
  
  for(var i in files){
    var filename = files[i];
    var currentFile = path.join(pwd, filename);
    
    // Skip ExcludeOnly
    if (options.excludeOnly.length > 0 && exports.include(pwd, currentFile, options.excludeOnly)){
      console.log("exclude detected on " + currentFile);
      continue;
    }
    
    // If includeOnly set:  Skip if not in IncludeOnly
    if (options.includeOnly.length > 0 && !exports.include(pwd, currentFile, options.includeOnly)){
      continue;
    }
    
    if (!fs.statSync(currentFile).isFile()){
      if (options.recursive === true){
        selected_files.push.apply(selected_files, recursiveWalkSync(currentFile, options, selected_files));
      }
    } else {
      if (options.ignoreDotFiles === true && filename[0] === "."){ continue; }
      
      selected_files.push(currentFile)
    }
  }
  
  return selected_files;
}

/*
 * Asynchronous directory walk with include/exclude support
 */
exports.walk = function(root, options, callback){
  var iterator = function(filename, cb){ cb(null, filename); }
  if (typeof callback === "undefined" || callback === null){
    callback = function(){};
  }
  async.map(recursiveWalkSync(root, options), iterator, callback);
}