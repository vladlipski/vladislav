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
                    var newArgs = slice.call(arguments, 0);
                    return newFunc.apply(null, args.concat(newArgs));
                }
            }
        };
    }

    function linearFold(array, callback, initialValue) {
        var previousValue;
        var start = 0;

        if (array.length == 0 && !initialValue) {
            throw new TypeError();
        }

        if (initialValue) {
            previousValue = initialValue;
        } else {
            previousValue = array[0];
            start = 1;
        }

        for (var i = start; i < array.length; i++) {
            previousValue = callback(previousValue, array[i], i, array);
        }
        return previousValue;
    }

    return {
        bind: bind,
        curry: curry,
        linearFold: linearFold
    }
});