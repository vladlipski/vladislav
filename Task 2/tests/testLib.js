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

    function sumCallback(previousValue, currentValue, i, array) {
        return previousValue + currentValue;
    }

    function unfoldCallback(currentValue) {
        currentValue++;
        return currentValue <= 4 ? currentValue : false;
    }

    function mult(value) {
        return value * 2;
    }

    function isEven(value) {
        return (!(value % 2));
    }

    return {
        sum: sum,
        sumThree: sumThree,
        emptyFunc: emptyFunc,
        sumCallback: sumCallback,
        unfoldCallback: unfoldCallback,
        mult: mult,
        isEven: isEven
    }

});