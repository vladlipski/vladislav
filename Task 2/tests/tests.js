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

});
