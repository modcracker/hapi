# Proposal:  Style & Best Practices

The styles & practices described in this document are in addition to the styles detailed in [Felix's Style Guide](http://nodeguide.com/style.html).  The following proposals are open for discussions and debate.  



## Nesting Anti-pattern
Async function nesting is most annoying after you start nesting 3+ functions deep. One to two nested functions may be acceptable for brevity, but, a strict alarm threshold is arbitrary and can be decided later.  Upon surpassing the threshold, I suggest using the caolan/async library to make life easier and reduce nesting & code duplication.

    internals.authenticate(req, res, config, server, function(err, result){
      if (err === null){
        Validation.validateQuery(req, config.query ? Utils.map(config.query) : null, function (err) {
          if (err === null){
            internals.processBody(..., function(err){
              if (err === null){
                Validation.validateData(..., function(err){
                  if (err === null){
                    // ...
                  } else {
                    res.hapi.error = err;
                    next();
                  }
                })
              } else {
                res.hapi.error = err;
                next();
              }
            })
          } else {
            res.hapi.error = err;
            next();
          }
        });
      } else {
        res.hapi.error = err;
        next();
      }
    })

**versus**

    var async = require("async");
    async.waterfall([
      // Last function argument to each function must be callback function
      //   of form:  `cb(err, result1...)` where '...' is a splat
      
      // One way to start is to provide initial conditions:
      function(callback){ callback(null, req, res, config, server) }, 
      
      // args: from prev cb:  authenticate (req, res, config, server, cb)
      internals.authenticate, 
      
      // .authenticate must callback w/ the arguments expected by:
      Validation.validateQuery, 
      
      // Or, you can wrap params in a closure:
      function(err, callback){ internals.processBody(req, config.payload || (config.schema ? 'parse' : null), server, function (err) {})}
      
      // But... the above is kind of gross to look at.
      
      // ...
    ], function(err, result) ->
      // This final callback function is called in two cases:
      //    1) successful completion
      //    2) breaks on error:
      //       if internals.authenticate did callback("some error"), 
      //       Validation.validateQuery and on would be skipped
      if (err === null){
        // do stuff
      } else {
        // Only one error condition needs to be specified per execution chain
        res.hapi.error = err;
        next();
      }
    )

The latter is very concise if you remove comments.  

Another example:

    exports.validateQuery = function(req, parameters, callback){
      // ...
      
      var collection = _.map(req.query, function(val, key){ 
        return async.apply(internals.validateParam, key, parameters[key])
      })
      
      async.parallel(collection, callback);
    }

The above code asynchronously loops over query parameters, validates each in parallel, and either process the result or returns the error.  


## Object Orientation Programming
### Public vs Private methods
I'm sure you are already aware of this convention.  

    var MyClass = function(){
      // Private Method
      var foo = function(){};

      return {
        // Public Data
        defaults: {},

        // Public Method
        initialize: function(){
          foo();
        }
      };
    };

    var mc = new MyClass();
    // mc.foo // undefined
    mc.initialize() // calls foo()

### Inheritance
TODO:

## Comments
TODO:

## Unused Code detection
Perhaps for later... but GCC (Google Closure Compiler) is a good tool for identifying code that never gets used (optimization part of GCC can be replaced by uglify for similar if not equal performance IIRC).  