;(function ( $ ) {

    if(!$.fn.watch && !$.fn.unwatch) {
    	
	    $.fn.watch = function( id, fn ) {
	 
		    return this.each(function(){
		 
		        var self = this;
		 
		        var oldVal = self[id];
		        $(self).data(
		            'watch_timer',
		            setInterval(function(){
		                if (self[id] !== oldVal) {
		                    fn.call(self, id, oldVal, self[id]);
		                    oldVal = self[id];
		                }
		            }, 100)
		        );
		 
		    });
		};
		 
		$.fn.unwatch = function() {
		 
		    return this.each(function(){
		        clearInterval( $(this).data('watch_timer') );
		    });
		 
		};

	}

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

		            var base_classes = base.classes();

		            $(document).find('body').watch('className', function(property, oldClasses, newClasses) {
		            	var classes = newClasses.replace(/-/g, '_').split(/\s+/);

		            	$.each(classes, function(i, className) {
		            		if(!base.routeExists(className, base_classes)) {
		            			base.fire(className);
		            		}
		            	});
		            });
		        };

		        base.routeExists = function(route, base_classes) {
		        	return base_classes.indexOf(route) > -1;
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