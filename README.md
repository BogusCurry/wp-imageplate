# WP-ImagePlate Wordpress Plugin
=============

**(English version below)**

WP-ImagePlate stellt deine 2D Bilder so dar, dass der Benutzer durch einfaches Ziehen mit der Maus zwischen den Bildern wechseln kann. Auf diese Weise wird eine
einfache, 360°-Darstellung z.B. eines Modells erreicht.

Das darzustellende Objekt wird aus verschiedenen Perspektiven gerendert oder fotografiert und die Bilder in Wordpress hochgeladen. Über einen einfachen Shortcode kann 
WP-ImagePlate in jeden Beitrag eingebunden werden - auch mehrere "ImagePlates" können in einem Beitrag genutzt werden. Im Shortcode werden die Bilderquelle und die Anzahl der Bilder festgelegt. Alles weitere erledigt das Plugin automatisch, sodass eine schnelle und einfache Handhabung gewährleistet ist.

Ein Beispiel für einen Wordpress Shortcode:

<code>[imageplate src="2014/05/Camaro{num}.png" count="36"]</code>

Das Wurzelverzeichnis für "src" ist "wp-uploads/" im Wordpress root. "{num}" ist ein Platzhalter für die Bildnummer. Die Bilder müssen in diesem Beispiel also nach folgendem Schema
nummeriert benannt sein: "Camaro1.png", "Camaro2.png" etc. - beginnend mit der Ziffer 1.

Ein Beispiel, wie eine solche ImagePlate Darstellung aussehen kann (und wie sie funktioniert) findest du auf folgender Seite:

[Camaro Model Download](https://matthias-leister.de/projekte/chevrolet-camaro-kostenloser-download/) (Unten auf der Seite, über dem Download Button)

=============

### English version

ImagePlate allows you to generate a 360°-view of an object, just by adding rendered images or photos of a certain object. 

* Rotate your model and make images of it e.g. in 10°-steps. 
* Rename your image files according to their order: model1.jpg, model2.jpg, model3.jpg etc...
* Upload images to wordpress
* Put Wordpress shortcode into your post code: <code>[imageplate src="2014/05/Camaro{num}.png" count="36"]</code> <br> Where "src" is the filename-scheme ("{num}" represents the number, do not replace!) and "count" gives the total number of images.
* Save your post and have fun! :)

An example of ImagePlate is available here: [Camaro Model Download](https://matthias-leister.de/projekte/chevrolet-camaro-kostenloser-download/) (At the end of the post)

 


