/*
 * jQuery Britorize Plugin 1.0
 * gustavo.sillero.net
 * Copyright 2012, Gustavo Sillero
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * ---------------------------------------------------------------------------
 * Based on jQuery Raptorize Plugin 1.0
 * www.ZURB.com/playground
*/


(function($) {

    $.britorize = function(options) {

        //Yo' defaults
        var defaults = { 
			el: [],
            konami: true,
			timer: 0
        };  
        
        //Extend those options
        var options = $.extend(defaults, options); 
	
		var plugin = this,
		audioSupported = false;
		//Stupid Browser Checking which should be in jQuery Support
		audioSupported = ($.browser.mozilla && $.browser.version.substr(0, 5) >= "1.9.2" || $.browser.webkit);
		
		//Raptor Vars
		var britoImageMarkup = '<img id="brito" style="display: none" src="js/brito.png" />',
		britoAudioMarkup = [ '<audio id="brito-sound-boatarde" preload="auto"><source src="js/sounds/brito-sound-boatarde.mp3" /><source src="js/sounds/brito-sound-boatarde.ogg" /></audio>',
									   '<audio id="brito-sound-feito" preload="auto"><source src="js/sounds/brito-sound-feito.mp3" /><source src="js/sounds/brito-sound-feito.ogg" /></audio>' ] ,
		locked = false;
		
		//Append Raptor and Style
		$('body').append(britoImageMarkup);
		if(audioSupported)
			$.each(britoAudioMarkup,function(k,v){
				$('body').append(v);
			});
		var elBrito = $('#brito').css({
			position: 'fixed',
			right : 0
		})
		
		// Animating Code
		plugin.init = function(s) {
			//s = sound suffix
			var s = s || 'boatarde';
			locked = true;
		
			//Sound Hilarity
			if(audioSupported) { 
				function playSound() {
					document.getElementById('brito-sound-'+s).play();
				}
				playSound();
			}
							
			// Movement Hilarity	
			elBrito.css({ display: 'block', bottom: (0- $('#brito').height()) }).animate({
					bottom : 0
				}, 100, function() {
					var offset = (($(this).position().left)+$(this).width());
					$(this).delay(300).animate({
						right: offset
					}, 2200, function() {
						elBrito = $('#elBrito').css({
							bottom: (0- $('#brito').height()),
							right : 0,
							display : 'none'
						})
						locked = false;
					})
				});
		}
		
		
		//Determine Entrance
		if(options.timer) {
			setTimeout(init, options.timer);
		}
		if(options.el.length) {
			options.el.bind('click', function(e) {
				e.preventDefault();
				if(!locked) {
					plugin.init();
				}
			})
		}
		if(options.konami){
			var kkeys = [], konami = '38,38,40,40,37,39,37,39,66,65';
			$(window).bind('keydown.brito', function(e){
				kkeys.push( e.keyCode );
				if ( kkeys.toString().indexOf( konami ) >= 0 ) {
					kkeys = [];
					plugin.init();
				}
			});

		}
		
	
    }
})(jQuery);

