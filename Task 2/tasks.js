define(function() {
    function bind() {
        var slice = [].slice;
        var func = arguments[arguments.length - 1];
        var args = slice.call(arguments, 0, -1);
        return function () {
            return func.apply(null, args.concat(slice.call(arguments)));
        };
    }

    function curry(func) {
        var slice = [].slice;
        var arity = func.length;

        return function newFunc() {
            var args = slice.call(arguments, 0);
            if (args.length >= arity) {
                return func.apply(null, args);
            }
            else {
                return function () {
                    var args2 = slice.call(arguments, 0);
                    return newFunc.apply(null, args.concat(args2));
                }
            }
        };
    }

    return {
        bind: bind,
        curry: curry
    }
});