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
