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
	var imageplate;
	var imagecount;
	var imagescheme;
	var images = new Array();
	var mousedown = false;
	var prevmouseposx;
	var stack = 0;
	var stacksize = 4;
	var imageplate_index;
	
	function log(message){
		console.log("Instance "+ipdiv+" says: "+message);
	}
	
	this.setupImageplate = function(){
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
	};
	
	function changePicTo(num){
		if(num >= imagecount || num < 0){
			alert("Impossible to change picture to number "+num+"!");
		}
		
		// log("Changing Pic.");

		/* Dem aktuellen Bild einen niedrigeren Index geben. */
		present_image = imageplate.getElementsByClassName("show");
		
		for(i=0; i<present_image.length;i++){
			present_image[i].className = "";
		}
		
		// Alle Bilder die sichtbar sind (im normalfall eins) wieder ausblenden
		shown_elements = imageplate.getElementsByClassName("show");
		
		for(i=0; i<shown_elements.length;i++){
			shown_elements[i].className = "";
		}
		
		// Bei passendem Bild auf sichtbar schalten
		element = document.getElementById(ipdiv+"-img-"+num);
		// log("Searching for fitting Image ID");
		element.className = "show";
	}
	
	function forwards(){
		currentpic++;
		if(currentpic > imagecount-1){
			currentpic = 0;
		}
		changePicTo(currentpic);
	}
	
	function backwards(){
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
			//forwards();
			addToMovementStack("forwards");
		}
		
		else if(prevmouseposx < currentClientX){
			//console.log("Backwards");
			//backwards();
			addToMovementStack("backwards");
		}
	}
	
	function loadImages(){
		// Lädt alle Bilder ins DOM
		var html = "";
		
		for(i=0; i < images.length; i++){
			html = html+"<img id=\""+ipdiv+"-img-"+i+"\" src=\""+images[i]+"\"/> ";
		}
		
		imageplate.innerHTML = html;
	}
	
	function calcStackSize(){
		imgwidth = imageplate.style.width;
		imgwidth = parseInt(imgwidth);
		log("Image width: "+imgwidth);
		
		stacksize = (imgwidth / imagecount)/5;
		log("Stack size: "+stacksize);
		
		if(stacksize < 5){
			stacksize = 5;
			log("Stack value was too low, correcting ...");
		}
	}
	
	this.initialize = function(){
		log("Loading images into DOM");
		loadImages();
		
		log("Showing first pic");
		changePicTo(0);
		currentpic = 0;
		
		calcStackSize();
					
		imageplate.onmousedown = function(event){
			event.preventDefault();
			log("mousedown");
			
			mousedown = true;
		};
		
		imageplate.onmouseup = function(event){
			event.preventDefault();
			log("mouseup");
			
			mousedown = false;
			stack = 0; // Make stack neutral
		};
		
		imageplate.onmousemove = function(event){
				if(mousedown){
					// log("Mouse drag");
					processMouseActions(event.clientX);
					prevmouseposx = event.clientX;
				}	
		};
		
		imageplate.onmouseleave = function(event){
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
	
	for(i=0; i<imageplates.length;i++){
		imageplateid = "imageplate-"+i;
		console.log("Detected instance for DIV: "+imageplateid);
		imageplates[i].id = imageplateid;
		instances[i] = new imagePlate(imageplateid);
	}
}


detect_imageplates();
