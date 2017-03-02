require.config({
    baseUrl: '.',
    paths: {
        'tests': ['tests/tests'],
        'testLib': ['tests/testLib']
    }
});

require(['tests']);