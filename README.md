WP-ImagePlate Wordpress Plugin
=============

WP-ImagePlate helps you to show 3D Models online. Just upload some images, which show your model in every 360° angle. Then tell WP-Imageplate where to find the image collection and put the Shortcode into your article.

WP-Imageplate converts the shortcode to a special HTML area in which you can drag the model with your mouse. The plugin exchanges the pictures automatically, to a 360° view is shown to the user.

You can see an online example here (at the bottom of the page): [Camaro Model Download](https://matthias-leister.de/projekte/chevrolet-camaro-kostenloser-download/)

An example Shortcode in your Wordpress article can be:

[imageplate src="2014/05/Camaro{num}.png" count="36" height="360" width="720"]

"src" is the path to every image. Root directory of the path is "wp-uploads/". "{num}" is a placeholder for the ascending number. "count" gives the total number of images. "height" and "width" are the dimensions of the given images.

Following the example, you would have to name your image files "Camaro1.png", "Camaro2.png", 
"Camaro3.png"... starting with number one.

