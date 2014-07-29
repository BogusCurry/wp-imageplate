<?php
/*
Plugin Name: WP-ImagePlate
Plugin URI: https://thomas-leister.de/wp-imageplate
Description: Show your 3D Models 
Author: Thomas Leister
Version: 0.1
Author URI: https://thomas-leister.de
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
		
	$imageplatehtml = 	"
						<div class=\"imageplate-wrapper\">
							<div class=\"imageplate\" style=\"height:".$height."px; width:".$width."px;\">
								<noscript><p class=\"imageplate-nojs\">Warning: Please enable <b>Javascript</b> on this page to view the 3D images provided by ImagePlate.</p></noscript>
								<img class=\"show\" src=\"".$firstpicurl."\"/>
								<span class=\"imagescheme\">
									".$imageurl."
								</span>
								<span class=\"imagecount\">
									".$count."
								</span>
							</div>
							<div class=\"playernav\" style=\"width:".$width."px\">
							<img src=\"".$icons['back']."\">
							<img src=\"".$icons['start']."\">
							<img src=\"".$icons['next']."\">
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
