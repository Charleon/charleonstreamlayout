'use strict';

$(function () {
    // pass data straight into our function that handles it, preferred for simplicity
	var sup1 = new SuperGif({ gif: document.getElementById('shoryukenpic'), draw_while_loading: false,  loop_delay:2000, on_end:hideCrackedWindow} );
	sup1.load();
	sup1.pause();
	setTimeout(showLinks, (10 * 2));
	nodecg.listenFor('keyEvent', function (key) {
	  switch (key.keyName) {
	    case 'NumPad3':
	      showCrackedWindow();
	      break;
	    case 'NumPad1':
	      hideCrackedWindow();
	      break;
	  }
	});
    nodecg.listenFor('socialmediaIn', showLinks);
    nodecg.listenFor('socialmediaOut', hideLinks);
    nodecg.listenFor('socialmediaPulse', function (duration) {
        showLinks();
        setTimeout(hideLinks, (1000 * duration));
    });

    $.ionSound({
        sounds: [           // set needed sounds names
            'socialmedia_in-v2',
            'socialmedia_out-v2'
        ],
        path: 'snd/',       // set path to sounds
        multiPlay: true,    // can play multiple sounds at once
        volume: '0.15'      // not so loud please
    });
	function showCrackedWindow() {
		document.getElementById("shoryuken").style.opacity = "1";
		// play sound
		sup1.move_to(0);
		sup1.play();

		$.ionSound.play('socialmedia_in-v2');

		var tm = new TimelineMax({paused: true});

		//add our tweens to the timeline
		tm.to($('#crackedwindow'), 0.15, {opacity: '0.25', ease: Quad.easeOut}, '0.0');
		tm.to($('#crackedwindow'), 0.15, {opacity: '0.50', ease: Quad.easeOut}, '0.7');
		tm.to($('#crackedwindow'), 0.15, {opacity: '1.0', ease: Quad.easeOut}, '1.3');
		tm.play();
	}
	function hideCrackedWindow() {
		// play sound
		sup1.pause();
		$.ionSound.play('socialmedia_in-v2');
		var tm = new TimelineMax({paused: true});

		//add our tweens to the timeline
		tm.to($('#crackedwindow'), 0.15, {opacity: '0', ease: Quad.easeOut}, '0.0');
		tm.to($('#shoryuken'), 0.15, {opacity: '0', ease: Quad.easeOut}, '0.0');
		tm.play();
	}

    function showLinks() {
        // play sound
        $.ionSound.play('socialmedia_in-v2');

        var tm = new TimelineMax({paused: true});

        //add our tweens to the timeline
        tm.to($('#links'), 0.5, {top: '900px'}, '0');
        tm.to($('#linktext'), 0.7, {opacity: '1', ease: Quad.easeOut}, '0.5');
        tm.to($('#linktext'), 0.5, {top: '0px', ease: Quad.easeOut}, '0.175');

        tm.play();
		setTimeout(hideLinks, (1000 * 10));
    }

    function hideLinks() {
        //play sound
        $.ionSound.play('socialmedia_out-v2');

        var tm = new TimelineMax({paused: true});

        //add our tweens to the timeline
        tm.to($('#links'), 0.5, {top: '1100px'}, '0.4');
        tm.to($('#linktext'), 0.5, {opacity: '0', ease: Quad.easeOut}, '0');
        tm.to($('#linktext'), 0.5, {top: '0px', ease: Quad.easeOut}, '0.175');

        tm.play();
        setTimeout(showLinks, (600000));
    }
});

