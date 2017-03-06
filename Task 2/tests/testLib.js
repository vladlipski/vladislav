define(function(){

    function sumThree(a, b, c) {
        return a + b + c;
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
            args.forEach(function (item) {
                result += item;
            });
        }
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

    function getAverage(previousValue, currentValue, i, array) {
        previousValue += currentValue;
        if (i == array.length - 1) {
            previousValue /= array.length;
        }
        return previousValue;
    }

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    return {
        sum: sum,
        sumThree: sumThree,
        emptyFunc: emptyFunc,
        sumCallback: sumCallback,
        unfoldCallback: unfoldCallback,
        mult: mult,
        isEven: isEven,
        getAverage: getAverage,
        random: random
    }

});