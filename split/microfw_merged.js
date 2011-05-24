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

/**
 *
 * DOM and NodeList Manipulation
 * lmfw_domnode.js
 *
 */
(function($){
	$.extend({												// Add feature to the $ class
		hasClass:function(el,className){
			return new RegExp('(^|\\s)' + className + '(\\s|$)').test(el.className);
		}
	},$);
	$.extend({												// Custom NodeList prototypes
		each:function(callback){
			var i,l;
			for(i=0,l=this.length;i<l;i++){
				callback.call(this[i]);
			}
			return this;
		},
		style:function(attrib,value){
			if(typeof attrib === 'string' && value === undefined){
				return window.getComputedStyle(this[0],null).getPropertyValue(attrib);
			}
			if(typeof attrib !== 'object'){
				attrib[attrib] = value;
			}
			return this.each(function(){
				var i;
				for(i in attrib){
					if(attrib.hasOwnProperty(i)){
						this.style[i] = attrib[i];
					}
				}
			});
		},
		item:function(num){
			return $(this[num]);
		},
		bind:function(type,fn,capture){
			return this.each(function(){
				this.addEventListener(type,fn,capture?true:false);
			});
		},
		unbind:function(type,fn,capture){
			return this.each(function(){
				this.removeEventListener(type,fn,capture?true:false);
			});
		},
		parent:function(){
			var result = [], parent;
			this.each(function(){
				parent = this.parentNode;
				if(!parent._counted){
					result[result.length] = parent;
					parent._counted = true;
				}
			});
			return $(result).each(function(){
				delete this._counted;
			});
		},
		hasClass:function(className){						// Returns the first element className
			return $.hasClass(this[0],className);
		},
		addClass:function(){								// Add one or more classes to all elements
			var className = arguments,i,l,f=function(){
					if(!$.hasClass(this, className[i])){
						this.className = this.className ? this.className + ' ' + className[i] : className[i];
					}
				};
			for(i=0,l=className.length;i<l;i++){
				this.each(f);
			}
			return this;
		},
		removeClass:function(){								// Remove one or more classes from all elements
			var className = arguments,i,l,f = function(){
					this.className = this.className.replace(new RegExp('(^|\\s+)' + className[i] + '(\\s+|$)'), ' ');
				};
			for(i=0,l=className.length;i<l;i++){
				this.each(f);
			}
			return this;
		},
		html:function(value){
			if(value === undefined){
				return this[0].innerHTML;
			}
			return this.each(function(){
				this.innerHTML = value;
			});
		},
		width:function(value){
			if(value === undefined){
				return this[0].clientWidth;
			}
			return this.each(function(){
				var v = parseInt(value,10);
				this.style.width = (v)?v + 'px':'';
			});
		},
		height:function(value){
			if(value === undefined){
				return this[0].clientHeight;
			}
			return this.each(function(){
				var v = parseInt(value,10);
				this.style.height = (v)?v + 'px':'';
			});
		}
	});
})(myNameSpace);

/**
 *
 * Browser testing
 * lmfw_browser.js
 *
 */
(function($){
	$.extend({												// Add feature to the $ class
		isIpad:(/ipad/gi).test(navigator.appVersion),
		isIphone:(/iphone/gi).test(navigator.appVersion),
		isAndroid:(/android/gi).test(navigator.appVersion),
		isChrome:(/c/gi).test(navigator.appVersion),
		isOrientationAware:Boolean(window.hasOwnProperty('onorientationchange')),
		isHashChangeAware:Boolean(window.hasOwnProperty('onhashchange')),
		isStandalone:Boolean(window.navigator.standalone),
		has3d:Boolean(window.hasOwnProperty('WebKitCSSMatrix') && (new WebKitCSSMatrix()).hasOwnProperty('m11'))
	},$);
})(myNameSpace);
