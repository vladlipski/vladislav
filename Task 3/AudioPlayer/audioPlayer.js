(function ( $ ) {

    $.fn.audioPlayer = function() {
        $('.audio-player__track').slider();
        $('.audio-player__volume').slider();
        return this;
    };

}( jQuery ));
