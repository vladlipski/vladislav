(function ( $ ) {

    $.fn.audioPlayer = function(options) {

        var settings = $.extend({
            onplay: function() {
                console.log("play");
            },
            onpause: function() {
                console.log("pause");
            },
            onstop: function() {
                console.log("stop");
            },
            onvolume: function() {
                console.log('volume');
            },
            onseek: function() {
                console.log("seek");
            },
            onend: function() {
                console.log("end");
            },
            onload: function() {
                console.log("load");
            },
            onloaderror: function() {
                console.log("load error");
            }
        }, options );

        $this = this;
        var playButton = {};
        var pauseButton = {};
        var progressSlider = {};
        var currentTimeElement = {};
        var totalTimeElement = {};
        var totalTime = 0;
        var timer = {};

        function formatTime(sec) {
            if (sec >= 0) {
                min = Math.floor(sec / 60);
                min = (min >= 10) ? min : "0" + min;
                sec = Math.floor(sec % 60);
                sec = (sec >= 10) ? sec : "0" + sec;
                return min + ":" + sec;
            }
        }

        function initializeTime() {
            currentTimeElement = $('.audio-player__time_current');
            totalTimeElement = $('.audio-player__time_total');
        }

        function playPause(){
            var player = $this.player;
            if (player.paused === true){
                player.play();
                player.paused = false;
                playButton.trigger('focus');
            } else if (player.paused === false){
                player.pause();
                player.paused = true;
                pauseButton.trigger('focus');
            }
        }

        function setTotalTime(duration) {
            totalTime = duration;
            totalTimeElement.text(formatTime(totalTime));
        }

        function initializePlayer() {
            player = new Howl({
                src: [settings.src],
                autoplay: false,
                loop: false,
                onplay: settings.onplay,
                onpause: settings.onpause,
                onstop: settings.onstop,
                onvolume: settings.onvolume,
                onseek: settings.onseek,
                onend: function() {
                    updateProgress();
                    $this.player.paused = true;
                    settings.onend();
                },
                onload: function() {
                    setTotalTime(player.duration());
                    settings.onload();
                },
                onloaderror: settings.onloaderror
            });
            player.playPause = playPause;
            player.paused = true;
            player.allowUpdate = true;
            $this.player = player;
        }
        
        function initializeSliders() {
            progressSlider = $('.audio-player__track');
            progressSlider.slider({
                start: function() {
                    $this.player.allowUpdate = false;
                },
                stop: function() {
                    $this.player.allowUpdate = true;
                    $this.player.seek(totalTime * progressSlider.slider('value') / 100);
                    updateProgress();
                }
            });
            $('.audio-player__volume').slider({
                value: 100,
                slide: function () {
                    $this.player.volume($this.find(".audio-player__volume").slider('value') / 100);
                }
            });
        }
        
        function initializePlayerTemplate() {
            var htmlOutput =
                '<button type="button" class="audio-player__button audio-player__button_play"></button>' +
                '<button type="button" class="audio-player__button audio-player__button_pause"></button>' +
                '<span class="audio-player__time audio-player__time_current">00:00</span>' +
                '<div class="slider audio-player__track"></div>' +
                '<span class="audio-player__time audio-player__time_total">00:00</span>' +
                '<div class="audio-player__speaker"></div>' +
                '<div class="slider audio-player__volume"></div>';

            $this.append(htmlOutput);
        }

        function initializeButtons() {
            playButton = $this.find('.audio-player__button_play');
            pauseButton = $this.find('.audio-player__button_pause');
            playButton.on('click', function() {
                $this.player.playPause();
            });
            pauseButton.on('click', function() {
                $this.player.playPause();
            });
        }

        function updateProgress() {
            var player = $this.player;
            if (!player.paused && player.allowUpdate) {
                progressSlider.slider('value', player.seek() / totalTime * 100);
            }
            currentTimeElement.text(formatTime(player.seek()));

        }

        function initializeTimer() {
            timer = setInterval(updateProgress, 1000);
        }

        function initialize() {
            initializePlayerTemplate();
            initializeSliders();
            initializeTime();
            initializePlayer();
            initializeButtons();
            initializeTimer();
        }

        initialize();
        return $this;
    };

}( jQuery ));
