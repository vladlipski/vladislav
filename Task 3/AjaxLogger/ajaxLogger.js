var ajaxLogger = (function() {

    var defaultSettings = {};

    var startLogging = function () {
        XMLHttpRequest.prototype._open = XMLHttpRequest.prototype.open;

        XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
            this.addEventListener("error", defaultSettings.onError, false);
            this.addEventListener("load", defaultSettings.onLoad, false);
            this.addEventListener('progress', function(oEvent) {
                if (oEvent.lengthComputable) {
                    var progress = Math.ceil(oEvent.loaded / oEvent.total * 100);
                    defaultSettings.onProgress(progress);
                }
            }, false);
            this.addEventListener('abort', defaultSettings.onAbort, false);
            this._open(method, url, async, user, password);
        };

        XMLHttpRequest.prototype._send = XMLHttpRequest.prototype.send;

        XMLHttpRequest.prototype.send = function(data) {
            defaultSettings.onStart();
            this._send(data);
        };
    };

    var initialize = function(settings) {
        defaultSettings = $.extend({
            onStart: function() {
                console.log("start");
            },
            onProgress: function(progress) {
                console.log("progress " + progress + "%");
            },
            onError: function() {
                console.log("error");
            },
            onLoad: function() {
                console.log("done");
            },
            onAbort: function() {
                console.log("abort");
            }
        }, settings);
        startLogging();
    };

    return {
        initialize: initialize
    }

})();