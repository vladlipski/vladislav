define(['testLib'], function(testLib) {

    function range(start, stop) {

        function getSequence(currentValue) {
            if (currentValue < start) {
                return false;
            }
            return {
                element: currentValue--,
                state: currentValue
            }
        }

        return linearUnfold(getSequence, stop).reverse();
    }

    function sum() {
        var slice = [].slice;
        var args = slice.call(arguments);
        var result = 0;

        if (args[0] === Object(args[0])){
            for (var index in args[0]) {
                result += args[0][index];
            }
        } else {
            result = linearFold(args, testLib.sumCallback)
        }
        return result;
    }


    function bind() {
        var slice = [].slice;
        var func = arguments[arguments.length - 1];
        var args = slice.call(arguments, 0, -1);

        return function () {
            return func.apply(null, args.concat(slice.call(arguments)));
        };
    }

    function curry(func) {
        var arity = func.length;
        var args = [];

        return function newFunc(arg) {
            args.push(arg);
            if (args.length >= arity) {
                return func.apply(null, args);
            }
            else {
                return function (newArg) {
                    return newFunc.call(null, newArg);
                }
            }
        };
    }

    function linearFold(array, callback, initialValue) {
        var previousValue;
        var start = 0;
        if (array.length == 0) {
            return initialValue;
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
        var currentState = initialValue;
        var array = [];
        var currentResult;
        while (currentResult = callback(currentState)) {
            currentState = currentResult.state;
            array.push(currentResult.element);
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
        if (array.length > 0) {
            if (callback(array[0], array)) {
                newArr.push(array[0]);
            }
            return newArr.concat(filter.call(null, array.slice(1), callback));
        }
        else {
            return newArr;
        }
    }

    function getAverageEven(array) {
        var arrEven = filter(array, testLib.isEven);
        return linearFold(arrEven, testLib.getAverage);
    }

    function sumRandom(count, min, max) {

        function randomCallback(count) {
            if (count) {
                return {
                    state: --count,
                    element: testLib.random(min, max)
                }
            } else {
                return false;
            }
        }

        return sum.apply(null, linearUnfold(randomCallback, count));
    }

    function findFirst(array, condition) {
        return filter(array, condition)[0] || null
    }

    function lazyEvaluation() {
        var cache;
        var boundFunc = bind.apply(null, arguments);
        return function () {
            cache = cache || boundFunc();
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
        range: range,
        sum: sum,
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