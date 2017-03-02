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

});
