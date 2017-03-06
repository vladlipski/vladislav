define(['testLib', 'tasks'], function(testLib, tasks){

    QUnit.test('Partial application', function (assert) {
        assert.equal(tasks.bind(1, testLib.sumThree)(2, 3), 6,
            'bind one argument (1),  sumThree(2, 3) should be 6');
        assert.equal(tasks.bind(1, 3, testLib.sumThree)(3), 7,
            'bind two arguments (1, 3), sumThree(3) should be 7');
        assert.equal(tasks.bind(1, 3, 9, testLib.sumThree)(), 13,
            'bind three arguments (1, 3, 9), sumThree() should be 13');
        assert.equal(tasks.bind(1, 3, 9, testLib.sumThree)(10, 13, 20), 13,
            'bind three arguments (1, 3, 9), sumThree(10, 13, 20) should be 13');
        assert.equal(tasks.bind(1, 3, 9, testLib.emptyFunc)(), 9,
            'bind three arguments (1, 3, 9), emptyFunc() should return 9');
        assert.equal(tasks.bind(testLib.emptyFunc)(), 9,
            'bind null arguments, emptyFunc() should return 9');
    });

    QUnit.test('Curry function', function (assert) {
        assert.equal(tasks.curry(testLib.emptyFunc)(), 9,
            'call carried emptyFunc  without parameters should return 9');
        assert.equal(tasks.curry(testLib.emptyFunc)(10, 9, 8), 9,
            'call carried emptyFunc  with parameters should return 9');

        var carriedSumThree = tasks.curry(testLib.sumThree);

        assert.equal(typeof(carriedSumThree(1)), 'function',
            'call carriedSumThree(1) should return function');
        assert.equal(typeof(carriedSumThree(1)(2)), 'function',
            'call carriedSumThree(1)(2) should return function');
        assert.equal(carriedSumThree(1)(2)(3), 6,
            'call  carriedSumThree(1)(2)(3) should return 6');
        assert.equal(carriedSumThree(1, 2, 3), 6,
            'carriedSumThree (1, 2, 3) should return 6');
        assert.equal(tasks.curry(testLib.sum)(1), 1,
            'call carried sum with (1) should return 1');
    });

    QUnit.test('Linear fold', function (assert) {
        assert.equal(tasks.linearFold( [1, 2, 3, 4], testLib.sumCallback), 10,
            'Linear fold for [1, 2, 3, 4] without initialValue and with sum callback should return 10');
        assert.equal(tasks.linearFold( [1], testLib.sumCallback), 1,
            'Linear fold for [1] without initialValue and with sum callback should return 1');
        assert.equal(tasks.linearFold( [1, 2, 3, 4], testLib.sumCallback, 10), 20,
            'Linear fold for [1, 2, 3, 4] with initialValue = 10 and with sum callback should return 20');
        assert.equal(tasks.linearFold( [1], testLib.sumCallback, 10), 11,
            'Linear fold for [1] with initialValue = 10 and with sum callback should return 11');
        assert.equal(tasks.linearFold( [], testLib.sumCallback, 10), 10,
            'Linear fold for [] with initialValue = 10 and with sum callback should return 10');
        assert.throws(
            function () {
                return tasks.linearFold([], testLib.sumCallback);
            },
            TypeError,
            'Linear fold for [] without initialValue and with sum callback should throw TypeError'
        );
    });

    QUnit.test('Linear unfold', function (assert) {
        assert.deepEqual(tasks.linearUnfold(testLib.unfoldCallback, 0), [1, 2, 3, 4],
            'Linear unfold for callback, which iterate parameter,' +
            ' with initialValue = 0 should return [1, 2, 3, 4]');
        assert.deepEqual(tasks.linearUnfold(testLib.unfoldCallback, 2), [3, 4],
            'Linear unfold for callback, which iterate parameter,' +
            ' with initialValue = 2 should return [3, 4]');
    });

    QUnit.test('Map', function (assert) {
        assert.deepEqual(tasks.map([1, 2, 3], testLib.mult), [2, 4, 6],
            'Map for [1, 2, 3], with mult callback should return [2, 4, 6]');
        assert.deepEqual(tasks.map([10], testLib.mult), [20],
            'Map for [10], with mult callback should return [20]');
        assert.deepEqual(tasks.map([], testLib.mult), [],
            'Map for [], with mult callback should return []');
    });

    QUnit.test('Filter', function (assert) {
        assert.deepEqual(tasks.filter([1, 2, 3, 4, 5, 6], testLib.isEven), [2, 4, 6],
            'Filter all even numbers in [1, 2, 3, 4, 5, 6], should return [2, 4, 6]');
        assert.deepEqual(tasks.filter([1, 3, 5, 7, 9], testLib.isEven), [],
            'Filter all even numbers in [1, 3, 5, 7, 9], should return []');
        assert.deepEqual(tasks.filter([2, 4, 6, 8, 10], testLib.isEven), [2, 4, 6, 8, 10],
            'Filter all even numbers in [2, 4, 6, 8, 10], should return [2, 4, 6, 8, 10]');
        assert.deepEqual(tasks.filter([1], testLib.isEven), [],
            'Filter all even numbers in [1], should return []');
        assert.deepEqual(tasks.filter([2], testLib.isEven), [2],
            'Filter all even numbers in [2], should return [2]');
        assert.deepEqual(tasks.filter([], testLib.isEven), [],
            'Filter all even numbers in [], should return []');
    });

    QUnit.test('Average of even numbers', function (assert) {
        assert.equal(tasks.getAverageEven([1,23,2,6,12, 0]), 5,
            'Average of even numbers in [1,23,2,6,12, 0], should be 5');
        assert.equal(tasks.getAverageEven([1, 2, 3, 4, 5, 6]), 4,
            'Average of even numbers in [1, 2, 3, 4, 5, 6], should be 4');
        assert.equal(tasks.getAverageEven([2]), 2,
            'Average of even numbers in [2], should be 2');
        assert.throws(
            function () {
                return tasks.getAverageEven([1, 3, 5]);
            },
            TypeError,
            'getAverageEven for [1, 3, 5], should throw TypeError'
        );
        assert.throws(
            function () {
                return tasks.getAverageEven([]);
            },
            TypeError,
            'getAverageEven for [], should throw TypeError'
        );
    });

    QUnit.test('Sum of random numbers', function (assert) {
        assert.ok(tasks.sumRandom(10, 1, 5) <= 10 * 5,
            'Sum of 10 random numbers in range(1, 5), should be less than 50');
        assert.ok(tasks.sumRandom(10, 0, 0) == 0,
            'Sum of 10 random numbers in range(0, 0), should be equal 0');
        assert.ok(tasks.sumRandom(0, 1, 1000) == 0,
            'Sum of 0 random numbers in range(1, 1000), should be less equal 0');
    });

    QUnit.test('First', function (assert) {
        assert.equal(tasks.findFirst([1, 2, 3, 4, 5], testLib.isEven), 2,
            'First even in [1, 2, 3, 4, 5] should be 2');
        assert.equal(tasks.findFirst([1, 3, 5, 7, 9, 10], testLib.isEven), 10,
            'First even in [1, 3, 5, 7, 9, 10] should be 10');
        assert.equal(tasks.findFirst([2, 4, 18, 12, 10, 6], testLib.isEven), 2,
            'First even in [2, 4, 18, 12, 10, 6] should be 2');
        assert.equal(tasks.findFirst([1, 3, 5], testLib.isEven), null,
            'First even in [1, 3, 5] should be null');
        assert.equal(tasks.findFirst([], testLib.isEven), null,
            'First even in [] should be null');
    });

    var counter = 0;

    function sum() {
        counter++;
        return testLib.sum.apply(null, arguments);
    }

    var lazySumOneAndTwo = tasks.lazyEvaluation(1, 2, sum);

    QUnit.test('Lazy evaluation', function (assert) {
        assert.equal(lazySumOneAndTwo(), 3,
            'lazySumOneAndTwo() call should return 3');
        assert.equal(lazySumOneAndTwo(3), 3,
            'lazySumOneAndTwo(3) call should return 3');
        assert.equal(lazySumOneAndTwo(8, 8), 3,
            'lazySumOneAndTwo(8, 8) call should return 3');
        assert.equal(counter, 1,
            'After 3 calls of lazySumOneAndTwo, counter should be equal 1');
    });

    counter = 0;

    function inc(arg) {
        counter++;
        switch (arg) {
            case undefined: return undefined;
            case null: return null;
            default: return ++arg;
        }
    }

    var  memoInc = tasks.memoize(inc);
    var  memoSum = tasks.memoize(sum);

    QUnit.test('Memoization', function (assert) {
        assert.equal(memoSum({a:1, b:2}), 3,
            'memoSum({a:1, b:2}) call should return 3');
        assert.equal(memoSum({a:1, b:2}), 3,
            'memoSum({a:1, b:2}) call should return 3');
        assert.equal(counter, 1,
            'After 2 calls of memoSum({a:1, b:2}), counter should be equal 1');
        assert.equal(memoSum({c:2, b:2}), 4,
            'memoSum({c:2, b:2}) call should return 4');
        assert.equal(memoSum({c:2, b:2}), 4,
            'memoSum({c:2, b:2}) call should return 4');
        assert.equal(memoSum({}), 0,
            'memoSum({}) call should return 0');
        assert.equal(memoSum({}), 0,
            'memoSum({}) call should return 0');
        assert.equal(counter, 3,
            'After 2 calls of memoSum({a:1, b:2}), 2 calls of memoSum({c:2, b:2})' +
            ' and 2 calls of memoSum({}), counter should be equal 3');

        counter = 0;

        assert.equal(memoInc(1), 2,
            'memoInc(1) call should return 2');
        assert.equal(memoInc(1), 2,
            'memoInc(1) call should return 2');
        assert.equal(counter, 1,
            'After 2 calls of memoInc(1), counter should be equal 1');
        assert.equal(memoInc(undefined), undefined,
            'memoInc(undefined) call should return undefined');
        assert.equal(memoInc(undefined), undefined,
            'memoInc(undefined) call should return undefined');
        assert.equal(counter, 2,
            'After 2 calls of memoInc(1) and 2 calls memoInc(undefined),' +
            ' counter should be equal 2');
        assert.equal(memoInc(null), null,
            'memoInc(null) call should return null');
        assert.equal(memoInc(null), null,
            'memoInc(null) call should return null');
        assert.equal(counter, 3,
            'After 2 calls of memoInc(1), 2 calls memoInc(undefined) and' +
            '2 calls of memoInc(null), counter should be equal 3');
    });

});
