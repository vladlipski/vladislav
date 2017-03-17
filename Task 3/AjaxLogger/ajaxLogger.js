var ajaxLogger = (function() {

    var defaultSettings = {};

    var startLogging = function () {
        var xhr = new window.XMLHttpRequest();
        xhr.addEventListener('progress', function(oEvent) {
            if (oEvent.lengthComputable) {
                var progress = Math.ceil(oEvent.loaded / oEvent.total * 100);
                defaultSettings.onProgress(progress);
            }
        });
        $.ajaxSetup({
            xhr: function (xhr) {
                xhr = new window.XMLHttpRequest();
                xhr.addEventListener('progress', function(oEvent) {
                    if (oEvent.lengthComputable) {
                        var progress = Math.ceil(oEvent.loaded / oEvent.total * 100);
                        defaultSettings.onProgress(progress);
                    }
                });
                return xhr;
            }
        });
        $(document).ajaxStart(defaultSettings.onStart);
        $(document).ajaxError(defaultSettings.onError);
        $(document).ajaxComplete(defaultSettings.onLoad);
    };

    var initialize = function(settings) {
        defaultSettings = $.extend({
            onStart: function() {
                console.log("start");
            },
            onProgress: function(progress) {
                console.log("progress " + progress + "%");
            },
            onError: function( event, jqxhr, settings, thrownError ) {
                console.log(thrownError);
            },
            onLoad: function() {
                console.log("done");
            }
        }, settings);
        startLogging();
    };

    var destroy = function () {
        $(document).off('ajaxStart');
        $(document).off('ajaxError');
        $(document).off('ajaxComplete');
        $.ajaxSetup({
            xhr: function (xhr) {
                xhr = new window.XMLHttpRequest();
                return xhr;
            }
        });
    };

    return {
        initialize: initialize,
        destroy: destroy
    }

})();