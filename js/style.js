 window.document.onkeydown = function(e) {
       if (!e) {
         e = event;
       }
       if (e.keyCode == 27) {
         lightbox_close();
       }
      }
      
      function lightbox_open() {
       $("#light").fadeIn(2000);
       var lightBoxVideo = document.getElementById("VisaChipCardVideo");
       document.getElementById('light').style.display = 'block';
       document.getElementById('fade').style.display = 'block';
       lightBoxVideo.play();
      }
      
      function lightbox_close() {
      
       var lightBoxVideo = document.getElementById("VisaChipCardVideo");
       document.getElementById('light').style.display = 'none';
       document.getElementById('fade').style.display = 'none';
       lightBoxVideo.pause();
      }

