/**
 *
 * Find more about the lame micro-framework at
 * http://cubiq.org/
 *
 * Copyright (c) 2010 Matteo Spinelli, http://cubiq.org/
 * Released under MIT license
 * http://cubiq.org/dropbox/mit-license.txt
 *
 * JSLint compliance added by Wade Harrell 20110324
 * https://github.com/wharrell1271/JSLint-compliant-version-of-lame-micro-framework
 *
 */

/**
 *
 * LMFw-Split intended for use in group app dev
 * Replace "myNameSpace" with the namespace of your app
 * In a group environment each section would be its own file
 * Best merged with a build tool
 * But also could be loaded with sequential script tags or injection
 *
 */

/**
 *
 * Core														// must be loaded first
 * lmfw_core.js
 *
 */
(function(ns){												// Create our own namespace (because it's cool)
	var $ = function(query){								// Define the core element
			return new customNL(query);
		},
		customNL = function(query,root){					// Custom Node List
			var i,l,r=(root && root.hasOwnProperty('querySelectorAll'))?root:document;
			if(query.nodeType){								// query is already a Node
				query = [query];
			} else if(typeof query === 'string'){			// query is a string
				query = r.querySelectorAll(query);
			} else if(!(query instanceof Array)){			// if none of the above, query must be an array
				return null;
			}
			this.length = query.length;
			for(i=0,l=this.length;i<l;i++){
				this[i] = query[i];
			}
			return this;
		},
		readyFn = [],										// Holds all functions to be executed on DOM ready
		DOMReady;
	DOMReady = function(){									// Executed on DOMContentLoaded
		var i,l;
		for(i=0,l=readyFn.length;i<l;i++){
			readyFn[i]();
		}
		readyFn = null;
		document.removeEventListener('DOMContentLoaded',DOMReady,false);
	};
	$.extend = function(obj, target){						// Merge to objects
		var prop;
		target = target || customNL.prototype;				// To help plugin development
		for(prop in obj){
			if(obj.hasOwnProperty(prop)){
				target[prop] = obj[prop];
			}
		}
	};
	$.extend({												// Add feature to the $ class
		ready:function(fn){									// Execute functions on DOM ready
			if(readyFn.length === 0) {
				document.addEventListener('DOMContentLoaded',DOMReady,false);
			}
			readyFn.push(fn);
		}
	},$);
	window[ns] = $;											// Expose ns to the world
})('myNameSpace');											// Execute our namespace
