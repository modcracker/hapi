var Utils = require("../utils");

function TypeFactory(TypeFn){
  return function(){
    var val = TypeFn(arguments[0]);
    return val;
  }
}

function CondenseError(fn, self, args){
  try {
    fn.apply(self, args);
  } catch (e){
    return e;
  }
}

exports.TypeFactory = TypeFactory
exports.CondenseError = CondenseError