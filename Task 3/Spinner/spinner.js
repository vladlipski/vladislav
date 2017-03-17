(function ( $ ) {

    $.fn.spinner = function(options) {
        var settings = $.extend({
            spinnerElement: $('<img class="spinner" src="img/default.gif">'),
            blockUi: false
        }, options );

        var spinnerCount = 0;
        var spinnerWrapper = $("<div class='spinner-wrapper'></div>").html(settings.spinnerElement);

        $this = this;

        function initializeSpinnerClass() {
            $this.css('position','relative');
            if(!settings.spinnerElement.hasClass('spinner')) {
                settings.spinnerElement.addClass('spinner');
            }
        }

        $this.show = function() {
            if (spinnerCount == 0) {
                if (settings.blockUi) {
                    $this.append(spinnerWrapper);
                } else {
                    $this.append(settings.spinnerElement);
                }
            }
            spinnerCount++;
        };

        $this.hide = function() {
            if (spinnerCount > 0) {
                spinnerCount--;
                if (spinnerCount == 0) {
                    if (settings.blockUi) {
                        $this.find(".spinner-wrapper").remove();
                    } else {
                        $this.find(".spinner").remove();
                    }
                }
            }
        };

        $this.wrap = function(promise) {
            $this.show();
            return promise.done($this.hide);
        };

        initializeSpinnerClass();
        return $this;
    };

}( jQuery ));
