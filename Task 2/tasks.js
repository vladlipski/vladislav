define(['testLib'], function(testLib) {

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
            var args = slice.call(arguments);
            if (args.length >= arity) {
                return func.apply(null, args);
            }
            else {
                return function () {
                    var newArgs = slice.call(arguments);
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

    function linearUnfold(callback, initialValue) {
        var currentValue = callback(initialValue);
        var array = [];
        while (currentValue) {
            array.push(currentValue);
            currentValue = callback(currentValue);
        }
        return array;
    }

    function map(array, callback) {

        function mapCallback(previousValue, currentValue, i, array) {
            previousValue.push(callback(currentValue));
            return previousValue;
        }

        return linearFold(array, mapCallback, []);
    }

    function filter(array, callback) {
        var newArr = [];
        array.forEach(function(currentValue, index, arr) {
            if (callback(currentValue)) {
                newArr.push(currentValue);
            }
        });
        return newArr;
    }

    function getAverageEven(array) {
        var arrEven = filter(array, testLib.isEven);
        return linearFold(arrEven, testLib.getAverage);
    }

    function sumRandom(count, min, max) {
        var array = [];
        for (var i = 0; i < count; i++) {
            array.push(testLib.random(min, max));
        }
        return testLib.sum.apply(null, array);
    }

    function findFirst(array, condition) {
        return filter(array, condition)[0] || null
    }

    function lazyEvaluation() {
        var cache;
        var bindedFunc = bind.apply(null, arguments);
        return function () {
            cache = cache || bindedFunc();
            return cache;
        }
    }

    function memoize(func) {
        return function (arg) {
            var hash = (arg === Object(arg)) ?
                JSON.stringify(arg) : arg;
            func.memoize || (func.memoize = {});
            return (hash in func.memoize) ? func.memoize[hash] :
                func.memoize[hash] = func.call(this, arg);
        };
    }

    return {
        bind: bind,
        curry: curry,
        linearFold: linearFold,
        linearUnfold: linearUnfold,
        map: map,
        filter: filter,
        getAverageEven: getAverageEven,
        sumRandom: sumRandom,
        findFirst: findFirst,
        lazyEvaluation: lazyEvaluation,
        memoize: memoize
    }
});