define(['tasks'], function(tasks) {

    function findDividers(number) {
        var result = [];

        if (number == 1 || number == 2)
            return number;

        var arr = tasks.range(2, Math.ceil(Math.sqrt(number)) + 1);
        result = result.concat(tasks.filter(arr, function (divider) {
            return number % divider == 0;
        }));
        result = result.concat(tasks.map(result, function(divider) {
            return number / divider;
        }));
        result = result.filter(function(elem, index, self) {
            return index == self.indexOf(elem);
        });
        result.push(1);
        return result;
    }

    function getTwin(number) {
        dividers1 = findDividers(number);
        if (dividers1.length > 2) {
            twin = tasks.sum(dividers1);
            dividers2 = findDividers(twin);
            if (number == tasks.sum(dividers2)) {
                return twin;
            }
        }
        return null;
    }

    function findTwins(n) {
        var counter = 0;

        function checkNumber(number1) {
            var number2;

            while (counter < n) {
                number2 = getTwin(number1);
                if (number2 > number1) {
                    counter++;
                    return {
                        element: [number1++, number2],
                        state: number1
                    }
                }
                number1++;
            }

        }

        return tasks.linearUnfold(checkNumber, 2);
    }

    return {
        findTwins: findTwins
    }
});