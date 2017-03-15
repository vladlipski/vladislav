var ajaxLogger = (function() {

    var settings = {
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
    };

    var startLogging = function () {
        XMLHttpRequest.prototype._open = XMLHttpRequest.prototype.open;

        XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
            this.addEventListener("error", settings.onError, false);
            this.addEventListener("load", settings.onLoad, false);
            this.addEventListener('progress', function(oEvent) {
                if (oEvent.lengthComputable) {
                    var progress = Math.ceil(oEvent.loaded / oEvent.total * 100);
                    settings.onProgress(progress);
                }
            }, false);
            this.addEventListener('abort', settings.onAbort, false);
            this._open(method, url, async, user, password);
        };

        XMLHttpRequest.prototype._send = XMLHttpRequest.prototype.send;

        XMLHttpRequest.prototype.send = function(data) {
            settings.onStart();
            this._send(data);
        };
    };

    var initialize = function(options) {
        settings = $.extend(settings, options);
        startLogging();
    };

    return {
        initialize: initialize
    }

})();