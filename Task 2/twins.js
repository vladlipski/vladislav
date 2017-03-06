define(['testLib'], function(testLib) {

    function findDividers(number) {
        var half = Math.ceil(number / 2);
        var result = [];

        if (number == 1 || number == 2)
            return number;

        for (var i = 1; i <= half; i++) {
            if (number % i == 0) {
                result.push(i);
            }
        }
        return result;
    }

    function findTwins(n) {
        var counter = 0,
            number1 = 1,
            number2,
            dividers1,
            dividers2;

        var checkedNumbers = [];
        var result = [];

        while (counter < n) {
            dividers1 = findDividers(number1);
            if (dividers1.length > 2) {
                number2 = testLib.sum(dividers1);
                dividers2 = findDividers(number2);
                if (number1 == testLib.sum(dividers2) &&
                    number1 != number2 &&
                    checkedNumbers.indexOf(number2) == -1) {
                    result.push([number1, number2]);
                    checkedNumbers.push(number1);
                    counter++;
                }
            }
            number1++;
        }
        return result;
    }

    return {
        findTwins: findTwins
    }
});