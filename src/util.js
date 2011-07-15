// PhotoSwipe - http://www.photoswipe.com/
// Copyright (c) %%year%% by Code Computerlove (http://www.codecomputerlove.com)
// Licensed under the MIT license
// version: %%version%%

(function (window) {
	
	// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/bind
	if (!Function.prototype.bind ) {

		Function.prototype.bind = function( obj ) {
			var slice = [].slice,
					args = slice.call(arguments, 1), 
					self = this, 
					nop = function () {}, 
					bound = function () {
						return self.apply( this instanceof nop ? this : ( obj || {} ), 
																args.concat( slice.call(arguments) ) );    
					};

			nop.prototype = self.prototype;

			bound.prototype = new nop();

			return bound;
		};
	}


	if (typeof Code === "undefined") {
		Code = {};
		Code.PhotoSwipe = {};
	}
	
	
	
	Code.PhotoSwipe.Util = {
		
		browser: {
    	version: (navigator.userAgent.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [])[1],
    	webkit: /webkit/i.test(navigator.userAgent),
    	opera: /opera/i.test(navigator.userAgent), // untested
    	msie: /msie/i.test(navigator.userAgent) && !/opera/.test(navigator.userAgent), 
			chrome: /Chrome/i.test(navigator.userAgent),
    	mozilla: /mozilla/i.test(navigator.userAgent) && !/(compatible|webkit)/.test(navigator.userAgent),
			mobileSafari: /mobile.*safari/i.test(navigator.userAgent),
			is3dSupported: false,
			isAndroid: /android/i.test(navigator.userAgent),
			isBlackberry: /blackberry/i.test(navigator.userAgent),
			isiOS: /like Mac OS/i.test(navigator.userAgent),
			isCSSTransformSupported: false,
			touchSupported: false,
			gestureSupported: false,
			
			
			_eventTagNames: {
				'select':'input',
				'change':'input',
				'submit':'form',
				'reset':'form',
				'error':'img',
				'load':'img',
				'abort':'img'
			},
				
				
			/*
			 * Function: isEventSupported
			 * http://perfectionkills.com/detecting-event-support-without-browser-sniffing/
			 */
			isEventSupported: function(eventName) {
				var el = document.createElement(this._eventTagNames[eventName] || 'div');
				eventName = 'on' + eventName;
				var isSupported = (eventName in el);
				if (!isSupported) {
					el.setAttribute(eventName, 'return;');
					isSupported = typeof el[eventName] == 'function';
				}
				el = null;
				return isSupported;
			}
    },
	
	
		/*
		 * Function: setElementData
		 */
		setElementData: function(el, key, value){
			
			if ( this.isNothing(el.UtilData) ){
				el.UtilData = { };
			}
			
			el.UtilData[key] = value;
		},
		
		
		/*
		 * Function: getElementData
		 */
		getElementData: function(el, key, defaultValue){
			
			if (typeof defaultValue === "undefined"){
				defaultValue = null;
			}
			
			if ( this.isNothing(el.UtilData) ){
				return defaultValue;
			}
			
			if ( this.isEmpty(el.UtilData[key]) ){
				return defaultValue;
			}
			
			return el.UtilData[key];
			
		},
		
		
		/*
		 * Function: removeElementData
		 */
		removeElementData: function(el, key){
		
			delete el.UtilData[key];
			
		},
		
		
		/*
		 * Function: coalesce
		 * Takes any number of arguments and returns the first non Null / Undefined argument.
			*/
		coalesce: function () {
			var i;
			for (i = 0; i < arguments.length; i++) {
				if (!this.isNothing(arguments[i])) {
					return arguments[i];
				}
			}
			return null;
		},
		
		
		
		/*
		 * Function: registerNamespace
		 */			
		registerNamespace: function () {
			var args = arguments, obj = null, i, j;
			for (i = 0; i < args.length; ++i) {
				var ns = args[i];
				var nsParts = ns.split(".");
				var root = nsParts[0];
				eval('if (typeof ' + root + ' == "undefined"){' + root + ' = {};} obj = ' + root + ';');
				for (j = 1; j < nsParts.length; ++j) {
					obj[nsParts[j]] = obj[nsParts[j]] || {};
					obj = obj[nsParts[j]];
				}
			}
		},
		
		
		
		/*
		 * Function: extend
		 */
		extend: function(destination, source, overwriteProperties){
			if (this.isNothing(overwriteProperties)){
				overwriteProperties = true;
			}
			if (destination && source && this.isObject(source)){
				for(var prop in source){
					if (overwriteProperties){
						destination[prop] = source[prop];
					}
					else{
						if(typeof destination[prop] == "undefined"){ 
							destination[prop] = source[prop]; 
						}
					}
				}
			}
		},
		
		
		/*
		 * Function: swapArrayElements
		 */
		swapArrayElements: function(arr, i, j){
			
			var temp = arr[i]; 
			arr[i] = arr[j];
			arr[j] = temp;
		
		},
		
		
		/*
		 * Function: isObject
		 */
		isObject: function(obj){
			return typeof obj == "object";
		},
		
		
		
    /*
     * Function: isNothing
     */
    isNothing: function (obj) {
      if (typeof obj === "undefined" || obj === null) {
        return true;
      } 
      return false;
    },
    
    
    
    /*
     * Function: isEmpty
     */
    isEmpty: function (obj) {
      if (typeof obj === "undefined" || obj === null || obj === "") {
        return true;
      } 
      return false;
    },
    
    
    
		/*
		 * Function: isFunction
		 */
		isFunction: function(obj){
			return typeof obj == "function";
		},
		
		
		
		/*
		 * Function: isArray
		 */
		isArray: function(obj){
			return obj && Code.PhotoSwipe.Util.isFunction(obj.pop);
		},
		
		
		
		/*
		 * Function: isNumber
		 */
		isNumber: function(obj){
			return typeof obj == "number";
		},
		
		
		/*
		 * Function: isString
		 */
		isString: function(obj){
			return typeof obj == "string";
		},
		
		
		
		/*
		 * Function: trim
		 */
		trim: function(val) {
			return val.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    }
		
		
	};
	
	var testEl = document.createElement('div');
	if (Code.PhotoSwipe.Util.browser.webkit && !Code.PhotoSwipe.Util.browser.chrome){
		Code.PhotoSwipe.Util.browser.is3dSupported = !Code.PhotoSwipe.Util.isNothing(testEl.style.WebkitPerspective);	
	}
			
	Code.PhotoSwipe.Util.browser.isCSSTransformSupported = ( !Code.PhotoSwipe.Util.isNothing(testEl.style.WebkitTransform) || !Code.PhotoSwipe.Util.isNothing(testEl.style.MozTransform) || !Code.PhotoSwipe.Util.isNothing(testEl.style.msTransform) || !Code.PhotoSwipe.Util.isNothing(testEl.style.transformProperty) );
		
	Code.PhotoSwipe.Util.browser.touchSupported = Code.PhotoSwipe.Util.browser.isEventSupported('touchstart');
	Code.PhotoSwipe.Util.browser.gestureSupported = Code.PhotoSwipe.Util.browser.isEventSupported('gesturestart');
	
})(window);
