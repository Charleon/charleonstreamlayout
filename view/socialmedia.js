'use strict';

$(function () {
    // pass data straight into our function that handles it, preferred for simplicity

    var isRunEndAnimationPlaying = false;
	// This part fetches the pictures from the <img> tags and passes it into the SuperGif library. What this does is that we can show it
    // WHen we like (it's hidden when we first load it) and also play it from a beginning and play it from a special frame.
    var shoryukenPicture = new SuperGif({ gif: document.getElementById('shoryukenpic'), draw_while_loading: false,  loop_delay:0, on_end:hideShoryuken} );
	shoryukenPicture.load(shoryukenLoaded);

    var objectionPicture = new SuperGif({ gif: document.getElementById('objectionpic'), draw_while_loading: false,  loop_delay:500, on_end:hideObjection} );
    objectionPicture.load(objectionLoaded);

    var headbuttPicture = new SuperGif({ gif: document.getElementById('headbuttpic'), draw_while_loading: false,  loop_delay:500, on_end:hideHeadbutt} );
    headbuttPicture.load(headbuttLoaded);

    var bowserElement = document.getElementById("bowserpic");
    bowserElement.style.opacity = "0";

    // This part listens for the keylogger input. If there is anything we'd need triggered by a keyboard input, we should
    // Do it here!
	nodecg.listenFor('keyEvent', function (key) {
	  switch (key.keyName) {
	    case 'NumPad3':
          playRunReset();
	      break;
	    case 'NumPad1':
	      hideCrackedWindow();
	      break;
        case 'NumPad2':
            console.log(shoryukenPicture.get_playing());
            break;
	  }
	});

    //This part listens for signalling from the dashboard
    nodecg.listenFor('socialmediaIn', showLinks);
    nodecg.listenFor('socialmediaOut', hideLinks);
    nodecg.listenFor('socialmediaPulse', function (duration) {
        showLinks();
        setTimeout(hideLinks, (1000 * duration));
    });

    // Initializing sounds
    $.ionSound({
        sounds: [           // set needed sounds names
            'socialmedia_in-v2',
            'socialmedia_out-v2'
        ],
        path: 'snd/',       // set path to sounds
        multiPlay: true,    // can play multiple sounds at once
        volume: '0.15'      // not so loud please
    });

    // When pictures are loaded, be sure to pause them
    function shoryukenLoaded()
    {
        shoryukenPicture.pause();
    }

    function headbuttLoaded()
    {
        headbuttPicture.pause();
    }

    function objectionLoaded()
    {
        objectionPicture.pause();
    }

    // Function used to make the cracked window shake
    function shakeAnimation(element){
        TweenMax.to(element, .01, {
            x: -7,
            ease: Quad.easeInOut
        });
        TweenMax.to(element, .01, {
            repeat: 4,
            x: 7,
            yoyo: true,
            delay: .01,
            ease: Quad.easeInOut
        });
        TweenMax.to(element, .01, {
            x: -7,
            ease: Quad.easeInOut
        });
        TweenMax.to(element, .01, {
            repeat: 4,
            x: 7,
            yoyo: true,
            delay: .01,
            ease: Quad.easeInOut
        });
        TweenMax.to(element, .01, {
            x: 0,
            delay: .01 * 4
        });
    }

    function playRunReset(){
        if(!isRunEndAnimationPlaying) {
            var random = Math.random();
            if (random <= 0.25) {
                showObjection();
            }
            else if(random <= 0.5){
                showShoryuken();
            }
            else if(random < 0.75) {
                showHeadbutt();
            }
            else {
                showBowser();
            }
            isRunEndAnimationPlaying = true;
        }
    }

/* Shoryuken Run reset *****************************************************************/

    function showShoryuken() {
        if(!shoryukenPicture.get_loading()) {
            var shoryukenElement = document.getElementById("shoryuken");
            shoryukenElement.style.opacity = "1";
            shoryukenPicture.move_to(0);
            shoryukenPicture.play();
            showCrackedWindow(0);
        }
    }

    function hideShoryuken() {
        shoryukenPicture.pause();
        var tm = new TimelineMax({paused: true});
        tm.to($('#shoryuken'), 0.15, {opacity: '0', ease: Quad.easeOut}, '0.0');
        tm.play();
        hideCrackedWindow();
    }

    /* Objection Run reset *****************************************************************/
    function showObjection() {
        if(!objectionPicture.get_loading()){
            var objectionElement = document.getElementById("objection");
            objectionElement.style.opacity = "1";
            objectionPicture.move_to(0);
            objectionPicture.play();
            showCrackedWindow(1);
        }
    }

    function hideObjection() {
        objectionPicture.pause();
        var tm = new TimelineMax({paused: true});
        tm.to($('#objection'), 0.15, {opacity: '0', ease: Quad.easeOut}, '0.0');
        tm.play();
        hideCrackedWindow();
    }

    /* Headbutt Run reset *****************************************************************/

    function showHeadbutt() {
        if(!headbuttPicture.get_loading()){
            var headbuttElement = document.getElementById("headbutt");
            headbuttElement.style.opacity = "1";
            headbuttPicture.move_to(0);
            headbuttPicture.play();
            showCrackedWindow(2);
        }
    }

    function hideHeadbutt() {
        headbuttPicture.pause();
        var tm = new TimelineMax({paused: true});
        tm.to($('#headbutt'), 0.15, {opacity: '0', ease: Quad.easeOut}, '0.0');
        tm.play();
        hideCrackedWindow();
    }

    /* Headbutt Run reset *****************************************************************/

    function showBowser() {
        showCrackedWindow(3);
        var tm = new TimelineMax({paused: true});
        tm.to($('#bowserpic'), 0.75, {height: '300', width: '300',  opacity:1, ease: Quad.easeOut, onComplete:hideBowser}, '0.0');
        tm.play();
    }


    function hideBowser() {
        var bowserElement = document.getElementById("bowser");
        bowserElement.style.opacity = "1";

        shakeAnimation(bowserElement);

        var tm = new TimelineMax({paused: true});
        tm.to($('#bowserpic'), 0.75, {height: '32', width: '32', opacity:0,  ease: Quad.easeOut, onComplete:hideCrackedWindow}, '0.5');
        tm.play();
        isRunEndAnimationPlaying = false;
    }

    /* behaviour should maybe be an enum to be more intuitive. based on the behaviour the screen cracks
    at different times, e.g during shoryuken or objection animation
     */
	function showCrackedWindow(behaviour) {
        var crackedWindowElement = document.getElementById("crackedwindow");
		var tm = new TimelineMax({paused: true});

        switch(behaviour)
        {
            case 0:
                //add our tweens to the timeline
                tm.to($('#crackedwindow'), 0.15, {opacity: '0.25', ease: Quad.easeOut, onStart:shakeAnimation, onStartParams: [crackedWindowElement]}, '0.0');
               // shakeAnimation(crackedWindowElement);
                tm.to($('#crackedwindow'), 0.15, {opacity: '0.50', ease: Quad.easeOut, onStart:shakeAnimation, onStartParams: [crackedWindowElement]}, '0.7');
               // shakeAnimation(crackedWindowElement);
                tm.to($('#crackedwindow'), 0.15, {opacity: '1.0', ease: Quad.easeOut, onStart:shakeAnimation, onStartParams: [crackedWindowElement]}, '1.3');

                break;
            case 1:
                tm.to($('#crackedwindow'), 0.15, {opacity: '1', ease: Quad.easeOut, onStart:shakeAnimation, onStartParams: [crackedWindowElement]}, '0.3');
                break;
            case 2:
                tm.to($('#crackedwindow'), 0.15, {opacity: '1', ease: Quad.easeOut, onStart:shakeAnimation, onStartParams: [crackedWindowElement]}, '1.05');
                break;
            case 3:
                tm.to($('#crackedwindow'), 0.15, {opacity: '1', ease: Quad.easeOut, onStart:shakeAnimation, onStartParams: [crackedWindowElement]}, '0.75');
                break;
            default:
                console.log("not supported!")
                return;
                break;
        }

        tm.play();
	}
	function hideCrackedWindow() {
        var tm = new TimelineMax({paused: true});
		//add our tweens to the timeline
		tm.to($('#crackedwindow'), 0.15, {opacity: '0', ease: Quad.easeOut}, '0.0');
        tm.play();
        isRunEndAnimationPlaying = false;
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

