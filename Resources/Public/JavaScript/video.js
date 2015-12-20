/**
 * @author Sven Wappler
 */


;$(document).ready(function () {
	
	$('.video-js').each(function() {
		
		videojs(this, {"height":"auto", "width":"auto"}).ready(function(){
		  var myPlayer = this;    // Store the video object
		  var aspectRatio = 8/12; // Make up an aspect ratio
		
		  function resizeVideoJS(){
		    // Get the parent element's actual width
		    var width = document.getElementById(myPlayer.id()).parentElement.offsetWidth;
		    // Set width to fill parent element, Set height
		    myPlayer.width(width).height( width * aspectRatio );
		  }
		
		  resizeVideoJS(); // Initialize the function
		  window.onresize = resizeVideoJS; // Call the function on resize
		});

		
	});



});
