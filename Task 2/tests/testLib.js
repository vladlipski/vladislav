define(function(){


    function sumThree(a, b, c) {
        return a + b + c;
    }

    function emptyFunc() {
        return 9;
    }

    function nullFunc() {
        return null;
    }

    function sumCallback(previousValue, currentValue, i, array) {
        return previousValue + currentValue;
    }

    function unfoldCallback(currentValue) {
        if (currentValue > 1) {
            currentValue--;
        } else {
            return false;
        }
        return {
            value: currentValue,
            element: currentValue
        }
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
        nullFunc: nullFunc,
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