define(function(){

    function sumThree(a, b, c) {
        return a + b + c;
    }

    function sum() {
        var slice = [].slice;
        var args = slice.call(arguments);
        var result = 0;
        args.forEach(function (item) {
            result += item;
        });
        return result;
    }

    function emptyFunc() {
        return 9;
    }

    function sumCallback(prev, currentValue, i, array) {
        return prev + currentValue;
    }

    return {
        sum: sum,
        sumThree: sumThree,
        emptyFunc: emptyFunc,
        sumCallback: sumCallback
    }

});