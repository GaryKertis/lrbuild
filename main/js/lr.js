	var i = 0;
  var vidplays = 0;
  var video = document.getElementById('lrvideo');
	$.fn.preload = function () {
	  this.each(function () {
	    $("<img/>")[0].src = this;
	    i++;
	    if(i == 2) {
	    	$("#scratchArea-landscape, #scratchArea-portrait").css("opacity", "1");
	    }
	  });
	}

  function loadScratchCard() {
    $("#scratchArea-landscape, #scratchArea-portrait").ScratchCard({
      revealRadius: 40,
      revealOnComplete: false,
      updateOnMouseMove: false,
      updateOnFingerMove: false,
      onScratchComplete: function(percentScratched) {
        console.log(percentScratched);
      },
    });
  }

	$(document).ready(function() {

    var swipecount = 0;
    $('#adContainer').fadeIn('slow');
		$(["./images/portrait-dirty.jpg", "./images/portrait-clean.jpg", "./images/landscape-dirty.jpg", "./images/landscape-clean.jpg"]).preload();
		loadScratchCard();


  box1 = document.getElementById('container');
   box1.addEventListener('touchend', function(e){
  if (swipecount==0) loadVid();
  swipecount++;
  e.preventDefault()
 }, false);

   box1.addEventListener('touchstart', function(e){
  if (swipecount==0) jQuery('.lrtext').fadeOut('fast', function(){jQuery(this).html("<div id='textline-1'>Range Rover Evoque</div><div id='textline-2'>Plus Qu'une Belle BÊte</div>").fadeIn('fast')});
  e.preventDefault()
 }, false);

	});



  function loadVid() {
    vidplays++;
    jQuery('.scratchCanvas').animate({'opacity': 0});
    jQuery('#lrplayer').fadeIn('slow', function(){
      video.play();
    });
  }



    video.onended = function(e) {
    jQuery('#lrplayer').fadeOut('slow', function(){
    if (vidplays <= 1) { 
      jQuery('.lrtext').append("<div id='textline-3'>Comme tous les véhicules Land Rover, le Range Rover Evoque 2013 optimise performances et capacités sous toutes les conditions, sur route come hors route. D'une allure compacte et audacieuse, c'est le Land Rover le plus efficace jamais construit.</div><div id='textline-4'>CTA<br>xx% Extra Copy</div><div id='textline-5' onclick='loadVid()'></div>");
      jQuery('#textline-3, #textline-4, #textline-5').fadeIn();
     }
    });
    };