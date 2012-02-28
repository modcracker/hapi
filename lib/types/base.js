var Utils = require("../utils");

function TypeFactory(TypeFn){
  return function(){
    var val = TypeFn(arguments[0]);
    return val;
  }
}

exports.TypeFactory = TypeFactory