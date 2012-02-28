var Utils = require("../utils");


function TypeFactory(TypeFn){ // TODO: Check if Deprecated
  return function(){
    var val = TypeFn(arguments[0]);
    return val;
  }
}


/*
 * TODO: fill out 
 */
function CondenseError(fn, self, args){
  try {
    fn.apply(self, args || []);
  } catch (e){
    return e;
  }
  return null;
}

exports.TypeFactory = TypeFactory
exports.CondenseError = CondenseError