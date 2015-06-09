# jQuery DOM Router

### DOM-based Routing

A conventient way to fire JavaScripts based on the classes the `<body>`-tag has on page load or whenever a new class is added to it. It is heavily based on the routing provided in the Sage WordPress-theme, but has a cleaner syntax and does not feel as cluttered. Their docs of the function state:

```
/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can 
 * always reference jQuery with $, even when in .noConflict() mode.
 *
 * Google CDN, Latest jQuery
 * To use the default WordPress version of jQuery, go to lib/config.php and
 * remove or comment out: add_theme_support('jquery-cdn');
 * ======================================================================== */
```

## Usage


1. Include jQuery:

	```html
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
	```

2. Include plugin's code:

	```html
	<script src="dist/jquery.dom-router.min.js"></script>
	```

3. Call the plugin. Simply use the name of the class to fire on as the name of a property in an object passed to the plugin. To have some JS loaded on all pages use the "common"-property. Class names with dashes are converted to underscores by the plugin, so if you have a class called `big-cakes-for-you` you would use `big_cakes_for_you` as the property name. 

	```javascript
	$(document).router({
		classname: function() {
			// fire your js when the body has class "classname" when the page loads
		},
		common: function() {
			// code put inside the common property will be executed on all page loads
		}
	});
	```