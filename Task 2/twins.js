define(['tasks', 'testLib'], function(tasks, testLib) {

    function findDividers(number) {
        var result = [];

        if (number == 1 || number == 2)
            return number;

        function unfoldCallback(currentValue) {
            if (currentValue <= 1) {
                return false;
            }
            return {
                element: currentValue--,
                value: currentValue
            }
        }

        function check(divider) {
            return number % divider == 0;
        }

        function divide(divider) {
            return number / divider;
        }


        var arr = tasks.linearUnfold(unfoldCallback, Math.sqrt(number) + 1);
        result = result.concat(tasks.filter(arr, check));
        result = result.concat(tasks.map(result, divide));

        alert(result);
        // for (var i = 2; i <= Math.sqrt(number) + 1; i++) {
        //     if (number % i == 0) {
        //         quotient = number / i;
        //         if (quotient != i){
        //             result.push(quotient);
        //         }
        //         result.push(i);
        //     }
        // }
        return result;
    }

    function findTwins(n) {
        // var counter = 0,
        //     number1 = 1,
        //     number2,
        //     dividers1,
        //     dividers2;
        //
        // var checkedNumbers = [];
        // var result = [];
        //
        // while (counter < n) {
        //     dividers1 = findDividers(number1);
        //     if (dividers1.length > 2) {
        //         number2 = tasks.sum(dividers1);
        //         dividers2 = findDividers(number2);
        //         if (number1 == tasks.sum(dividers2) &&
        //             number1 != number2 &&
        //             checkedNumbers.indexOf(number2) == -1) {
        //             result.push([number1, number2]);
        //             checkedNumbers.push(number1);
        //             counter++;
        //         }
        //     }
        //     number1++;
        // }
        // return result;
        findDividers(100);
    }

    return {
        findTwins: findTwins
    }
});