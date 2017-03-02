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

    return {
        sum: sum,
        sumThree: sumThree,
        emptyFunc: emptyFunc
    }

});