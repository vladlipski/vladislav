define(['tasks', 'testLib'], function(tasks, testLib) {

    function findDividers(number) {
        var result = [];

        if (number == 1 || number == 2)
            return number;

        function range(currentValue) {
            if (currentValue <= 1) {
                return false;
            }
            return {
                element: currentValue--,
                value: currentValue
            }
        }

        var arr = tasks.linearUnfold(range, Math.ceil(Math.sqrt(number)) + 1);
        result = result.concat(tasks.filter(arr, function (divider) {
            return number % divider == 0;
        }));
        result = result.concat(tasks.map(result, function(divider) {
            return number / divider;
        }));
        result = tasks.filter(result, function(elem, index, self) {
            return index == self.indexOf(elem);
        });
        result.push(1);
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
                number2 = tasks.sum(dividers1);
                dividers2 = findDividers(number2);
                if (number1 == tasks.sum(dividers2) &&
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
        findDividers(220);
    }

    return {
        findTwins: findTwins
    }
});