/*
	 Copyright 2014 Thomas Leister
	
	 Licensed under the Apache License, Version 2.0 (the "License");
	 you may not use this file except in compliance with the License.
	 You may obtain a copy of the License at
	
	 http://www.apache.org/licenses/LICENSE-2.0
	
	 Unless required by applicable law or agreed to in writing, software
	 distributed under the License is distributed on an "AS IS" BASIS,
	 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 See the License for the specific language governing permissions and
	 limitations under the License.
 */

function imagePlate(ipdiv){
	var currentpic;
	var picbefore;
	var imageplate;
	var mousetracker;
	var imagecount;
	var loadedimages = 0;
	var imagescheme;
	var images = new Array();
	var mousedown = false;
	var prevmouseposx;
	var stack = 0;
	var stacksize = 4;
	
	function log(message){
		console.log("Instance "+ipdiv+" says: "+message);
	}
	
	function removeLoadingScreen(){
		log("Removing loading screen ...");
		loadingscreen = imageplate.getElementsByClassName('ip-loading')[0];
	    imageplate.removeChild(loadingscreen);
	}
	
	function preloadImages(imgarr) {
	    if (!preloadImages.list) {
	        preloadImages.list = [];
	    }
	    for (var i = 0; i < imgarr.length; i++) {
	        var img = new Image();
	        img.onload = function() {
	            var index = preloadImages.list.indexOf(this);
	            loadedimages++;
	            loadingscreen = imageplate.getElementsByClassName('ip-loading')[0];
	            loadingscreen_html = "<p>ImagePlate is loading images ("+loadedimages+" of "+imagecount+")</p>";
	            loadingscreen.innerHTML = loadingscreen_html;
	            if(loadedimages == imagecount){
	            	// Remove the loading screen
	            	log("All images loaded and ready.");
	            	removeLoadingScreen();
	            }
	        };
	        preloadImages.list.push(img);
	        img.src = imgarr[i];
	    }
	}
	
	this.setupImageplate = function(){
		log("Setting up imageplate with DIV ID "+ipdiv);
		imageplate = document.getElementById(ipdiv);
		imagescheme = imageplate.getElementsByClassName('imagescheme')[0].innerHTML;
		imagecount = imageplate.getElementsByClassName('imagecount')[0].innerHTML.valueOf();
		imagecount = parseInt(imagecount);
		
		// Remove Spaces in front of the HTML
		imagescheme = imagescheme.replace(/\s+/g, '');
		
		log("Image scheme: "+imagescheme);
		log("ImagePlate div ID: "+ipdiv);
		log("Number of images: "+imagecount);
		
		// Fill up the array
		log("Filling up the images array.");
		for(i=0; i<imagecount; i++){
			images[i] = imagescheme.replace("{num}", i+1);
		}
		
		preloadImages(images);
	};
	
	function changePicTo(num){
		if(num >= imagecount || num < 0){
			alert("Impossible to change picture to number "+num+"!");
		}
		
		//log("Changing Pic.");

		// Currentpic "show" geben
		currentpic_element = document.getElementById(ipdiv+"-img-"+num);
		currentpic_element.className = "show";
		
		// Picbefore "show" entziehen
		picbefore_element = document.getElementById(ipdiv+"-img-"+picbefore);
		if(!!picbefore_element){picbefore_element.className = "";}
	}
	
	function forwards(){
		//log("moving forwards");
		picbefore = currentpic;
		currentpic++;
		if(currentpic > imagecount-1){
			currentpic = 0;
		}
		changePicTo(currentpic);
	}
	
	function backwards(){
		//log("moving backwards");
		picbefore = currentpic;
		currentpic--;
		if(currentpic < 0){
			currentpic = imagecount-1;
		}
		changePicTo(currentpic);
	}
	
	
	// How many pixels of movement are needed to perform a "forward/Backward step?"
	function addToMovementStack(direction){
		if(direction == "forwards"){
			stack++;
		}
		
		else{
			stack--;
		}
		
		if(stack == stacksize){
			forwards();
			stack = 0;
		}
		else if(stack == -stacksize){
			backwards();
			stack = 0;
		}
	}
	
	
	function processMouseActions(currentClientX){
		// current Client X contains the X-Coord of the present mouse position
		if(prevmouseposx > currentClientX){
			//console.log("Forward");
			addToMovementStack("forwards");
		}
		
		else if(prevmouseposx < currentClientX){
			//console.log("Backwards");
			addToMovementStack("backwards");
		}
	}
	
	function loadDOM(){
		// Lädt alle Bilder ins DOM
		var html = "";
		
		for(i=0; i < images.length; i++){
			html = html+"<img id=\""+ipdiv+"-img-"+i+"\" src=\""+images[i]+"\"/> ";
		}
		
		html = html+"<div class='ip-loading'><p>ImagePlate is loading images (0 of "+imagecount+")</p></div>";
		
		html = html+"<div class='mouse-tracker'></div>";
		
		imageplate.innerHTML = html;
	}
	
	
	this.initialize = function(){
		log("Initializing imageplate with DIV ID "+ipdiv);
		log("Loading images into DOM");
		loadDOM();
		
		log("Showing first pic");
		changePicTo(0);
		currentpic = 0;
		picbefore = imagecount-1;
		
		mousetracker = imageplate.getElementsByClassName('mouse-tracker')[0];
					
		mousetracker.onmousedown = function(event){
			event.preventDefault();
			//log("mousedown");		
			mousedown = true;
		};
		
		mousetracker.onmouseup = function(event){
			event.preventDefault();
			//log("mouseup");		
			mousedown = false;
			stack = 0; // Make stack neutral
		};
		
		mousetracker.onmousemove = function(event){
				//log("Mouse move event");
				if(mousedown){
					//log("Mouse drag");
					processMouseActions(event.clientX);
					prevmouseposx = event.clientX;
				}	
		};
		
		mousetracker.onmouseleave = function(event){
			log("mouseout, disabling movement");			
			mousedown = false;
			stack = 0; // Make stack neutral
		};
	};
	
	this.setupImageplate();
	this.initialize();
};

function detect_imageplates(){
	imageplates = document.getElementsByClassName("imageplate");
	instances = new Array();
	
	for(ic=0; ic<imageplates.length;ic++){
		imageplateid = "imageplate-"+ic;
		console.log("Detected new instance nr. "+ic+" ... giving DIV ID "+imageplateid);		
		imageplates[ic].id = imageplateid;
		instances[ic] = new imagePlate(imageplateid);
	}
}

/* Show loading screen for every ImagePlate */
loadingscreens = document.getElementsByClassName("ip-loading");
for(i=0; i<loadingscreens.length; i++){
	loadingscreens[i].style.display = "block";
}

window.onload=detect_imageplates;
