  var i = 0;
  var vidplays = 0;
  var video = document.getElementById('lrvideo');
  jQuery.fn.preload = function() {
      this.each(function() {
          jQuery("<img/>")[0].src = this;
          i++;
          if (i == 2) {
              jQuery("#scratchArea-landscape, #scratchArea-portrait").css("opacity", "1");
          }
      });
  }

  function loadScratchCard() {
      jQuery("#scratchArea-landscape, #scratchArea-portrait").ScratchCard({
          revealRadius: 40,
          revealOnComplete: false,
          updateOnMouseMove: false,
          updateOnFingerMove: false,
          onScratchComplete: function(percentScratched) {
              console.log(percentScratched);
          },
      });
  }

  jQuery(document).ready(function() {

      $('#lrvideoclose').bind('tap', lrclosevid );

      jQuery(window).on("orientationchange", function(event) {
          if (event.orientation == "landscape") {
              video.width = 780;
              video.height = 439;
          } else {
              video.width = 558;
              video.height = 314;
          }
      });

      if (window.innerHeight > window.innerWidth) {

          video.width = 558;
          video.height = 314;
      } else {
          video.width = 780;
          video.height = 439;
      }

      var swipecount = 0;
      jQuery('#adContainer').fadeIn('slow');
      jQuery(["./images/portrait-dirty.jpg", "./images/portrait-clean.jpg", "./images/landscape-dirty.jpg", "./images/landscape-clean.jpg"]).preload();
      loadScratchCard();


      box1 = document.getElementById('container');
      box1.addEventListener('touchend', function(e) {
          if (swipecount == 0) loadVid();
          swipecount++;
          e.preventDefault()
      }, false);

      box1.addEventListener('touchstart', function(e) {
          if (swipecount == 0) jQuery('.lrtext').fadeOut('fast', function() {
              jQuery(this).html("<div id='textline-1'>Range Rover Evoque</div><div id='textline-2' class='textlines'>Plus Qu'une Belle BÊte</div>").fadeIn('fast')
          });
          e.preventDefault()
      }, false);

  });

  function renderCopy() {
      if (vidplays <= 1) {
          jQuery('.lrtext').append("<a target='_blank' href='http://landrover.com'><div id='textline-3'>Comme tous les véhicules Land Rover, le Range Rover Evoque 2013 optimise performances et capacités sous toutes les conditions, sur route come hors route. D'une allure compacte et audacieuse, c'est le Land Rover le plus efficace jamais construit.</div><div id='textline-4'>CTA<br>xx% Extra Copy</div></a><div id='textline-5' onclick='loadVid()'></div>");
          jQuery('#textline-3, #textline-4, #textline-5').fadeIn();
      }
  }


  function loadVid() {
      vidplays++;
      jQuery('.scratchCanvas').animate({
          'opacity': 0
      });
      jQuery('#lrplayer').fadeIn('slow', function() {
          video.play();
      });
  }

  function lrclosevid() {
      video.pause();
      if (video.currentTime != 0) video.currentTime = 0;
      jQuery('#lrplayer').fadeOut();
      renderCopy();
  }

  video.onended = function(e) {
      jQuery('#lrplayer').fadeOut('slow', function() {
          renderCopy();
      });
  };