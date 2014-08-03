<?php
 /*
	 Plugin Name: WP-ImagePlate
	 Plugin URI: https://thomas-leister.de/wp-imageplate/
	 Description: Show your 3D Models
	 Author: Thomas Leister
	 Version: 0.1
	 Author URI: https://thomas-leister.de
	 
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


/* 
 * This Wordpress Plugin converts the WP Shortcode into HTML
 * Shortcode example: [imageplate src="images/image-[num].jpg" count=36]
 * */


function translate_imageplate_shortcode($attr) {
	$width = $attr['width'];
	$height = $attr['height'];
	$upload_dir = wp_upload_dir();
	$upload_dir = $upload_dir['baseurl'];	
	$scheme = $attr['src'];	
	$imageurl = $upload_dir."/".$scheme;
	$count = $attr['count'];
	$firstpicurl = str_replace("{num}", "1", $imageurl);
	
	$icons_base_url = plugin_dir_url( __FILE__ )."/icons/";
	$icons = Array();
	$icons['back'] = $icons_base_url."back.png";
	$icons['start'] = $icons_base_url."start.png";
	$icons['next'] = $icons_base_url."next.png";
	
	/* String containing HTML for all images */
	
	for($i=2; $i<=$count; $i++){
		$cururl = str_replace("{num}", $i, $imageurl);
		$allimages=$allimages."<img src=\"".$cururl."\"/>";
	}
		
	$imageplatehtml = 	"
						<div class=\"imageplate-wrapper\">
							<noscript><p class=\"imageplate-nojs\">Please notice: <b>Javascript</b> is required to grab and turn the 3D model above.</p></noscript>
							<div class=\"imageplate\">
								<img class=\"show\" src=\"".$firstpicurl."\"/>
								".$allimages."
								<span class=\"imagescheme\">
									".$imageurl."
								</span>
								<span class=\"imagecount\">
									".$count."
								</span>
								<div class=\"ip-loading\">
									<p>ImagePlate is loading images ...</p>
								</div>
							</div>
							
							<div class=\"ip-provided-by\">
								provided by WP-ImagePlate.
							</div>
						</div>";
	
	return $imageplatehtml;
}


function include_imageplate_css(){
	wp_enqueue_style( 
		'imageplate-css', 
		plugins_url('css/imageplate.css', __FILE__) 
	);
}


/* Link the ImagePlate JS file */

function include_imageplate_js() {
	wp_enqueue_script(
		'imageplate-js',
		plugins_url( '/js/imageplate.js' , __FILE__ ),
		array(),
		false,
		true
	);
	include_imageplate_css();
}



add_action( 'wp_enqueue_scripts', 'include_imageplate_js' );
add_shortcode( 'imageplate', 'translate_imageplate_shortcode' );
