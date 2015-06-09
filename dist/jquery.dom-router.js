/*
 *  jquery-dom-router - v1.0.0
 *  Fire JavaScript based on body classes.
 *  http://jqueryboilerplate.com
 *
 *  Made by Zeno Rocha
 *  Under MIT License
 */
;(function ( $ ) {
    if (!$.DOMRouter) {
        $.DOMRouter = {
        	router: function(el, routes) {
		        var base = this;
		        base.$el = $(el);
		        base.el = el;
		        base.$el.data( 'DOMRouter.router' , base );

		        base.init = function () {
		            base.routes = routes;
		            $(document).ready(base.load);
		        };

		        base.classes = function() {
		        	return document.body.className.replace(/-/g, '_').split(/\s+/);
		        };

	        	base.load = function() {
	        		base.fire('common');
	        		$.each(base.classes(), function(i, className) {
	        			base.fire(className);
	        		});
	        	};

	        	base.fire = function(func, args) {
	        		var fire,
	        			routes = base.routes;

	        		fire = func !== '';
	        		fire = fire && routes[func];
      				fire = fire && typeof routes[func] === 'function';

      				if(fire) {
	      				routes[func](args);
	      			}
	        	};
		        
		        // Run initializer
		        base.init();

        	}
        };
    }

    $.fn.router = function( routes ) {
        return this.each(function () {
            (new $.DOMRouter.router(this, routes));
        });
    };

})( jQuery );