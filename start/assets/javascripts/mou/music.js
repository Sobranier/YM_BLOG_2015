define(['jquery'], function ($) {

    var Music = {
        player: $('.J-audio')[0];
    
    
    }

    var player = $('.J-audio')[0];

    function bindAudio(player) {
        player.onplay = function () {
            console.log('开始');
        }
        player.onpause = function () {
            console.log('暂停');
        }

        player.onended = function () {
            console.log('结束');
        }
    }

    function bindControll() {

        $('body').delegate('.J-plus', 'click', function() {
            if (!player) {
                return ;
            }
            player.src = "http://m1.music.126.net/v57f7s0dBfSfFunYgyuw-g==/2754276627626314.mp3";
        });

        $('body').delegate('.J-status', 'click', function() {
            if (!player) {
                return;
            }
            if (player.paused) {
                player.play();
            } else {
                player.pause();
            }
            console.log(parseInt(player.currentTime) + ': 秒');
            console.log(player.duration + ': 秒');
            console.log(player.volume);
            
        });

    }

    $(function(){
        bindControll();
        bindAudio(player);
    })

});

