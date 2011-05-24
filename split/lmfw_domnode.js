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
