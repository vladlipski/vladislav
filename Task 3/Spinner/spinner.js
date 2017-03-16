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
            if(!settings.spinnerElement.hasClass( 'spinner' )) {
                settings.spinnerElement.addClass('spinner');
            }
        }

        $this.showSpinner = function() {
            if (spinnerCount == 0) {
                if (settings.blockUi) {
                    $this.append(spinnerWrapper);
                } else {
                    $this.append(settings.spinnerElement);
                }
            }
            spinnerCount++;
        };

        $this.hideSpinner = function() {
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

        $this.wrapSpinner = function(promise) {
            $this.showSpinner();
            return promise.done($this.hideSpinner);
        };

        initializeSpinnerClass();
        return $this;
    };

}( jQuery ));
