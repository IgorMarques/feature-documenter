/*!
 * jQuery JavaScript Library v1.11.2
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-17T15:27Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.2",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not(form button), button[data-confirm]:not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = $('meta[name="csrf-token"]').attr('content');
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      var csrfToken = $('meta[name=csrf-token]').attr('content');
      var csrfParam = $('meta[name=csrf-param]').attr('content');
      $('form input[name="' + csrfParam + '"]').val(csrfToken);
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement("a");
      originAnchor.href = location.href;
      var urlAnchor = document.createElement("a");

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // Make sure that the browser parses the URL and that the protocols and hosts match.
        return !urlAnchor.protocol || !urlAnchor.host ||
          (originAnchor.protocol + "//" + originAnchor.host !==
            urlAnchor.protocol + "//" + urlAnchor.host);
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = $('meta[name=csrf-token]').attr('content'),
        csrfParam = $('meta[name=csrf-param]').attr('content'),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      element.data('ujs:enable-with', element[method]());
      if (replacement !== undefined) {
        element[method](replacement);
      }

      element.prop('disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with')) element[method](element.data('ujs:enable-with'));
      element.prop('disabled', false);
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        answer = rails.confirm(message);
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : input.val();
        // If nonBlank and valueToCheck are both truthy, or nonBlank and valueToCheck are both falsey
        if (!valueToCheck === !nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      element.data('ujs:enable-with', element.html()); // store enabled state
      if (replacement !== undefined) {
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on("pageshow.rails", function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data("ujs:enable-with")) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data("ujs:enable-with")) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (link.data('remote') !== undefined) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = form.data('remote') !== undefined,
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') == undefined) {
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector);
        if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
          return rails.stopEverything(e);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this == event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this == event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
(function($) {

  var cocoon_element_counter = 0;

  var create_new_id = function() {
    return (new Date().getTime() + cocoon_element_counter++);
  }

  var newcontent_braced = function(id) {
    return '[' + id + ']$1';
  }

  var newcontent_underscord = function(id) {
    return '_' + id + '_$1';
  }

  $(document).on('click', '.add_fields', function(e) {
    e.preventDefault();
    var $this                 = $(this),
        assoc                 = $this.data('association'),
        assocs                = $this.data('associations'),
        content               = $this.data('association-insertion-template'),
        insertionMethod       = $this.data('association-insertion-method') || $this.data('association-insertion-position') || 'before',
        insertionNode         = $this.data('association-insertion-node'),
        insertionTraversal    = $this.data('association-insertion-traversal'),
        count                 = parseInt($this.data('count'), 10),
        regexp_braced         = new RegExp('\\[new_' + assoc + '\\](.*?\\s)', 'g'),
        regexp_underscord     = new RegExp('_new_' + assoc + '_(\\w*)', 'g'),
        new_id                = create_new_id(),
        new_content           = content.replace(regexp_braced, newcontent_braced(new_id)),
        new_contents          = [];


    if (new_content == content) {
      regexp_braced     = new RegExp('\\[new_' + assocs + '\\](.*?\\s)', 'g');
      regexp_underscord = new RegExp('_new_' + assocs + '_(\\w*)', 'g');
      new_content       = content.replace(regexp_braced, newcontent_braced(new_id));
    }

    new_content = new_content.replace(regexp_underscord, newcontent_underscord(new_id));
    new_contents = [new_content];

    count = (isNaN(count) ? 1 : Math.max(count, 1));
    count -= 1;

    while (count) {
      new_id      = create_new_id();
      new_content = content.replace(regexp_braced, newcontent_braced(new_id));
      new_content = new_content.replace(regexp_underscord, newcontent_underscord(new_id));
      new_contents.push(new_content);

      count -= 1;
    }

    if (insertionNode){
      if (insertionTraversal){
        insertionNode = $this[insertionTraversal](insertionNode);
      } else {
        insertionNode = insertionNode == "this" ? $this : $(insertionNode);
      }
    } else {
      insertionNode = $this.parent();
    }

    $.each(new_contents, function(i, node) {
      var contentNode = $(node);

      insertionNode.trigger('cocoon:before-insert', [contentNode]);

      // allow any of the jquery dom manipulation methods (after, before, append, prepend, etc)
      // to be called on the node.  allows the insertion node to be the parent of the inserted
      // code and doesn't force it to be a sibling like after/before does. default: 'before'
      var addedContent = insertionNode[insertionMethod](contentNode);

      insertionNode.trigger('cocoon:after-insert', [contentNode]);
    });
  });

  $(document).on('click', '.remove_fields.dynamic, .remove_fields.existing', function(e) {
    var $this = $(this),
        wrapper_class = $this.data('wrapper-class') || 'nested-fields',
        node_to_delete = $this.closest('.' + wrapper_class),
        trigger_node = node_to_delete.parent();

    e.preventDefault();

    trigger_node.trigger('cocoon:before-remove', [node_to_delete]);

    var timeout = trigger_node.data('remove-timeout') || 0;

    setTimeout(function() {
      if ($this.hasClass('dynamic')) {
          node_to_delete.remove();
      } else {
          $this.prev("input[type=hidden]").val("1");
          node_to_delete.hide();
      }
      trigger_node.trigger('cocoon:after-remove', [node_to_delete]);
    }, timeout);
  });

  $('.remove_fields.existing.destroyed').each(function(i, obj) {
    var $this = $(this),
        wrapper_class = $this.data('wrapper-class') || 'nested-fields';

    $this.closest('.' + wrapper_class).hide();
  });

})(jQuery);
(function() {
  var CSRFToken, Click, ComponentUrl, EVENTS, Link, ProgressBar, browserIsntBuggy, browserSupportsCustomEvents, browserSupportsPushState, browserSupportsTurbolinks, bypassOnLoadPopstate, cacheCurrentPage, cacheSize, changePage, clone, constrainPageCacheTo, createDocument, crossOriginRedirect, currentState, enableProgressBar, enableTransitionCache, executeScriptTags, extractTitleAndBody, fetch, fetchHistory, fetchReplacement, historyStateIsDefined, initializeTurbolinks, installDocumentReadyPageEventTriggers, installHistoryChangeHandler, installJqueryAjaxSuccessPageUpdateTrigger, loadedAssets, manuallyTriggerHashChangeForFirefox, pageCache, pageChangePrevented, pagesCached, popCookie, processResponse, progressBar, recallScrollPosition, ref, referer, reflectNewUrl, reflectRedirectedUrl, rememberCurrentState, rememberCurrentUrl, rememberReferer, removeNoscriptTags, requestMethodIsSafe, resetScrollPosition, setAutofocusElement, transitionCacheEnabled, transitionCacheFor, triggerEvent, visit, xhr,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    slice = [].slice,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  pageCache = {};

  cacheSize = 10;

  transitionCacheEnabled = false;

  progressBar = null;

  currentState = null;

  loadedAssets = null;

  referer = null;

  xhr = null;

  EVENTS = {
    BEFORE_CHANGE: 'page:before-change',
    FETCH: 'page:fetch',
    RECEIVE: 'page:receive',
    CHANGE: 'page:change',
    UPDATE: 'page:update',
    LOAD: 'page:load',
    RESTORE: 'page:restore',
    BEFORE_UNLOAD: 'page:before-unload',
    EXPIRE: 'page:expire'
  };

  fetch = function(url) {
    var cachedPage;
    url = new ComponentUrl(url);
    rememberReferer();
    cacheCurrentPage();
    if (progressBar != null) {
      progressBar.start();
    }
    if (transitionCacheEnabled && (cachedPage = transitionCacheFor(url.absolute))) {
      fetchHistory(cachedPage);
      return fetchReplacement(url, null, false);
    } else {
      return fetchReplacement(url, resetScrollPosition);
    }
  };

  transitionCacheFor = function(url) {
    var cachedPage;
    cachedPage = pageCache[url];
    if (cachedPage && !cachedPage.transitionCacheDisabled) {
      return cachedPage;
    }
  };

  enableTransitionCache = function(enable) {
    if (enable == null) {
      enable = true;
    }
    return transitionCacheEnabled = enable;
  };

  enableProgressBar = function(enable) {
    if (enable == null) {
      enable = true;
    }
    if (!browserSupportsTurbolinks) {
      return;
    }
    if (enable) {
      return progressBar != null ? progressBar : progressBar = new ProgressBar('html');
    } else {
      if (progressBar != null) {
        progressBar.uninstall();
      }
      return progressBar = null;
    }
  };

  fetchReplacement = function(url, onLoadFunction, showProgressBar) {
    if (showProgressBar == null) {
      showProgressBar = true;
    }
    triggerEvent(EVENTS.FETCH, {
      url: url.absolute
    });
    if (xhr != null) {
      xhr.abort();
    }
    xhr = new XMLHttpRequest;
    xhr.open('GET', url.withoutHashForIE10compatibility(), true);
    xhr.setRequestHeader('Accept', 'text/html, application/xhtml+xml, application/xml');
    xhr.setRequestHeader('X-XHR-Referer', referer);
    xhr.onload = function() {
      var doc;
      triggerEvent(EVENTS.RECEIVE, {
        url: url.absolute
      });
      if (doc = processResponse()) {
        reflectNewUrl(url);
        reflectRedirectedUrl();
        changePage.apply(null, extractTitleAndBody(doc));
        manuallyTriggerHashChangeForFirefox();
        if (typeof onLoadFunction === "function") {
          onLoadFunction();
        }
        return triggerEvent(EVENTS.LOAD);
      } else {
        return document.location.href = crossOriginRedirect() || url.absolute;
      }
    };
    if (progressBar && showProgressBar) {
      xhr.onprogress = (function(_this) {
        return function(event) {
          var percent;
          percent = event.lengthComputable ? event.loaded / event.total * 100 : progressBar.value + (100 - progressBar.value) / 10;
          return progressBar.advanceTo(percent);
        };
      })(this);
    }
    xhr.onloadend = function() {
      return xhr = null;
    };
    xhr.onerror = function() {
      return document.location.href = url.absolute;
    };
    return xhr.send();
  };

  fetchHistory = function(cachedPage) {
    if (xhr != null) {
      xhr.abort();
    }
    changePage(cachedPage.title, cachedPage.body);
    recallScrollPosition(cachedPage);
    return triggerEvent(EVENTS.RESTORE);
  };

  cacheCurrentPage = function() {
    var currentStateUrl;
    currentStateUrl = new ComponentUrl(currentState.url);
    pageCache[currentStateUrl.absolute] = {
      url: currentStateUrl.relative,
      body: document.body,
      title: document.title,
      positionY: window.pageYOffset,
      positionX: window.pageXOffset,
      cachedAt: new Date().getTime(),
      transitionCacheDisabled: document.querySelector('[data-no-transition-cache]') != null
    };
    return constrainPageCacheTo(cacheSize);
  };

  pagesCached = function(size) {
    if (size == null) {
      size = cacheSize;
    }
    if (/^[\d]+$/.test(size)) {
      return cacheSize = parseInt(size);
    }
  };

  constrainPageCacheTo = function(limit) {
    var cacheTimesRecentFirst, i, key, len, pageCacheKeys, results;
    pageCacheKeys = Object.keys(pageCache);
    cacheTimesRecentFirst = pageCacheKeys.map(function(url) {
      return pageCache[url].cachedAt;
    }).sort(function(a, b) {
      return b - a;
    });
    results = [];
    for (i = 0, len = pageCacheKeys.length; i < len; i++) {
      key = pageCacheKeys[i];
      if (!(pageCache[key].cachedAt <= cacheTimesRecentFirst[limit])) {
        continue;
      }
      triggerEvent(EVENTS.EXPIRE, pageCache[key]);
      results.push(delete pageCache[key]);
    }
    return results;
  };

  changePage = function(title, body, csrfToken, runScripts) {
    triggerEvent(EVENTS.BEFORE_UNLOAD);
    document.title = title;
    document.documentElement.replaceChild(body, document.body);
    if (csrfToken != null) {
      CSRFToken.update(csrfToken);
    }
    setAutofocusElement();
    if (runScripts) {
      executeScriptTags();
    }
    currentState = window.history.state;
    if (progressBar != null) {
      progressBar.done();
    }
    triggerEvent(EVENTS.CHANGE);
    return triggerEvent(EVENTS.UPDATE);
  };

  executeScriptTags = function() {
    var attr, copy, i, j, len, len1, nextSibling, parentNode, ref, ref1, script, scripts;
    scripts = Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])'));
    for (i = 0, len = scripts.length; i < len; i++) {
      script = scripts[i];
      if (!((ref = script.type) === '' || ref === 'text/javascript')) {
        continue;
      }
      copy = document.createElement('script');
      ref1 = script.attributes;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        attr = ref1[j];
        copy.setAttribute(attr.name, attr.value);
      }
      if (!script.hasAttribute('async')) {
        copy.async = false;
      }
      copy.appendChild(document.createTextNode(script.innerHTML));
      parentNode = script.parentNode, nextSibling = script.nextSibling;
      parentNode.removeChild(script);
      parentNode.insertBefore(copy, nextSibling);
    }
  };

  removeNoscriptTags = function(node) {
    node.innerHTML = node.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/ig, '');
    return node;
  };

  setAutofocusElement = function() {
    var autofocusElement, list;
    autofocusElement = (list = document.querySelectorAll('input[autofocus], textarea[autofocus]'))[list.length - 1];
    if (autofocusElement && document.activeElement !== autofocusElement) {
      return autofocusElement.focus();
    }
  };

  reflectNewUrl = function(url) {
    if ((url = new ComponentUrl(url)).absolute !== referer) {
      return window.history.pushState({
        turbolinks: true,
        url: url.absolute
      }, '', url.absolute);
    }
  };

  reflectRedirectedUrl = function() {
    var location, preservedHash;
    if (location = xhr.getResponseHeader('X-XHR-Redirected-To')) {
      location = new ComponentUrl(location);
      preservedHash = location.hasNoHash() ? document.location.hash : '';
      return window.history.replaceState(window.history.state, '', location.href + preservedHash);
    }
  };

  crossOriginRedirect = function() {
    var redirect;
    if (((redirect = xhr.getResponseHeader('Location')) != null) && (new ComponentUrl(redirect)).crossOrigin()) {
      return redirect;
    }
  };

  rememberReferer = function() {
    return referer = document.location.href;
  };

  rememberCurrentUrl = function() {
    return window.history.replaceState({
      turbolinks: true,
      url: document.location.href
    }, '', document.location.href);
  };

  rememberCurrentState = function() {
    return currentState = window.history.state;
  };

  manuallyTriggerHashChangeForFirefox = function() {
    var url;
    if (navigator.userAgent.match(/Firefox/) && !(url = new ComponentUrl).hasNoHash()) {
      window.history.replaceState(currentState, '', url.withoutHash());
      return document.location.hash = url.hash;
    }
  };

  recallScrollPosition = function(page) {
    return window.scrollTo(page.positionX, page.positionY);
  };

  resetScrollPosition = function() {
    if (document.location.hash) {
      return document.location.href = document.location.href;
    } else {
      return window.scrollTo(0, 0);
    }
  };

  clone = function(original) {
    var copy, key, value;
    if ((original == null) || typeof original !== 'object') {
      return original;
    }
    copy = new original.constructor();
    for (key in original) {
      value = original[key];
      copy[key] = clone(value);
    }
    return copy;
  };

  popCookie = function(name) {
    var ref, value;
    value = ((ref = document.cookie.match(new RegExp(name + "=(\\w+)"))) != null ? ref[1].toUpperCase() : void 0) || '';
    document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/';
    return value;
  };

  triggerEvent = function(name, data) {
    var event;
    if (typeof Prototype !== 'undefined') {
      Event.fire(document, name, data, true);
    }
    event = document.createEvent('Events');
    if (data) {
      event.data = data;
    }
    event.initEvent(name, true, true);
    return document.dispatchEvent(event);
  };

  pageChangePrevented = function(url) {
    return !triggerEvent(EVENTS.BEFORE_CHANGE, {
      url: url
    });
  };

  processResponse = function() {
    var assetsChanged, clientOrServerError, doc, extractTrackAssets, intersection, validContent;
    clientOrServerError = function() {
      var ref;
      return (400 <= (ref = xhr.status) && ref < 600);
    };
    validContent = function() {
      var contentType;
      return ((contentType = xhr.getResponseHeader('Content-Type')) != null) && contentType.match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/);
    };
    extractTrackAssets = function(doc) {
      var i, len, node, ref, results;
      ref = doc.querySelector('head').childNodes;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        node = ref[i];
        if ((typeof node.getAttribute === "function" ? node.getAttribute('data-turbolinks-track') : void 0) != null) {
          results.push(node.getAttribute('src') || node.getAttribute('href'));
        }
      }
      return results;
    };
    assetsChanged = function(doc) {
      var fetchedAssets;
      loadedAssets || (loadedAssets = extractTrackAssets(document));
      fetchedAssets = extractTrackAssets(doc);
      return fetchedAssets.length !== loadedAssets.length || intersection(fetchedAssets, loadedAssets).length !== loadedAssets.length;
    };
    intersection = function(a, b) {
      var i, len, ref, results, value;
      if (a.length > b.length) {
        ref = [b, a], a = ref[0], b = ref[1];
      }
      results = [];
      for (i = 0, len = a.length; i < len; i++) {
        value = a[i];
        if (indexOf.call(b, value) >= 0) {
          results.push(value);
        }
      }
      return results;
    };
    if (!clientOrServerError() && validContent()) {
      doc = createDocument(xhr.responseText);
      if (doc && !assetsChanged(doc)) {
        return doc;
      }
    }
  };

  extractTitleAndBody = function(doc) {
    var title;
    title = doc.querySelector('title');
    return [title != null ? title.textContent : void 0, removeNoscriptTags(doc.querySelector('body')), CSRFToken.get(doc).token, 'runScripts'];
  };

  CSRFToken = {
    get: function(doc) {
      var tag;
      if (doc == null) {
        doc = document;
      }
      return {
        node: tag = doc.querySelector('meta[name="csrf-token"]'),
        token: tag != null ? typeof tag.getAttribute === "function" ? tag.getAttribute('content') : void 0 : void 0
      };
    },
    update: function(latest) {
      var current;
      current = this.get();
      if ((current.token != null) && (latest != null) && current.token !== latest) {
        return current.node.setAttribute('content', latest);
      }
    }
  };

  createDocument = function(html) {
    var doc;
    doc = document.documentElement.cloneNode();
    doc.innerHTML = html;
    doc.head = doc.querySelector('head');
    doc.body = doc.querySelector('body');
    return doc;
  };

  ComponentUrl = (function() {
    function ComponentUrl(original1) {
      this.original = original1 != null ? original1 : document.location.href;
      if (this.original.constructor === ComponentUrl) {
        return this.original;
      }
      this._parse();
    }

    ComponentUrl.prototype.withoutHash = function() {
      return this.href.replace(this.hash, '').replace('#', '');
    };

    ComponentUrl.prototype.withoutHashForIE10compatibility = function() {
      return this.withoutHash();
    };

    ComponentUrl.prototype.hasNoHash = function() {
      return this.hash.length === 0;
    };

    ComponentUrl.prototype.crossOrigin = function() {
      return this.origin !== (new ComponentUrl).origin;
    };

    ComponentUrl.prototype._parse = function() {
      var ref;
      (this.link != null ? this.link : this.link = document.createElement('a')).href = this.original;
      ref = this.link, this.href = ref.href, this.protocol = ref.protocol, this.host = ref.host, this.hostname = ref.hostname, this.port = ref.port, this.pathname = ref.pathname, this.search = ref.search, this.hash = ref.hash;
      this.origin = [this.protocol, '//', this.hostname].join('');
      if (this.port.length !== 0) {
        this.origin += ":" + this.port;
      }
      this.relative = [this.pathname, this.search, this.hash].join('');
      return this.absolute = this.href;
    };

    return ComponentUrl;

  })();

  Link = (function(superClass) {
    extend(Link, superClass);

    Link.HTML_EXTENSIONS = ['html'];

    Link.allowExtensions = function() {
      var extension, extensions, i, len;
      extensions = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      for (i = 0, len = extensions.length; i < len; i++) {
        extension = extensions[i];
        Link.HTML_EXTENSIONS.push(extension);
      }
      return Link.HTML_EXTENSIONS;
    };

    function Link(link1) {
      this.link = link1;
      if (this.link.constructor === Link) {
        return this.link;
      }
      this.original = this.link.href;
      this.originalElement = this.link;
      this.link = this.link.cloneNode(false);
      Link.__super__.constructor.apply(this, arguments);
    }

    Link.prototype.shouldIgnore = function() {
      return this.crossOrigin() || this._anchored() || this._nonHtml() || this._optOut() || this._target();
    };

    Link.prototype._anchored = function() {
      return (this.hash.length > 0 || this.href.charAt(this.href.length - 1) === '#') && (this.withoutHash() === (new ComponentUrl).withoutHash());
    };

    Link.prototype._nonHtml = function() {
      return this.pathname.match(/\.[a-z]+$/g) && !this.pathname.match(new RegExp("\\.(?:" + (Link.HTML_EXTENSIONS.join('|')) + ")?$", 'g'));
    };

    Link.prototype._optOut = function() {
      var ignore, link;
      link = this.originalElement;
      while (!(ignore || link === document)) {
        ignore = link.getAttribute('data-no-turbolink') != null;
        link = link.parentNode;
      }
      return ignore;
    };

    Link.prototype._target = function() {
      return this.link.target.length !== 0;
    };

    return Link;

  })(ComponentUrl);

  Click = (function() {
    Click.installHandlerLast = function(event) {
      if (!event.defaultPrevented) {
        document.removeEventListener('click', Click.handle, false);
        return document.addEventListener('click', Click.handle, false);
      }
    };

    Click.handle = function(event) {
      return new Click(event);
    };

    function Click(event1) {
      this.event = event1;
      if (this.event.defaultPrevented) {
        return;
      }
      this._extractLink();
      if (this._validForTurbolinks()) {
        if (!pageChangePrevented(this.link.absolute)) {
          visit(this.link.href);
        }
        this.event.preventDefault();
      }
    }

    Click.prototype._extractLink = function() {
      var link;
      link = this.event.target;
      while (!(!link.parentNode || link.nodeName === 'A')) {
        link = link.parentNode;
      }
      if (link.nodeName === 'A' && link.href.length !== 0) {
        return this.link = new Link(link);
      }
    };

    Click.prototype._validForTurbolinks = function() {
      return (this.link != null) && !(this.link.shouldIgnore() || this._nonStandardClick());
    };

    Click.prototype._nonStandardClick = function() {
      return this.event.which > 1 || this.event.metaKey || this.event.ctrlKey || this.event.shiftKey || this.event.altKey;
    };

    return Click;

  })();

  ProgressBar = (function() {
    var className;

    className = 'turbolinks-progress-bar';

    function ProgressBar(elementSelector) {
      this.elementSelector = elementSelector;
      this._trickle = bind(this._trickle, this);
      this.value = 0;
      this.content = '';
      this.speed = 300;
      this.opacity = 0.99;
      this.install();
    }

    ProgressBar.prototype.install = function() {
      this.element = document.querySelector(this.elementSelector);
      this.element.classList.add(className);
      this.styleElement = document.createElement('style');
      document.head.appendChild(this.styleElement);
      return this._updateStyle();
    };

    ProgressBar.prototype.uninstall = function() {
      this.element.classList.remove(className);
      return document.head.removeChild(this.styleElement);
    };

    ProgressBar.prototype.start = function() {
      return this.advanceTo(5);
    };

    ProgressBar.prototype.advanceTo = function(value) {
      var ref;
      if ((value > (ref = this.value) && ref <= 100)) {
        this.value = value;
        this._updateStyle();
        if (this.value === 100) {
          return this._stopTrickle();
        } else if (this.value > 0) {
          return this._startTrickle();
        }
      }
    };

    ProgressBar.prototype.done = function() {
      if (this.value > 0) {
        this.advanceTo(100);
        return this._reset();
      }
    };

    ProgressBar.prototype._reset = function() {
      var originalOpacity;
      originalOpacity = this.opacity;
      setTimeout((function(_this) {
        return function() {
          _this.opacity = 0;
          return _this._updateStyle();
        };
      })(this), this.speed / 2);
      return setTimeout((function(_this) {
        return function() {
          _this.value = 0;
          _this.opacity = originalOpacity;
          return _this._withSpeed(0, function() {
            return _this._updateStyle(true);
          });
        };
      })(this), this.speed);
    };

    ProgressBar.prototype._startTrickle = function() {
      if (this.trickling) {
        return;
      }
      this.trickling = true;
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._stopTrickle = function() {
      return delete this.trickling;
    };

    ProgressBar.prototype._trickle = function() {
      if (!this.trickling) {
        return;
      }
      this.advanceTo(this.value + Math.random() / 2);
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._withSpeed = function(speed, fn) {
      var originalSpeed, result;
      originalSpeed = this.speed;
      this.speed = speed;
      result = fn();
      this.speed = originalSpeed;
      return result;
    };

    ProgressBar.prototype._updateStyle = function(forceRepaint) {
      if (forceRepaint == null) {
        forceRepaint = false;
      }
      if (forceRepaint) {
        this._changeContentToForceRepaint();
      }
      return this.styleElement.textContent = this._createCSSRule();
    };

    ProgressBar.prototype._changeContentToForceRepaint = function() {
      return this.content = this.content === '' ? ' ' : '';
    };

    ProgressBar.prototype._createCSSRule = function() {
      return this.elementSelector + "." + className + "::before {\n  content: '" + this.content + "';\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 2000;\n  background-color: #0076ff;\n  height: 3px;\n  opacity: " + this.opacity + ";\n  width: " + this.value + "%;\n  transition: width " + this.speed + "ms ease-out, opacity " + (this.speed / 2) + "ms ease-in;\n  transform: translate3d(0,0,0);\n}";
    };

    return ProgressBar;

  })();

  bypassOnLoadPopstate = function(fn) {
    return setTimeout(fn, 500);
  };

  installDocumentReadyPageEventTriggers = function() {
    return document.addEventListener('DOMContentLoaded', (function() {
      triggerEvent(EVENTS.CHANGE);
      return triggerEvent(EVENTS.UPDATE);
    }), true);
  };

  installJqueryAjaxSuccessPageUpdateTrigger = function() {
    if (typeof jQuery !== 'undefined') {
      return jQuery(document).on('ajaxSuccess', function(event, xhr, settings) {
        if (!jQuery.trim(xhr.responseText)) {
          return;
        }
        return triggerEvent(EVENTS.UPDATE);
      });
    }
  };

  installHistoryChangeHandler = function(event) {
    var cachedPage, ref;
    if ((ref = event.state) != null ? ref.turbolinks : void 0) {
      if (cachedPage = pageCache[(new ComponentUrl(event.state.url)).absolute]) {
        cacheCurrentPage();
        return fetchHistory(cachedPage);
      } else {
        return visit(event.target.location.href);
      }
    }
  };

  initializeTurbolinks = function() {
    rememberCurrentUrl();
    rememberCurrentState();
    document.addEventListener('click', Click.installHandlerLast, true);
    window.addEventListener('hashchange', function(event) {
      rememberCurrentUrl();
      return rememberCurrentState();
    }, false);
    return bypassOnLoadPopstate(function() {
      return window.addEventListener('popstate', installHistoryChangeHandler, false);
    });
  };

  historyStateIsDefined = window.history.state !== void 0 || navigator.userAgent.match(/Firefox\/2[6|7]/);

  browserSupportsPushState = window.history && window.history.pushState && window.history.replaceState && historyStateIsDefined;

  browserIsntBuggy = !navigator.userAgent.match(/CriOS\//);

  requestMethodIsSafe = (ref = popCookie('request_method')) === 'GET' || ref === '';

  browserSupportsTurbolinks = browserSupportsPushState && browserIsntBuggy && requestMethodIsSafe;

  browserSupportsCustomEvents = document.addEventListener && document.createEvent;

  if (browserSupportsCustomEvents) {
    installDocumentReadyPageEventTriggers();
    installJqueryAjaxSuccessPageUpdateTrigger();
  }

  if (browserSupportsTurbolinks) {
    visit = fetch;
    initializeTurbolinks();
  } else {
    visit = function(url) {
      return document.location.href = url;
    };
  }

  this.Turbolinks = {
    visit: visit,
    pagesCached: pagesCached,
    enableTransitionCache: enableTransitionCache,
    enableProgressBar: enableProgressBar,
    allowLinkExtensions: Link.allowExtensions,
    supported: browserSupportsTurbolinks,
    EVENTS: clone(EVENTS)
  };

}).call(this);
/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2010, Ajax.org B.V.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */

/**
 * Define a module along with a payload
 * @param module a name for the payload
 * @param payload a function to call with (require, exports, module) params
 */


(function() {

var ACE_NAMESPACE = "";

var global = (function() { return this; })();
if (!global && typeof window != "undefined") global = window; // strict mode


if (!ACE_NAMESPACE && typeof requirejs !== "undefined")
    return;


var define = function(module, deps, payload) {
    if (typeof module !== "string") {
        if (define.original)
            define.original.apply(this, arguments);
        else {
            console.error("dropping module because define wasn\'t a string.");
            console.trace();
        }
        return;
    }
    if (arguments.length == 2)
        payload = deps;
    if (!define.modules[module]) {
        define.payloads[module] = payload;
        define.modules[module] = null;
    }
};

define.modules = {};
define.payloads = {};

/**
 * Get at functionality define()ed using the function above
 */
var _require = function(parentId, module, callback) {
    if (typeof module === "string") {
        var payload = lookup(parentId, module);
        if (payload != undefined) {
            callback && callback();
            return payload;
        }
    } else if (Object.prototype.toString.call(module) === "[object Array]") {
        var params = [];
        for (var i = 0, l = module.length; i < l; ++i) {
            var dep = lookup(parentId, module[i]);
            if (dep == undefined && require.original)
                return;
            params.push(dep);
        }
        return callback && callback.apply(null, params) || true;
    }
};

var require = function(module, callback) {
    var packagedModule = _require("", module, callback);
    if (packagedModule == undefined && require.original)
        return require.original.apply(this, arguments);
    return packagedModule;
};

var normalizeModule = function(parentId, moduleName) {
    // normalize plugin requires
    if (moduleName.indexOf("!") !== -1) {
        var chunks = moduleName.split("!");
        return normalizeModule(parentId, chunks[0]) + "!" + normalizeModule(parentId, chunks[1]);
    }
    // normalize relative requires
    if (moduleName.charAt(0) == ".") {
        var base = parentId.split("/").slice(0, -1).join("/");
        moduleName = base + "/" + moduleName;

        while(moduleName.indexOf(".") !== -1 && previous != moduleName) {
            var previous = moduleName;
            moduleName = moduleName.replace(/\/\.\//, "/").replace(/[^\/]+\/\.\.\//, "");
        }
    }
    return moduleName;
};

/**
 * Internal function to lookup moduleNames and resolve them by calling the
 * definition function if needed.
 */
var lookup = function(parentId, moduleName) {
    moduleName = normalizeModule(parentId, moduleName);

    var module = define.modules[moduleName];
    if (!module) {
        module = define.payloads[moduleName];
        if (typeof module === 'function') {
            var exports = {};
            var mod = {
                id: moduleName,
                uri: '',
                exports: exports,
                packaged: true
            };

            var req = function(module, callback) {
                return _require(moduleName, module, callback);
            };

            var returnValue = module(req, exports, mod);
            exports = returnValue || mod.exports;
            define.modules[moduleName] = exports;
            delete define.payloads[moduleName];
        }
        module = define.modules[moduleName] = exports || module;
    }
    return module;
};

function exportAce(ns) {
    var root = global;
    if (ns) {
        if (!global[ns])
            global[ns] = {};
        root = global[ns];
    }

    if (!root.define || !root.define.packaged) {
        define.original = root.define;
        root.define = define;
        root.define.packaged = true;
    }

    if (!root.require || !root.require.packaged) {
        require.original = root.require;
        root.require = require;
        root.require.packaged = true;
    }
}

exportAce(ACE_NAMESPACE);

})();

define("ace/lib/regexp",["require","exports","module"], function(require, exports, module) {
"use strict";

    var real = {
            exec: RegExp.prototype.exec,
            test: RegExp.prototype.test,
            match: String.prototype.match,
            replace: String.prototype.replace,
            split: String.prototype.split
        },
        compliantExecNpcg = real.exec.call(/()??/, "")[1] === undefined, // check `exec` handling of nonparticipating capturing groups
        compliantLastIndexIncrement = function () {
            var x = /^/g;
            real.test.call(x, "");
            return !x.lastIndex;
        }();

    if (compliantLastIndexIncrement && compliantExecNpcg)
        return;
    RegExp.prototype.exec = function (str) {
        var match = real.exec.apply(this, arguments),
            name, r2;
        if ( typeof(str) == 'string' && match) {
            if (!compliantExecNpcg && match.length > 1 && indexOf(match, "") > -1) {
                r2 = RegExp(this.source, real.replace.call(getNativeFlags(this), "g", ""));
                real.replace.call(str.slice(match.index), r2, function () {
                    for (var i = 1; i < arguments.length - 2; i++) {
                        if (arguments[i] === undefined)
                            match[i] = undefined;
                    }
                });
            }
            if (this._xregexp && this._xregexp.captureNames) {
                for (var i = 1; i < match.length; i++) {
                    name = this._xregexp.captureNames[i - 1];
                    if (name)
                       match[name] = match[i];
                }
            }
            if (!compliantLastIndexIncrement && this.global && !match[0].length && (this.lastIndex > match.index))
                this.lastIndex--;
        }
        return match;
    };
    if (!compliantLastIndexIncrement) {
        RegExp.prototype.test = function (str) {
            var match = real.exec.call(this, str);
            if (match && this.global && !match[0].length && (this.lastIndex > match.index))
                this.lastIndex--;
            return !!match;
        };
    }

    function getNativeFlags (regex) {
        return (regex.global     ? "g" : "") +
               (regex.ignoreCase ? "i" : "") +
               (regex.multiline  ? "m" : "") +
               (regex.extended   ? "x" : "") + // Proposed for ES4; included in AS3
               (regex.sticky     ? "y" : "");
    }

    function indexOf (array, item, from) {
        if (Array.prototype.indexOf) // Use the native array method if available
            return array.indexOf(item, from);
        for (var i = from || 0; i < array.length; i++) {
            if (array[i] === item)
                return i;
        }
        return -1;
    }

});

define("ace/lib/es5-shim",["require","exports","module"], function(require, exports, module) {

function Empty() {}

if (!Function.prototype.bind) {
    Function.prototype.bind = function bind(that) { // .length is 1
        var target = this;
        if (typeof target != "function") {
            throw new TypeError("Function.prototype.bind called on incompatible " + target);
        }
        var args = slice.call(arguments, 1); // for normal call
        var bound = function () {

            if (this instanceof bound) {

                var result = target.apply(
                    this,
                    args.concat(slice.call(arguments))
                );
                if (Object(result) === result) {
                    return result;
                }
                return this;

            } else {
                return target.apply(
                    that,
                    args.concat(slice.call(arguments))
                );

            }

        };
        if(target.prototype) {
            Empty.prototype = target.prototype;
            bound.prototype = new Empty();
            Empty.prototype = null;
        }
        return bound;
    };
}
var call = Function.prototype.call;
var prototypeOfArray = Array.prototype;
var prototypeOfObject = Object.prototype;
var slice = prototypeOfArray.slice;
var _toString = call.bind(prototypeOfObject.toString);
var owns = call.bind(prototypeOfObject.hasOwnProperty);
var defineGetter;
var defineSetter;
var lookupGetter;
var lookupSetter;
var supportsAccessors;
if ((supportsAccessors = owns(prototypeOfObject, "__defineGetter__"))) {
    defineGetter = call.bind(prototypeOfObject.__defineGetter__);
    defineSetter = call.bind(prototypeOfObject.__defineSetter__);
    lookupGetter = call.bind(prototypeOfObject.__lookupGetter__);
    lookupSetter = call.bind(prototypeOfObject.__lookupSetter__);
}
if ([1,2].splice(0).length != 2) {
    if(function() { // test IE < 9 to splice bug - see issue #138
        function makeArray(l) {
            var a = new Array(l+2);
            a[0] = a[1] = 0;
            return a;
        }
        var array = [], lengthBefore;
        
        array.splice.apply(array, makeArray(20));
        array.splice.apply(array, makeArray(26));

        lengthBefore = array.length; //46
        array.splice(5, 0, "XXX"); // add one element

        lengthBefore + 1 == array.length

        if (lengthBefore + 1 == array.length) {
            return true;// has right splice implementation without bugs
        }
    }()) {//IE 6/7
        var array_splice = Array.prototype.splice;
        Array.prototype.splice = function(start, deleteCount) {
            if (!arguments.length) {
                return [];
            } else {
                return array_splice.apply(this, [
                    start === void 0 ? 0 : start,
                    deleteCount === void 0 ? (this.length - start) : deleteCount
                ].concat(slice.call(arguments, 2)))
            }
        };
    } else {//IE8
        Array.prototype.splice = function(pos, removeCount){
            var length = this.length;
            if (pos > 0) {
                if (pos > length)
                    pos = length;
            } else if (pos == void 0) {
                pos = 0;
            } else if (pos < 0) {
                pos = Math.max(length + pos, 0);
            }

            if (!(pos+removeCount < length))
                removeCount = length - pos;

            var removed = this.slice(pos, pos+removeCount);
            var insert = slice.call(arguments, 2);
            var add = insert.length;            
            if (pos === length) {
                if (add) {
                    this.push.apply(this, insert);
                }
            } else {
                var remove = Math.min(removeCount, length - pos);
                var tailOldPos = pos + remove;
                var tailNewPos = tailOldPos + add - remove;
                var tailCount = length - tailOldPos;
                var lengthAfterRemove = length - remove;

                if (tailNewPos < tailOldPos) { // case A
                    for (var i = 0; i < tailCount; ++i) {
                        this[tailNewPos+i] = this[tailOldPos+i];
                    }
                } else if (tailNewPos > tailOldPos) { // case B
                    for (i = tailCount; i--; ) {
                        this[tailNewPos+i] = this[tailOldPos+i];
                    }
                } // else, add == remove (nothing to do)

                if (add && pos === lengthAfterRemove) {
                    this.length = lengthAfterRemove; // truncate array
                    this.push.apply(this, insert);
                } else {
                    this.length = lengthAfterRemove + add; // reserves space
                    for (i = 0; i < add; ++i) {
                        this[pos+i] = insert[i];
                    }
                }
            }
            return removed;
        };
    }
}
if (!Array.isArray) {
    Array.isArray = function isArray(obj) {
        return _toString(obj) == "[object Array]";
    };
}
var boxedString = Object("a"),
    splitString = boxedString[0] != "a" || !(0 in boxedString);

if (!Array.prototype.forEach) {
    Array.prototype.forEach = function forEach(fun /*, thisp*/) {
        var object = toObject(this),
            self = splitString && _toString(this) == "[object String]" ?
                this.split("") :
                object,
            thisp = arguments[1],
            i = -1,
            length = self.length >>> 0;
        if (_toString(fun) != "[object Function]") {
            throw new TypeError(); // TODO message
        }

        while (++i < length) {
            if (i in self) {
                fun.call(thisp, self[i], i, object);
            }
        }
    };
}
if (!Array.prototype.map) {
    Array.prototype.map = function map(fun /*, thisp*/) {
        var object = toObject(this),
            self = splitString && _toString(this) == "[object String]" ?
                this.split("") :
                object,
            length = self.length >>> 0,
            result = Array(length),
            thisp = arguments[1];
        if (_toString(fun) != "[object Function]") {
            throw new TypeError(fun + " is not a function");
        }

        for (var i = 0; i < length; i++) {
            if (i in self)
                result[i] = fun.call(thisp, self[i], i, object);
        }
        return result;
    };
}
if (!Array.prototype.filter) {
    Array.prototype.filter = function filter(fun /*, thisp */) {
        var object = toObject(this),
            self = splitString && _toString(this) == "[object String]" ?
                this.split("") :
                    object,
            length = self.length >>> 0,
            result = [],
            value,
            thisp = arguments[1];
        if (_toString(fun) != "[object Function]") {
            throw new TypeError(fun + " is not a function");
        }

        for (var i = 0; i < length; i++) {
            if (i in self) {
                value = self[i];
                if (fun.call(thisp, value, i, object)) {
                    result.push(value);
                }
            }
        }
        return result;
    };
}
if (!Array.prototype.every) {
    Array.prototype.every = function every(fun /*, thisp */) {
        var object = toObject(this),
            self = splitString && _toString(this) == "[object String]" ?
                this.split("") :
                object,
            length = self.length >>> 0,
            thisp = arguments[1];
        if (_toString(fun) != "[object Function]") {
            throw new TypeError(fun + " is not a function");
        }

        for (var i = 0; i < length; i++) {
            if (i in self && !fun.call(thisp, self[i], i, object)) {
                return false;
            }
        }
        return true;
    };
}
if (!Array.prototype.some) {
    Array.prototype.some = function some(fun /*, thisp */) {
        var object = toObject(this),
            self = splitString && _toString(this) == "[object String]" ?
                this.split("") :
                object,
            length = self.length >>> 0,
            thisp = arguments[1];
        if (_toString(fun) != "[object Function]") {
            throw new TypeError(fun + " is not a function");
        }

        for (var i = 0; i < length; i++) {
            if (i in self && fun.call(thisp, self[i], i, object)) {
                return true;
            }
        }
        return false;
    };
}
if (!Array.prototype.reduce) {
    Array.prototype.reduce = function reduce(fun /*, initial*/) {
        var object = toObject(this),
            self = splitString && _toString(this) == "[object String]" ?
                this.split("") :
                object,
            length = self.length >>> 0;
        if (_toString(fun) != "[object Function]") {
            throw new TypeError(fun + " is not a function");
        }
        if (!length && arguments.length == 1) {
            throw new TypeError("reduce of empty array with no initial value");
        }

        var i = 0;
        var result;
        if (arguments.length >= 2) {
            result = arguments[1];
        } else {
            do {
                if (i in self) {
                    result = self[i++];
                    break;
                }
                if (++i >= length) {
                    throw new TypeError("reduce of empty array with no initial value");
                }
            } while (true);
        }

        for (; i < length; i++) {
            if (i in self) {
                result = fun.call(void 0, result, self[i], i, object);
            }
        }

        return result;
    };
}
if (!Array.prototype.reduceRight) {
    Array.prototype.reduceRight = function reduceRight(fun /*, initial*/) {
        var object = toObject(this),
            self = splitString && _toString(this) == "[object String]" ?
                this.split("") :
                object,
            length = self.length >>> 0;
        if (_toString(fun) != "[object Function]") {
            throw new TypeError(fun + " is not a function");
        }
        if (!length && arguments.length == 1) {
            throw new TypeError("reduceRight of empty array with no initial value");
        }

        var result, i = length - 1;
        if (arguments.length >= 2) {
            result = arguments[1];
        } else {
            do {
                if (i in self) {
                    result = self[i--];
                    break;
                }
                if (--i < 0) {
                    throw new TypeError("reduceRight of empty array with no initial value");
                }
            } while (true);
        }

        do {
            if (i in this) {
                result = fun.call(void 0, result, self[i], i, object);
            }
        } while (i--);

        return result;
    };
}
if (!Array.prototype.indexOf || ([0, 1].indexOf(1, 2) != -1)) {
    Array.prototype.indexOf = function indexOf(sought /*, fromIndex */ ) {
        var self = splitString && _toString(this) == "[object String]" ?
                this.split("") :
                toObject(this),
            length = self.length >>> 0;

        if (!length) {
            return -1;
        }

        var i = 0;
        if (arguments.length > 1) {
            i = toInteger(arguments[1]);
        }
        i = i >= 0 ? i : Math.max(0, length + i);
        for (; i < length; i++) {
            if (i in self && self[i] === sought) {
                return i;
            }
        }
        return -1;
    };
}
if (!Array.prototype.lastIndexOf || ([0, 1].lastIndexOf(0, -3) != -1)) {
    Array.prototype.lastIndexOf = function lastIndexOf(sought /*, fromIndex */) {
        var self = splitString && _toString(this) == "[object String]" ?
                this.split("") :
                toObject(this),
            length = self.length >>> 0;

        if (!length) {
            return -1;
        }
        var i = length - 1;
        if (arguments.length > 1) {
            i = Math.min(i, toInteger(arguments[1]));
        }
        i = i >= 0 ? i : length - Math.abs(i);
        for (; i >= 0; i--) {
            if (i in self && sought === self[i]) {
                return i;
            }
        }
        return -1;
    };
}
if (!Object.getPrototypeOf) {
    Object.getPrototypeOf = function getPrototypeOf(object) {
        return object.__proto__ || (
            object.constructor ?
            object.constructor.prototype :
            prototypeOfObject
        );
    };
}
if (!Object.getOwnPropertyDescriptor) {
    var ERR_NON_OBJECT = "Object.getOwnPropertyDescriptor called on a " +
                         "non-object: ";
    Object.getOwnPropertyDescriptor = function getOwnPropertyDescriptor(object, property) {
        if ((typeof object != "object" && typeof object != "function") || object === null)
            throw new TypeError(ERR_NON_OBJECT + object);
        if (!owns(object, property))
            return;

        var descriptor, getter, setter;
        descriptor =  { enumerable: true, configurable: true };
        if (supportsAccessors) {
            var prototype = object.__proto__;
            object.__proto__ = prototypeOfObject;

            var getter = lookupGetter(object, property);
            var setter = lookupSetter(object, property);
            object.__proto__ = prototype;

            if (getter || setter) {
                if (getter) descriptor.get = getter;
                if (setter) descriptor.set = setter;
                return descriptor;
            }
        }
        descriptor.value = object[property];
        return descriptor;
    };
}
if (!Object.getOwnPropertyNames) {
    Object.getOwnPropertyNames = function getOwnPropertyNames(object) {
        return Object.keys(object);
    };
}
if (!Object.create) {
    var createEmpty;
    if (Object.prototype.__proto__ === null) {
        createEmpty = function () {
            return { "__proto__": null };
        };
    } else {
        createEmpty = function () {
            var empty = {};
            for (var i in empty)
                empty[i] = null;
            empty.constructor =
            empty.hasOwnProperty =
            empty.propertyIsEnumerable =
            empty.isPrototypeOf =
            empty.toLocaleString =
            empty.toString =
            empty.valueOf =
            empty.__proto__ = null;
            return empty;
        }
    }

    Object.create = function create(prototype, properties) {
        var object;
        if (prototype === null) {
            object = createEmpty();
        } else {
            if (typeof prototype != "object")
                throw new TypeError("typeof prototype["+(typeof prototype)+"] != 'object'");
            var Type = function () {};
            Type.prototype = prototype;
            object = new Type();
            object.__proto__ = prototype;
        }
        if (properties !== void 0)
            Object.defineProperties(object, properties);
        return object;
    };
}

function doesDefinePropertyWork(object) {
    try {
        Object.defineProperty(object, "sentinel", {});
        return "sentinel" in object;
    } catch (exception) {
    }
}
if (Object.defineProperty) {
    var definePropertyWorksOnObject = doesDefinePropertyWork({});
    var definePropertyWorksOnDom = typeof document == "undefined" ||
        doesDefinePropertyWork(document.createElement("div"));
    if (!definePropertyWorksOnObject || !definePropertyWorksOnDom) {
        var definePropertyFallback = Object.defineProperty;
    }
}

if (!Object.defineProperty || definePropertyFallback) {
    var ERR_NON_OBJECT_DESCRIPTOR = "Property description must be an object: ";
    var ERR_NON_OBJECT_TARGET = "Object.defineProperty called on non-object: "
    var ERR_ACCESSORS_NOT_SUPPORTED = "getters & setters can not be defined " +
                                      "on this javascript engine";

    Object.defineProperty = function defineProperty(object, property, descriptor) {
        if ((typeof object != "object" && typeof object != "function") || object === null)
            throw new TypeError(ERR_NON_OBJECT_TARGET + object);
        if ((typeof descriptor != "object" && typeof descriptor != "function") || descriptor === null)
            throw new TypeError(ERR_NON_OBJECT_DESCRIPTOR + descriptor);
        if (definePropertyFallback) {
            try {
                return definePropertyFallback.call(Object, object, property, descriptor);
            } catch (exception) {
            }
        }
        if (owns(descriptor, "value")) {

            if (supportsAccessors && (lookupGetter(object, property) ||
                                      lookupSetter(object, property)))
            {
                var prototype = object.__proto__;
                object.__proto__ = prototypeOfObject;
                delete object[property];
                object[property] = descriptor.value;
                object.__proto__ = prototype;
            } else {
                object[property] = descriptor.value;
            }
        } else {
            if (!supportsAccessors)
                throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
            if (owns(descriptor, "get"))
                defineGetter(object, property, descriptor.get);
            if (owns(descriptor, "set"))
                defineSetter(object, property, descriptor.set);
        }

        return object;
    };
}
if (!Object.defineProperties) {
    Object.defineProperties = function defineProperties(object, properties) {
        for (var property in properties) {
            if (owns(properties, property))
                Object.defineProperty(object, property, properties[property]);
        }
        return object;
    };
}
if (!Object.seal) {
    Object.seal = function seal(object) {
        return object;
    };
}
if (!Object.freeze) {
    Object.freeze = function freeze(object) {
        return object;
    };
}
try {
    Object.freeze(function () {});
} catch (exception) {
    Object.freeze = (function freeze(freezeObject) {
        return function freeze(object) {
            if (typeof object == "function") {
                return object;
            } else {
                return freezeObject(object);
            }
        };
    })(Object.freeze);
}
if (!Object.preventExtensions) {
    Object.preventExtensions = function preventExtensions(object) {
        return object;
    };
}
if (!Object.isSealed) {
    Object.isSealed = function isSealed(object) {
        return false;
    };
}
if (!Object.isFrozen) {
    Object.isFrozen = function isFrozen(object) {
        return false;
    };
}
if (!Object.isExtensible) {
    Object.isExtensible = function isExtensible(object) {
        if (Object(object) === object) {
            throw new TypeError(); // TODO message
        }
        var name = '';
        while (owns(object, name)) {
            name += '?';
        }
        object[name] = true;
        var returnValue = owns(object, name);
        delete object[name];
        return returnValue;
    };
}
if (!Object.keys) {
    var hasDontEnumBug = true,
        dontEnums = [
            "toString",
            "toLocaleString",
            "valueOf",
            "hasOwnProperty",
            "isPrototypeOf",
            "propertyIsEnumerable",
            "constructor"
        ],
        dontEnumsLength = dontEnums.length;

    for (var key in {"toString": null}) {
        hasDontEnumBug = false;
    }

    Object.keys = function keys(object) {

        if (
            (typeof object != "object" && typeof object != "function") ||
            object === null
        ) {
            throw new TypeError("Object.keys called on a non-object");
        }

        var keys = [];
        for (var name in object) {
            if (owns(object, name)) {
                keys.push(name);
            }
        }

        if (hasDontEnumBug) {
            for (var i = 0, ii = dontEnumsLength; i < ii; i++) {
                var dontEnum = dontEnums[i];
                if (owns(object, dontEnum)) {
                    keys.push(dontEnum);
                }
            }
        }
        return keys;
    };

}
if (!Date.now) {
    Date.now = function now() {
        return new Date().getTime();
    };
}
var ws = "\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003" +
    "\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028" +
    "\u2029\uFEFF";
if (!String.prototype.trim || ws.trim()) {
    ws = "[" + ws + "]";
    var trimBeginRegexp = new RegExp("^" + ws + ws + "*"),
        trimEndRegexp = new RegExp(ws + ws + "*$");
    String.prototype.trim = function trim() {
        return String(this).replace(trimBeginRegexp, "").replace(trimEndRegexp, "");
    };
}

function toInteger(n) {
    n = +n;
    if (n !== n) { // isNaN
        n = 0;
    } else if (n !== 0 && n !== (1/0) && n !== -(1/0)) {
        n = (n > 0 || -1) * Math.floor(Math.abs(n));
    }
    return n;
}

function isPrimitive(input) {
    var type = typeof input;
    return (
        input === null ||
        type === "undefined" ||
        type === "boolean" ||
        type === "number" ||
        type === "string"
    );
}

function toPrimitive(input) {
    var val, valueOf, toString;
    if (isPrimitive(input)) {
        return input;
    }
    valueOf = input.valueOf;
    if (typeof valueOf === "function") {
        val = valueOf.call(input);
        if (isPrimitive(val)) {
            return val;
        }
    }
    toString = input.toString;
    if (typeof toString === "function") {
        val = toString.call(input);
        if (isPrimitive(val)) {
            return val;
        }
    }
    throw new TypeError();
}
var toObject = function (o) {
    if (o == null) { // this matches both null and undefined
        throw new TypeError("can't convert "+o+" to object");
    }
    return Object(o);
};

});

define("ace/lib/fixoldbrowsers",["require","exports","module","ace/lib/regexp","ace/lib/es5-shim"], function(require, exports, module) {
"use strict";

require("./regexp");
require("./es5-shim");

});

define("ace/lib/dom",["require","exports","module"], function(require, exports, module) {
"use strict";

var XHTML_NS = "http://www.w3.org/1999/xhtml";

exports.getDocumentHead = function(doc) {
    if (!doc)
        doc = document;
    return doc.head || doc.getElementsByTagName("head")[0] || doc.documentElement;
}

exports.createElement = function(tag, ns) {
    return document.createElementNS ?
           document.createElementNS(ns || XHTML_NS, tag) :
           document.createElement(tag);
};

exports.hasCssClass = function(el, name) {
    var classes = (el.className || "").split(/\s+/g);
    return classes.indexOf(name) !== -1;
};
exports.addCssClass = function(el, name) {
    if (!exports.hasCssClass(el, name)) {
        el.className += " " + name;
    }
};
exports.removeCssClass = function(el, name) {
    var classes = el.className.split(/\s+/g);
    while (true) {
        var index = classes.indexOf(name);
        if (index == -1) {
            break;
        }
        classes.splice(index, 1);
    }
    el.className = classes.join(" ");
};

exports.toggleCssClass = function(el, name) {
    var classes = el.className.split(/\s+/g), add = true;
    while (true) {
        var index = classes.indexOf(name);
        if (index == -1) {
            break;
        }
        add = false;
        classes.splice(index, 1);
    }
    if(add)
        classes.push(name);

    el.className = classes.join(" ");
    return add;
};
exports.setCssClass = function(node, className, include) {
    if (include) {
        exports.addCssClass(node, className);
    } else {
        exports.removeCssClass(node, className);
    }
};

exports.hasCssString = function(id, doc) {
    var index = 0, sheets;
    doc = doc || document;

    if (doc.createStyleSheet && (sheets = doc.styleSheets)) {
        while (index < sheets.length)
            if (sheets[index++].owningElement.id === id) return true;
    } else if ((sheets = doc.getElementsByTagName("style"))) {
        while (index < sheets.length)
            if (sheets[index++].id === id) return true;
    }

    return false;
};

exports.importCssString = function importCssString(cssText, id, doc) {
    doc = doc || document;
    if (id && exports.hasCssString(id, doc))
        return null;
    
    var style;
    
    if (doc.createStyleSheet) {
        style = doc.createStyleSheet();
        style.cssText = cssText;
        if (id)
            style.owningElement.id = id;
    } else {
        style = doc.createElementNS
            ? doc.createElementNS(XHTML_NS, "style")
            : doc.createElement("style");

        style.appendChild(doc.createTextNode(cssText));
        if (id)
            style.id = id;

        exports.getDocumentHead(doc).appendChild(style);
    }
};

exports.importCssStylsheet = function(uri, doc) {
    if (doc.createStyleSheet) {
        doc.createStyleSheet(uri);
    } else {
        var link = exports.createElement('link');
        link.rel = 'stylesheet';
        link.href = uri;

        exports.getDocumentHead(doc).appendChild(link);
    }
};

exports.getInnerWidth = function(element) {
    return (
        parseInt(exports.computedStyle(element, "paddingLeft"), 10) +
        parseInt(exports.computedStyle(element, "paddingRight"), 10) + 
        element.clientWidth
    );
};

exports.getInnerHeight = function(element) {
    return (
        parseInt(exports.computedStyle(element, "paddingTop"), 10) +
        parseInt(exports.computedStyle(element, "paddingBottom"), 10) +
        element.clientHeight
    );
};


if (typeof document == "undefined")
    return;

if (window.pageYOffset !== undefined) {
    exports.getPageScrollTop = function() {
        return window.pageYOffset;
    };

    exports.getPageScrollLeft = function() {
        return window.pageXOffset;
    };
}
else {
    exports.getPageScrollTop = function() {
        return document.body.scrollTop;
    };

    exports.getPageScrollLeft = function() {
        return document.body.scrollLeft;
    };
}

if (window.getComputedStyle)
    exports.computedStyle = function(element, style) {
        if (style)
            return (window.getComputedStyle(element, "") || {})[style] || "";
        return window.getComputedStyle(element, "") || {};
    };
else
    exports.computedStyle = function(element, style) {
        if (style)
            return element.currentStyle[style];
        return element.currentStyle;
    };

exports.scrollbarWidth = function(document) {
    var inner = exports.createElement("ace_inner");
    inner.style.width = "100%";
    inner.style.minWidth = "0px";
    inner.style.height = "200px";
    inner.style.display = "block";

    var outer = exports.createElement("ace_outer");
    var style = outer.style;

    style.position = "absolute";
    style.left = "-10000px";
    style.overflow = "hidden";
    style.width = "200px";
    style.minWidth = "0px";
    style.height = "150px";
    style.display = "block";

    outer.appendChild(inner);

    var body = document.documentElement;
    body.appendChild(outer);

    var noScrollbar = inner.offsetWidth;

    style.overflow = "scroll";
    var withScrollbar = inner.offsetWidth;

    if (noScrollbar == withScrollbar) {
        withScrollbar = outer.clientWidth;
    }

    body.removeChild(outer);

    return noScrollbar-withScrollbar;
};
exports.setInnerHtml = function(el, innerHtml) {
    var element = el.cloneNode(false);//document.createElement("div");
    element.innerHTML = innerHtml;
    el.parentNode.replaceChild(element, el);
    return element;
};

if ("textContent" in document.documentElement) {
    exports.setInnerText = function(el, innerText) {
        el.textContent = innerText;
    };

    exports.getInnerText = function(el) {
        return el.textContent;
    };
}
else {
    exports.setInnerText = function(el, innerText) {
        el.innerText = innerText;
    };

    exports.getInnerText = function(el) {
        return el.innerText;
    };
}

exports.getParentWindow = function(document) {
    return document.defaultView || document.parentWindow;
};

});

define("ace/lib/oop",["require","exports","module"], function(require, exports, module) {
"use strict";

exports.inherits = function(ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
};

exports.mixin = function(obj, mixin) {
    for (var key in mixin) {
        obj[key] = mixin[key];
    }
    return obj;
};

exports.implement = function(proto, mixin) {
    exports.mixin(proto, mixin);
};

});

define("ace/lib/keys",["require","exports","module","ace/lib/fixoldbrowsers","ace/lib/oop"], function(require, exports, module) {
"use strict";

require("./fixoldbrowsers");

var oop = require("./oop");
var Keys = (function() {
    var ret = {
        MODIFIER_KEYS: {
            16: 'Shift', 17: 'Ctrl', 18: 'Alt', 224: 'Meta'
        },

        KEY_MODS: {
            "ctrl": 1, "alt": 2, "option" : 2, "shift": 4,
            "super": 8, "meta": 8, "command": 8, "cmd": 8
        },

        FUNCTION_KEYS : {
            8  : "Backspace",
            9  : "Tab",
            13 : "Return",
            19 : "Pause",
            27 : "Esc",
            32 : "Space",
            33 : "PageUp",
            34 : "PageDown",
            35 : "End",
            36 : "Home",
            37 : "Left",
            38 : "Up",
            39 : "Right",
            40 : "Down",
            44 : "Print",
            45 : "Insert",
            46 : "Delete",
            96 : "Numpad0",
            97 : "Numpad1",
            98 : "Numpad2",
            99 : "Numpad3",
            100: "Numpad4",
            101: "Numpad5",
            102: "Numpad6",
            103: "Numpad7",
            104: "Numpad8",
            105: "Numpad9",
            '-13': "NumpadEnter",
            112: "F1",
            113: "F2",
            114: "F3",
            115: "F4",
            116: "F5",
            117: "F6",
            118: "F7",
            119: "F8",
            120: "F9",
            121: "F10",
            122: "F11",
            123: "F12",
            144: "Numlock",
            145: "Scrolllock"
        },

        PRINTABLE_KEYS: {
           32: ' ',  48: '0',  49: '1',  50: '2',  51: '3',  52: '4', 53:  '5',
           54: '6',  55: '7',  56: '8',  57: '9',  59: ';',  61: '=', 65:  'a',
           66: 'b',  67: 'c',  68: 'd',  69: 'e',  70: 'f',  71: 'g', 72:  'h',
           73: 'i',  74: 'j',  75: 'k',  76: 'l',  77: 'm',  78: 'n', 79:  'o',
           80: 'p',  81: 'q',  82: 'r',  83: 's',  84: 't',  85: 'u', 86:  'v',
           87: 'w',  88: 'x',  89: 'y',  90: 'z', 107: '+', 109: '-', 110: '.',
          186: ';', 187: '=', 188: ',', 189: '-', 190: '.', 191: '/', 192: '`',
          219: '[', 220: '\\',221: ']', 222: '\''
        }
    };
    var name, i;
    for (i in ret.FUNCTION_KEYS) {
        name = ret.FUNCTION_KEYS[i].toLowerCase();
        ret[name] = parseInt(i, 10);
    }
    for (i in ret.PRINTABLE_KEYS) {
        name = ret.PRINTABLE_KEYS[i].toLowerCase();
        ret[name] = parseInt(i, 10);
    }
    oop.mixin(ret, ret.MODIFIER_KEYS);
    oop.mixin(ret, ret.PRINTABLE_KEYS);
    oop.mixin(ret, ret.FUNCTION_KEYS);
    ret.enter = ret["return"];
    ret.escape = ret.esc;
    ret.del = ret["delete"];
    ret[173] = '-';
    
    (function() {
        var mods = ["cmd", "ctrl", "alt", "shift"];
        for (var i = Math.pow(2, mods.length); i--;) {            
            ret.KEY_MODS[i] = mods.filter(function(x) {
                return i & ret.KEY_MODS[x];
            }).join("-") + "-";
        }
    })();

    ret.KEY_MODS[0] = "";
    ret.KEY_MODS[-1] = "input-";

    return ret;
})();
oop.mixin(exports, Keys);

exports.keyCodeToString = function(keyCode) {
    var keyString = Keys[keyCode];
    if (typeof keyString != "string")
        keyString = String.fromCharCode(keyCode);
    return keyString.toLowerCase();
};

});

define("ace/lib/useragent",["require","exports","module"], function(require, exports, module) {
"use strict";
exports.OS = {
    LINUX: "LINUX",
    MAC: "MAC",
    WINDOWS: "WINDOWS"
};
exports.getOS = function() {
    if (exports.isMac) {
        return exports.OS.MAC;
    } else if (exports.isLinux) {
        return exports.OS.LINUX;
    } else {
        return exports.OS.WINDOWS;
    }
};
if (typeof navigator != "object")
    return;

var os = (navigator.platform.match(/mac|win|linux/i) || ["other"])[0].toLowerCase();
var ua = navigator.userAgent;
exports.isWin = (os == "win");
exports.isMac = (os == "mac");
exports.isLinux = (os == "linux");
exports.isIE = 
    (navigator.appName == "Microsoft Internet Explorer" || navigator.appName.indexOf("MSAppHost") >= 0)
    ? parseFloat((ua.match(/(?:MSIE |Trident\/[0-9]+[\.0-9]+;.*rv:)([0-9]+[\.0-9]+)/)||[])[1])
    : parseFloat((ua.match(/(?:Trident\/[0-9]+[\.0-9]+;.*rv:)([0-9]+[\.0-9]+)/)||[])[1]); // for ie
    
exports.isOldIE = exports.isIE && exports.isIE < 9;
exports.isGecko = exports.isMozilla = (window.Controllers || window.controllers) && window.navigator.product === "Gecko";
exports.isOldGecko = exports.isGecko && parseInt((ua.match(/rv\:(\d+)/)||[])[1], 10) < 4;
exports.isOpera = window.opera && Object.prototype.toString.call(window.opera) == "[object Opera]";
exports.isWebKit = parseFloat(ua.split("WebKit/")[1]) || undefined;

exports.isChrome = parseFloat(ua.split(" Chrome/")[1]) || undefined;

exports.isAIR = ua.indexOf("AdobeAIR") >= 0;

exports.isIPad = ua.indexOf("iPad") >= 0;

exports.isTouchPad = ua.indexOf("TouchPad") >= 0;

exports.isChromeOS = ua.indexOf(" CrOS ") >= 0;

});

define("ace/lib/event",["require","exports","module","ace/lib/keys","ace/lib/useragent"], function(require, exports, module) {
"use strict";

var keys = require("./keys");
var useragent = require("./useragent");

exports.addListener = function(elem, type, callback) {
    if (elem.addEventListener) {
        return elem.addEventListener(type, callback, false);
    }
    if (elem.attachEvent) {
        var wrapper = function() {
            callback.call(elem, window.event);
        };
        callback._wrapper = wrapper;
        elem.attachEvent("on" + type, wrapper);
    }
};

exports.removeListener = function(elem, type, callback) {
    if (elem.removeEventListener) {
        return elem.removeEventListener(type, callback, false);
    }
    if (elem.detachEvent) {
        elem.detachEvent("on" + type, callback._wrapper || callback);
    }
};
exports.stopEvent = function(e) {
    exports.stopPropagation(e);
    exports.preventDefault(e);
    return false;
};

exports.stopPropagation = function(e) {
    if (e.stopPropagation)
        e.stopPropagation();
    else
        e.cancelBubble = true;
};

exports.preventDefault = function(e) {
    if (e.preventDefault)
        e.preventDefault();
    else
        e.returnValue = false;
};
exports.getButton = function(e) {
    if (e.type == "dblclick")
        return 0;
    if (e.type == "contextmenu" || (useragent.isMac && (e.ctrlKey && !e.altKey && !e.shiftKey)))
        return 2;
    if (e.preventDefault) {
        return e.button;
    }
    else {
        return {1:0, 2:2, 4:1}[e.button];
    }
};

exports.capture = function(el, eventHandler, releaseCaptureHandler) {
    function onMouseUp(e) {
        eventHandler && eventHandler(e);
        releaseCaptureHandler && releaseCaptureHandler(e);

        exports.removeListener(document, "mousemove", eventHandler, true);
        exports.removeListener(document, "mouseup", onMouseUp, true);
        exports.removeListener(document, "dragstart", onMouseUp, true);
    }

    exports.addListener(document, "mousemove", eventHandler, true);
    exports.addListener(document, "mouseup", onMouseUp, true);
    exports.addListener(document, "dragstart", onMouseUp, true);
    
    return onMouseUp;
};

exports.addMouseWheelListener = function(el, callback) {
    if ("onmousewheel" in el) {
        exports.addListener(el, "mousewheel", function(e) {
            var factor = 8;
            if (e.wheelDeltaX !== undefined) {
                e.wheelX = -e.wheelDeltaX / factor;
                e.wheelY = -e.wheelDeltaY / factor;
            } else {
                e.wheelX = 0;
                e.wheelY = -e.wheelDelta / factor;
            }
            callback(e);
        });
    } else if ("onwheel" in el) {
        exports.addListener(el, "wheel",  function(e) {
            var factor = 0.35;
            switch (e.deltaMode) {
                case e.DOM_DELTA_PIXEL:
                    e.wheelX = e.deltaX * factor || 0;
                    e.wheelY = e.deltaY * factor || 0;
                    break;
                case e.DOM_DELTA_LINE:
                case e.DOM_DELTA_PAGE:
                    e.wheelX = (e.deltaX || 0) * 5;
                    e.wheelY = (e.deltaY || 0) * 5;
                    break;
            }
            
            callback(e);
        });
    } else {
        exports.addListener(el, "DOMMouseScroll", function(e) {
            if (e.axis && e.axis == e.HORIZONTAL_AXIS) {
                e.wheelX = (e.detail || 0) * 5;
                e.wheelY = 0;
            } else {
                e.wheelX = 0;
                e.wheelY = (e.detail || 0) * 5;
            }
            callback(e);
        });
    }
};

exports.addMultiMouseDownListener = function(el, timeouts, eventHandler, callbackName) {
    var clicks = 0;
    var startX, startY, timer; 
    var eventNames = {
        2: "dblclick",
        3: "tripleclick",
        4: "quadclick"
    };

    exports.addListener(el, "mousedown", function(e) {
        if (exports.getButton(e) !== 0) {
            clicks = 0;
        } else if (e.detail > 1) {
            clicks++;
            if (clicks > 4)
                clicks = 1;
        } else {
            clicks = 1;
        }
        if (useragent.isIE) {
            var isNewClick = Math.abs(e.clientX - startX) > 5 || Math.abs(e.clientY - startY) > 5;
            if (!timer || isNewClick)
                clicks = 1;
            if (timer)
                clearTimeout(timer);
            timer = setTimeout(function() {timer = null}, timeouts[clicks - 1] || 600);

            if (clicks == 1) {
                startX = e.clientX;
                startY = e.clientY;
            }
        }
        
        e._clicks = clicks;

        eventHandler[callbackName]("mousedown", e);

        if (clicks > 4)
            clicks = 0;
        else if (clicks > 1)
            return eventHandler[callbackName](eventNames[clicks], e);
    });

    if (useragent.isOldIE) {
        exports.addListener(el, "dblclick", function(e) {
            clicks = 2;
            if (timer)
                clearTimeout(timer);
            timer = setTimeout(function() {timer = null}, timeouts[clicks - 1] || 600);
            eventHandler[callbackName]("mousedown", e);
            eventHandler[callbackName](eventNames[clicks], e);
        });
    }
};

var getModifierHash = useragent.isMac && useragent.isOpera && !("KeyboardEvent" in window)
    ? function(e) {
        return 0 | (e.metaKey ? 1 : 0) | (e.altKey ? 2 : 0) | (e.shiftKey ? 4 : 0) | (e.ctrlKey ? 8 : 0);
    }
    : function(e) {
        return 0 | (e.ctrlKey ? 1 : 0) | (e.altKey ? 2 : 0) | (e.shiftKey ? 4 : 0) | (e.metaKey ? 8 : 0);
    };

exports.getModifierString = function(e) {
    return keys.KEY_MODS[getModifierHash(e)];
};

function normalizeCommandKeys(callback, e, keyCode) {
    var hashId = getModifierHash(e);

    if (!useragent.isMac && pressedKeys) {
        if (pressedKeys[91] || pressedKeys[92])
            hashId |= 8;
        if (pressedKeys.altGr) {
            if ((3 & hashId) != 3)
                pressedKeys.altGr = 0;
            else
                return;
        }
        if (keyCode === 18 || keyCode === 17) {
            var location = "location" in e ? e.location : e.keyLocation;
            if (keyCode === 17 && location === 1) {
                if (pressedKeys[keyCode] == 1)
                    ts = e.timeStamp;
            } else if (keyCode === 18 && hashId === 3 && location === 2) {
                var dt = e.timestamp - ts;
                if (dt < 50)
                    pressedKeys.altGr = true;
            }
        }
    }
    
    if (keyCode in keys.MODIFIER_KEYS) {
        keyCode = -1;
    }

    if (hashId & 8 && (keyCode === 91 || keyCode === 93)) {
        keyCode = -1;
    }
    
    if (!hashId && keyCode === 13) {
        var location = "location" in e ? e.location : e.keyLocation;
        if (location === 3) {
            callback(e, hashId, -keyCode);
            if (e.defaultPrevented)
                return;
        }
    }
    
    if (useragent.isChromeOS && hashId & 8) {
        callback(e, hashId, keyCode);
        if (e.defaultPrevented)
            return;
        else
            hashId &= ~8;
    }
    if (!hashId && !(keyCode in keys.FUNCTION_KEYS) && !(keyCode in keys.PRINTABLE_KEYS)) {
        return false;
    }
    
    return callback(e, hashId, keyCode);
}

var pressedKeys = null;
var ts = 0;
exports.addCommandKeyListener = function(el, callback) {
    var addListener = exports.addListener;
    if (useragent.isOldGecko || (useragent.isOpera && !("KeyboardEvent" in window))) {
        var lastKeyDownKeyCode = null;
        addListener(el, "keydown", function(e) {
            lastKeyDownKeyCode = e.keyCode;
        });
        addListener(el, "keypress", function(e) {
            return normalizeCommandKeys(callback, e, lastKeyDownKeyCode);
        });
    } else {
        var lastDefaultPrevented = null;

        addListener(el, "keydown", function(e) {
            pressedKeys[e.keyCode] = (pressedKeys[e.keyCode] || 0) + 1;
            var result = normalizeCommandKeys(callback, e, e.keyCode);
            lastDefaultPrevented = e.defaultPrevented;
            return result;
        });

        addListener(el, "keypress", function(e) {
            if (lastDefaultPrevented && (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey)) {
                exports.stopEvent(e);
                lastDefaultPrevented = null;
            }
        });

        addListener(el, "keyup", function(e) {
            pressedKeys[e.keyCode] = null;
        });

        if (!pressedKeys) {
            pressedKeys = Object.create(null);
            addListener(window, "focus", function(e) {
                pressedKeys = Object.create(null);
            });
        }
    }
};

if (window.postMessage && !useragent.isOldIE) {
    var postMessageId = 1;
    exports.nextTick = function(callback, win) {
        win = win || window;
        var messageName = "zero-timeout-message-" + postMessageId;
        exports.addListener(win, "message", function listener(e) {
            if (e.data == messageName) {
                exports.stopPropagation(e);
                exports.removeListener(win, "message", listener);
                callback();
            }
        });
        win.postMessage(messageName, "*");
    };
}


exports.nextFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame;

if (exports.nextFrame)
    exports.nextFrame = exports.nextFrame.bind(window);
else
    exports.nextFrame = function(callback) {
        setTimeout(callback, 17);
    };
});

define("ace/lib/lang",["require","exports","module"], function(require, exports, module) {
"use strict";

exports.last = function(a) {
    return a[a.length - 1];
};

exports.stringReverse = function(string) {
    return string.split("").reverse().join("");
};

exports.stringRepeat = function (string, count) {
    var result = '';
    while (count > 0) {
        if (count & 1)
            result += string;

        if (count >>= 1)
            string += string;
    }
    return result;
};

var trimBeginRegexp = /^\s\s*/;
var trimEndRegexp = /\s\s*$/;

exports.stringTrimLeft = function (string) {
    return string.replace(trimBeginRegexp, '');
};

exports.stringTrimRight = function (string) {
    return string.replace(trimEndRegexp, '');
};

exports.copyObject = function(obj) {
    var copy = {};
    for (var key in obj) {
        copy[key] = obj[key];
    }
    return copy;
};

exports.copyArray = function(array){
    var copy = [];
    for (var i=0, l=array.length; i<l; i++) {
        if (array[i] && typeof array[i] == "object")
            copy[i] = this.copyObject( array[i] );
        else 
            copy[i] = array[i];
    }
    return copy;
};

exports.deepCopy = function (obj) {
    if (typeof obj !== "object" || !obj)
        return obj;
    var cons = obj.constructor;
    if (cons === RegExp)
        return obj;
    
    var copy = cons();
    for (var key in obj) {
        if (typeof obj[key] === "object") {
            copy[key] = exports.deepCopy(obj[key]);
        } else {
            copy[key] = obj[key];
        }
    }
    return copy;
};

exports.arrayToMap = function(arr) {
    var map = {};
    for (var i=0; i<arr.length; i++) {
        map[arr[i]] = 1;
    }
    return map;

};

exports.createMap = function(props) {
    var map = Object.create(null);
    for (var i in props) {
        map[i] = props[i];
    }
    return map;
};
exports.arrayRemove = function(array, value) {
  for (var i = 0; i <= array.length; i++) {
    if (value === array[i]) {
      array.splice(i, 1);
    }
  }
};

exports.escapeRegExp = function(str) {
    return str.replace(/([.*+?^${}()|[\]\/\\])/g, '\\$1');
};

exports.escapeHTML = function(str) {
    return str.replace(/&/g, "&#38;").replace(/"/g, "&#34;").replace(/'/g, "&#39;").replace(/</g, "&#60;");
};

exports.getMatchOffsets = function(string, regExp) {
    var matches = [];

    string.replace(regExp, function(str) {
        matches.push({
            offset: arguments[arguments.length-2],
            length: str.length
        });
    });

    return matches;
};
exports.deferredCall = function(fcn) {
    var timer = null;
    var callback = function() {
        timer = null;
        fcn();
    };

    var deferred = function(timeout) {
        deferred.cancel();
        timer = setTimeout(callback, timeout || 0);
        return deferred;
    };

    deferred.schedule = deferred;

    deferred.call = function() {
        this.cancel();
        fcn();
        return deferred;
    };

    deferred.cancel = function() {
        clearTimeout(timer);
        timer = null;
        return deferred;
    };
    
    deferred.isPending = function() {
        return timer;
    };

    return deferred;
};


exports.delayedCall = function(fcn, defaultTimeout) {
    var timer = null;
    var callback = function() {
        timer = null;
        fcn();
    };

    var _self = function(timeout) {
        if (timer == null)
            timer = setTimeout(callback, timeout || defaultTimeout);
    };

    _self.delay = function(timeout) {
        timer && clearTimeout(timer);
        timer = setTimeout(callback, timeout || defaultTimeout);
    };
    _self.schedule = _self;

    _self.call = function() {
        this.cancel();
        fcn();
    };

    _self.cancel = function() {
        timer && clearTimeout(timer);
        timer = null;
    };

    _self.isPending = function() {
        return timer;
    };

    return _self;
};
});

define("ace/keyboard/textinput",["require","exports","module","ace/lib/event","ace/lib/useragent","ace/lib/dom","ace/lib/lang"], function(require, exports, module) {
"use strict";

var event = require("../lib/event");
var useragent = require("../lib/useragent");
var dom = require("../lib/dom");
var lang = require("../lib/lang");
var BROKEN_SETDATA = useragent.isChrome < 18;
var USE_IE_MIME_TYPE =  useragent.isIE;

var TextInput = function(parentNode, host) {
    var text = dom.createElement("textarea");
    text.className = "ace_text-input";

    if (useragent.isTouchPad)
        text.setAttribute("x-palm-disable-auto-cap", true);

    text.setAttribute("wrap", "off");
    text.setAttribute("autocorrect", "off");
    text.setAttribute("autocapitalize", "off");
    text.setAttribute("spellcheck", false);

    text.style.opacity = "0";
    if (useragent.isOldIE) text.style.top = "-1000px";
    parentNode.insertBefore(text, parentNode.firstChild);

    var PLACEHOLDER = "\x01\x01";

    var copied = false;
    var pasted = false;
    var inComposition = false;
    var tempStyle = '';
    var isSelectionEmpty = true;
    try { var isFocused = document.activeElement === text; } catch(e) {}
    
    event.addListener(text, "blur", function(e) {
        host.onBlur(e);
        isFocused = false;
    });
    event.addListener(text, "focus", function(e) {
        isFocused = true;
        host.onFocus(e);
        resetSelection();
    });
    this.focus = function() {
        if (tempStyle) return text.focus();
        text.style.position = "fixed";
        text.style.top = "-1000px";
        text.focus();
        setTimeout(function() {
            text.style.position = "";
        }, 0);
    };
    this.blur = function() { text.blur(); };
    this.isFocused = function() {
        return isFocused;
    };
    var syncSelection = lang.delayedCall(function() {
        isFocused && resetSelection(isSelectionEmpty);
    });
    var syncValue = lang.delayedCall(function() {
         if (!inComposition) {
            text.value = PLACEHOLDER;
            isFocused && resetSelection();
         }
    });

    function resetSelection(isEmpty) {
        if (inComposition)
            return;
        inComposition = true;
        
        if (inputHandler) {
            selectionStart = 0;
            selectionEnd = isEmpty ? 0 : text.value.length - 1;
        } else {
            var selectionStart = isEmpty ? 2 : 1;
            var selectionEnd = 2;
        }
        try {
            text.setSelectionRange(selectionStart, selectionEnd);
        } catch(e){}
        
        inComposition = false;
    }

    function resetValue() {
        if (inComposition)
            return;
        text.value = PLACEHOLDER;
        if (useragent.isWebKit)
            syncValue.schedule();
    }

    useragent.isWebKit || host.addEventListener('changeSelection', function() {
        if (host.selection.isEmpty() != isSelectionEmpty) {
            isSelectionEmpty = !isSelectionEmpty;
            syncSelection.schedule();
        }
    });

    resetValue();
    if (isFocused)
        host.onFocus();


    var isAllSelected = function(text) {
        return text.selectionStart === 0 && text.selectionEnd === text.value.length;
    };
    if (!text.setSelectionRange && text.createTextRange) {
        text.setSelectionRange = function(selectionStart, selectionEnd) {
            var range = this.createTextRange();
            range.collapse(true);
            range.moveStart('character', selectionStart);
            range.moveEnd('character', selectionEnd);
            range.select();
        };
        isAllSelected = function(text) {
            try {
                var range = text.ownerDocument.selection.createRange();
            }catch(e) {}
            if (!range || range.parentElement() != text) return false;
                return range.text == text.value;
        }
    }
    if (useragent.isOldIE) {
        var inPropertyChange = false;
        var onPropertyChange = function(e){
            if (inPropertyChange)
                return;
            var data = text.value;
            if (inComposition || !data || data == PLACEHOLDER)
                return;
            if (e && data == PLACEHOLDER[0])
                return syncProperty.schedule();

            sendText(data);
            inPropertyChange = true;
            resetValue();
            inPropertyChange = false;
        };
        var syncProperty = lang.delayedCall(onPropertyChange);
        event.addListener(text, "propertychange", onPropertyChange);

        var keytable = { 13:1, 27:1 };
        event.addListener(text, "keyup", function (e) {
            if (inComposition && (!text.value || keytable[e.keyCode]))
                setTimeout(onCompositionEnd, 0);
            if ((text.value.charCodeAt(0)||0) < 129) {
                return syncProperty.call();
            }
            inComposition ? onCompositionUpdate() : onCompositionStart();
        });
        event.addListener(text, "keydown", function (e) {
            syncProperty.schedule(50);
        });
    }

    var onSelect = function(e) {
        if (copied) {
            copied = false;
        } else if (isAllSelected(text)) {
            host.selectAll();
            resetSelection();
        } else if (inputHandler) {
            resetSelection(host.selection.isEmpty());
        }
    };

    var inputHandler = null;
    this.setInputHandler = function(cb) {inputHandler = cb};
    this.getInputHandler = function() {return inputHandler};
    var afterContextMenu = false;
    
    var sendText = function(data) {
        if (inputHandler) {
            data = inputHandler(data);
            inputHandler = null;
        }
        if (pasted) {
            resetSelection();
            if (data)
                host.onPaste(data);
            pasted = false;
        } else if (data == PLACEHOLDER.charAt(0)) {
            if (afterContextMenu)
                host.execCommand("del", {source: "ace"});
            else // some versions of android do not fire keydown when pressing backspace
                host.execCommand("backspace", {source: "ace"});
        } else {
            if (data.substring(0, 2) == PLACEHOLDER)
                data = data.substr(2);
            else if (data.charAt(0) == PLACEHOLDER.charAt(0))
                data = data.substr(1);
            else if (data.charAt(data.length - 1) == PLACEHOLDER.charAt(0))
                data = data.slice(0, -1);
            if (data.charAt(data.length - 1) == PLACEHOLDER.charAt(0))
                data = data.slice(0, -1);
            
            if (data)
                host.onTextInput(data);
        }
        if (afterContextMenu)
            afterContextMenu = false;
    };
    var onInput = function(e) {
        if (inComposition)
            return;
        var data = text.value;
        sendText(data);
        resetValue();
    };
    
    var handleClipboardData = function(e, data) {
        var clipboardData = e.clipboardData || window.clipboardData;
        if (!clipboardData || BROKEN_SETDATA)
            return;
        var mime = USE_IE_MIME_TYPE ? "Text" : "text/plain";
        if (data) {
            return clipboardData.setData(mime, data) !== false;
        } else {
            return clipboardData.getData(mime);
        }
    };

    var doCopy = function(e, isCut) {
        var data = host.getCopyText();
        if (!data)
            return event.preventDefault(e);

        if (handleClipboardData(e, data)) {
            isCut ? host.onCut() : host.onCopy();
            event.preventDefault(e);
        } else {
            copied = true;
            text.value = data;
            text.select();
            setTimeout(function(){
                copied = false;
                resetValue();
                resetSelection();
                isCut ? host.onCut() : host.onCopy();
            });
        }
    };
    
    var onCut = function(e) {
        doCopy(e, true);
    };
    
    var onCopy = function(e) {
        doCopy(e, false);
    };
    
    var onPaste = function(e) {
        var data = handleClipboardData(e);
        if (typeof data == "string") {
            if (data)
                host.onPaste(data);
            if (useragent.isIE)
                setTimeout(resetSelection);
            event.preventDefault(e);
        }
        else {
            text.value = "";
            pasted = true;
        }
    };

    event.addCommandKeyListener(text, host.onCommandKey.bind(host));

    event.addListener(text, "select", onSelect);

    event.addListener(text, "input", onInput);

    event.addListener(text, "cut", onCut);
    event.addListener(text, "copy", onCopy);
    event.addListener(text, "paste", onPaste);
    if (!('oncut' in text) || !('oncopy' in text) || !('onpaste' in text)){
        event.addListener(parentNode, "keydown", function(e) {
            if ((useragent.isMac && !e.metaKey) || !e.ctrlKey)
                return;

            switch (e.keyCode) {
                case 67:
                    onCopy(e);
                    break;
                case 86:
                    onPaste(e);
                    break;
                case 88:
                    onCut(e);
                    break;
            }
        });
    }
    var onCompositionStart = function(e) {
        if (inComposition || !host.onCompositionStart || host.$readOnly) 
            return;
        inComposition = {};
        host.onCompositionStart();
        setTimeout(onCompositionUpdate, 0);
        host.on("mousedown", onCompositionEnd);
        if (!host.selection.isEmpty()) {
            host.insert("");
            host.session.markUndoGroup();
            host.selection.clearSelection();
        }
        host.session.markUndoGroup();
    };

    var onCompositionUpdate = function() {
        if (!inComposition || !host.onCompositionUpdate || host.$readOnly)
            return;
        var val = text.value.replace(/\x01/g, "");
        if (inComposition.lastValue === val) return;
        
        host.onCompositionUpdate(val);
        if (inComposition.lastValue)
            host.undo();
        inComposition.lastValue = val;
        if (inComposition.lastValue) {
            var r = host.selection.getRange();
            host.insert(inComposition.lastValue);
            host.session.markUndoGroup();
            inComposition.range = host.selection.getRange();
            host.selection.setRange(r);
            host.selection.clearSelection();
        }
    };

    var onCompositionEnd = function(e) {
        if (!host.onCompositionEnd || host.$readOnly) return;
        var c = inComposition;
        inComposition = false;
        var timer = setTimeout(function() {
            timer = null;
            var str = text.value.replace(/\x01/g, "");
            if (inComposition)
                return;
            else if (str == c.lastValue)
                resetValue();
            else if (!c.lastValue && str) {
                resetValue();
                sendText(str);
            }
        });
        inputHandler = function compositionInputHandler(str) {
            if (timer)
                clearTimeout(timer);
            str = str.replace(/\x01/g, "");
            if (str == c.lastValue)
                return "";
            if (c.lastValue && timer)
                host.undo();
            return str;
        };
        host.onCompositionEnd();
        host.removeListener("mousedown", onCompositionEnd);
        if (e.type == "compositionend" && c.range) {
            host.selection.setRange(c.range);
        }
    };
    
    

    var syncComposition = lang.delayedCall(onCompositionUpdate, 50);

    event.addListener(text, "compositionstart", onCompositionStart);
    if (useragent.isGecko) {
        event.addListener(text, "text", function(){syncComposition.schedule()});
    } else {
        event.addListener(text, "keyup", function(){syncComposition.schedule()});
        event.addListener(text, "keydown", function(){syncComposition.schedule()});
    }
    event.addListener(text, "compositionend", onCompositionEnd);

    this.getElement = function() {
        return text;
    };

    this.setReadOnly = function(readOnly) {
       text.readOnly = readOnly;
    };

    this.onContextMenu = function(e) {
        afterContextMenu = true;
        resetSelection(host.selection.isEmpty());
        host._emit("nativecontextmenu", {target: host, domEvent: e});
        this.moveToMouse(e, true);
    };
    
    this.moveToMouse = function(e, bringToFront) {
        if (!bringToFront && useragent.isOldIE)
            return;
        if (!tempStyle)
            tempStyle = text.style.cssText;
        text.style.cssText = (bringToFront ? "z-index:100000;" : "")
            + "height:" + text.style.height + ";"
            + (useragent.isIE ? "opacity:0.1;" : "");

        var rect = host.container.getBoundingClientRect();
        var style = dom.computedStyle(host.container);
        var top = rect.top + (parseInt(style.borderTopWidth) || 0);
        var left = rect.left + (parseInt(rect.borderLeftWidth) || 0);
        var maxTop = rect.bottom - top - text.clientHeight -2;
        var move = function(e) {
            text.style.left = e.clientX - left - 2 + "px";
            text.style.top = Math.min(e.clientY - top - 2, maxTop) + "px";
        }; 
        move(e);

        if (e.type != "mousedown")
            return;

        if (host.renderer.$keepTextAreaAtCursor)
            host.renderer.$keepTextAreaAtCursor = null;
        if (useragent.isWin && !useragent.isOldIE)
            event.capture(host.container, move, onContextMenuClose);
    };

    this.onContextMenuClose = onContextMenuClose;
    var closeTimeout;
    function onContextMenuClose() {
        clearTimeout(closeTimeout)
        closeTimeout = setTimeout(function () {
            if (tempStyle) {
                text.style.cssText = tempStyle;
                tempStyle = '';
            }
            if (host.renderer.$keepTextAreaAtCursor == null) {
                host.renderer.$keepTextAreaAtCursor = true;
                host.renderer.$moveTextAreaToCursor();
            }
        }, useragent.isOldIE ? 200 : 0);
    }

    var onContextMenu = function(e) {
        host.textInput.onContextMenu(e);
        onContextMenuClose();
    };
    event.addListener(host.renderer.scroller, "contextmenu", onContextMenu);
    event.addListener(text, "contextmenu", onContextMenu);
};

exports.TextInput = TextInput;
});

define("ace/mouse/default_handlers",["require","exports","module","ace/lib/dom","ace/lib/event","ace/lib/useragent"], function(require, exports, module) {
"use strict";

var dom = require("../lib/dom");
var event = require("../lib/event");
var useragent = require("../lib/useragent");

var DRAG_OFFSET = 0; // pixels

function DefaultHandlers(mouseHandler) {
    mouseHandler.$clickSelection = null;

    var editor = mouseHandler.editor;
    editor.setDefaultHandler("mousedown", this.onMouseDown.bind(mouseHandler));
    editor.setDefaultHandler("dblclick", this.onDoubleClick.bind(mouseHandler));
    editor.setDefaultHandler("tripleclick", this.onTripleClick.bind(mouseHandler));
    editor.setDefaultHandler("quadclick", this.onQuadClick.bind(mouseHandler));
    editor.setDefaultHandler("mousewheel", this.onMouseWheel.bind(mouseHandler));

    var exports = ["select", "startSelect", "selectEnd", "selectAllEnd", "selectByWordsEnd",
        "selectByLinesEnd", "dragWait", "dragWaitEnd", "focusWait"];

    exports.forEach(function(x) {
        mouseHandler[x] = this[x];
    }, this);

    mouseHandler.selectByLines = this.extendSelectionBy.bind(mouseHandler, "getLineRange");
    mouseHandler.selectByWords = this.extendSelectionBy.bind(mouseHandler, "getWordRange");
}

(function() {

    this.onMouseDown = function(ev) {
        var inSelection = ev.inSelection();
        var pos = ev.getDocumentPosition();
        this.mousedownEvent = ev;
        var editor = this.editor;

        var button = ev.getButton();
        if (button !== 0) {
            var selectionRange = editor.getSelectionRange();
            var selectionEmpty = selectionRange.isEmpty();
            editor.$blockScrolling++;
            if (selectionEmpty)
                editor.selection.moveToPosition(pos);
            editor.$blockScrolling--;
            editor.textInput.onContextMenu(ev.domEvent);
            return; // stopping event here breaks contextmenu on ff mac
        }

        this.mousedownEvent.time = Date.now();
        if (inSelection && !editor.isFocused()) {
            editor.focus();
            if (this.$focusTimout && !this.$clickSelection && !editor.inMultiSelectMode) {
                this.setState("focusWait");
                this.captureMouse(ev);
                return;
            }
        }

        this.captureMouse(ev);
        this.startSelect(pos, ev.domEvent._clicks > 1);
        return ev.preventDefault();
    };

    this.startSelect = function(pos, waitForClickSelection) {
        pos = pos || this.editor.renderer.screenToTextCoordinates(this.x, this.y);
        var editor = this.editor;
        editor.$blockScrolling++;
        if (this.mousedownEvent.getShiftKey())
            editor.selection.selectToPosition(pos);
        else if (!waitForClickSelection)
            editor.selection.moveToPosition(pos);
        if (!waitForClickSelection)
            this.select();
        if (editor.renderer.scroller.setCapture) {
            editor.renderer.scroller.setCapture();
        }
        editor.setStyle("ace_selecting");
        this.setState("select");
        editor.$blockScrolling--;
    };

    this.select = function() {
        var anchor, editor = this.editor;
        var cursor = editor.renderer.screenToTextCoordinates(this.x, this.y);
        editor.$blockScrolling++;
        if (this.$clickSelection) {
            var cmp = this.$clickSelection.comparePoint(cursor);

            if (cmp == -1) {
                anchor = this.$clickSelection.end;
            } else if (cmp == 1) {
                anchor = this.$clickSelection.start;
            } else {
                var orientedRange = calcRangeOrientation(this.$clickSelection, cursor);
                cursor = orientedRange.cursor;
                anchor = orientedRange.anchor;
            }
            editor.selection.setSelectionAnchor(anchor.row, anchor.column);
        }
        editor.selection.selectToPosition(cursor);
        editor.$blockScrolling--;
        editor.renderer.scrollCursorIntoView();
    };

    this.extendSelectionBy = function(unitName) {
        var anchor, editor = this.editor;
        var cursor = editor.renderer.screenToTextCoordinates(this.x, this.y);
        var range = editor.selection[unitName](cursor.row, cursor.column);
        editor.$blockScrolling++;
        if (this.$clickSelection) {
            var cmpStart = this.$clickSelection.comparePoint(range.start);
            var cmpEnd = this.$clickSelection.comparePoint(range.end);

            if (cmpStart == -1 && cmpEnd <= 0) {
                anchor = this.$clickSelection.end;
                if (range.end.row != cursor.row || range.end.column != cursor.column)
                    cursor = range.start;
            } else if (cmpEnd == 1 && cmpStart >= 0) {
                anchor = this.$clickSelection.start;
                if (range.start.row != cursor.row || range.start.column != cursor.column)
                    cursor = range.end;
            } else if (cmpStart == -1 && cmpEnd == 1) {
                cursor = range.end;
                anchor = range.start;
            } else {
                var orientedRange = calcRangeOrientation(this.$clickSelection, cursor);
                cursor = orientedRange.cursor;
                anchor = orientedRange.anchor;
            }
            editor.selection.setSelectionAnchor(anchor.row, anchor.column);
        }
        editor.selection.selectToPosition(cursor);
        editor.$blockScrolling--;
        editor.renderer.scrollCursorIntoView();
    };

    this.selectEnd =
    this.selectAllEnd =
    this.selectByWordsEnd =
    this.selectByLinesEnd = function() {
        this.$clickSelection = null;
        this.editor.unsetStyle("ace_selecting");
        if (this.editor.renderer.scroller.releaseCapture) {
            this.editor.renderer.scroller.releaseCapture();
        }
    };

    this.focusWait = function() {
        var distance = calcDistance(this.mousedownEvent.x, this.mousedownEvent.y, this.x, this.y);
        var time = Date.now();

        if (distance > DRAG_OFFSET || time - this.mousedownEvent.time > this.$focusTimout)
            this.startSelect(this.mousedownEvent.getDocumentPosition());
    };

    this.onDoubleClick = function(ev) {
        var pos = ev.getDocumentPosition();
        var editor = this.editor;
        var session = editor.session;

        var range = session.getBracketRange(pos);
        if (range) {
            if (range.isEmpty()) {
                range.start.column--;
                range.end.column++;
            }
            this.setState("select");
        } else {
            range = editor.selection.getWordRange(pos.row, pos.column);
            this.setState("selectByWords");
        }
        this.$clickSelection = range;
        this.select();
    };

    this.onTripleClick = function(ev) {
        var pos = ev.getDocumentPosition();
        var editor = this.editor;

        this.setState("selectByLines");
        var range = editor.getSelectionRange();
        if (range.isMultiLine() && range.contains(pos.row, pos.column)) {
            this.$clickSelection = editor.selection.getLineRange(range.start.row);
            this.$clickSelection.end = editor.selection.getLineRange(range.end.row).end;
        } else {
            this.$clickSelection = editor.selection.getLineRange(pos.row);
        }
        this.select();
    };

    this.onQuadClick = function(ev) {
        var editor = this.editor;

        editor.selectAll();
        this.$clickSelection = editor.getSelectionRange();
        this.setState("selectAll");
    };

    this.onMouseWheel = function(ev) {
        if (ev.getAccelKey())
            return;
        if (ev.getShiftKey() && ev.wheelY && !ev.wheelX) {
            ev.wheelX = ev.wheelY;
            ev.wheelY = 0;
        }

        var t = ev.domEvent.timeStamp;
        var dt = t - (this.$lastScrollTime||0);
        
        var editor = this.editor;
        var isScrolable = editor.renderer.isScrollableBy(ev.wheelX * ev.speed, ev.wheelY * ev.speed);
        if (isScrolable || dt < 200) {
            this.$lastScrollTime = t;
            editor.renderer.scrollBy(ev.wheelX * ev.speed, ev.wheelY * ev.speed);
            return ev.stop();
        }
    };

}).call(DefaultHandlers.prototype);

exports.DefaultHandlers = DefaultHandlers;

function calcDistance(ax, ay, bx, by) {
    return Math.sqrt(Math.pow(bx - ax, 2) + Math.pow(by - ay, 2));
}

function calcRangeOrientation(range, cursor) {
    if (range.start.row == range.end.row)
        var cmp = 2 * cursor.column - range.start.column - range.end.column;
    else if (range.start.row == range.end.row - 1 && !range.start.column && !range.end.column)
        var cmp = cursor.column - 4;
    else
        var cmp = 2 * cursor.row - range.start.row - range.end.row;

    if (cmp < 0)
        return {cursor: range.start, anchor: range.end};
    else
        return {cursor: range.end, anchor: range.start};
}

});

define("ace/tooltip",["require","exports","module","ace/lib/oop","ace/lib/dom"], function(require, exports, module) {
"use strict";

var oop = require("./lib/oop");
var dom = require("./lib/dom");
function Tooltip (parentNode) {
    this.isOpen = false;
    this.$element = null;
    this.$parentNode = parentNode;
}

(function() {
    this.$init = function() {
        this.$element = dom.createElement("div");
        this.$element.className = "ace_tooltip";
        this.$element.style.display = "none";
        this.$parentNode.appendChild(this.$element);
        return this.$element;
    };
    this.getElement = function() {
        return this.$element || this.$init();
    };
    this.setText = function(text) {
        dom.setInnerText(this.getElement(), text);
    };
    this.setHtml = function(html) {
        this.getElement().innerHTML = html;
    };
    this.setPosition = function(x, y) {
        this.getElement().style.left = x + "px";
        this.getElement().style.top = y + "px";
    };
    this.setClassName = function(className) {
        dom.addCssClass(this.getElement(), className);
    };
    this.show = function(text, x, y) {
        if (text != null)
            this.setText(text);
        if (x != null && y != null)
            this.setPosition(x, y);
        if (!this.isOpen) {
            this.getElement().style.display = "block";
            this.isOpen = true;
        }
    };

    this.hide = function() {
        if (this.isOpen) {
            this.getElement().style.display = "none";
            this.isOpen = false;
        }
    };
    this.getHeight = function() {
        return this.getElement().offsetHeight;
    };
    this.getWidth = function() {
        return this.getElement().offsetWidth;
    };

}).call(Tooltip.prototype);

exports.Tooltip = Tooltip;
});

define("ace/mouse/default_gutter_handler",["require","exports","module","ace/lib/dom","ace/lib/oop","ace/lib/event","ace/tooltip"], function(require, exports, module) {
"use strict";
var dom = require("../lib/dom");
var oop = require("../lib/oop");
var event = require("../lib/event");
var Tooltip = require("../tooltip").Tooltip;

function GutterHandler(mouseHandler) {
    var editor = mouseHandler.editor;
    var gutter = editor.renderer.$gutterLayer;
    var tooltip = new GutterTooltip(editor.container);

    mouseHandler.editor.setDefaultHandler("guttermousedown", function(e) {
        if (!editor.isFocused() || e.getButton() != 0)
            return;
        var gutterRegion = gutter.getRegion(e);

        if (gutterRegion == "foldWidgets")
            return;

        var row = e.getDocumentPosition().row;
        var selection = editor.session.selection;

        if (e.getShiftKey())
            selection.selectTo(row, 0);
        else {
            if (e.domEvent.detail == 2) {
                editor.selectAll();
                return e.preventDefault();
            }
            mouseHandler.$clickSelection = editor.selection.getLineRange(row);
        }
        mouseHandler.setState("selectByLines");
        mouseHandler.captureMouse(e);
        return e.preventDefault();
    });


    var tooltipTimeout, mouseEvent, tooltipAnnotation;

    function showTooltip() {
        var row = mouseEvent.getDocumentPosition().row;
        var annotation = gutter.$annotations[row];
        if (!annotation)
            return hideTooltip();

        var maxRow = editor.session.getLength();
        if (row == maxRow) {
            var screenRow = editor.renderer.pixelToScreenCoordinates(0, mouseEvent.y).row;
            var pos = mouseEvent.$pos;
            if (screenRow > editor.session.documentToScreenRow(pos.row, pos.column))
                return hideTooltip();
        }

        if (tooltipAnnotation == annotation)
            return;
        tooltipAnnotation = annotation.text.join("<br/>");

        tooltip.setHtml(tooltipAnnotation);
        tooltip.show();
        editor.on("mousewheel", hideTooltip);

        if (mouseHandler.$tooltipFollowsMouse) {
            moveTooltip(mouseEvent);
        } else {
            var gutterElement = gutter.$cells[editor.session.documentToScreenRow(row, 0)].element;
            var rect = gutterElement.getBoundingClientRect();
            var style = tooltip.getElement().style;
            style.left = rect.right + "px";
            style.top = rect.bottom + "px";
        }
    }

    function hideTooltip() {
        if (tooltipTimeout)
            tooltipTimeout = clearTimeout(tooltipTimeout);
        if (tooltipAnnotation) {
            tooltip.hide();
            tooltipAnnotation = null;
            editor.removeEventListener("mousewheel", hideTooltip);
        }
    }

    function moveTooltip(e) {
        tooltip.setPosition(e.x, e.y);
    }

    mouseHandler.editor.setDefaultHandler("guttermousemove", function(e) {
        var target = e.domEvent.target || e.domEvent.srcElement;
        if (dom.hasCssClass(target, "ace_fold-widget"))
            return hideTooltip();

        if (tooltipAnnotation && mouseHandler.$tooltipFollowsMouse)
            moveTooltip(e);

        mouseEvent = e;
        if (tooltipTimeout)
            return;
        tooltipTimeout = setTimeout(function() {
            tooltipTimeout = null;
            if (mouseEvent && !mouseHandler.isMousePressed)
                showTooltip();
            else
                hideTooltip();
        }, 50);
    });

    event.addListener(editor.renderer.$gutter, "mouseout", function(e) {
        mouseEvent = null;
        if (!tooltipAnnotation || tooltipTimeout)
            return;

        tooltipTimeout = setTimeout(function() {
            tooltipTimeout = null;
            hideTooltip();
        }, 50);
    });
    
    editor.on("changeSession", hideTooltip);
}

function GutterTooltip(parentNode) {
    Tooltip.call(this, parentNode);
}

oop.inherits(GutterTooltip, Tooltip);

(function(){
    this.setPosition = function(x, y) {
        var windowWidth = window.innerWidth || document.documentElement.clientWidth;
        var windowHeight = window.innerHeight || document.documentElement.clientHeight;
        var width = this.getWidth();
        var height = this.getHeight();
        x += 15;
        y += 15;
        if (x + width > windowWidth) {
            x -= (x + width) - windowWidth;
        }
        if (y + height > windowHeight) {
            y -= 20 + height;
        }
        Tooltip.prototype.setPosition.call(this, x, y);
    };

}).call(GutterTooltip.prototype);



exports.GutterHandler = GutterHandler;

});

define("ace/mouse/mouse_event",["require","exports","module","ace/lib/event","ace/lib/useragent"], function(require, exports, module) {
"use strict";

var event = require("../lib/event");
var useragent = require("../lib/useragent");
var MouseEvent = exports.MouseEvent = function(domEvent, editor) {
    this.domEvent = domEvent;
    this.editor = editor;
    
    this.x = this.clientX = domEvent.clientX;
    this.y = this.clientY = domEvent.clientY;

    this.$pos = null;
    this.$inSelection = null;
    
    this.propagationStopped = false;
    this.defaultPrevented = false;
};

(function() {  
    
    this.stopPropagation = function() {
        event.stopPropagation(this.domEvent);
        this.propagationStopped = true;
    };
    
    this.preventDefault = function() {
        event.preventDefault(this.domEvent);
        this.defaultPrevented = true;
    };
    
    this.stop = function() {
        this.stopPropagation();
        this.preventDefault();
    };
    this.getDocumentPosition = function() {
        if (this.$pos)
            return this.$pos;
        
        this.$pos = this.editor.renderer.screenToTextCoordinates(this.clientX, this.clientY);
        return this.$pos;
    };
    this.inSelection = function() {
        if (this.$inSelection !== null)
            return this.$inSelection;
            
        var editor = this.editor;
        

        var selectionRange = editor.getSelectionRange();
        if (selectionRange.isEmpty())
            this.$inSelection = false;
        else {
            var pos = this.getDocumentPosition();
            this.$inSelection = selectionRange.contains(pos.row, pos.column);
        }

        return this.$inSelection;
    };
    this.getButton = function() {
        return event.getButton(this.domEvent);
    };
    this.getShiftKey = function() {
        return this.domEvent.shiftKey;
    };
    
    this.getAccelKey = useragent.isMac
        ? function() { return this.domEvent.metaKey; }
        : function() { return this.domEvent.ctrlKey; };
    
}).call(MouseEvent.prototype);

});

define("ace/mouse/dragdrop_handler",["require","exports","module","ace/lib/dom","ace/lib/event","ace/lib/useragent"], function(require, exports, module) {
"use strict";

var dom = require("../lib/dom");
var event = require("../lib/event");
var useragent = require("../lib/useragent");

var AUTOSCROLL_DELAY = 200;
var SCROLL_CURSOR_DELAY = 200;
var SCROLL_CURSOR_HYSTERESIS = 5;

function DragdropHandler(mouseHandler) {

    var editor = mouseHandler.editor;

    var blankImage = dom.createElement("img");
    blankImage.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
    if (useragent.isOpera)
        blankImage.style.cssText = "width:1px;height:1px;position:fixed;top:0;left:0;z-index:2147483647;opacity:0;";

    var exports = ["dragWait", "dragWaitEnd", "startDrag", "dragReadyEnd", "onMouseDrag"];

     exports.forEach(function(x) {
         mouseHandler[x] = this[x];
    }, this);
    editor.addEventListener("mousedown", this.onMouseDown.bind(mouseHandler));


    var mouseTarget = editor.container;
    var dragSelectionMarker, x, y;
    var timerId, range;
    var dragCursor, counter = 0;
    var dragOperation;
    var isInternal;
    var autoScrollStartTime;
    var cursorMovedTime;
    var cursorPointOnCaretMoved;

    this.onDragStart = function(e) {
        if (this.cancelDrag || !mouseTarget.draggable) {
            var self = this;
            setTimeout(function(){
                self.startSelect();
                self.captureMouse(e);
            }, 0);
            return e.preventDefault();
        }
        range = editor.getSelectionRange();

        var dataTransfer = e.dataTransfer;
        dataTransfer.effectAllowed = editor.getReadOnly() ? "copy" : "copyMove";
        if (useragent.isOpera) {
            editor.container.appendChild(blankImage);
            blankImage.scrollTop = 0;
        }
        dataTransfer.setDragImage && dataTransfer.setDragImage(blankImage, 0, 0);
        if (useragent.isOpera) {
            editor.container.removeChild(blankImage);
        }
        dataTransfer.clearData();
        dataTransfer.setData("Text", editor.session.getTextRange());

        isInternal = true;
        this.setState("drag");
    };

    this.onDragEnd = function(e) {
        mouseTarget.draggable = false;
        isInternal = false;
        this.setState(null);
        if (!editor.getReadOnly()) {
            var dropEffect = e.dataTransfer.dropEffect;
            if (!dragOperation && dropEffect == "move")
                editor.session.remove(editor.getSelectionRange());
            editor.renderer.$cursorLayer.setBlinking(true);
        }
        this.editor.unsetStyle("ace_dragging");
        this.editor.renderer.setCursorStyle("");
    };

    this.onDragEnter = function(e) {
        if (editor.getReadOnly() || !canAccept(e.dataTransfer))
            return;
        x = e.clientX;
        y = e.clientY;
        if (!dragSelectionMarker)
            addDragMarker();
        counter++;
        e.dataTransfer.dropEffect = dragOperation = getDropEffect(e);
        return event.preventDefault(e);
    };

    this.onDragOver = function(e) {
        if (editor.getReadOnly() || !canAccept(e.dataTransfer))
            return;
        x = e.clientX;
        y = e.clientY;
        if (!dragSelectionMarker) {
            addDragMarker();
            counter++;
        }
        if (onMouseMoveTimer !== null)
            onMouseMoveTimer = null;

        e.dataTransfer.dropEffect = dragOperation = getDropEffect(e);
        return event.preventDefault(e);
    };

    this.onDragLeave = function(e) {
        counter--;
        if (counter <= 0 && dragSelectionMarker) {
            clearDragMarker();
            dragOperation = null;
            return event.preventDefault(e);
        }
    };

    this.onDrop = function(e) {
        if (!dragCursor)
            return;
        var dataTransfer = e.dataTransfer;
        if (isInternal) {
            switch (dragOperation) {
                case "move":
                    if (range.contains(dragCursor.row, dragCursor.column)) {
                        range = {
                            start: dragCursor,
                            end: dragCursor
                        };
                    } else {
                        range = editor.moveText(range, dragCursor);
                    }
                    break;
                case "copy":
                    range = editor.moveText(range, dragCursor, true);
                    break;
            }
        } else {
            var dropData = dataTransfer.getData('Text');
            range = {
                start: dragCursor,
                end: editor.session.insert(dragCursor, dropData)
            };
            editor.focus();
            dragOperation = null;
        }
        clearDragMarker();
        return event.preventDefault(e);
    };

    event.addListener(mouseTarget, "dragstart", this.onDragStart.bind(mouseHandler));
    event.addListener(mouseTarget, "dragend", this.onDragEnd.bind(mouseHandler));
    event.addListener(mouseTarget, "dragenter", this.onDragEnter.bind(mouseHandler));
    event.addListener(mouseTarget, "dragover", this.onDragOver.bind(mouseHandler));
    event.addListener(mouseTarget, "dragleave", this.onDragLeave.bind(mouseHandler));
    event.addListener(mouseTarget, "drop", this.onDrop.bind(mouseHandler));

    function scrollCursorIntoView(cursor, prevCursor) {
        var now = Date.now();
        var vMovement = !prevCursor || cursor.row != prevCursor.row;
        var hMovement = !prevCursor || cursor.column != prevCursor.column;
        if (!cursorMovedTime || vMovement || hMovement) {
            editor.$blockScrolling += 1;
            editor.moveCursorToPosition(cursor);
            editor.$blockScrolling -= 1;
            cursorMovedTime = now;
            cursorPointOnCaretMoved = {x: x, y: y};
        } else {
            var distance = calcDistance(cursorPointOnCaretMoved.x, cursorPointOnCaretMoved.y, x, y);
            if (distance > SCROLL_CURSOR_HYSTERESIS) {
                cursorMovedTime = null;
            } else if (now - cursorMovedTime >= SCROLL_CURSOR_DELAY) {
                editor.renderer.scrollCursorIntoView();
                cursorMovedTime = null;
            }
        }
    }

    function autoScroll(cursor, prevCursor) {
        var now = Date.now();
        var lineHeight = editor.renderer.layerConfig.lineHeight;
        var characterWidth = editor.renderer.layerConfig.characterWidth;
        var editorRect = editor.renderer.scroller.getBoundingClientRect();
        var offsets = {
           x: {
               left: x - editorRect.left,
               right: editorRect.right - x
           },
           y: {
               top: y - editorRect.top,
               bottom: editorRect.bottom - y
           }
        };
        var nearestXOffset = Math.min(offsets.x.left, offsets.x.right);
        var nearestYOffset = Math.min(offsets.y.top, offsets.y.bottom);
        var scrollCursor = {row: cursor.row, column: cursor.column};
        if (nearestXOffset / characterWidth <= 2) {
            scrollCursor.column += (offsets.x.left < offsets.x.right ? -3 : +2);
        }
        if (nearestYOffset / lineHeight <= 1) {
            scrollCursor.row += (offsets.y.top < offsets.y.bottom ? -1 : +1);
        }
        var vScroll = cursor.row != scrollCursor.row;
        var hScroll = cursor.column != scrollCursor.column;
        var vMovement = !prevCursor || cursor.row != prevCursor.row;
        if (vScroll || (hScroll && !vMovement)) {
            if (!autoScrollStartTime)
                autoScrollStartTime = now;
            else if (now - autoScrollStartTime >= AUTOSCROLL_DELAY)
                editor.renderer.scrollCursorIntoView(scrollCursor);
        } else {
            autoScrollStartTime = null;
        }
    }

    function onDragInterval() {
        var prevCursor = dragCursor;
        dragCursor = editor.renderer.screenToTextCoordinates(x, y);
        scrollCursorIntoView(dragCursor, prevCursor);
        autoScroll(dragCursor, prevCursor);
    }

    function addDragMarker() {
        range = editor.selection.toOrientedRange();
        dragSelectionMarker = editor.session.addMarker(range, "ace_selection", editor.getSelectionStyle());
        editor.clearSelection();
        if (editor.isFocused())
            editor.renderer.$cursorLayer.setBlinking(false);
        clearInterval(timerId);
        onDragInterval();
        timerId = setInterval(onDragInterval, 20);
        counter = 0;
        event.addListener(document, "mousemove", onMouseMove);
    }

    function clearDragMarker() {
        clearInterval(timerId);
        editor.session.removeMarker(dragSelectionMarker);
        dragSelectionMarker = null;
        editor.$blockScrolling += 1;
        editor.selection.fromOrientedRange(range);
        editor.$blockScrolling -= 1;
        if (editor.isFocused() && !isInternal)
            editor.renderer.$cursorLayer.setBlinking(!editor.getReadOnly());
        range = null;
        dragCursor = null;
        counter = 0;
        autoScrollStartTime = null;
        cursorMovedTime = null;
        event.removeListener(document, "mousemove", onMouseMove);
    }
    var onMouseMoveTimer = null;
    function onMouseMove() {
        if (onMouseMoveTimer == null) {
            onMouseMoveTimer = setTimeout(function() {
                if (onMouseMoveTimer != null && dragSelectionMarker)
                    clearDragMarker();
            }, 20);
        }
    }

    function canAccept(dataTransfer) {
        var types = dataTransfer.types;
        return !types || Array.prototype.some.call(types, function(type) {
            return type == 'text/plain' || type == 'Text';
        });
    }

    function getDropEffect(e) {
        var copyAllowed = ['copy', 'copymove', 'all', 'uninitialized'];
        var moveAllowed = ['move', 'copymove', 'linkmove', 'all', 'uninitialized'];

        var copyModifierState = useragent.isMac ? e.altKey : e.ctrlKey;
        var effectAllowed = "uninitialized";
        try {
            effectAllowed = e.dataTransfer.effectAllowed.toLowerCase();
        } catch (e) {}
        var dropEffect = "none";

        if (copyModifierState && copyAllowed.indexOf(effectAllowed) >= 0)
            dropEffect = "copy";
        else if (moveAllowed.indexOf(effectAllowed) >= 0)
            dropEffect = "move";
        else if (copyAllowed.indexOf(effectAllowed) >= 0)
            dropEffect = "copy";

        return dropEffect;
    }
}

(function() {

    this.dragWait = function() {
        var interval = Date.now() - this.mousedownEvent.time;
        if (interval > this.editor.getDragDelay())
            this.startDrag();
    };

    this.dragWaitEnd = function() {
        var target = this.editor.container;
        target.draggable = false;
        this.startSelect(this.mousedownEvent.getDocumentPosition());
        this.selectEnd();
    };

    this.dragReadyEnd = function(e) {
        this.editor.renderer.$cursorLayer.setBlinking(!this.editor.getReadOnly());
        this.editor.unsetStyle("ace_dragging");
        this.editor.renderer.setCursorStyle("");
        this.dragWaitEnd();
    };

    this.startDrag = function(){
        this.cancelDrag = false;
        var editor = this.editor;
        var target = editor.container;
        target.draggable = true;
        editor.renderer.$cursorLayer.setBlinking(false);
        editor.setStyle("ace_dragging");
        var cursorStyle = useragent.isWin ? "default" : "move";
        editor.renderer.setCursorStyle(cursorStyle);
        this.setState("dragReady");
    };

    this.onMouseDrag = function(e) {
        var target = this.editor.container;
        if (useragent.isIE && this.state == "dragReady") {
            var distance = calcDistance(this.mousedownEvent.x, this.mousedownEvent.y, this.x, this.y);
            if (distance > 3)
                target.dragDrop();
        }
        if (this.state === "dragWait") {
            var distance = calcDistance(this.mousedownEvent.x, this.mousedownEvent.y, this.x, this.y);
            if (distance > 0) {
                target.draggable = false;
                this.startSelect(this.mousedownEvent.getDocumentPosition());
            }
        }
    };

    this.onMouseDown = function(e) {
        if (!this.$dragEnabled)
            return;
        this.mousedownEvent = e;
        var editor = this.editor;

        var inSelection = e.inSelection();
        var button = e.getButton();
        var clickCount = e.domEvent.detail || 1;
        if (clickCount === 1 && button === 0 && inSelection) {
            if (e.editor.inMultiSelectMode && (e.getAccelKey() || e.getShiftKey()))
                return;
            this.mousedownEvent.time = Date.now();
            var eventTarget = e.domEvent.target || e.domEvent.srcElement;
            if ("unselectable" in eventTarget)
                eventTarget.unselectable = "on";
            if (editor.getDragDelay()) {
                if (useragent.isWebKit) {
                    this.cancelDrag = true;
                    var mouseTarget = editor.container;
                    mouseTarget.draggable = true;
                }
                this.setState("dragWait");
            } else {
                this.startDrag();
            }
            this.captureMouse(e, this.onMouseDrag.bind(this));
            e.defaultPrevented = true;
        }
    };

}).call(DragdropHandler.prototype);


function calcDistance(ax, ay, bx, by) {
    return Math.sqrt(Math.pow(bx - ax, 2) + Math.pow(by - ay, 2));
}

exports.DragdropHandler = DragdropHandler;

});

define("ace/lib/net",["require","exports","module","ace/lib/dom"], function(require, exports, module) {
"use strict";
var dom = require("./dom");

exports.get = function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            callback(xhr.responseText);
        }
    };
    xhr.send(null);
};

exports.loadScript = function(path, callback) {
    var head = dom.getDocumentHead();
    var s = document.createElement('script');

    s.src = path;
    head.appendChild(s);

    s.onload = s.onreadystatechange = function(_, isAbort) {
        if (isAbort || !s.readyState || s.readyState == "loaded" || s.readyState == "complete") {
            s = s.onload = s.onreadystatechange = null;
            if (!isAbort)
                callback();
        }
    };
};
exports.qualifyURL = function(url) {
    var a = document.createElement('a');
    a.href = url;
    return a.href;
}

});

define("ace/lib/event_emitter",["require","exports","module"], function(require, exports, module) {
"use strict";

var EventEmitter = {};
var stopPropagation = function() { this.propagationStopped = true; };
var preventDefault = function() { this.defaultPrevented = true; };

EventEmitter._emit =
EventEmitter._dispatchEvent = function(eventName, e) {
    this._eventRegistry || (this._eventRegistry = {});
    this._defaultHandlers || (this._defaultHandlers = {});

    var listeners = this._eventRegistry[eventName] || [];
    var defaultHandler = this._defaultHandlers[eventName];
    if (!listeners.length && !defaultHandler)
        return;

    if (typeof e != "object" || !e)
        e = {};

    if (!e.type)
        e.type = eventName;
    if (!e.stopPropagation)
        e.stopPropagation = stopPropagation;
    if (!e.preventDefault)
        e.preventDefault = preventDefault;

    listeners = listeners.slice();
    for (var i=0; i<listeners.length; i++) {
        listeners[i](e, this);
        if (e.propagationStopped)
            break;
    }
    
    if (defaultHandler && !e.defaultPrevented)
        return defaultHandler(e, this);
};


EventEmitter._signal = function(eventName, e) {
    var listeners = (this._eventRegistry || {})[eventName];
    if (!listeners)
        return;
    listeners = listeners.slice();
    for (var i=0; i<listeners.length; i++)
        listeners[i](e, this);
};

EventEmitter.once = function(eventName, callback) {
    var _self = this;
    callback && this.addEventListener(eventName, function newCallback() {
        _self.removeEventListener(eventName, newCallback);
        callback.apply(null, arguments);
    });
};


EventEmitter.setDefaultHandler = function(eventName, callback) {
    var handlers = this._defaultHandlers
    if (!handlers)
        handlers = this._defaultHandlers = {_disabled_: {}};
    
    if (handlers[eventName]) {
        var old = handlers[eventName];
        var disabled = handlers._disabled_[eventName];
        if (!disabled)
            handlers._disabled_[eventName] = disabled = [];
        disabled.push(old);
        var i = disabled.indexOf(callback);
        if (i != -1) 
            disabled.splice(i, 1);
    }
    handlers[eventName] = callback;
};
EventEmitter.removeDefaultHandler = function(eventName, callback) {
    var handlers = this._defaultHandlers
    if (!handlers)
        return;
    var disabled = handlers._disabled_[eventName];
    
    if (handlers[eventName] == callback) {
        var old = handlers[eventName];
        if (disabled)
            this.setDefaultHandler(eventName, disabled.pop());
    } else if (disabled) {
        var i = disabled.indexOf(callback);
        if (i != -1)
            disabled.splice(i, 1);
    }
};

EventEmitter.on =
EventEmitter.addEventListener = function(eventName, callback, capturing) {
    this._eventRegistry = this._eventRegistry || {};

    var listeners = this._eventRegistry[eventName];
    if (!listeners)
        listeners = this._eventRegistry[eventName] = [];

    if (listeners.indexOf(callback) == -1)
        listeners[capturing ? "unshift" : "push"](callback);
    return callback;
};

EventEmitter.off =
EventEmitter.removeListener =
EventEmitter.removeEventListener = function(eventName, callback) {
    this._eventRegistry = this._eventRegistry || {};

    var listeners = this._eventRegistry[eventName];
    if (!listeners)
        return;

    var index = listeners.indexOf(callback);
    if (index !== -1)
        listeners.splice(index, 1);
};

EventEmitter.removeAllListeners = function(eventName) {
    if (this._eventRegistry) this._eventRegistry[eventName] = [];
};

exports.EventEmitter = EventEmitter;

});

define("ace/lib/app_config",["require","exports","module","ace/lib/oop","ace/lib/event_emitter"], function(require, exports, module) {
"no use strict";

var oop = require("./oop");
var EventEmitter = require("./event_emitter").EventEmitter;

var optionsProvider = {
    setOptions: function(optList) {
        Object.keys(optList).forEach(function(key) {
            this.setOption(key, optList[key]);
        }, this);
    },
    getOptions: function(optionNames) {
        var result = {};
        if (!optionNames) {
            optionNames = Object.keys(this.$options);
        } else if (!Array.isArray(optionNames)) {
            result = optionNames;
            optionNames = Object.keys(result);
        }
        optionNames.forEach(function(key) {
            result[key] = this.getOption(key);
        }, this);
        return result;
    },
    setOption: function(name, value) {
        if (this["$" + name] === value)
            return;
        var opt = this.$options[name];
        if (!opt) {
            return warn('misspelled option "' + name + '"');
        }
        if (opt.forwardTo)
            return this[opt.forwardTo] && this[opt.forwardTo].setOption(name, value);

        if (!opt.handlesSet)
            this["$" + name] = value;
        if (opt && opt.set)
            opt.set.call(this, value);
    },
    getOption: function(name) {
        var opt = this.$options[name];
        if (!opt) {
            return warn('misspelled option "' + name + '"');
        }
        if (opt.forwardTo)
            return this[opt.forwardTo] && this[opt.forwardTo].getOption(name);
        return opt && opt.get ? opt.get.call(this) : this["$" + name];
    }
};

function warn(message) {
    if (typeof console != "undefined" && console.warn)
        console.warn.apply(console, arguments);
}

function reportError(msg, data) {
    var e = new Error(msg);
    e.data = data;
    if (typeof console == "object" && console.error)
        console.error(e);
    setTimeout(function() { throw e; });
}

var AppConfig = function() {
    this.$defaultOptions = {};
};

(function() {
    oop.implement(this, EventEmitter);
    this.defineOptions = function(obj, path, options) {
        if (!obj.$options)
            this.$defaultOptions[path] = obj.$options = {};

        Object.keys(options).forEach(function(key) {
            var opt = options[key];
            if (typeof opt == "string")
                opt = {forwardTo: opt};

            opt.name || (opt.name = key);
            obj.$options[opt.name] = opt;
            if ("initialValue" in opt)
                obj["$" + opt.name] = opt.initialValue;
        });
        oop.implement(obj, optionsProvider);

        return this;
    };

    this.resetOptions = function(obj) {
        Object.keys(obj.$options).forEach(function(key) {
            var opt = obj.$options[key];
            if ("value" in opt)
                obj.setOption(key, opt.value);
        });
    };

    this.setDefaultValue = function(path, name, value) {
        var opts = this.$defaultOptions[path] || (this.$defaultOptions[path] = {});
        if (opts[name]) {
            if (opts.forwardTo)
                this.setDefaultValue(opts.forwardTo, name, value);
            else
                opts[name].value = value;
        }
    };

    this.setDefaultValues = function(path, optionHash) {
        Object.keys(optionHash).forEach(function(key) {
            this.setDefaultValue(path, key, optionHash[key]);
        }, this);
    };
    
    this.warn = warn;
    this.reportError = reportError;
    
}).call(AppConfig.prototype);

exports.AppConfig = AppConfig;

});

define("ace/config",["require","exports","module","ace/lib/lang","ace/lib/oop","ace/lib/net","ace/lib/app_config"], function(require, exports, module) {
"no use strict";

var lang = require("./lib/lang");
var oop = require("./lib/oop");
var net = require("./lib/net");
var AppConfig = require("./lib/app_config").AppConfig;

module.exports = exports = new AppConfig();

var global = (function() {
    return this;
})();

var options = {
    packaged: false,
    workerPath: null,
    modePath: null,
    themePath: null,
    basePath: "",
    suffix: ".js",
    $moduleUrls: {}
};

exports.get = function(key) {
    if (!options.hasOwnProperty(key))
        throw new Error("Unknown config key: " + key);

    return options[key];
};

exports.set = function(key, value) {
    if (!options.hasOwnProperty(key))
        throw new Error("Unknown config key: " + key);

    options[key] = value;
};

exports.all = function() {
    return lang.copyObject(options);
};
exports.moduleUrl = function(name, component) {
    if (options.$moduleUrls[name])
        return options.$moduleUrls[name];

    var parts = name.split("/");
    component = component || parts[parts.length - 2] || "";
    var sep = component == "snippets" ? "/" : "-";
    var base = parts[parts.length - 1];
    if (component == "worker" && sep == "-") {
        var re = new RegExp("^" + component + "[\\-_]|[\\-_]" + component + "$", "g");
        base = base.replace(re, "");
    }

    if ((!base || base == component) && parts.length > 1)
        base = parts[parts.length - 2];
    var path = options[component + "Path"];
    if (path == null) {
        path = options.basePath;
    } else if (sep == "/") {
        component = sep = "";
    }
    if (path && path.slice(-1) != "/")
        path += "/";
    return path + component + sep + base + this.get("suffix");
};

exports.setModuleUrl = function(name, subst) {
    return options.$moduleUrls[name] = subst;
};

exports.$loading = {};
exports.loadModule = function(moduleName, onLoad) {
    var module, moduleType;
    if (Array.isArray(moduleName)) {
        moduleType = moduleName[0];
        moduleName = moduleName[1];
    }

    try {
        module = require(moduleName);
    } catch (e) {}
    if (module && !exports.$loading[moduleName])
        return onLoad && onLoad(module);

    if (!exports.$loading[moduleName])
        exports.$loading[moduleName] = [];

    exports.$loading[moduleName].push(onLoad);

    if (exports.$loading[moduleName].length > 1)
        return;

    var afterLoad = function() {
        require([moduleName], function(module) {
            exports._emit("load.module", {name: moduleName, module: module});
            var listeners = exports.$loading[moduleName];
            exports.$loading[moduleName] = null;
            listeners.forEach(function(onLoad) {
                onLoad && onLoad(module);
            });
        });
    };

    if (!exports.get("packaged"))
        return afterLoad();
    net.loadScript(exports.moduleUrl(moduleName, moduleType), afterLoad);
};
init(true);function init(packaged) {

    options.packaged = packaged || require.packaged || module.packaged || (global.define && define.packaged);

    if (!global.document)
        return "";

    var scriptOptions = {};
    var scriptUrl = "";
    var currentScript = (document.currentScript || document._currentScript ); // native or polyfill
    var currentDocument = currentScript && currentScript.ownerDocument || document;
    
    var scripts = currentDocument.getElementsByTagName("script");
    for (var i=0; i<scripts.length; i++) {
        var script = scripts[i];

        var src = script.src || script.getAttribute("src");
        if (!src)
            continue;

        var attributes = script.attributes;
        for (var j=0, l=attributes.length; j < l; j++) {
            var attr = attributes[j];
            if (attr.name.indexOf("data-ace-") === 0) {
                scriptOptions[deHyphenate(attr.name.replace(/^data-ace-/, ""))] = attr.value;
            }
        }

        var m = src.match(/^(.*)\/ace(\-\w+)?\.js(\?|$)/);
        if (m)
            scriptUrl = m[1];
    }

    if (scriptUrl) {
        scriptOptions.base = scriptOptions.base || scriptUrl;
        scriptOptions.packaged = true;
    }

    scriptOptions.basePath = scriptOptions.base;
    scriptOptions.workerPath = scriptOptions.workerPath || scriptOptions.base;
    scriptOptions.modePath = scriptOptions.modePath || scriptOptions.base;
    scriptOptions.themePath = scriptOptions.themePath || scriptOptions.base;
    delete scriptOptions.base;

    for (var key in scriptOptions)
        if (typeof scriptOptions[key] !== "undefined")
            exports.set(key, scriptOptions[key]);
};

exports.init = init;

function deHyphenate(str) {
    return str.replace(/-(.)/g, function(m, m1) { return m1.toUpperCase(); });
}

});

define("ace/mouse/mouse_handler",["require","exports","module","ace/lib/event","ace/lib/useragent","ace/mouse/default_handlers","ace/mouse/default_gutter_handler","ace/mouse/mouse_event","ace/mouse/dragdrop_handler","ace/config"], function(require, exports, module) {
"use strict";

var event = require("../lib/event");
var useragent = require("../lib/useragent");
var DefaultHandlers = require("./default_handlers").DefaultHandlers;
var DefaultGutterHandler = require("./default_gutter_handler").GutterHandler;
var MouseEvent = require("./mouse_event").MouseEvent;
var DragdropHandler = require("./dragdrop_handler").DragdropHandler;
var config = require("../config");

var MouseHandler = function(editor) {
    var _self = this;
    this.editor = editor;

    new DefaultHandlers(this);
    new DefaultGutterHandler(this);
    new DragdropHandler(this);

    var focusEditor = function(e) {
        if (!document.hasFocus || !document.hasFocus())
            window.focus();
        editor.focus();
    };

    var mouseTarget = editor.renderer.getMouseEventTarget();
    event.addListener(mouseTarget, "click", this.onMouseEvent.bind(this, "click"));
    event.addListener(mouseTarget, "mousemove", this.onMouseMove.bind(this, "mousemove"));
    event.addMultiMouseDownListener(mouseTarget, [400, 300, 250], this, "onMouseEvent");
    if (editor.renderer.scrollBarV) {
        event.addMultiMouseDownListener(editor.renderer.scrollBarV.inner, [400, 300, 250], this, "onMouseEvent");
        event.addMultiMouseDownListener(editor.renderer.scrollBarH.inner, [400, 300, 250], this, "onMouseEvent");
        if (useragent.isIE) {
            event.addListener(editor.renderer.scrollBarV.element, "mousedown", focusEditor);
            event.addListener(editor.renderer.scrollBarH.element, "mousedown", focusEditor);
        }
    }
    event.addMouseWheelListener(editor.container, this.onMouseWheel.bind(this, "mousewheel"));

    var gutterEl = editor.renderer.$gutter;
    event.addListener(gutterEl, "mousedown", this.onMouseEvent.bind(this, "guttermousedown"));
    event.addListener(gutterEl, "click", this.onMouseEvent.bind(this, "gutterclick"));
    event.addListener(gutterEl, "dblclick", this.onMouseEvent.bind(this, "gutterdblclick"));
    event.addListener(gutterEl, "mousemove", this.onMouseEvent.bind(this, "guttermousemove"));

    event.addListener(mouseTarget, "mousedown", focusEditor);

    event.addListener(gutterEl, "mousedown", function(e) {
        editor.focus();
        return event.preventDefault(e);
    });

    editor.on("mousemove", function(e){
        if (_self.state || _self.$dragDelay || !_self.$dragEnabled)
            return;

        var character = editor.renderer.screenToTextCoordinates(e.x, e.y);
        var range = editor.session.selection.getRange();
        var renderer = editor.renderer;

        if (!range.isEmpty() && range.insideStart(character.row, character.column)) {
            renderer.setCursorStyle("default");
        } else {
            renderer.setCursorStyle("");
        }
    });
};

(function() {
    this.onMouseEvent = function(name, e) {
        this.editor._emit(name, new MouseEvent(e, this.editor));
    };

    this.onMouseMove = function(name, e) {
        var listeners = this.editor._eventRegistry && this.editor._eventRegistry.mousemove;
        if (!listeners || !listeners.length)
            return;

        this.editor._emit(name, new MouseEvent(e, this.editor));
    };

    this.onMouseWheel = function(name, e) {
        var mouseEvent = new MouseEvent(e, this.editor);
        mouseEvent.speed = this.$scrollSpeed * 2;
        mouseEvent.wheelX = e.wheelX;
        mouseEvent.wheelY = e.wheelY;

        this.editor._emit(name, mouseEvent);
    };

    this.setState = function(state) {
        this.state = state;
    };

    this.captureMouse = function(ev, mouseMoveHandler) {
        this.x = ev.x;
        this.y = ev.y;

        this.isMousePressed = true;
        var renderer = this.editor.renderer;
        if (renderer.$keepTextAreaAtCursor)
            renderer.$keepTextAreaAtCursor = null;

        var self = this;
        var onMouseMove = function(e) {
            if (!e) return;
            if (useragent.isWebKit && !e.which && self.releaseMouse)
                return self.releaseMouse();

            self.x = e.clientX;
            self.y = e.clientY;
            mouseMoveHandler && mouseMoveHandler(e);
            self.mouseEvent = new MouseEvent(e, self.editor);
            self.$mouseMoved = true;
        };

        var onCaptureEnd = function(e) {
            clearInterval(timerId);
            onCaptureInterval();
            self[self.state + "End"] && self[self.state + "End"](e);
            self.state = "";
            if (renderer.$keepTextAreaAtCursor == null) {
                renderer.$keepTextAreaAtCursor = true;
                renderer.$moveTextAreaToCursor();
            }
            self.isMousePressed = false;
            self.$onCaptureMouseMove = self.releaseMouse = null;
            e && self.onMouseEvent("mouseup", e);
        };

        var onCaptureInterval = function() {
            self[self.state] && self[self.state]();
            self.$mouseMoved = false;
        };

        if (useragent.isOldIE && ev.domEvent.type == "dblclick") {
            return setTimeout(function() {onCaptureEnd(ev);});
        }

        self.$onCaptureMouseMove = onMouseMove;
        self.releaseMouse = event.capture(this.editor.container, onMouseMove, onCaptureEnd);
        var timerId = setInterval(onCaptureInterval, 20);
    };
    this.releaseMouse = null;
    this.cancelContextMenu = function() {
        var stop = function(e) {
            if (e && e.domEvent && e.domEvent.type != "contextmenu")
                return;
            this.editor.off("nativecontextmenu", stop);
            if (e && e.domEvent)
                event.stopEvent(e.domEvent);
        }.bind(this);
        setTimeout(stop, 10);
        this.editor.on("nativecontextmenu", stop);
    };
}).call(MouseHandler.prototype);

config.defineOptions(MouseHandler.prototype, "mouseHandler", {
    scrollSpeed: {initialValue: 2},
    dragDelay: {initialValue: (useragent.isMac ? 150 : 0)},
    dragEnabled: {initialValue: true},
    focusTimout: {initialValue: 0},
    tooltipFollowsMouse: {initialValue: true}
});


exports.MouseHandler = MouseHandler;
});

define("ace/mouse/fold_handler",["require","exports","module"], function(require, exports, module) {
"use strict";

function FoldHandler(editor) {

    editor.on("click", function(e) {
        var position = e.getDocumentPosition();
        var session = editor.session;
        var fold = session.getFoldAt(position.row, position.column, 1);
        if (fold) {
            if (e.getAccelKey())
                session.removeFold(fold);
            else
                session.expandFold(fold);

            e.stop();
        }
    });

    editor.on("gutterclick", function(e) {
        var gutterRegion = editor.renderer.$gutterLayer.getRegion(e);

        if (gutterRegion == "foldWidgets") {
            var row = e.getDocumentPosition().row;
            var session = editor.session;
            if (session.foldWidgets && session.foldWidgets[row])
                editor.session.onFoldWidgetClick(row, e);
            if (!editor.isFocused())
                editor.focus();
            e.stop();
        }
    });

    editor.on("gutterdblclick", function(e) {
        var gutterRegion = editor.renderer.$gutterLayer.getRegion(e);

        if (gutterRegion == "foldWidgets") {
            var row = e.getDocumentPosition().row;
            var session = editor.session;
            var data = session.getParentFoldRangeData(row, true);
            var range = data.range || data.firstRange;

            if (range) {
                row = range.start.row;
                var fold = session.getFoldAt(row, session.getLine(row).length, 1);

                if (fold) {
                    session.removeFold(fold);
                } else {
                    session.addFold("...", range);
                    editor.renderer.scrollCursorIntoView({row: range.start.row, column: 0});
                }
            }
            e.stop();
        }
    });
}

exports.FoldHandler = FoldHandler;

});

define("ace/keyboard/keybinding",["require","exports","module","ace/lib/keys","ace/lib/event"], function(require, exports, module) {
"use strict";

var keyUtil  = require("../lib/keys");
var event = require("../lib/event");

var KeyBinding = function(editor) {
    this.$editor = editor;
    this.$data = {editor: editor};
    this.$handlers = [];
    this.setDefaultHandler(editor.commands);
};

(function() {
    this.setDefaultHandler = function(kb) {
        this.removeKeyboardHandler(this.$defaultHandler);
        this.$defaultHandler = kb;
        this.addKeyboardHandler(kb, 0);
    };

    this.setKeyboardHandler = function(kb) {
        var h = this.$handlers;
        if (h[h.length - 1] == kb)
            return;

        while (h[h.length - 1] && h[h.length - 1] != this.$defaultHandler)
            this.removeKeyboardHandler(h[h.length - 1]);

        this.addKeyboardHandler(kb, 1);
    };

    this.addKeyboardHandler = function(kb, pos) {
        if (!kb)
            return;
        if (typeof kb == "function" && !kb.handleKeyboard)
            kb.handleKeyboard = kb;
        var i = this.$handlers.indexOf(kb);
        if (i != -1)
            this.$handlers.splice(i, 1);

        if (pos == undefined)
            this.$handlers.push(kb);
        else
            this.$handlers.splice(pos, 0, kb);

        if (i == -1 && kb.attach)
            kb.attach(this.$editor);
    };

    this.removeKeyboardHandler = function(kb) {
        var i = this.$handlers.indexOf(kb);
        if (i == -1)
            return false;
        this.$handlers.splice(i, 1);
        kb.detach && kb.detach(this.$editor);
        return true;
    };

    this.getKeyboardHandler = function() {
        return this.$handlers[this.$handlers.length - 1];
    };
    
    this.getStatusText = function() {
        var data = this.$data;
        var editor = data.editor;
        return this.$handlers.map(function(h) {
            return h.getStatusText && h.getStatusText(editor, data) || "";
        }).filter(Boolean).join(" ");
    };

    this.$callKeyboardHandlers = function(hashId, keyString, keyCode, e) {
        var toExecute;
        var success = false;
        var commands = this.$editor.commands;

        for (var i = this.$handlers.length; i--;) {
            toExecute = this.$handlers[i].handleKeyboard(
                this.$data, hashId, keyString, keyCode, e
            );
            if (!toExecute || !toExecute.command)
                continue;
            if (toExecute.command == "null") {
                success = true;
            } else {
                success = commands.exec(toExecute.command, this.$editor, toExecute.args, e);                
            }
            if (success && e && hashId != -1 && 
                toExecute.passEvent != true && toExecute.command.passEvent != true
            ) {
                event.stopEvent(e);
            }
            if (success)
                break;
        }
        return success;
    };

    this.onCommandKey = function(e, hashId, keyCode) {
        var keyString = keyUtil.keyCodeToString(keyCode);
        this.$callKeyboardHandlers(hashId, keyString, keyCode, e);
    };

    this.onTextInput = function(text) {
        var success = this.$callKeyboardHandlers(-1, text);
        if (!success)
            this.$editor.commands.exec("insertstring", this.$editor, text);
    };

}).call(KeyBinding.prototype);

exports.KeyBinding = KeyBinding;
});

define("ace/range",["require","exports","module"], function(require, exports, module) {
"use strict";
var comparePoints = function(p1, p2) {
    return p1.row - p2.row || p1.column - p2.column;
};
var Range = function(startRow, startColumn, endRow, endColumn) {
    this.start = {
        row: startRow,
        column: startColumn
    };

    this.end = {
        row: endRow,
        column: endColumn
    };
};

(function() {
    this.isEqual = function(range) {
        return this.start.row === range.start.row &&
            this.end.row === range.end.row &&
            this.start.column === range.start.column &&
            this.end.column === range.end.column;
    };
    this.toString = function() {
        return ("Range: [" + this.start.row + "/" + this.start.column +
            "] -> [" + this.end.row + "/" + this.end.column + "]");
    };

    this.contains = function(row, column) {
        return this.compare(row, column) == 0;
    };
    this.compareRange = function(range) {
        var cmp,
            end = range.end,
            start = range.start;

        cmp = this.compare(end.row, end.column);
        if (cmp == 1) {
            cmp = this.compare(start.row, start.column);
            if (cmp == 1) {
                return 2;
            } else if (cmp == 0) {
                return 1;
            } else {
                return 0;
            }
        } else if (cmp == -1) {
            return -2;
        } else {
            cmp = this.compare(start.row, start.column);
            if (cmp == -1) {
                return -1;
            } else if (cmp == 1) {
                return 42;
            } else {
                return 0;
            }
        }
    };
    this.comparePoint = function(p) {
        return this.compare(p.row, p.column);
    };
    this.containsRange = function(range) {
        return this.comparePoint(range.start) == 0 && this.comparePoint(range.end) == 0;
    };
    this.intersects = function(range) {
        var cmp = this.compareRange(range);
        return (cmp == -1 || cmp == 0 || cmp == 1);
    };
    this.isEnd = function(row, column) {
        return this.end.row == row && this.end.column == column;
    };
    this.isStart = function(row, column) {
        return this.start.row == row && this.start.column == column;
    };
    this.setStart = function(row, column) {
        if (typeof row == "object") {
            this.start.column = row.column;
            this.start.row = row.row;
        } else {
            this.start.row = row;
            this.start.column = column;
        }
    };
    this.setEnd = function(row, column) {
        if (typeof row == "object") {
            this.end.column = row.column;
            this.end.row = row.row;
        } else {
            this.end.row = row;
            this.end.column = column;
        }
    };
    this.inside = function(row, column) {
        if (this.compare(row, column) == 0) {
            if (this.isEnd(row, column) || this.isStart(row, column)) {
                return false;
            } else {
                return true;
            }
        }
        return false;
    };
    this.insideStart = function(row, column) {
        if (this.compare(row, column) == 0) {
            if (this.isEnd(row, column)) {
                return false;
            } else {
                return true;
            }
        }
        return false;
    };
    this.insideEnd = function(row, column) {
        if (this.compare(row, column) == 0) {
            if (this.isStart(row, column)) {
                return false;
            } else {
                return true;
            }
        }
        return false;
    };
    this.compare = function(row, column) {
        if (!this.isMultiLine()) {
            if (row === this.start.row) {
                return column < this.start.column ? -1 : (column > this.end.column ? 1 : 0);
            };
        }

        if (row < this.start.row)
            return -1;

        if (row > this.end.row)
            return 1;

        if (this.start.row === row)
            return column >= this.start.column ? 0 : -1;

        if (this.end.row === row)
            return column <= this.end.column ? 0 : 1;

        return 0;
    };
    this.compareStart = function(row, column) {
        if (this.start.row == row && this.start.column == column) {
            return -1;
        } else {
            return this.compare(row, column);
        }
    };
    this.compareEnd = function(row, column) {
        if (this.end.row == row && this.end.column == column) {
            return 1;
        } else {
            return this.compare(row, column);
        }
    };
    this.compareInside = function(row, column) {
        if (this.end.row == row && this.end.column == column) {
            return 1;
        } else if (this.start.row == row && this.start.column == column) {
            return -1;
        } else {
            return this.compare(row, column);
        }
    };
    this.clipRows = function(firstRow, lastRow) {
        if (this.end.row > lastRow)
            var end = {row: lastRow + 1, column: 0};
        else if (this.end.row < firstRow)
            var end = {row: firstRow, column: 0};

        if (this.start.row > lastRow)
            var start = {row: lastRow + 1, column: 0};
        else if (this.start.row < firstRow)
            var start = {row: firstRow, column: 0};

        return Range.fromPoints(start || this.start, end || this.end);
    };
    this.extend = function(row, column) {
        var cmp = this.compare(row, column);

        if (cmp == 0)
            return this;
        else if (cmp == -1)
            var start = {row: row, column: column};
        else
            var end = {row: row, column: column};

        return Range.fromPoints(start || this.start, end || this.end);
    };

    this.isEmpty = function() {
        return (this.start.row === this.end.row && this.start.column === this.end.column);
    };
    this.isMultiLine = function() {
        return (this.start.row !== this.end.row);
    };
    this.clone = function() {
        return Range.fromPoints(this.start, this.end);
    };
    this.collapseRows = function() {
        if (this.end.column == 0)
            return new Range(this.start.row, 0, Math.max(this.start.row, this.end.row-1), 0)
        else
            return new Range(this.start.row, 0, this.end.row, 0)
    };
    this.toScreenRange = function(session) {
        var screenPosStart = session.documentToScreenPosition(this.start);
        var screenPosEnd = session.documentToScreenPosition(this.end);

        return new Range(
            screenPosStart.row, screenPosStart.column,
            screenPosEnd.row, screenPosEnd.column
        );
    };
    this.moveBy = function(row, column) {
        this.start.row += row;
        this.start.column += column;
        this.end.row += row;
        this.end.column += column;
    };

}).call(Range.prototype);
Range.fromPoints = function(start, end) {
    return new Range(start.row, start.column, end.row, end.column);
};
Range.comparePoints = comparePoints;

Range.comparePoints = function(p1, p2) {
    return p1.row - p2.row || p1.column - p2.column;
};


exports.Range = Range;
});

define("ace/selection",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/lib/event_emitter","ace/range"], function(require, exports, module) {
"use strict";

var oop = require("./lib/oop");
var lang = require("./lib/lang");
var EventEmitter = require("./lib/event_emitter").EventEmitter;
var Range = require("./range").Range;
var Selection = function(session) {
    this.session = session;
    this.doc = session.getDocument();

    this.clearSelection();
    this.lead = this.selectionLead = this.doc.createAnchor(0, 0);
    this.anchor = this.selectionAnchor = this.doc.createAnchor(0, 0);

    var self = this;
    this.lead.on("change", function(e) {
        self._emit("changeCursor");
        if (!self.$isEmpty)
            self._emit("changeSelection");
        if (!self.$keepDesiredColumnOnChange && e.old.column != e.value.column)
            self.$desiredColumn = null;
    });

    this.selectionAnchor.on("change", function() {
        if (!self.$isEmpty)
            self._emit("changeSelection");
    });
};

(function() {

    oop.implement(this, EventEmitter);
    this.isEmpty = function() {
        return (this.$isEmpty || (
            this.anchor.row == this.lead.row &&
            this.anchor.column == this.lead.column
        ));
    };
    this.isMultiLine = function() {
        if (this.isEmpty()) {
            return false;
        }

        return this.getRange().isMultiLine();
    };
    this.getCursor = function() {
        return this.lead.getPosition();
    };
    this.setSelectionAnchor = function(row, column) {
        this.anchor.setPosition(row, column);

        if (this.$isEmpty) {
            this.$isEmpty = false;
            this._emit("changeSelection");
        }
    };
    this.getSelectionAnchor = function() {
        if (this.$isEmpty)
            return this.getSelectionLead();
        else
            return this.anchor.getPosition();
    };
    this.getSelectionLead = function() {
        return this.lead.getPosition();
    };
    this.shiftSelection = function(columns) {
        if (this.$isEmpty) {
            this.moveCursorTo(this.lead.row, this.lead.column + columns);
            return;
        }

        var anchor = this.getSelectionAnchor();
        var lead = this.getSelectionLead();

        var isBackwards = this.isBackwards();

        if (!isBackwards || anchor.column !== 0)
            this.setSelectionAnchor(anchor.row, anchor.column + columns);

        if (isBackwards || lead.column !== 0) {
            this.$moveSelection(function() {
                this.moveCursorTo(lead.row, lead.column + columns);
            });
        }
    };
    this.isBackwards = function() {
        var anchor = this.anchor;
        var lead = this.lead;
        return (anchor.row > lead.row || (anchor.row == lead.row && anchor.column > lead.column));
    };
    this.getRange = function() {
        var anchor = this.anchor;
        var lead = this.lead;

        if (this.isEmpty())
            return Range.fromPoints(lead, lead);

        if (this.isBackwards()) {
            return Range.fromPoints(lead, anchor);
        }
        else {
            return Range.fromPoints(anchor, lead);
        }
    };
    this.clearSelection = function() {
        if (!this.$isEmpty) {
            this.$isEmpty = true;
            this._emit("changeSelection");
        }
    };
    this.selectAll = function() {
        var lastRow = this.doc.getLength() - 1;
        this.setSelectionAnchor(0, 0);
        this.moveCursorTo(lastRow, this.doc.getLine(lastRow).length);
    };
    this.setRange =
    this.setSelectionRange = function(range, reverse) {
        if (reverse) {
            this.setSelectionAnchor(range.end.row, range.end.column);
            this.selectTo(range.start.row, range.start.column);
        } else {
            this.setSelectionAnchor(range.start.row, range.start.column);
            this.selectTo(range.end.row, range.end.column);
        }
        if (this.getRange().isEmpty())
            this.$isEmpty = true;
        this.$desiredColumn = null;
    };

    this.$moveSelection = function(mover) {
        var lead = this.lead;
        if (this.$isEmpty)
            this.setSelectionAnchor(lead.row, lead.column);

        mover.call(this);
    };
    this.selectTo = function(row, column) {
        this.$moveSelection(function() {
            this.moveCursorTo(row, column);
        });
    };
    this.selectToPosition = function(pos) {
        this.$moveSelection(function() {
            this.moveCursorToPosition(pos);
        });
    };
    this.moveTo = function(row, column) {
        this.clearSelection();
        this.moveCursorTo(row, column);
    };
    this.moveToPosition = function(pos) {
        this.clearSelection();
        this.moveCursorToPosition(pos);
    };
    this.selectUp = function() {
        this.$moveSelection(this.moveCursorUp);
    };
    this.selectDown = function() {
        this.$moveSelection(this.moveCursorDown);
    };
    this.selectRight = function() {
        this.$moveSelection(this.moveCursorRight);
    };
    this.selectLeft = function() {
        this.$moveSelection(this.moveCursorLeft);
    };
    this.selectLineStart = function() {
        this.$moveSelection(this.moveCursorLineStart);
    };
    this.selectLineEnd = function() {
        this.$moveSelection(this.moveCursorLineEnd);
    };
    this.selectFileEnd = function() {
        this.$moveSelection(this.moveCursorFileEnd);
    };
    this.selectFileStart = function() {
        this.$moveSelection(this.moveCursorFileStart);
    };
    this.selectWordRight = function() {
        this.$moveSelection(this.moveCursorWordRight);
    };
    this.selectWordLeft = function() {
        this.$moveSelection(this.moveCursorWordLeft);
    };
    this.getWordRange = function(row, column) {
        if (typeof column == "undefined") {
            var cursor = row || this.lead;
            row = cursor.row;
            column = cursor.column;
        }
        return this.session.getWordRange(row, column);
    };
    this.selectWord = function() {
        this.setSelectionRange(this.getWordRange());
    };
    this.selectAWord = function() {
        var cursor = this.getCursor();
        var range = this.session.getAWordRange(cursor.row, cursor.column);
        this.setSelectionRange(range);
    };

    this.getLineRange = function(row, excludeLastChar) {
        var rowStart = typeof row == "number" ? row : this.lead.row;
        var rowEnd;

        var foldLine = this.session.getFoldLine(rowStart);
        if (foldLine) {
            rowStart = foldLine.start.row;
            rowEnd = foldLine.end.row;
        } else {
            rowEnd = rowStart;
        }
        if (excludeLastChar === true)
            return new Range(rowStart, 0, rowEnd, this.session.getLine(rowEnd).length);
        else
            return new Range(rowStart, 0, rowEnd + 1, 0);
    };
    this.selectLine = function() {
        this.setSelectionRange(this.getLineRange());
    };
    this.moveCursorUp = function() {
        this.moveCursorBy(-1, 0);
    };
    this.moveCursorDown = function() {
        this.moveCursorBy(1, 0);
    };
    this.moveCursorLeft = function() {
        var cursor = this.lead.getPosition(),
            fold;

        if (fold = this.session.getFoldAt(cursor.row, cursor.column, -1)) {
            this.moveCursorTo(fold.start.row, fold.start.column);
        } else if (cursor.column === 0) {
            if (cursor.row > 0) {
                this.moveCursorTo(cursor.row - 1, this.doc.getLine(cursor.row - 1).length);
            }
        }
        else {
            var tabSize = this.session.getTabSize();
            if (this.session.isTabStop(cursor) && this.doc.getLine(cursor.row).slice(cursor.column-tabSize, cursor.column).split(" ").length-1 == tabSize)
                this.moveCursorBy(0, -tabSize);
            else
                this.moveCursorBy(0, -1);
        }
    };
    this.moveCursorRight = function() {
        var cursor = this.lead.getPosition(),
            fold;
        if (fold = this.session.getFoldAt(cursor.row, cursor.column, 1)) {
            this.moveCursorTo(fold.end.row, fold.end.column);
        }
        else if (this.lead.column == this.doc.getLine(this.lead.row).length) {
            if (this.lead.row < this.doc.getLength() - 1) {
                this.moveCursorTo(this.lead.row + 1, 0);
            }
        }
        else {
            var tabSize = this.session.getTabSize();
            var cursor = this.lead;
            if (this.session.isTabStop(cursor) && this.doc.getLine(cursor.row).slice(cursor.column, cursor.column+tabSize).split(" ").length-1 == tabSize)
                this.moveCursorBy(0, tabSize);
            else
                this.moveCursorBy(0, 1);
        }
    };
    this.moveCursorLineStart = function() {
        var row = this.lead.row;
        var column = this.lead.column;
        var screenRow = this.session.documentToScreenRow(row, column);
        var firstColumnPosition = this.session.screenToDocumentPosition(screenRow, 0);
        var beforeCursor = this.session.getDisplayLine(
            row, null, firstColumnPosition.row,
            firstColumnPosition.column
        );

        var leadingSpace = beforeCursor.match(/^\s*/);
        if (leadingSpace[0].length != column && !this.session.$useEmacsStyleLineStart)
            firstColumnPosition.column += leadingSpace[0].length;
        this.moveCursorToPosition(firstColumnPosition);
    };
    this.moveCursorLineEnd = function() {
        var lead = this.lead;
        var lineEnd = this.session.getDocumentLastRowColumnPosition(lead.row, lead.column);
        if (this.lead.column == lineEnd.column) {
            var line = this.session.getLine(lineEnd.row);
            if (lineEnd.column == line.length) {
                var textEnd = line.search(/\s+$/);
                if (textEnd > 0)
                    lineEnd.column = textEnd;
            }
        }

        this.moveCursorTo(lineEnd.row, lineEnd.column);
    };
    this.moveCursorFileEnd = function() {
        var row = this.doc.getLength() - 1;
        var column = this.doc.getLine(row).length;
        this.moveCursorTo(row, column);
    };
    this.moveCursorFileStart = function() {
        this.moveCursorTo(0, 0);
    };
    this.moveCursorLongWordRight = function() {
        var row = this.lead.row;
        var column = this.lead.column;
        var line = this.doc.getLine(row);
        var rightOfCursor = line.substring(column);

        var match;
        this.session.nonTokenRe.lastIndex = 0;
        this.session.tokenRe.lastIndex = 0;
        var fold = this.session.getFoldAt(row, column, 1);
        if (fold) {
            this.moveCursorTo(fold.end.row, fold.end.column);
            return;
        }
        if (match = this.session.nonTokenRe.exec(rightOfCursor)) {
            column += this.session.nonTokenRe.lastIndex;
            this.session.nonTokenRe.lastIndex = 0;
            rightOfCursor = line.substring(column);
        }
        if (column >= line.length) {
            this.moveCursorTo(row, line.length);
            this.moveCursorRight();
            if (row < this.doc.getLength() - 1)
                this.moveCursorWordRight();
            return;
        }
        if (match = this.session.tokenRe.exec(rightOfCursor)) {
            column += this.session.tokenRe.lastIndex;
            this.session.tokenRe.lastIndex = 0;
        }

        this.moveCursorTo(row, column);
    };
    this.moveCursorLongWordLeft = function() {
        var row = this.lead.row;
        var column = this.lead.column;
        var fold;
        if (fold = this.session.getFoldAt(row, column, -1)) {
            this.moveCursorTo(fold.start.row, fold.start.column);
            return;
        }

        var str = this.session.getFoldStringAt(row, column, -1);
        if (str == null) {
            str = this.doc.getLine(row).substring(0, column);
        }

        var leftOfCursor = lang.stringReverse(str);
        var match;
        this.session.nonTokenRe.lastIndex = 0;
        this.session.tokenRe.lastIndex = 0;
        if (match = this.session.nonTokenRe.exec(leftOfCursor)) {
            column -= this.session.nonTokenRe.lastIndex;
            leftOfCursor = leftOfCursor.slice(this.session.nonTokenRe.lastIndex);
            this.session.nonTokenRe.lastIndex = 0;
        }
        if (column <= 0) {
            this.moveCursorTo(row, 0);
            this.moveCursorLeft();
            if (row > 0)
                this.moveCursorWordLeft();
            return;
        }
        if (match = this.session.tokenRe.exec(leftOfCursor)) {
            column -= this.session.tokenRe.lastIndex;
            this.session.tokenRe.lastIndex = 0;
        }

        this.moveCursorTo(row, column);
    };

    this.$shortWordEndIndex = function(rightOfCursor) {
        var match, index = 0, ch;
        var whitespaceRe = /\s/;
        var tokenRe = this.session.tokenRe;

        tokenRe.lastIndex = 0;
        if (match = this.session.tokenRe.exec(rightOfCursor)) {
            index = this.session.tokenRe.lastIndex;
        } else {
            while ((ch = rightOfCursor[index]) && whitespaceRe.test(ch))
                index ++;

            if (index < 1) {
                tokenRe.lastIndex = 0;
                 while ((ch = rightOfCursor[index]) && !tokenRe.test(ch)) {
                    tokenRe.lastIndex = 0;
                    index ++;
                    if (whitespaceRe.test(ch)) {
                        if (index > 2) {
                            index--;
                            break;
                        } else {
                            while ((ch = rightOfCursor[index]) && whitespaceRe.test(ch))
                                index ++;
                            if (index > 2)
                                break;
                        }
                    }
                }
            }
        }
        tokenRe.lastIndex = 0;

        return index;
    };

    this.moveCursorShortWordRight = function() {
        var row = this.lead.row;
        var column = this.lead.column;
        var line = this.doc.getLine(row);
        var rightOfCursor = line.substring(column);

        var fold = this.session.getFoldAt(row, column, 1);
        if (fold)
            return this.moveCursorTo(fold.end.row, fold.end.column);

        if (column == line.length) {
            var l = this.doc.getLength();
            do {
                row++;
                rightOfCursor = this.doc.getLine(row);
            } while (row < l && /^\s*$/.test(rightOfCursor));

            if (!/^\s+/.test(rightOfCursor))
                rightOfCursor = "";
            column = 0;
        }

        var index = this.$shortWordEndIndex(rightOfCursor);

        this.moveCursorTo(row, column + index);
    };

    this.moveCursorShortWordLeft = function() {
        var row = this.lead.row;
        var column = this.lead.column;

        var fold;
        if (fold = this.session.getFoldAt(row, column, -1))
            return this.moveCursorTo(fold.start.row, fold.start.column);

        var line = this.session.getLine(row).substring(0, column);
        if (column === 0) {
            do {
                row--;
                line = this.doc.getLine(row);
            } while (row > 0 && /^\s*$/.test(line));

            column = line.length;
            if (!/\s+$/.test(line))
                line = "";
        }

        var leftOfCursor = lang.stringReverse(line);
        var index = this.$shortWordEndIndex(leftOfCursor);

        return this.moveCursorTo(row, column - index);
    };

    this.moveCursorWordRight = function() {
        if (this.session.$selectLongWords)
            this.moveCursorLongWordRight();
        else
            this.moveCursorShortWordRight();
    };

    this.moveCursorWordLeft = function() {
        if (this.session.$selectLongWords)
            this.moveCursorLongWordLeft();
        else
            this.moveCursorShortWordLeft();
    };
    this.moveCursorBy = function(rows, chars) {
        var screenPos = this.session.documentToScreenPosition(
            this.lead.row,
            this.lead.column
        );

        if (chars === 0) {
            if (this.$desiredColumn)
                screenPos.column = this.$desiredColumn;
            else
                this.$desiredColumn = screenPos.column;
        }

        var docPos = this.session.screenToDocumentPosition(screenPos.row + rows, screenPos.column);
        
        if (rows !== 0 && chars === 0 && docPos.row === this.lead.row && docPos.column === this.lead.column) {
            if (this.session.lineWidgets && this.session.lineWidgets[docPos.row])
                docPos.row++;
        }
        this.moveCursorTo(docPos.row, docPos.column + chars, chars === 0);
    };
    this.moveCursorToPosition = function(position) {
        this.moveCursorTo(position.row, position.column);
    };
    this.moveCursorTo = function(row, column, keepDesiredColumn) {
        var fold = this.session.getFoldAt(row, column, 1);
        if (fold) {
            row = fold.start.row;
            column = fold.start.column;
        }

        this.$keepDesiredColumnOnChange = true;
        this.lead.setPosition(row, column);
        this.$keepDesiredColumnOnChange = false;

        if (!keepDesiredColumn)
            this.$desiredColumn = null;
    };
    this.moveCursorToScreen = function(row, column, keepDesiredColumn) {
        var pos = this.session.screenToDocumentPosition(row, column);
        this.moveCursorTo(pos.row, pos.column, keepDesiredColumn);
    };
    this.detach = function() {
        this.lead.detach();
        this.anchor.detach();
        this.session = this.doc = null;
    };

    this.fromOrientedRange = function(range) {
        this.setSelectionRange(range, range.cursor == range.start);
        this.$desiredColumn = range.desiredColumn || this.$desiredColumn;
    };

    this.toOrientedRange = function(range) {
        var r = this.getRange();
        if (range) {
            range.start.column = r.start.column;
            range.start.row = r.start.row;
            range.end.column = r.end.column;
            range.end.row = r.end.row;
        } else {
            range = r;
        }

        range.cursor = this.isBackwards() ? range.start : range.end;
        range.desiredColumn = this.$desiredColumn;
        return range;
    };
    this.getRangeOfMovements = function(func) {
        var start = this.getCursor();
        try {
            func.call(null, this);
            var end = this.getCursor();
            return Range.fromPoints(start,end);
        } catch(e) {
            return Range.fromPoints(start,start);
        } finally {
            this.moveCursorToPosition(start);
        }
    };

    this.toJSON = function() {
        if (this.rangeCount) {
            var data = this.ranges.map(function(r) {
                var r1 = r.clone();
                r1.isBackwards = r.cursor == r.start;
                return r1;
            });
        } else {
            var data = this.getRange();
            data.isBackwards = this.isBackwards();
        }
        return data;
    };

    this.fromJSON = function(data) {
        if (data.start == undefined) {
            if (this.rangeList) {
                this.toSingleRange(data[0]);
                for (var i = data.length; i--; ) {
                    var r = Range.fromPoints(data[i].start, data[i].end);
                    if (data.isBackwards)
                        r.cursor = r.start;
                    this.addRange(r, true);
                }
                return;
            } else
                data = data[0];
        }
        if (this.rangeList)
            this.toSingleRange(data);
        this.setSelectionRange(data, data.isBackwards);
    };

    this.isEqual = function(data) {
        if ((data.length || this.rangeCount) && data.length != this.rangeCount)
            return false;
        if (!data.length || !this.ranges)
            return this.getRange().isEqual(data);

        for (var i = this.ranges.length; i--; ) {
            if (!this.ranges[i].isEqual(data[i]))
                return false;
        }
        return true;
    };

}).call(Selection.prototype);

exports.Selection = Selection;
});

define("ace/tokenizer",["require","exports","module","ace/config"], function(require, exports, module) {
"use strict";

var config = require("./config");
var MAX_TOKEN_COUNT = 2000;
var Tokenizer = function(rules) {
    this.states = rules;

    this.regExps = {};
    this.matchMappings = {};
    for (var key in this.states) {
        var state = this.states[key];
        var ruleRegExps = [];
        var matchTotal = 0;
        var mapping = this.matchMappings[key] = {defaultToken: "text"};
        var flag = "g";

        var splitterRurles = [];
        for (var i = 0; i < state.length; i++) {
            var rule = state[i];
            if (rule.defaultToken)
                mapping.defaultToken = rule.defaultToken;
            if (rule.caseInsensitive)
                flag = "gi";
            if (rule.regex == null)
                continue;

            if (rule.regex instanceof RegExp)
                rule.regex = rule.regex.toString().slice(1, -1);
            var adjustedregex = rule.regex;
            var matchcount = new RegExp("(?:(" + adjustedregex + ")|(.))").exec("a").length - 2;
            if (Array.isArray(rule.token)) {
                if (rule.token.length == 1 || matchcount == 1) {
                    rule.token = rule.token[0];
                } else if (matchcount - 1 != rule.token.length) {
                    this.reportError("number of classes and regexp groups doesn't match", { 
                        rule: rule,
                        groupCount: matchcount - 1
                    });
                    rule.token = rule.token[0];
                } else {
                    rule.tokenArray = rule.token;
                    rule.token = null;
                    rule.onMatch = this.$arrayTokens;
                }
            } else if (typeof rule.token == "function" && !rule.onMatch) {
                if (matchcount > 1)
                    rule.onMatch = this.$applyToken;
                else
                    rule.onMatch = rule.token;
            }

            if (matchcount > 1) {
                if (/\\\d/.test(rule.regex)) {
                    adjustedregex = rule.regex.replace(/\\([0-9]+)/g, function(match, digit) {
                        return "\\" + (parseInt(digit, 10) + matchTotal + 1);
                    });
                } else {
                    matchcount = 1;
                    adjustedregex = this.removeCapturingGroups(rule.regex);
                }
                if (!rule.splitRegex && typeof rule.token != "string")
                    splitterRurles.push(rule); // flag will be known only at the very end
            }

            mapping[matchTotal] = i;
            matchTotal += matchcount;

            ruleRegExps.push(adjustedregex);
            if (!rule.onMatch)
                rule.onMatch = null;
        }
        
        if (!ruleRegExps.length) {
            mapping[0] = 0;
            ruleRegExps.push("$");
        }
        
        splitterRurles.forEach(function(rule) {
            rule.splitRegex = this.createSplitterRegexp(rule.regex, flag);
        }, this);

        this.regExps[key] = new RegExp("(" + ruleRegExps.join(")|(") + ")|($)", flag);
    }
};

(function() {
    this.$setMaxTokenCount = function(m) {
        MAX_TOKEN_COUNT = m | 0;
    };
    
    this.$applyToken = function(str) {
        var values = this.splitRegex.exec(str).slice(1);
        var types = this.token.apply(this, values);
        if (typeof types === "string")
            return [{type: types, value: str}];

        var tokens = [];
        for (var i = 0, l = types.length; i < l; i++) {
            if (values[i])
                tokens[tokens.length] = {
                    type: types[i],
                    value: values[i]
                };
        }
        return tokens;
    },

    this.$arrayTokens = function(str) {
        if (!str)
            return [];
        var values = this.splitRegex.exec(str);
        if (!values)
            return "text";
        var tokens = [];
        var types = this.tokenArray;
        for (var i = 0, l = types.length; i < l; i++) {
            if (values[i + 1])
                tokens[tokens.length] = {
                    type: types[i],
                    value: values[i + 1]
                };
        }
        return tokens;
    };

    this.removeCapturingGroups = function(src) {
        var r = src.replace(
            /\[(?:\\.|[^\]])*?\]|\\.|\(\?[:=!]|(\()/g,
            function(x, y) {return y ? "(?:" : x;}
        );
        return r;
    };

    this.createSplitterRegexp = function(src, flag) {
        if (src.indexOf("(?=") != -1) {
            var stack = 0;
            var inChClass = false;
            var lastCapture = {};
            src.replace(/(\\.)|(\((?:\?[=!])?)|(\))|([\[\]])/g, function(
                m, esc, parenOpen, parenClose, square, index
            ) {
                if (inChClass) {
                    inChClass = square != "]";
                } else if (square) {
                    inChClass = true;
                } else if (parenClose) {
                    if (stack == lastCapture.stack) {
                        lastCapture.end = index+1;
                        lastCapture.stack = -1;
                    }
                    stack--;
                } else if (parenOpen) {
                    stack++;
                    if (parenOpen.length != 1) {
                        lastCapture.stack = stack
                        lastCapture.start = index;
                    }
                }
                return m;
            });

            if (lastCapture.end != null && /^\)*$/.test(src.substr(lastCapture.end)))
                src = src.substring(0, lastCapture.start) + src.substr(lastCapture.end);
        }
        return new RegExp(src, (flag||"").replace("g", ""));
    };
    this.getLineTokens = function(line, startState) {
        if (startState && typeof startState != "string") {
            var stack = startState.slice(0);
            startState = stack[0];
            if (startState === "#tmp") {
                stack.shift()
                startState = stack.shift()
            }
        } else
            var stack = [];

        var currentState = startState || "start";
        var state = this.states[currentState];
        if (!state) {
            currentState = "start";
            state = this.states[currentState];
        }
        var mapping = this.matchMappings[currentState];
        var re = this.regExps[currentState];
        re.lastIndex = 0;

        var match, tokens = [];
        var lastIndex = 0;
        var matchAttempts = 0;

        var token = {type: null, value: ""};

        while (match = re.exec(line)) {
            var type = mapping.defaultToken;
            var rule = null;
            var value = match[0];
            var index = re.lastIndex;

            if (index - value.length > lastIndex) {
                var skipped = line.substring(lastIndex, index - value.length);
                if (token.type == type) {
                    token.value += skipped;
                } else {
                    if (token.type)
                        tokens.push(token);
                    token = {type: type, value: skipped};
                }
            }

            for (var i = 0; i < match.length-2; i++) {
                if (match[i + 1] === undefined)
                    continue;

                rule = state[mapping[i]];

                if (rule.onMatch)
                    type = rule.onMatch(value, currentState, stack);
                else
                    type = rule.token;

                if (rule.next) {
                    if (typeof rule.next == "string") {
                        currentState = rule.next;
                    } else {
                        currentState = rule.next(currentState, stack);
                    }
                    
                    state = this.states[currentState];
                    if (!state) {
                        this.reportError("state doesn't exist", currentState);
                        currentState = "start";
                        state = this.states[currentState];
                    }
                    mapping = this.matchMappings[currentState];
                    lastIndex = index;
                    re = this.regExps[currentState];
                    re.lastIndex = index;
                }
                break;
            }

            if (value) {
                if (typeof type === "string") {
                    if ((!rule || rule.merge !== false) && token.type === type) {
                        token.value += value;
                    } else {
                        if (token.type)
                            tokens.push(token);
                        token = {type: type, value: value};
                    }
                } else if (type) {
                    if (token.type)
                        tokens.push(token);
                    token = {type: null, value: ""};
                    for (var i = 0; i < type.length; i++)
                        tokens.push(type[i]);
                }
            }

            if (lastIndex == line.length)
                break;

            lastIndex = index;

            if (matchAttempts++ > MAX_TOKEN_COUNT) {
                if (matchAttempts > 2 * line.length) {
                    this.reportError("infinite loop with in ace tokenizer", {
                        startState: startState,
                        line: line
                    });
                }
                while (lastIndex < line.length) {
                    if (token.type)
                        tokens.push(token);
                    token = {
                        value: line.substring(lastIndex, lastIndex += 2000),
                        type: "overflow"
                    };
                }
                currentState = "start";
                stack = [];
                break;
            }
        }

        if (token.type)
            tokens.push(token);
        
        if (stack.length > 1) {
            if (stack[0] !== currentState)
                stack.unshift("#tmp", currentState);
        }
        return {
            tokens : tokens,
            state : stack.length ? stack : currentState
        };
    };
    
    this.reportError = config.reportError;
    
}).call(Tokenizer.prototype);

exports.Tokenizer = Tokenizer;
});

define("ace/mode/text_highlight_rules",["require","exports","module","ace/lib/lang"], function(require, exports, module) {
"use strict";

var lang = require("../lib/lang");

var TextHighlightRules = function() {

    this.$rules = {
        "start" : [{
            token : "empty_line",
            regex : '^$'
        }, {
            defaultToken : "text"
        }]
    };
};

(function() {

    this.addRules = function(rules, prefix) {
        if (!prefix) {
            for (var key in rules)
                this.$rules[key] = rules[key];
            return;
        }
        for (var key in rules) {
            var state = rules[key];
            for (var i = 0; i < state.length; i++) {
                var rule = state[i];
                if (rule.next || rule.onMatch) {
                    if (typeof rule.next != "string") {
                        if (rule.nextState && rule.nextState.indexOf(prefix) !== 0)
                            rule.nextState = prefix + rule.nextState;
                    } else {
                        if (rule.next.indexOf(prefix) !== 0)
                            rule.next = prefix + rule.next;
                    }
                }
            }
            this.$rules[prefix + key] = state;
        }
    };

    this.getRules = function() {
        return this.$rules;
    };

    this.embedRules = function (HighlightRules, prefix, escapeRules, states, append) {
        var embedRules = typeof HighlightRules == "function"
            ? new HighlightRules().getRules()
            : HighlightRules;
        if (states) {
            for (var i = 0; i < states.length; i++)
                states[i] = prefix + states[i];
        } else {
            states = [];
            for (var key in embedRules)
                states.push(prefix + key);
        }

        this.addRules(embedRules, prefix);

        if (escapeRules) {
            var addRules = Array.prototype[append ? "push" : "unshift"];
            for (var i = 0; i < states.length; i++)
                addRules.apply(this.$rules[states[i]], lang.deepCopy(escapeRules));
        }

        if (!this.$embeds)
            this.$embeds = [];
        this.$embeds.push(prefix);
    };

    this.getEmbeds = function() {
        return this.$embeds;
    };

    var pushState = function(currentState, stack) {
        if (currentState != "start" || stack.length)
            stack.unshift(this.nextState, currentState);
        return this.nextState;
    };
    var popState = function(currentState, stack) {
        stack.shift();
        return stack.shift() || "start";
    };

    this.normalizeRules = function() {
        var id = 0;
        var rules = this.$rules;
        function processState(key) {
            var state = rules[key];
            state.processed = true;
            for (var i = 0; i < state.length; i++) {
                var rule = state[i];
                if (!rule.regex && rule.start) {
                    rule.regex = rule.start;
                    if (!rule.next)
                        rule.next = [];
                    rule.next.push({
                        defaultToken: rule.token
                    }, {
                        token: rule.token + ".end",
                        regex: rule.end || rule.start,
                        next: "pop"
                    });
                    rule.token = rule.token + ".start";
                    rule.push = true;
                }
                var next = rule.next || rule.push;
                if (next && Array.isArray(next)) {
                    var stateName = rule.stateName;
                    if (!stateName)  {
                        stateName = rule.token;
                        if (typeof stateName != "string")
                            stateName = stateName[0] || "";
                        if (rules[stateName])
                            stateName += id++;
                    }
                    rules[stateName] = next;
                    rule.next = stateName;
                    processState(stateName);
                } else if (next == "pop") {
                    rule.next = popState;
                }

                if (rule.push) {
                    rule.nextState = rule.next || rule.push;
                    rule.next = pushState;
                    delete rule.push;
                }

                if (rule.rules) {
                    for (var r in rule.rules) {
                        if (rules[r]) {
                            if (rules[r].push)
                                rules[r].push.apply(rules[r], rule.rules[r]);
                        } else {
                            rules[r] = rule.rules[r];
                        }
                    }
                }
                if (rule.include || typeof rule == "string") {
                    var includeName = rule.include || rule;
                    var toInsert = rules[includeName];
                } else if (Array.isArray(rule))
                    toInsert = rule;

                if (toInsert) {
                    var args = [i, 1].concat(toInsert);
                    if (rule.noEscape)
                        args = args.filter(function(x) {return !x.next;});
                    state.splice.apply(state, args);
                    i--;
                    toInsert = null;
                }
                
                if (rule.keywordMap) {
                    rule.token = this.createKeywordMapper(
                        rule.keywordMap, rule.defaultToken || "text", rule.caseInsensitive
                    );
                    delete rule.defaultToken;
                }
            }
        }
        Object.keys(rules).forEach(processState, this);
    };

    this.createKeywordMapper = function(map, defaultToken, ignoreCase, splitChar) {
        var keywords = Object.create(null);
        Object.keys(map).forEach(function(className) {
            var a = map[className];
            if (ignoreCase)
                a = a.toLowerCase();
            var list = a.split(splitChar || "|");
            for (var i = list.length; i--; )
                keywords[list[i]] = className;
        });
        if (Object.getPrototypeOf(keywords)) {
            keywords.__proto__ = null;
        }
        this.$keywordList = Object.keys(keywords);
        map = null;
        return ignoreCase
            ? function(value) {return keywords[value.toLowerCase()] || defaultToken }
            : function(value) {return keywords[value] || defaultToken };
    };

    this.getKeywords = function() {
        return this.$keywords;
    };

}).call(TextHighlightRules.prototype);

exports.TextHighlightRules = TextHighlightRules;
});

define("ace/mode/behaviour",["require","exports","module"], function(require, exports, module) {
"use strict";

var Behaviour = function() {
   this.$behaviours = {};
};

(function () {

    this.add = function (name, action, callback) {
        switch (undefined) {
          case this.$behaviours:
              this.$behaviours = {};
          case this.$behaviours[name]:
              this.$behaviours[name] = {};
        }
        this.$behaviours[name][action] = callback;
    }
    
    this.addBehaviours = function (behaviours) {
        for (var key in behaviours) {
            for (var action in behaviours[key]) {
                this.add(key, action, behaviours[key][action]);
            }
        }
    }
    
    this.remove = function (name) {
        if (this.$behaviours && this.$behaviours[name]) {
            delete this.$behaviours[name];
        }
    }
    
    this.inherit = function (mode, filter) {
        if (typeof mode === "function") {
            var behaviours = new mode().getBehaviours(filter);
        } else {
            var behaviours = mode.getBehaviours(filter);
        }
        this.addBehaviours(behaviours);
    }
    
    this.getBehaviours = function (filter) {
        if (!filter) {
            return this.$behaviours;
        } else {
            var ret = {}
            for (var i = 0; i < filter.length; i++) {
                if (this.$behaviours[filter[i]]) {
                    ret[filter[i]] = this.$behaviours[filter[i]];
                }
            }
            return ret;
        }
    }

}).call(Behaviour.prototype);

exports.Behaviour = Behaviour;
});

define("ace/unicode",["require","exports","module"], function(require, exports, module) {
"use strict";
exports.packages = {};

addUnicodePackage({
    L:  "0041-005A0061-007A00AA00B500BA00C0-00D600D8-00F600F8-02C102C6-02D102E0-02E402EC02EE0370-037403760377037A-037D03860388-038A038C038E-03A103A3-03F503F7-0481048A-05250531-055605590561-058705D0-05EA05F0-05F20621-064A066E066F0671-06D306D506E506E606EE06EF06FA-06FC06FF07100712-072F074D-07A507B107CA-07EA07F407F507FA0800-0815081A082408280904-0939093D09500958-0961097109720979-097F0985-098C098F09900993-09A809AA-09B009B209B6-09B909BD09CE09DC09DD09DF-09E109F009F10A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A59-0A5C0A5E0A72-0A740A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABD0AD00AE00AE10B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D0B5C0B5D0B5F-0B610B710B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BD00C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D0C580C590C600C610C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD0CDE0CE00CE10D05-0D0C0D0E-0D100D12-0D280D2A-0D390D3D0D600D610D7A-0D7F0D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60E01-0E300E320E330E40-0E460E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB00EB20EB30EBD0EC0-0EC40EC60EDC0EDD0F000F40-0F470F49-0F6C0F88-0F8B1000-102A103F1050-1055105A-105D106110651066106E-10701075-1081108E10A0-10C510D0-10FA10FC1100-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A1380-138F13A0-13F41401-166C166F-167F1681-169A16A0-16EA1700-170C170E-17111720-17311740-17511760-176C176E-17701780-17B317D717DC1820-18771880-18A818AA18B0-18F51900-191C1950-196D1970-19741980-19AB19C1-19C71A00-1A161A20-1A541AA71B05-1B331B45-1B4B1B83-1BA01BAE1BAF1C00-1C231C4D-1C4F1C5A-1C7D1CE9-1CEC1CEE-1CF11D00-1DBF1E00-1F151F18-1F1D1F20-1F451F48-1F4D1F50-1F571F591F5B1F5D1F5F-1F7D1F80-1FB41FB6-1FBC1FBE1FC2-1FC41FC6-1FCC1FD0-1FD31FD6-1FDB1FE0-1FEC1FF2-1FF41FF6-1FFC2071207F2090-209421022107210A-211321152119-211D212421262128212A-212D212F-2139213C-213F2145-2149214E218321842C00-2C2E2C30-2C5E2C60-2CE42CEB-2CEE2D00-2D252D30-2D652D6F2D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE2E2F300530063031-3035303B303C3041-3096309D-309F30A1-30FA30FC-30FF3105-312D3131-318E31A0-31B731F0-31FF3400-4DB54E00-9FCBA000-A48CA4D0-A4FDA500-A60CA610-A61FA62AA62BA640-A65FA662-A66EA67F-A697A6A0-A6E5A717-A71FA722-A788A78BA78CA7FB-A801A803-A805A807-A80AA80C-A822A840-A873A882-A8B3A8F2-A8F7A8FBA90A-A925A930-A946A960-A97CA984-A9B2A9CFAA00-AA28AA40-AA42AA44-AA4BAA60-AA76AA7AAA80-AAAFAAB1AAB5AAB6AAB9-AABDAAC0AAC2AADB-AADDABC0-ABE2AC00-D7A3D7B0-D7C6D7CB-D7FBF900-FA2DFA30-FA6DFA70-FAD9FB00-FB06FB13-FB17FB1DFB1F-FB28FB2A-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74FE76-FEFCFF21-FF3AFF41-FF5AFF66-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC",
    Ll: "0061-007A00AA00B500BA00DF-00F600F8-00FF01010103010501070109010B010D010F01110113011501170119011B011D011F01210123012501270129012B012D012F01310133013501370138013A013C013E014001420144014601480149014B014D014F01510153015501570159015B015D015F01610163016501670169016B016D016F0171017301750177017A017C017E-0180018301850188018C018D019201950199-019B019E01A101A301A501A801AA01AB01AD01B001B401B601B901BA01BD-01BF01C601C901CC01CE01D001D201D401D601D801DA01DC01DD01DF01E101E301E501E701E901EB01ED01EF01F001F301F501F901FB01FD01FF02010203020502070209020B020D020F02110213021502170219021B021D021F02210223022502270229022B022D022F02310233-0239023C023F0240024202470249024B024D024F-02930295-02AF037103730377037B-037D039003AC-03CE03D003D103D5-03D703D903DB03DD03DF03E103E303E503E703E903EB03ED03EF-03F303F503F803FB03FC0430-045F04610463046504670469046B046D046F04710473047504770479047B047D047F0481048B048D048F04910493049504970499049B049D049F04A104A304A504A704A904AB04AD04AF04B104B304B504B704B904BB04BD04BF04C204C404C604C804CA04CC04CE04CF04D104D304D504D704D904DB04DD04DF04E104E304E504E704E904EB04ED04EF04F104F304F504F704F904FB04FD04FF05010503050505070509050B050D050F05110513051505170519051B051D051F0521052305250561-05871D00-1D2B1D62-1D771D79-1D9A1E011E031E051E071E091E0B1E0D1E0F1E111E131E151E171E191E1B1E1D1E1F1E211E231E251E271E291E2B1E2D1E2F1E311E331E351E371E391E3B1E3D1E3F1E411E431E451E471E491E4B1E4D1E4F1E511E531E551E571E591E5B1E5D1E5F1E611E631E651E671E691E6B1E6D1E6F1E711E731E751E771E791E7B1E7D1E7F1E811E831E851E871E891E8B1E8D1E8F1E911E931E95-1E9D1E9F1EA11EA31EA51EA71EA91EAB1EAD1EAF1EB11EB31EB51EB71EB91EBB1EBD1EBF1EC11EC31EC51EC71EC91ECB1ECD1ECF1ED11ED31ED51ED71ED91EDB1EDD1EDF1EE11EE31EE51EE71EE91EEB1EED1EEF1EF11EF31EF51EF71EF91EFB1EFD1EFF-1F071F10-1F151F20-1F271F30-1F371F40-1F451F50-1F571F60-1F671F70-1F7D1F80-1F871F90-1F971FA0-1FA71FB0-1FB41FB61FB71FBE1FC2-1FC41FC61FC71FD0-1FD31FD61FD71FE0-1FE71FF2-1FF41FF61FF7210A210E210F2113212F21342139213C213D2146-2149214E21842C30-2C5E2C612C652C662C682C6A2C6C2C712C732C742C76-2C7C2C812C832C852C872C892C8B2C8D2C8F2C912C932C952C972C992C9B2C9D2C9F2CA12CA32CA52CA72CA92CAB2CAD2CAF2CB12CB32CB52CB72CB92CBB2CBD2CBF2CC12CC32CC52CC72CC92CCB2CCD2CCF2CD12CD32CD52CD72CD92CDB2CDD2CDF2CE12CE32CE42CEC2CEE2D00-2D25A641A643A645A647A649A64BA64DA64FA651A653A655A657A659A65BA65DA65FA663A665A667A669A66BA66DA681A683A685A687A689A68BA68DA68FA691A693A695A697A723A725A727A729A72BA72DA72F-A731A733A735A737A739A73BA73DA73FA741A743A745A747A749A74BA74DA74FA751A753A755A757A759A75BA75DA75FA761A763A765A767A769A76BA76DA76FA771-A778A77AA77CA77FA781A783A785A787A78CFB00-FB06FB13-FB17FF41-FF5A",
    Lu: "0041-005A00C0-00D600D8-00DE01000102010401060108010A010C010E01100112011401160118011A011C011E01200122012401260128012A012C012E01300132013401360139013B013D013F0141014301450147014A014C014E01500152015401560158015A015C015E01600162016401660168016A016C016E017001720174017601780179017B017D018101820184018601870189-018B018E-0191019301940196-0198019C019D019F01A001A201A401A601A701A901AC01AE01AF01B1-01B301B501B701B801BC01C401C701CA01CD01CF01D101D301D501D701D901DB01DE01E001E201E401E601E801EA01EC01EE01F101F401F6-01F801FA01FC01FE02000202020402060208020A020C020E02100212021402160218021A021C021E02200222022402260228022A022C022E02300232023A023B023D023E02410243-02460248024A024C024E03700372037603860388-038A038C038E038F0391-03A103A3-03AB03CF03D2-03D403D803DA03DC03DE03E003E203E403E603E803EA03EC03EE03F403F703F903FA03FD-042F04600462046404660468046A046C046E04700472047404760478047A047C047E0480048A048C048E04900492049404960498049A049C049E04A004A204A404A604A804AA04AC04AE04B004B204B404B604B804BA04BC04BE04C004C104C304C504C704C904CB04CD04D004D204D404D604D804DA04DC04DE04E004E204E404E604E804EA04EC04EE04F004F204F404F604F804FA04FC04FE05000502050405060508050A050C050E05100512051405160518051A051C051E0520052205240531-055610A0-10C51E001E021E041E061E081E0A1E0C1E0E1E101E121E141E161E181E1A1E1C1E1E1E201E221E241E261E281E2A1E2C1E2E1E301E321E341E361E381E3A1E3C1E3E1E401E421E441E461E481E4A1E4C1E4E1E501E521E541E561E581E5A1E5C1E5E1E601E621E641E661E681E6A1E6C1E6E1E701E721E741E761E781E7A1E7C1E7E1E801E821E841E861E881E8A1E8C1E8E1E901E921E941E9E1EA01EA21EA41EA61EA81EAA1EAC1EAE1EB01EB21EB41EB61EB81EBA1EBC1EBE1EC01EC21EC41EC61EC81ECA1ECC1ECE1ED01ED21ED41ED61ED81EDA1EDC1EDE1EE01EE21EE41EE61EE81EEA1EEC1EEE1EF01EF21EF41EF61EF81EFA1EFC1EFE1F08-1F0F1F18-1F1D1F28-1F2F1F38-1F3F1F48-1F4D1F591F5B1F5D1F5F1F68-1F6F1FB8-1FBB1FC8-1FCB1FD8-1FDB1FE8-1FEC1FF8-1FFB21022107210B-210D2110-211221152119-211D212421262128212A-212D2130-2133213E213F214521832C00-2C2E2C602C62-2C642C672C692C6B2C6D-2C702C722C752C7E-2C802C822C842C862C882C8A2C8C2C8E2C902C922C942C962C982C9A2C9C2C9E2CA02CA22CA42CA62CA82CAA2CAC2CAE2CB02CB22CB42CB62CB82CBA2CBC2CBE2CC02CC22CC42CC62CC82CCA2CCC2CCE2CD02CD22CD42CD62CD82CDA2CDC2CDE2CE02CE22CEB2CEDA640A642A644A646A648A64AA64CA64EA650A652A654A656A658A65AA65CA65EA662A664A666A668A66AA66CA680A682A684A686A688A68AA68CA68EA690A692A694A696A722A724A726A728A72AA72CA72EA732A734A736A738A73AA73CA73EA740A742A744A746A748A74AA74CA74EA750A752A754A756A758A75AA75CA75EA760A762A764A766A768A76AA76CA76EA779A77BA77DA77EA780A782A784A786A78BFF21-FF3A",
    Lt: "01C501C801CB01F21F88-1F8F1F98-1F9F1FA8-1FAF1FBC1FCC1FFC",
    Lm: "02B0-02C102C6-02D102E0-02E402EC02EE0374037A0559064006E506E607F407F507FA081A0824082809710E460EC610FC17D718431AA71C78-1C7D1D2C-1D611D781D9B-1DBF2071207F2090-20942C7D2D6F2E2F30053031-3035303B309D309E30FC-30FEA015A4F8-A4FDA60CA67FA717-A71FA770A788A9CFAA70AADDFF70FF9EFF9F",
    Lo: "01BB01C0-01C3029405D0-05EA05F0-05F20621-063F0641-064A066E066F0671-06D306D506EE06EF06FA-06FC06FF07100712-072F074D-07A507B107CA-07EA0800-08150904-0939093D09500958-096109720979-097F0985-098C098F09900993-09A809AA-09B009B209B6-09B909BD09CE09DC09DD09DF-09E109F009F10A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A59-0A5C0A5E0A72-0A740A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABD0AD00AE00AE10B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D0B5C0B5D0B5F-0B610B710B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BD00C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D0C580C590C600C610C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD0CDE0CE00CE10D05-0D0C0D0E-0D100D12-0D280D2A-0D390D3D0D600D610D7A-0D7F0D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60E01-0E300E320E330E40-0E450E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB00EB20EB30EBD0EC0-0EC40EDC0EDD0F000F40-0F470F49-0F6C0F88-0F8B1000-102A103F1050-1055105A-105D106110651066106E-10701075-1081108E10D0-10FA1100-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A1380-138F13A0-13F41401-166C166F-167F1681-169A16A0-16EA1700-170C170E-17111720-17311740-17511760-176C176E-17701780-17B317DC1820-18421844-18771880-18A818AA18B0-18F51900-191C1950-196D1970-19741980-19AB19C1-19C71A00-1A161A20-1A541B05-1B331B45-1B4B1B83-1BA01BAE1BAF1C00-1C231C4D-1C4F1C5A-1C771CE9-1CEC1CEE-1CF12135-21382D30-2D652D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE3006303C3041-3096309F30A1-30FA30FF3105-312D3131-318E31A0-31B731F0-31FF3400-4DB54E00-9FCBA000-A014A016-A48CA4D0-A4F7A500-A60BA610-A61FA62AA62BA66EA6A0-A6E5A7FB-A801A803-A805A807-A80AA80C-A822A840-A873A882-A8B3A8F2-A8F7A8FBA90A-A925A930-A946A960-A97CA984-A9B2AA00-AA28AA40-AA42AA44-AA4BAA60-AA6FAA71-AA76AA7AAA80-AAAFAAB1AAB5AAB6AAB9-AABDAAC0AAC2AADBAADCABC0-ABE2AC00-D7A3D7B0-D7C6D7CB-D7FBF900-FA2DFA30-FA6DFA70-FAD9FB1DFB1F-FB28FB2A-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74FE76-FEFCFF66-FF6FFF71-FF9DFFA0-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC",
    M:  "0300-036F0483-04890591-05BD05BF05C105C205C405C505C70610-061A064B-065E067006D6-06DC06DE-06E406E706E806EA-06ED07110730-074A07A6-07B007EB-07F30816-0819081B-08230825-08270829-082D0900-0903093C093E-094E0951-0955096209630981-098309BC09BE-09C409C709C809CB-09CD09D709E209E30A01-0A030A3C0A3E-0A420A470A480A4B-0A4D0A510A700A710A750A81-0A830ABC0ABE-0AC50AC7-0AC90ACB-0ACD0AE20AE30B01-0B030B3C0B3E-0B440B470B480B4B-0B4D0B560B570B620B630B820BBE-0BC20BC6-0BC80BCA-0BCD0BD70C01-0C030C3E-0C440C46-0C480C4A-0C4D0C550C560C620C630C820C830CBC0CBE-0CC40CC6-0CC80CCA-0CCD0CD50CD60CE20CE30D020D030D3E-0D440D46-0D480D4A-0D4D0D570D620D630D820D830DCA0DCF-0DD40DD60DD8-0DDF0DF20DF30E310E34-0E3A0E47-0E4E0EB10EB4-0EB90EBB0EBC0EC8-0ECD0F180F190F350F370F390F3E0F3F0F71-0F840F860F870F90-0F970F99-0FBC0FC6102B-103E1056-1059105E-10601062-10641067-106D1071-10741082-108D108F109A-109D135F1712-17141732-1734175217531772177317B6-17D317DD180B-180D18A91920-192B1930-193B19B0-19C019C819C91A17-1A1B1A55-1A5E1A60-1A7C1A7F1B00-1B041B34-1B441B6B-1B731B80-1B821BA1-1BAA1C24-1C371CD0-1CD21CD4-1CE81CED1CF21DC0-1DE61DFD-1DFF20D0-20F02CEF-2CF12DE0-2DFF302A-302F3099309AA66F-A672A67CA67DA6F0A6F1A802A806A80BA823-A827A880A881A8B4-A8C4A8E0-A8F1A926-A92DA947-A953A980-A983A9B3-A9C0AA29-AA36AA43AA4CAA4DAA7BAAB0AAB2-AAB4AAB7AAB8AABEAABFAAC1ABE3-ABEAABECABEDFB1EFE00-FE0FFE20-FE26",
    Mn: "0300-036F0483-04870591-05BD05BF05C105C205C405C505C70610-061A064B-065E067006D6-06DC06DF-06E406E706E806EA-06ED07110730-074A07A6-07B007EB-07F30816-0819081B-08230825-08270829-082D0900-0902093C0941-0948094D0951-095509620963098109BC09C1-09C409CD09E209E30A010A020A3C0A410A420A470A480A4B-0A4D0A510A700A710A750A810A820ABC0AC1-0AC50AC70AC80ACD0AE20AE30B010B3C0B3F0B41-0B440B4D0B560B620B630B820BC00BCD0C3E-0C400C46-0C480C4A-0C4D0C550C560C620C630CBC0CBF0CC60CCC0CCD0CE20CE30D41-0D440D4D0D620D630DCA0DD2-0DD40DD60E310E34-0E3A0E47-0E4E0EB10EB4-0EB90EBB0EBC0EC8-0ECD0F180F190F350F370F390F71-0F7E0F80-0F840F860F870F90-0F970F99-0FBC0FC6102D-10301032-10371039103A103D103E10581059105E-10601071-1074108210851086108D109D135F1712-17141732-1734175217531772177317B7-17BD17C617C9-17D317DD180B-180D18A91920-19221927192819321939-193B1A171A181A561A58-1A5E1A601A621A65-1A6C1A73-1A7C1A7F1B00-1B031B341B36-1B3A1B3C1B421B6B-1B731B801B811BA2-1BA51BA81BA91C2C-1C331C361C371CD0-1CD21CD4-1CE01CE2-1CE81CED1DC0-1DE61DFD-1DFF20D0-20DC20E120E5-20F02CEF-2CF12DE0-2DFF302A-302F3099309AA66FA67CA67DA6F0A6F1A802A806A80BA825A826A8C4A8E0-A8F1A926-A92DA947-A951A980-A982A9B3A9B6-A9B9A9BCAA29-AA2EAA31AA32AA35AA36AA43AA4CAAB0AAB2-AAB4AAB7AAB8AABEAABFAAC1ABE5ABE8ABEDFB1EFE00-FE0FFE20-FE26",
    Mc: "0903093E-09400949-094C094E0982098309BE-09C009C709C809CB09CC09D70A030A3E-0A400A830ABE-0AC00AC90ACB0ACC0B020B030B3E0B400B470B480B4B0B4C0B570BBE0BBF0BC10BC20BC6-0BC80BCA-0BCC0BD70C01-0C030C41-0C440C820C830CBE0CC0-0CC40CC70CC80CCA0CCB0CD50CD60D020D030D3E-0D400D46-0D480D4A-0D4C0D570D820D830DCF-0DD10DD8-0DDF0DF20DF30F3E0F3F0F7F102B102C10311038103B103C105610571062-10641067-106D108310841087-108C108F109A-109C17B617BE-17C517C717C81923-19261929-192B193019311933-193819B0-19C019C819C91A19-1A1B1A551A571A611A631A641A6D-1A721B041B351B3B1B3D-1B411B431B441B821BA11BA61BA71BAA1C24-1C2B1C341C351CE11CF2A823A824A827A880A881A8B4-A8C3A952A953A983A9B4A9B5A9BAA9BBA9BD-A9C0AA2FAA30AA33AA34AA4DAA7BABE3ABE4ABE6ABE7ABE9ABEAABEC",
    Me: "0488048906DE20DD-20E020E2-20E4A670-A672",
    N:  "0030-003900B200B300B900BC-00BE0660-066906F0-06F907C0-07C90966-096F09E6-09EF09F4-09F90A66-0A6F0AE6-0AEF0B66-0B6F0BE6-0BF20C66-0C6F0C78-0C7E0CE6-0CEF0D66-0D750E50-0E590ED0-0ED90F20-0F331040-10491090-10991369-137C16EE-16F017E0-17E917F0-17F91810-18191946-194F19D0-19DA1A80-1A891A90-1A991B50-1B591BB0-1BB91C40-1C491C50-1C5920702074-20792080-20892150-21822185-21892460-249B24EA-24FF2776-27932CFD30073021-30293038-303A3192-31953220-32293251-325F3280-328932B1-32BFA620-A629A6E6-A6EFA830-A835A8D0-A8D9A900-A909A9D0-A9D9AA50-AA59ABF0-ABF9FF10-FF19",
    Nd: "0030-00390660-066906F0-06F907C0-07C90966-096F09E6-09EF0A66-0A6F0AE6-0AEF0B66-0B6F0BE6-0BEF0C66-0C6F0CE6-0CEF0D66-0D6F0E50-0E590ED0-0ED90F20-0F291040-10491090-109917E0-17E91810-18191946-194F19D0-19DA1A80-1A891A90-1A991B50-1B591BB0-1BB91C40-1C491C50-1C59A620-A629A8D0-A8D9A900-A909A9D0-A9D9AA50-AA59ABF0-ABF9FF10-FF19",
    Nl: "16EE-16F02160-21822185-218830073021-30293038-303AA6E6-A6EF",
    No: "00B200B300B900BC-00BE09F4-09F90BF0-0BF20C78-0C7E0D70-0D750F2A-0F331369-137C17F0-17F920702074-20792080-20892150-215F21892460-249B24EA-24FF2776-27932CFD3192-31953220-32293251-325F3280-328932B1-32BFA830-A835",
    P:  "0021-00230025-002A002C-002F003A003B003F0040005B-005D005F007B007D00A100AB00B700BB00BF037E0387055A-055F0589058A05BE05C005C305C605F305F40609060A060C060D061B061E061F066A-066D06D40700-070D07F7-07F90830-083E0964096509700DF40E4F0E5A0E5B0F04-0F120F3A-0F3D0F850FD0-0FD4104A-104F10FB1361-13681400166D166E169B169C16EB-16ED1735173617D4-17D617D8-17DA1800-180A1944194519DE19DF1A1E1A1F1AA0-1AA61AA8-1AAD1B5A-1B601C3B-1C3F1C7E1C7F1CD32010-20272030-20432045-20512053-205E207D207E208D208E2329232A2768-277527C527C627E6-27EF2983-299829D8-29DB29FC29FD2CF9-2CFC2CFE2CFF2E00-2E2E2E302E313001-30033008-30113014-301F3030303D30A030FBA4FEA4FFA60D-A60FA673A67EA6F2-A6F7A874-A877A8CEA8CFA8F8-A8FAA92EA92FA95FA9C1-A9CDA9DEA9DFAA5C-AA5FAADEAADFABEBFD3EFD3FFE10-FE19FE30-FE52FE54-FE61FE63FE68FE6AFE6BFF01-FF03FF05-FF0AFF0C-FF0FFF1AFF1BFF1FFF20FF3B-FF3DFF3FFF5BFF5DFF5F-FF65",
    Pd: "002D058A05BE140018062010-20152E172E1A301C303030A0FE31FE32FE58FE63FF0D",
    Ps: "0028005B007B0F3A0F3C169B201A201E2045207D208D23292768276A276C276E27702772277427C527E627E827EA27EC27EE2983298529872989298B298D298F299129932995299729D829DA29FC2E222E242E262E283008300A300C300E3010301430163018301A301DFD3EFE17FE35FE37FE39FE3BFE3DFE3FFE41FE43FE47FE59FE5BFE5DFF08FF3BFF5BFF5FFF62",
    Pe: "0029005D007D0F3B0F3D169C2046207E208E232A2769276B276D276F27712773277527C627E727E927EB27ED27EF298429862988298A298C298E2990299229942996299829D929DB29FD2E232E252E272E293009300B300D300F3011301530173019301B301E301FFD3FFE18FE36FE38FE3AFE3CFE3EFE40FE42FE44FE48FE5AFE5CFE5EFF09FF3DFF5DFF60FF63",
    Pi: "00AB2018201B201C201F20392E022E042E092E0C2E1C2E20",
    Pf: "00BB2019201D203A2E032E052E0A2E0D2E1D2E21",
    Pc: "005F203F20402054FE33FE34FE4D-FE4FFF3F",
    Po: "0021-00230025-0027002A002C002E002F003A003B003F0040005C00A100B700BF037E0387055A-055F058905C005C305C605F305F40609060A060C060D061B061E061F066A-066D06D40700-070D07F7-07F90830-083E0964096509700DF40E4F0E5A0E5B0F04-0F120F850FD0-0FD4104A-104F10FB1361-1368166D166E16EB-16ED1735173617D4-17D617D8-17DA1800-18051807-180A1944194519DE19DF1A1E1A1F1AA0-1AA61AA8-1AAD1B5A-1B601C3B-1C3F1C7E1C7F1CD3201620172020-20272030-2038203B-203E2041-20432047-205120532055-205E2CF9-2CFC2CFE2CFF2E002E012E06-2E082E0B2E0E-2E162E182E192E1B2E1E2E1F2E2A-2E2E2E302E313001-3003303D30FBA4FEA4FFA60D-A60FA673A67EA6F2-A6F7A874-A877A8CEA8CFA8F8-A8FAA92EA92FA95FA9C1-A9CDA9DEA9DFAA5C-AA5FAADEAADFABEBFE10-FE16FE19FE30FE45FE46FE49-FE4CFE50-FE52FE54-FE57FE5F-FE61FE68FE6AFE6BFF01-FF03FF05-FF07FF0AFF0CFF0EFF0FFF1AFF1BFF1FFF20FF3CFF61FF64FF65",
    S:  "0024002B003C-003E005E0060007C007E00A2-00A900AC00AE-00B100B400B600B800D700F702C2-02C502D2-02DF02E5-02EB02ED02EF-02FF03750384038503F604820606-0608060B060E060F06E906FD06FE07F609F209F309FA09FB0AF10B700BF3-0BFA0C7F0CF10CF20D790E3F0F01-0F030F13-0F170F1A-0F1F0F340F360F380FBE-0FC50FC7-0FCC0FCE0FCF0FD5-0FD8109E109F13601390-139917DB194019E0-19FF1B61-1B6A1B74-1B7C1FBD1FBF-1FC11FCD-1FCF1FDD-1FDF1FED-1FEF1FFD1FFE20442052207A-207C208A-208C20A0-20B8210021012103-21062108210921142116-2118211E-2123212521272129212E213A213B2140-2144214A-214D214F2190-2328232B-23E82400-24262440-244A249C-24E92500-26CD26CF-26E126E326E8-26FF2701-27042706-2709270C-27272729-274B274D274F-27522756-275E2761-276727942798-27AF27B1-27BE27C0-27C427C7-27CA27CC27D0-27E527F0-29822999-29D729DC-29FB29FE-2B4C2B50-2B592CE5-2CEA2E80-2E992E9B-2EF32F00-2FD52FF0-2FFB300430123013302030363037303E303F309B309C319031913196-319F31C0-31E33200-321E322A-32503260-327F328A-32B032C0-32FE3300-33FF4DC0-4DFFA490-A4C6A700-A716A720A721A789A78AA828-A82BA836-A839AA77-AA79FB29FDFCFDFDFE62FE64-FE66FE69FF04FF0BFF1C-FF1EFF3EFF40FF5CFF5EFFE0-FFE6FFE8-FFEEFFFCFFFD",
    Sm: "002B003C-003E007C007E00AC00B100D700F703F60606-060820442052207A-207C208A-208C2140-2144214B2190-2194219A219B21A021A321A621AE21CE21CF21D221D421F4-22FF2308-230B23202321237C239B-23B323DC-23E125B725C125F8-25FF266F27C0-27C427C7-27CA27CC27D0-27E527F0-27FF2900-29822999-29D729DC-29FB29FE-2AFF2B30-2B442B47-2B4CFB29FE62FE64-FE66FF0BFF1C-FF1EFF5CFF5EFFE2FFE9-FFEC",
    Sc: "002400A2-00A5060B09F209F309FB0AF10BF90E3F17DB20A0-20B8A838FDFCFE69FF04FFE0FFE1FFE5FFE6",
    Sk: "005E006000A800AF00B400B802C2-02C502D2-02DF02E5-02EB02ED02EF-02FF0375038403851FBD1FBF-1FC11FCD-1FCF1FDD-1FDF1FED-1FEF1FFD1FFE309B309CA700-A716A720A721A789A78AFF3EFF40FFE3",
    So: "00A600A700A900AE00B000B60482060E060F06E906FD06FE07F609FA0B700BF3-0BF80BFA0C7F0CF10CF20D790F01-0F030F13-0F170F1A-0F1F0F340F360F380FBE-0FC50FC7-0FCC0FCE0FCF0FD5-0FD8109E109F13601390-1399194019E0-19FF1B61-1B6A1B74-1B7C210021012103-21062108210921142116-2118211E-2123212521272129212E213A213B214A214C214D214F2195-2199219C-219F21A121A221A421A521A7-21AD21AF-21CD21D021D121D321D5-21F32300-2307230C-231F2322-2328232B-237B237D-239A23B4-23DB23E2-23E82400-24262440-244A249C-24E92500-25B625B8-25C025C2-25F72600-266E2670-26CD26CF-26E126E326E8-26FF2701-27042706-2709270C-27272729-274B274D274F-27522756-275E2761-276727942798-27AF27B1-27BE2800-28FF2B00-2B2F2B452B462B50-2B592CE5-2CEA2E80-2E992E9B-2EF32F00-2FD52FF0-2FFB300430123013302030363037303E303F319031913196-319F31C0-31E33200-321E322A-32503260-327F328A-32B032C0-32FE3300-33FF4DC0-4DFFA490-A4C6A828-A82BA836A837A839AA77-AA79FDFDFFE4FFE8FFEDFFEEFFFCFFFD",
    Z:  "002000A01680180E2000-200A20282029202F205F3000",
    Zs: "002000A01680180E2000-200A202F205F3000",
    Zl: "2028",
    Zp: "2029",
    C:  "0000-001F007F-009F00AD03780379037F-0383038B038D03A20526-05300557055805600588058B-059005C8-05CF05EB-05EF05F5-0605061C061D0620065F06DD070E070F074B074C07B2-07BF07FB-07FF082E082F083F-08FF093A093B094F095609570973-097809800984098D098E0991099209A909B109B3-09B509BA09BB09C509C609C909CA09CF-09D609D8-09DB09DE09E409E509FC-0A000A040A0B-0A0E0A110A120A290A310A340A370A3A0A3B0A3D0A43-0A460A490A4A0A4E-0A500A52-0A580A5D0A5F-0A650A76-0A800A840A8E0A920AA90AB10AB40ABA0ABB0AC60ACA0ACE0ACF0AD1-0ADF0AE40AE50AF00AF2-0B000B040B0D0B0E0B110B120B290B310B340B3A0B3B0B450B460B490B4A0B4E-0B550B58-0B5B0B5E0B640B650B72-0B810B840B8B-0B8D0B910B96-0B980B9B0B9D0BA0-0BA20BA5-0BA70BAB-0BAD0BBA-0BBD0BC3-0BC50BC90BCE0BCF0BD1-0BD60BD8-0BE50BFB-0C000C040C0D0C110C290C340C3A-0C3C0C450C490C4E-0C540C570C5A-0C5F0C640C650C70-0C770C800C810C840C8D0C910CA90CB40CBA0CBB0CC50CC90CCE-0CD40CD7-0CDD0CDF0CE40CE50CF00CF3-0D010D040D0D0D110D290D3A-0D3C0D450D490D4E-0D560D58-0D5F0D640D650D76-0D780D800D810D840D97-0D990DB20DBC0DBE0DBF0DC7-0DC90DCB-0DCE0DD50DD70DE0-0DF10DF5-0E000E3B-0E3E0E5C-0E800E830E850E860E890E8B0E8C0E8E-0E930E980EA00EA40EA60EA80EA90EAC0EBA0EBE0EBF0EC50EC70ECE0ECF0EDA0EDB0EDE-0EFF0F480F6D-0F700F8C-0F8F0F980FBD0FCD0FD9-0FFF10C6-10CF10FD-10FF1249124E124F12571259125E125F1289128E128F12B112B612B712BF12C112C612C712D7131113161317135B-135E137D-137F139A-139F13F5-13FF169D-169F16F1-16FF170D1715-171F1737-173F1754-175F176D17711774-177F17B417B517DE17DF17EA-17EF17FA-17FF180F181A-181F1878-187F18AB-18AF18F6-18FF191D-191F192C-192F193C-193F1941-1943196E196F1975-197F19AC-19AF19CA-19CF19DB-19DD1A1C1A1D1A5F1A7D1A7E1A8A-1A8F1A9A-1A9F1AAE-1AFF1B4C-1B4F1B7D-1B7F1BAB-1BAD1BBA-1BFF1C38-1C3A1C4A-1C4C1C80-1CCF1CF3-1CFF1DE7-1DFC1F161F171F1E1F1F1F461F471F4E1F4F1F581F5A1F5C1F5E1F7E1F7F1FB51FC51FD41FD51FDC1FF01FF11FF51FFF200B-200F202A-202E2060-206F20722073208F2095-209F20B9-20CF20F1-20FF218A-218F23E9-23FF2427-243F244B-245F26CE26E226E4-26E727002705270A270B2728274C274E2753-2755275F27602795-279727B027BF27CB27CD-27CF2B4D-2B4F2B5A-2BFF2C2F2C5F2CF2-2CF82D26-2D2F2D66-2D6E2D70-2D7F2D97-2D9F2DA72DAF2DB72DBF2DC72DCF2DD72DDF2E32-2E7F2E9A2EF4-2EFF2FD6-2FEF2FFC-2FFF3040309730983100-3104312E-3130318F31B8-31BF31E4-31EF321F32FF4DB6-4DBF9FCC-9FFFA48D-A48FA4C7-A4CFA62C-A63FA660A661A674-A67BA698-A69FA6F8-A6FFA78D-A7FAA82C-A82FA83A-A83FA878-A87FA8C5-A8CDA8DA-A8DFA8FC-A8FFA954-A95EA97D-A97FA9CEA9DA-A9DDA9E0-A9FFAA37-AA3FAA4EAA4FAA5AAA5BAA7C-AA7FAAC3-AADAAAE0-ABBFABEEABEFABFA-ABFFD7A4-D7AFD7C7-D7CAD7FC-F8FFFA2EFA2FFA6EFA6FFADA-FAFFFB07-FB12FB18-FB1CFB37FB3DFB3FFB42FB45FBB2-FBD2FD40-FD4FFD90FD91FDC8-FDEFFDFEFDFFFE1A-FE1FFE27-FE2FFE53FE67FE6C-FE6FFE75FEFD-FF00FFBF-FFC1FFC8FFC9FFD0FFD1FFD8FFD9FFDD-FFDFFFE7FFEF-FFFBFFFEFFFF",
    Cc: "0000-001F007F-009F",
    Cf: "00AD0600-060306DD070F17B417B5200B-200F202A-202E2060-2064206A-206FFEFFFFF9-FFFB",
    Co: "E000-F8FF",
    Cs: "D800-DFFF",
    Cn: "03780379037F-0383038B038D03A20526-05300557055805600588058B-059005C8-05CF05EB-05EF05F5-05FF06040605061C061D0620065F070E074B074C07B2-07BF07FB-07FF082E082F083F-08FF093A093B094F095609570973-097809800984098D098E0991099209A909B109B3-09B509BA09BB09C509C609C909CA09CF-09D609D8-09DB09DE09E409E509FC-0A000A040A0B-0A0E0A110A120A290A310A340A370A3A0A3B0A3D0A43-0A460A490A4A0A4E-0A500A52-0A580A5D0A5F-0A650A76-0A800A840A8E0A920AA90AB10AB40ABA0ABB0AC60ACA0ACE0ACF0AD1-0ADF0AE40AE50AF00AF2-0B000B040B0D0B0E0B110B120B290B310B340B3A0B3B0B450B460B490B4A0B4E-0B550B58-0B5B0B5E0B640B650B72-0B810B840B8B-0B8D0B910B96-0B980B9B0B9D0BA0-0BA20BA5-0BA70BAB-0BAD0BBA-0BBD0BC3-0BC50BC90BCE0BCF0BD1-0BD60BD8-0BE50BFB-0C000C040C0D0C110C290C340C3A-0C3C0C450C490C4E-0C540C570C5A-0C5F0C640C650C70-0C770C800C810C840C8D0C910CA90CB40CBA0CBB0CC50CC90CCE-0CD40CD7-0CDD0CDF0CE40CE50CF00CF3-0D010D040D0D0D110D290D3A-0D3C0D450D490D4E-0D560D58-0D5F0D640D650D76-0D780D800D810D840D97-0D990DB20DBC0DBE0DBF0DC7-0DC90DCB-0DCE0DD50DD70DE0-0DF10DF5-0E000E3B-0E3E0E5C-0E800E830E850E860E890E8B0E8C0E8E-0E930E980EA00EA40EA60EA80EA90EAC0EBA0EBE0EBF0EC50EC70ECE0ECF0EDA0EDB0EDE-0EFF0F480F6D-0F700F8C-0F8F0F980FBD0FCD0FD9-0FFF10C6-10CF10FD-10FF1249124E124F12571259125E125F1289128E128F12B112B612B712BF12C112C612C712D7131113161317135B-135E137D-137F139A-139F13F5-13FF169D-169F16F1-16FF170D1715-171F1737-173F1754-175F176D17711774-177F17DE17DF17EA-17EF17FA-17FF180F181A-181F1878-187F18AB-18AF18F6-18FF191D-191F192C-192F193C-193F1941-1943196E196F1975-197F19AC-19AF19CA-19CF19DB-19DD1A1C1A1D1A5F1A7D1A7E1A8A-1A8F1A9A-1A9F1AAE-1AFF1B4C-1B4F1B7D-1B7F1BAB-1BAD1BBA-1BFF1C38-1C3A1C4A-1C4C1C80-1CCF1CF3-1CFF1DE7-1DFC1F161F171F1E1F1F1F461F471F4E1F4F1F581F5A1F5C1F5E1F7E1F7F1FB51FC51FD41FD51FDC1FF01FF11FF51FFF2065-206920722073208F2095-209F20B9-20CF20F1-20FF218A-218F23E9-23FF2427-243F244B-245F26CE26E226E4-26E727002705270A270B2728274C274E2753-2755275F27602795-279727B027BF27CB27CD-27CF2B4D-2B4F2B5A-2BFF2C2F2C5F2CF2-2CF82D26-2D2F2D66-2D6E2D70-2D7F2D97-2D9F2DA72DAF2DB72DBF2DC72DCF2DD72DDF2E32-2E7F2E9A2EF4-2EFF2FD6-2FEF2FFC-2FFF3040309730983100-3104312E-3130318F31B8-31BF31E4-31EF321F32FF4DB6-4DBF9FCC-9FFFA48D-A48FA4C7-A4CFA62C-A63FA660A661A674-A67BA698-A69FA6F8-A6FFA78D-A7FAA82C-A82FA83A-A83FA878-A87FA8C5-A8CDA8DA-A8DFA8FC-A8FFA954-A95EA97D-A97FA9CEA9DA-A9DDA9E0-A9FFAA37-AA3FAA4EAA4FAA5AAA5BAA7C-AA7FAAC3-AADAAAE0-ABBFABEEABEFABFA-ABFFD7A4-D7AFD7C7-D7CAD7FC-D7FFFA2EFA2FFA6EFA6FFADA-FAFFFB07-FB12FB18-FB1CFB37FB3DFB3FFB42FB45FBB2-FBD2FD40-FD4FFD90FD91FDC8-FDEFFDFEFDFFFE1A-FE1FFE27-FE2FFE53FE67FE6C-FE6FFE75FEFDFEFEFF00FFBF-FFC1FFC8FFC9FFD0FFD1FFD8FFD9FFDD-FFDFFFE7FFEF-FFF8FFFEFFFF"
});

function addUnicodePackage (pack) {
    var codePoint = /\w{4}/g;
    for (var name in pack)
        exports.packages[name] = pack[name].replace(codePoint, "\\u$&");
};

});

define("ace/token_iterator",["require","exports","module"], function(require, exports, module) {
"use strict";
var TokenIterator = function(session, initialRow, initialColumn) {
    this.$session = session;
    this.$row = initialRow;
    this.$rowTokens = session.getTokens(initialRow);

    var token = session.getTokenAt(initialRow, initialColumn);
    this.$tokenIndex = token ? token.index : -1;
};

(function() { 
    this.stepBackward = function() {
        this.$tokenIndex -= 1;
        
        while (this.$tokenIndex < 0) {
            this.$row -= 1;
            if (this.$row < 0) {
                this.$row = 0;
                return null;
            }
                
            this.$rowTokens = this.$session.getTokens(this.$row);
            this.$tokenIndex = this.$rowTokens.length - 1;
        }
            
        return this.$rowTokens[this.$tokenIndex];
    };   
    this.stepForward = function() {
        this.$tokenIndex += 1;
        var rowCount;
        while (this.$tokenIndex >= this.$rowTokens.length) {
            this.$row += 1;
            if (!rowCount)
                rowCount = this.$session.getLength();
            if (this.$row >= rowCount) {
                this.$row = rowCount - 1;
                return null;
            }

            this.$rowTokens = this.$session.getTokens(this.$row);
            this.$tokenIndex = 0;
        }
            
        return this.$rowTokens[this.$tokenIndex];
    };      
    this.getCurrentToken = function () {
        return this.$rowTokens[this.$tokenIndex];
    };      
    this.getCurrentTokenRow = function () {
        return this.$row;
    };     
    this.getCurrentTokenColumn = function() {
        var rowTokens = this.$rowTokens;
        var tokenIndex = this.$tokenIndex;
        var column = rowTokens[tokenIndex].start;
        if (column !== undefined)
            return column;
            
        column = 0;
        while (tokenIndex > 0) {
            tokenIndex -= 1;
            column += rowTokens[tokenIndex].value.length;
        }
        
        return column;  
    };
            
}).call(TokenIterator.prototype);

exports.TokenIterator = TokenIterator;
});

define("ace/mode/text",["require","exports","module","ace/tokenizer","ace/mode/text_highlight_rules","ace/mode/behaviour","ace/unicode","ace/lib/lang","ace/token_iterator","ace/range"], function(require, exports, module) {
"use strict";

var Tokenizer = require("../tokenizer").Tokenizer;
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
var Behaviour = require("./behaviour").Behaviour;
var unicode = require("../unicode");
var lang = require("../lib/lang");
var TokenIterator = require("../token_iterator").TokenIterator;
var Range = require("../range").Range;

var Mode = function() {
    this.HighlightRules = TextHighlightRules;
    this.$behaviour = new Behaviour();
};

(function() {

    this.tokenRe = new RegExp("^["
        + unicode.packages.L
        + unicode.packages.Mn + unicode.packages.Mc
        + unicode.packages.Nd
        + unicode.packages.Pc + "\\$_]+", "g"
    );

    this.nonTokenRe = new RegExp("^(?:[^"
        + unicode.packages.L
        + unicode.packages.Mn + unicode.packages.Mc
        + unicode.packages.Nd
        + unicode.packages.Pc + "\\$_]|\\s])+", "g"
    );

    this.getTokenizer = function() {
        if (!this.$tokenizer) {
            this.$highlightRules = this.$highlightRules || new this.HighlightRules();
            this.$tokenizer = new Tokenizer(this.$highlightRules.getRules());
        }
        return this.$tokenizer;
    };

    this.lineCommentStart = "";
    this.blockComment = "";

    this.toggleCommentLines = function(state, session, startRow, endRow) {
        var doc = session.doc;

        var ignoreBlankLines = true;
        var shouldRemove = true;
        var minIndent = Infinity;
        var tabSize = session.getTabSize();
        var insertAtTabStop = false;

        if (!this.lineCommentStart) {
            if (!this.blockComment)
                return false;
            var lineCommentStart = this.blockComment.start;
            var lineCommentEnd = this.blockComment.end;
            var regexpStart = new RegExp("^(\\s*)(?:" + lang.escapeRegExp(lineCommentStart) + ")");
            var regexpEnd = new RegExp("(?:" + lang.escapeRegExp(lineCommentEnd) + ")\\s*$");

            var comment = function(line, i) {
                if (testRemove(line, i))
                    return;
                if (!ignoreBlankLines || /\S/.test(line)) {
                    doc.insertInLine({row: i, column: line.length}, lineCommentEnd);
                    doc.insertInLine({row: i, column: minIndent}, lineCommentStart);
                }
            };

            var uncomment = function(line, i) {
                var m;
                if (m = line.match(regexpEnd))
                    doc.removeInLine(i, line.length - m[0].length, line.length);
                if (m = line.match(regexpStart))
                    doc.removeInLine(i, m[1].length, m[0].length);
            };

            var testRemove = function(line, row) {
                if (regexpStart.test(line))
                    return true;
                var tokens = session.getTokens(row);
                for (var i = 0; i < tokens.length; i++) {
                    if (tokens[i].type === 'comment')
                        return true;
                }
            };
        } else {
            if (Array.isArray(this.lineCommentStart)) {
                var regexpStart = this.lineCommentStart.map(lang.escapeRegExp).join("|");
                var lineCommentStart = this.lineCommentStart[0];
            } else {
                var regexpStart = lang.escapeRegExp(this.lineCommentStart);
                var lineCommentStart = this.lineCommentStart;
            }
            regexpStart = new RegExp("^(\\s*)(?:" + regexpStart + ") ?");
            
            insertAtTabStop = session.getUseSoftTabs();

            var uncomment = function(line, i) {
                var m = line.match(regexpStart);
                if (!m) return;
                var start = m[1].length, end = m[0].length;
                if (!shouldInsertSpace(line, start, end) && m[0][end - 1] == " ")
                    end--;
                doc.removeInLine(i, start, end);
            };
            var commentWithSpace = lineCommentStart + " ";
            var comment = function(line, i) {
                if (!ignoreBlankLines || /\S/.test(line)) {
                    if (shouldInsertSpace(line, minIndent, minIndent))
                        doc.insertInLine({row: i, column: minIndent}, commentWithSpace);
                    else
                        doc.insertInLine({row: i, column: minIndent}, lineCommentStart);
                }
            };
            var testRemove = function(line, i) {
                return regexpStart.test(line);
            };
            
            var shouldInsertSpace = function(line, before, after) {
                var spaces = 0;
                while (before-- && line.charAt(before) == " ")
                    spaces++;
                if (spaces % tabSize != 0)
                    return false;
                var spaces = 0;
                while (line.charAt(after++) == " ")
                    spaces++;
                if (tabSize > 2)
                    return spaces % tabSize != tabSize - 1;
                else
                    return spaces % tabSize == 0;
                return true;
            };
        }

        function iter(fun) {
            for (var i = startRow; i <= endRow; i++)
                fun(doc.getLine(i), i);
        }


        var minEmptyLength = Infinity;
        iter(function(line, i) {
            var indent = line.search(/\S/);
            if (indent !== -1) {
                if (indent < minIndent)
                    minIndent = indent;
                if (shouldRemove && !testRemove(line, i))
                    shouldRemove = false;
            } else if (minEmptyLength > line.length) {
                minEmptyLength = line.length;
            }
        });

        if (minIndent == Infinity) {
            minIndent = minEmptyLength;
            ignoreBlankLines = false;
            shouldRemove = false;
        }

        if (insertAtTabStop && minIndent % tabSize != 0)
            minIndent = Math.floor(minIndent / tabSize) * tabSize;

        iter(shouldRemove ? uncomment : comment);
    };

    this.toggleBlockComment = function(state, session, range, cursor) {
        var comment = this.blockComment;
        if (!comment)
            return;
        if (!comment.start && comment[0])
            comment = comment[0];

        var iterator = new TokenIterator(session, cursor.row, cursor.column);
        var token = iterator.getCurrentToken();

        var sel = session.selection;
        var initialRange = session.selection.toOrientedRange();
        var startRow, colDiff;

        if (token && /comment/.test(token.type)) {
            var startRange, endRange;
            while (token && /comment/.test(token.type)) {
                var i = token.value.indexOf(comment.start);
                if (i != -1) {
                    var row = iterator.getCurrentTokenRow();
                    var column = iterator.getCurrentTokenColumn() + i;
                    startRange = new Range(row, column, row, column + comment.start.length);
                    break;
                }
                token = iterator.stepBackward();
            }

            var iterator = new TokenIterator(session, cursor.row, cursor.column);
            var token = iterator.getCurrentToken();
            while (token && /comment/.test(token.type)) {
                var i = token.value.indexOf(comment.end);
                if (i != -1) {
                    var row = iterator.getCurrentTokenRow();
                    var column = iterator.getCurrentTokenColumn() + i;
                    endRange = new Range(row, column, row, column + comment.end.length);
                    break;
                }
                token = iterator.stepForward();
            }
            if (endRange)
                session.remove(endRange);
            if (startRange) {
                session.remove(startRange);
                startRow = startRange.start.row;
                colDiff = -comment.start.length;
            }
        } else {
            colDiff = comment.start.length;
            startRow = range.start.row;
            session.insert(range.end, comment.end);
            session.insert(range.start, comment.start);
        }
        if (initialRange.start.row == startRow)
            initialRange.start.column += colDiff;
        if (initialRange.end.row == startRow)
            initialRange.end.column += colDiff;
        session.selection.fromOrientedRange(initialRange);
    };

    this.getNextLineIndent = function(state, line, tab) {
        return this.$getIndent(line);
    };

    this.checkOutdent = function(state, line, input) {
        return false;
    };

    this.autoOutdent = function(state, doc, row) {
    };

    this.$getIndent = function(line) {
        return line.match(/^\s*/)[0];
    };

    this.createWorker = function(session) {
        return null;
    };

    this.createModeDelegates = function (mapping) {
        this.$embeds = [];
        this.$modes = {};
        for (var i in mapping) {
            if (mapping[i]) {
                this.$embeds.push(i);
                this.$modes[i] = new mapping[i]();
            }
        }

        var delegations = ['toggleBlockComment', 'toggleCommentLines', 'getNextLineIndent', 
            'checkOutdent', 'autoOutdent', 'transformAction', 'getCompletions'];

        for (var i = 0; i < delegations.length; i++) {
            (function(scope) {
              var functionName = delegations[i];
              var defaultHandler = scope[functionName];
              scope[delegations[i]] = function() {
                  return this.$delegator(functionName, arguments, defaultHandler);
              };
            } (this));
        }
    };

    this.$delegator = function(method, args, defaultHandler) {
        var state = args[0];
        if (typeof state != "string")
            state = state[0];
        for (var i = 0; i < this.$embeds.length; i++) {
            if (!this.$modes[this.$embeds[i]]) continue;

            var split = state.split(this.$embeds[i]);
            if (!split[0] && split[1]) {
                args[0] = split[1];
                var mode = this.$modes[this.$embeds[i]];
                return mode[method].apply(mode, args);
            }
        }
        var ret = defaultHandler.apply(this, args);
        return defaultHandler ? ret : undefined;
    };

    this.transformAction = function(state, action, editor, session, param) {
        if (this.$behaviour) {
            var behaviours = this.$behaviour.getBehaviours();
            for (var key in behaviours) {
                if (behaviours[key][action]) {
                    var ret = behaviours[key][action].apply(this, arguments);
                    if (ret) {
                        return ret;
                    }
                }
            }
        }
    };
    
    this.getKeywords = function(append) {
        if (!this.completionKeywords) {
            var rules = this.$tokenizer.rules;
            var completionKeywords = [];
            for (var rule in rules) {
                var ruleItr = rules[rule];
                for (var r = 0, l = ruleItr.length; r < l; r++) {
                    if (typeof ruleItr[r].token === "string") {
                        if (/keyword|support|storage/.test(ruleItr[r].token))
                            completionKeywords.push(ruleItr[r].regex);
                    }
                    else if (typeof ruleItr[r].token === "object") {
                        for (var a = 0, aLength = ruleItr[r].token.length; a < aLength; a++) {    
                            if (/keyword|support|storage/.test(ruleItr[r].token[a])) {
                                var rule = ruleItr[r].regex.match(/\(.+?\)/g)[a];
                                completionKeywords.push(rule.substr(1, rule.length - 2));
                            }
                        }
                    }
                }
            }
            this.completionKeywords = completionKeywords;
        }
        if (!append)
            return this.$keywordList;
        return completionKeywords.concat(this.$keywordList || []);
    };
    
    this.$createKeywordList = function() {
        if (!this.$highlightRules)
            this.getTokenizer();
        return this.$keywordList = this.$highlightRules.$keywordList || [];
    };

    this.getCompletions = function(state, session, pos, prefix) {
        var keywords = this.$keywordList || this.$createKeywordList();
        return keywords.map(function(word) {
            return {
                name: word,
                value: word,
                score: 0,
                meta: "keyword"
            };
        });
    };

    this.$id = "ace/mode/text";
}).call(Mode.prototype);

exports.Mode = Mode;
});

define("ace/anchor",["require","exports","module","ace/lib/oop","ace/lib/event_emitter"], function(require, exports, module) {
"use strict";

var oop = require("./lib/oop");
var EventEmitter = require("./lib/event_emitter").EventEmitter;

var Anchor = exports.Anchor = function(doc, row, column) {
    this.$onChange = this.onChange.bind(this);
    this.attach(doc);
    
    if (typeof column == "undefined")
        this.setPosition(row.row, row.column);
    else
        this.setPosition(row, column);
};

(function() {

    oop.implement(this, EventEmitter);
    this.getPosition = function() {
        return this.$clipPositionToDocument(this.row, this.column);
    };
    this.getDocument = function() {
        return this.document;
    };
    this.$insertRight = false;
    this.onChange = function(e) {
        var delta = e.data;
        var range = delta.range;

        if (range.start.row == range.end.row && range.start.row != this.row)
            return;

        if (range.start.row > this.row)
            return;

        if (range.start.row == this.row && range.start.column > this.column)
            return;

        var row = this.row;
        var column = this.column;
        var start = range.start;
        var end = range.end;

        if (delta.action === "insertText") {
            if (start.row === row && start.column <= column) {
                if (start.column === column && this.$insertRight) {
                } else if (start.row === end.row) {
                    column += end.column - start.column;
                } else {
                    column -= start.column;
                    row += end.row - start.row;
                }
            } else if (start.row !== end.row && start.row < row) {
                row += end.row - start.row;
            }
        } else if (delta.action === "insertLines") {
            if (start.row === row && column === 0 && this.$insertRight) {
            }
            else if (start.row <= row) {
                row += end.row - start.row;
            }
        } else if (delta.action === "removeText") {
            if (start.row === row && start.column < column) {
                if (end.column >= column)
                    column = start.column;
                else
                    column = Math.max(0, column - (end.column - start.column));

            } else if (start.row !== end.row && start.row < row) {
                if (end.row === row)
                    column = Math.max(0, column - end.column) + start.column;
                row -= (end.row - start.row);
            } else if (end.row === row) {
                row -= end.row - start.row;
                column = Math.max(0, column - end.column) + start.column;
            }
        } else if (delta.action == "removeLines") {
            if (start.row <= row) {
                if (end.row <= row)
                    row -= end.row - start.row;
                else {
                    row = start.row;
                    column = 0;
                }
            }
        }

        this.setPosition(row, column, true);
    };
    this.setPosition = function(row, column, noClip) {
        var pos;
        if (noClip) {
            pos = {
                row: row,
                column: column
            };
        } else {
            pos = this.$clipPositionToDocument(row, column);
        }

        if (this.row == pos.row && this.column == pos.column)
            return;

        var old = {
            row: this.row,
            column: this.column
        };

        this.row = pos.row;
        this.column = pos.column;
        this._signal("change", {
            old: old,
            value: pos
        });
    };
    this.detach = function() {
        this.document.removeEventListener("change", this.$onChange);
    };
    this.attach = function(doc) {
        this.document = doc || this.document;
        this.document.on("change", this.$onChange);
    };
    this.$clipPositionToDocument = function(row, column) {
        var pos = {};

        if (row >= this.document.getLength()) {
            pos.row = Math.max(0, this.document.getLength() - 1);
            pos.column = this.document.getLine(pos.row).length;
        }
        else if (row < 0) {
            pos.row = 0;
            pos.column = 0;
        }
        else {
            pos.row = row;
            pos.column = Math.min(this.document.getLine(pos.row).length, Math.max(0, column));
        }

        if (column < 0)
            pos.column = 0;

        return pos;
    };

}).call(Anchor.prototype);

});

define("ace/document",["require","exports","module","ace/lib/oop","ace/lib/event_emitter","ace/range","ace/anchor"], function(require, exports, module) {
"use strict";

var oop = require("./lib/oop");
var EventEmitter = require("./lib/event_emitter").EventEmitter;
var Range = require("./range").Range;
var Anchor = require("./anchor").Anchor;

var Document = function(text) {
    this.$lines = [];
    if (text.length === 0) {
        this.$lines = [""];
    } else if (Array.isArray(text)) {
        this._insertLines(0, text);
    } else {
        this.insert({row: 0, column:0}, text);
    }
};

(function() {

    oop.implement(this, EventEmitter);
    this.setValue = function(text) {
        var len = this.getLength();
        this.remove(new Range(0, 0, len, this.getLine(len-1).length));
        this.insert({row: 0, column:0}, text);
    };
    this.getValue = function() {
        return this.getAllLines().join(this.getNewLineCharacter());
    };
    this.createAnchor = function(row, column) {
        return new Anchor(this, row, column);
    };
    if ("aaa".split(/a/).length === 0)
        this.$split = function(text) {
            return text.replace(/\r\n|\r/g, "\n").split("\n");
        };
    else
        this.$split = function(text) {
            return text.split(/\r\n|\r|\n/);
        };


    this.$detectNewLine = function(text) {
        var match = text.match(/^.*?(\r\n|\r|\n)/m);
        this.$autoNewLine = match ? match[1] : "\n";
        this._signal("changeNewLineMode");
    };
    this.getNewLineCharacter = function() {
        switch (this.$newLineMode) {
          case "windows":
            return "\r\n";
          case "unix":
            return "\n";
          default:
            return this.$autoNewLine || "\n";
        }
    };

    this.$autoNewLine = "";
    this.$newLineMode = "auto";
    this.setNewLineMode = function(newLineMode) {
        if (this.$newLineMode === newLineMode)
            return;

        this.$newLineMode = newLineMode;
        this._signal("changeNewLineMode");
    };
    this.getNewLineMode = function() {
        return this.$newLineMode;
    };
    this.isNewLine = function(text) {
        return (text == "\r\n" || text == "\r" || text == "\n");
    };
    this.getLine = function(row) {
        return this.$lines[row] || "";
    };
    this.getLines = function(firstRow, lastRow) {
        return this.$lines.slice(firstRow, lastRow + 1);
    };
    this.getAllLines = function() {
        return this.getLines(0, this.getLength());
    };
    this.getLength = function() {
        return this.$lines.length;
    };
    this.getTextRange = function(range) {
        if (range.start.row == range.end.row) {
            return this.getLine(range.start.row)
                .substring(range.start.column, range.end.column);
        }
        var lines = this.getLines(range.start.row, range.end.row);
        lines[0] = (lines[0] || "").substring(range.start.column);
        var l = lines.length - 1;
        if (range.end.row - range.start.row == l)
            lines[l] = lines[l].substring(0, range.end.column);
        return lines.join(this.getNewLineCharacter());
    };

    this.$clipPosition = function(position) {
        var length = this.getLength();
        if (position.row >= length) {
            position.row = Math.max(0, length - 1);
            position.column = this.getLine(length-1).length;
        } else if (position.row < 0)
            position.row = 0;
        return position;
    };
    this.insert = function(position, text) {
        if (!text || text.length === 0)
            return position;

        position = this.$clipPosition(position);
        if (this.getLength() <= 1)
            this.$detectNewLine(text);

        var lines = this.$split(text);
        var firstLine = lines.splice(0, 1)[0];
        var lastLine = lines.length == 0 ? null : lines.splice(lines.length - 1, 1)[0];

        position = this.insertInLine(position, firstLine);
        if (lastLine !== null) {
            position = this.insertNewLine(position); // terminate first line
            position = this._insertLines(position.row, lines);
            position = this.insertInLine(position, lastLine || "");
        }
        return position;
    };
    this.insertLines = function(row, lines) {
        if (row >= this.getLength())
            return this.insert({row: row, column: 0}, "\n" + lines.join("\n"));
        return this._insertLines(Math.max(row, 0), lines);
    };
    this._insertLines = function(row, lines) {
        if (lines.length == 0)
            return {row: row, column: 0};
        while (lines.length > 20000) {
            var end = this._insertLines(row, lines.slice(0, 20000));
            lines = lines.slice(20000);
            row = end.row;
        }

        var args = [row, 0];
        args.push.apply(args, lines);
        this.$lines.splice.apply(this.$lines, args);

        var range = new Range(row, 0, row + lines.length, 0);
        var delta = {
            action: "insertLines",
            range: range,
            lines: lines
        };
        this._signal("change", { data: delta });
        return range.end;
    };
    this.insertNewLine = function(position) {
        position = this.$clipPosition(position);
        var line = this.$lines[position.row] || "";

        this.$lines[position.row] = line.substring(0, position.column);
        this.$lines.splice(position.row + 1, 0, line.substring(position.column, line.length));

        var end = {
            row : position.row + 1,
            column : 0
        };

        var delta = {
            action: "insertText",
            range: Range.fromPoints(position, end),
            text: this.getNewLineCharacter()
        };
        this._signal("change", { data: delta });

        return end;
    };
    this.insertInLine = function(position, text) {
        if (text.length == 0)
            return position;

        var line = this.$lines[position.row] || "";

        this.$lines[position.row] = line.substring(0, position.column) + text
                + line.substring(position.column);

        var end = {
            row : position.row,
            column : position.column + text.length
        };

        var delta = {
            action: "insertText",
            range: Range.fromPoints(position, end),
            text: text
        };
        this._signal("change", { data: delta });

        return end;
    };
    this.remove = function(range) {
        if (!(range instanceof Range))
            range = Range.fromPoints(range.start, range.end);
        range.start = this.$clipPosition(range.start);
        range.end = this.$clipPosition(range.end);

        if (range.isEmpty())
            return range.start;

        var firstRow = range.start.row;
        var lastRow = range.end.row;

        if (range.isMultiLine()) {
            var firstFullRow = range.start.column == 0 ? firstRow : firstRow + 1;
            var lastFullRow = lastRow - 1;

            if (range.end.column > 0)
                this.removeInLine(lastRow, 0, range.end.column);

            if (lastFullRow >= firstFullRow)
                this._removeLines(firstFullRow, lastFullRow);

            if (firstFullRow != firstRow) {
                this.removeInLine(firstRow, range.start.column, this.getLine(firstRow).length);
                this.removeNewLine(range.start.row);
            }
        }
        else {
            this.removeInLine(firstRow, range.start.column, range.end.column);
        }
        return range.start;
    };
    this.removeInLine = function(row, startColumn, endColumn) {
        if (startColumn == endColumn)
            return;

        var range = new Range(row, startColumn, row, endColumn);
        var line = this.getLine(row);
        var removed = line.substring(startColumn, endColumn);
        var newLine = line.substring(0, startColumn) + line.substring(endColumn, line.length);
        this.$lines.splice(row, 1, newLine);

        var delta = {
            action: "removeText",
            range: range,
            text: removed
        };
        this._signal("change", { data: delta });
        return range.start;
    };
    this.removeLines = function(firstRow, lastRow) {
        if (firstRow < 0 || lastRow >= this.getLength())
            return this.remove(new Range(firstRow, 0, lastRow + 1, 0));
        return this._removeLines(firstRow, lastRow);
    };

    this._removeLines = function(firstRow, lastRow) {
        var range = new Range(firstRow, 0, lastRow + 1, 0);
        var removed = this.$lines.splice(firstRow, lastRow - firstRow + 1);

        var delta = {
            action: "removeLines",
            range: range,
            nl: this.getNewLineCharacter(),
            lines: removed
        };
        this._signal("change", { data: delta });
        return removed;
    };
    this.removeNewLine = function(row) {
        var firstLine = this.getLine(row);
        var secondLine = this.getLine(row+1);

        var range = new Range(row, firstLine.length, row+1, 0);
        var line = firstLine + secondLine;

        this.$lines.splice(row, 2, line);

        var delta = {
            action: "removeText",
            range: range,
            text: this.getNewLineCharacter()
        };
        this._signal("change", { data: delta });
    };
    this.replace = function(range, text) {
        if (!(range instanceof Range))
            range = Range.fromPoints(range.start, range.end);
        if (text.length == 0 && range.isEmpty())
            return range.start;
        if (text == this.getTextRange(range))
            return range.end;

        this.remove(range);
        if (text) {
            var end = this.insert(range.start, text);
        }
        else {
            end = range.start;
        }

        return end;
    };
    this.applyDeltas = function(deltas) {
        for (var i=0; i<deltas.length; i++) {
            var delta = deltas[i];
            var range = Range.fromPoints(delta.range.start, delta.range.end);

            if (delta.action == "insertLines")
                this.insertLines(range.start.row, delta.lines);
            else if (delta.action == "insertText")
                this.insert(range.start, delta.text);
            else if (delta.action == "removeLines")
                this._removeLines(range.start.row, range.end.row - 1);
            else if (delta.action == "removeText")
                this.remove(range);
        }
    };
    this.revertDeltas = function(deltas) {
        for (var i=deltas.length-1; i>=0; i--) {
            var delta = deltas[i];

            var range = Range.fromPoints(delta.range.start, delta.range.end);

            if (delta.action == "insertLines")
                this._removeLines(range.start.row, range.end.row - 1);
            else if (delta.action == "insertText")
                this.remove(range);
            else if (delta.action == "removeLines")
                this._insertLines(range.start.row, delta.lines);
            else if (delta.action == "removeText")
                this.insert(range.start, delta.text);
        }
    };
    this.indexToPosition = function(index, startRow) {
        var lines = this.$lines || this.getAllLines();
        var newlineLength = this.getNewLineCharacter().length;
        for (var i = startRow || 0, l = lines.length; i < l; i++) {
            index -= lines[i].length + newlineLength;
            if (index < 0)
                return {row: i, column: index + lines[i].length + newlineLength};
        }
        return {row: l-1, column: lines[l-1].length};
    };
    this.positionToIndex = function(pos, startRow) {
        var lines = this.$lines || this.getAllLines();
        var newlineLength = this.getNewLineCharacter().length;
        var index = 0;
        var row = Math.min(pos.row, lines.length);
        for (var i = startRow || 0; i < row; ++i)
            index += lines[i].length + newlineLength;

        return index + pos.column;
    };

}).call(Document.prototype);

exports.Document = Document;
});

define("ace/background_tokenizer",["require","exports","module","ace/lib/oop","ace/lib/event_emitter"], function(require, exports, module) {
"use strict";

var oop = require("./lib/oop");
var EventEmitter = require("./lib/event_emitter").EventEmitter;

var BackgroundTokenizer = function(tokenizer, editor) {
    this.running = false;
    this.lines = [];
    this.states = [];
    this.currentLine = 0;
    this.tokenizer = tokenizer;

    var self = this;

    this.$worker = function() {
        if (!self.running) { return; }

        var workerStart = new Date();
        var currentLine = self.currentLine;
        var endLine = -1;
        var doc = self.doc;

        while (self.lines[currentLine])
            currentLine++;

        var startLine = currentLine;

        var len = doc.getLength();
        var processedLines = 0;
        self.running = false;
        while (currentLine < len) {
            self.$tokenizeRow(currentLine);
            endLine = currentLine;
            do {
                currentLine++;
            } while (self.lines[currentLine]);
            processedLines ++;
            if ((processedLines % 5 === 0) && (new Date() - workerStart) > 20) {                
                self.running = setTimeout(self.$worker, 20);
                break;
            }
        }
        self.currentLine = currentLine;
        
        if (startLine <= endLine)
            self.fireUpdateEvent(startLine, endLine);
    };
};

(function(){

    oop.implement(this, EventEmitter);
    this.setTokenizer = function(tokenizer) {
        this.tokenizer = tokenizer;
        this.lines = [];
        this.states = [];

        this.start(0);
    };
    this.setDocument = function(doc) {
        this.doc = doc;
        this.lines = [];
        this.states = [];

        this.stop();
    };
    this.fireUpdateEvent = function(firstRow, lastRow) {
        var data = {
            first: firstRow,
            last: lastRow
        };
        this._signal("update", {data: data});
    };
    this.start = function(startRow) {
        this.currentLine = Math.min(startRow || 0, this.currentLine, this.doc.getLength());
        this.lines.splice(this.currentLine, this.lines.length);
        this.states.splice(this.currentLine, this.states.length);

        this.stop();
        this.running = setTimeout(this.$worker, 700);
    };
    
    this.scheduleStart = function() {
        if (!this.running)
            this.running = setTimeout(this.$worker, 700);
    }

    this.$updateOnChange = function(delta) {
        var range = delta.range;
        var startRow = range.start.row;
        var len = range.end.row - startRow;

        if (len === 0) {
            this.lines[startRow] = null;
        } else if (delta.action == "removeText" || delta.action == "removeLines") {
            this.lines.splice(startRow, len + 1, null);
            this.states.splice(startRow, len + 1, null);
        } else {
            var args = Array(len + 1);
            args.unshift(startRow, 1);
            this.lines.splice.apply(this.lines, args);
            this.states.splice.apply(this.states, args);
        }

        this.currentLine = Math.min(startRow, this.currentLine, this.doc.getLength());

        this.stop();
    };
    this.stop = function() {
        if (this.running)
            clearTimeout(this.running);
        this.running = false;
    };
    this.getTokens = function(row) {
        return this.lines[row] || this.$tokenizeRow(row);
    };
    this.getState = function(row) {
        if (this.currentLine == row)
            this.$tokenizeRow(row);
        return this.states[row] || "start";
    };

    this.$tokenizeRow = function(row) {
        var line = this.doc.getLine(row);
        var state = this.states[row - 1];

        var data = this.tokenizer.getLineTokens(line, state, row);

        if (this.states[row] + "" !== data.state + "") {
            this.states[row] = data.state;
            this.lines[row + 1] = null;
            if (this.currentLine > row + 1)
                this.currentLine = row + 1;
        } else if (this.currentLine == row) {
            this.currentLine = row + 1;
        }

        return this.lines[row] = data.tokens;
    };

}).call(BackgroundTokenizer.prototype);

exports.BackgroundTokenizer = BackgroundTokenizer;
});

define("ace/search_highlight",["require","exports","module","ace/lib/lang","ace/lib/oop","ace/range"], function(require, exports, module) {
"use strict";

var lang = require("./lib/lang");
var oop = require("./lib/oop");
var Range = require("./range").Range;

var SearchHighlight = function(regExp, clazz, type) {
    this.setRegexp(regExp);
    this.clazz = clazz;
    this.type = type || "text";
};

(function() {
    this.MAX_RANGES = 500;
    
    this.setRegexp = function(regExp) {
        if (this.regExp+"" == regExp+"")
            return;
        this.regExp = regExp;
        this.cache = [];
    };

    this.update = function(html, markerLayer, session, config) {
        if (!this.regExp)
            return;
        var start = config.firstRow, end = config.lastRow;

        for (var i = start; i <= end; i++) {
            var ranges = this.cache[i];
            if (ranges == null) {
                ranges = lang.getMatchOffsets(session.getLine(i), this.regExp);
                if (ranges.length > this.MAX_RANGES)
                    ranges = ranges.slice(0, this.MAX_RANGES);
                ranges = ranges.map(function(match) {
                    return new Range(i, match.offset, i, match.offset + match.length);
                });
                this.cache[i] = ranges.length ? ranges : "";
            }

            for (var j = ranges.length; j --; ) {
                markerLayer.drawSingleLineMarker(
                    html, ranges[j].toScreenRange(session), this.clazz, config);
            }
        }
    };

}).call(SearchHighlight.prototype);

exports.SearchHighlight = SearchHighlight;
});

define("ace/edit_session/fold_line",["require","exports","module","ace/range"], function(require, exports, module) {
"use strict";

var Range = require("../range").Range;
function FoldLine(foldData, folds) {
    this.foldData = foldData;
    if (Array.isArray(folds)) {
        this.folds = folds;
    } else {
        folds = this.folds = [ folds ];
    }

    var last = folds[folds.length - 1];
    this.range = new Range(folds[0].start.row, folds[0].start.column,
                           last.end.row, last.end.column);
    this.start = this.range.start;
    this.end   = this.range.end;

    this.folds.forEach(function(fold) {
        fold.setFoldLine(this);
    }, this);
}

(function() {
    this.shiftRow = function(shift) {
        this.start.row += shift;
        this.end.row += shift;
        this.folds.forEach(function(fold) {
            fold.start.row += shift;
            fold.end.row += shift;
        });
    };

    this.addFold = function(fold) {
        if (fold.sameRow) {
            if (fold.start.row < this.startRow || fold.endRow > this.endRow) {
                throw new Error("Can't add a fold to this FoldLine as it has no connection");
            }
            this.folds.push(fold);
            this.folds.sort(function(a, b) {
                return -a.range.compareEnd(b.start.row, b.start.column);
            });
            if (this.range.compareEnd(fold.start.row, fold.start.column) > 0) {
                this.end.row = fold.end.row;
                this.end.column =  fold.end.column;
            } else if (this.range.compareStart(fold.end.row, fold.end.column) < 0) {
                this.start.row = fold.start.row;
                this.start.column = fold.start.column;
            }
        } else if (fold.start.row == this.end.row) {
            this.folds.push(fold);
            this.end.row = fold.end.row;
            this.end.column = fold.end.column;
        } else if (fold.end.row == this.start.row) {
            this.folds.unshift(fold);
            this.start.row = fold.start.row;
            this.start.column = fold.start.column;
        } else {
            throw new Error("Trying to add fold to FoldRow that doesn't have a matching row");
        }
        fold.foldLine = this;
    };

    this.containsRow = function(row) {
        return row >= this.start.row && row <= this.end.row;
    };

    this.walk = function(callback, endRow, endColumn) {
        var lastEnd = 0,
            folds = this.folds,
            fold,
            cmp, stop, isNewRow = true;

        if (endRow == null) {
            endRow = this.end.row;
            endColumn = this.end.column;
        }

        for (var i = 0; i < folds.length; i++) {
            fold = folds[i];

            cmp = fold.range.compareStart(endRow, endColumn);
            if (cmp == -1) {
                callback(null, endRow, endColumn, lastEnd, isNewRow);
                return;
            }

            stop = callback(null, fold.start.row, fold.start.column, lastEnd, isNewRow);
            stop = !stop && callback(fold.placeholder, fold.start.row, fold.start.column, lastEnd);
            if (stop || cmp === 0) {
                return;
            }
            isNewRow = !fold.sameRow;
            lastEnd = fold.end.column;
        }
        callback(null, endRow, endColumn, lastEnd, isNewRow);
    };

    this.getNextFoldTo = function(row, column) {
        var fold, cmp;
        for (var i = 0; i < this.folds.length; i++) {
            fold = this.folds[i];
            cmp = fold.range.compareEnd(row, column);
            if (cmp == -1) {
                return {
                    fold: fold,
                    kind: "after"
                };
            } else if (cmp === 0) {
                return {
                    fold: fold,
                    kind: "inside"
                };
            }
        }
        return null;
    };

    this.addRemoveChars = function(row, column, len) {
        var ret = this.getNextFoldTo(row, column),
            fold, folds;
        if (ret) {
            fold = ret.fold;
            if (ret.kind == "inside"
                && fold.start.column != column
                && fold.start.row != row)
            {
                window.console && window.console.log(row, column, fold);
            } else if (fold.start.row == row) {
                folds = this.folds;
                var i = folds.indexOf(fold);
                if (i === 0) {
                    this.start.column += len;
                }
                for (i; i < folds.length; i++) {
                    fold = folds[i];
                    fold.start.column += len;
                    if (!fold.sameRow) {
                        return;
                    }
                    fold.end.column += len;
                }
                this.end.column += len;
            }
        }
    };

    this.split = function(row, column) {
        var pos = this.getNextFoldTo(row, column);
        
        if (!pos || pos.kind == "inside")
            return null;
            
        var fold = pos.fold;
        var folds = this.folds;
        var foldData = this.foldData;
        
        var i = folds.indexOf(fold);
        var foldBefore = folds[i - 1];
        this.end.row = foldBefore.end.row;
        this.end.column = foldBefore.end.column;
        folds = folds.splice(i, folds.length - i);

        var newFoldLine = new FoldLine(foldData, folds);
        foldData.splice(foldData.indexOf(this) + 1, 0, newFoldLine);
        return newFoldLine;
    };

    this.merge = function(foldLineNext) {
        var folds = foldLineNext.folds;
        for (var i = 0; i < folds.length; i++) {
            this.addFold(folds[i]);
        }
        var foldData = this.foldData;
        foldData.splice(foldData.indexOf(foldLineNext), 1);
    };

    this.toString = function() {
        var ret = [this.range.toString() + ": [" ];

        this.folds.forEach(function(fold) {
            ret.push("  " + fold.toString());
        });
        ret.push("]");
        return ret.join("\n");
    };

    this.idxToPosition = function(idx) {
        var lastFoldEndColumn = 0;

        for (var i = 0; i < this.folds.length; i++) {
            var fold = this.folds[i];

            idx -= fold.start.column - lastFoldEndColumn;
            if (idx < 0) {
                return {
                    row: fold.start.row,
                    column: fold.start.column + idx
                };
            }

            idx -= fold.placeholder.length;
            if (idx < 0) {
                return fold.start;
            }

            lastFoldEndColumn = fold.end.column;
        }

        return {
            row: this.end.row,
            column: this.end.column + idx
        };
    };
}).call(FoldLine.prototype);

exports.FoldLine = FoldLine;
});

define("ace/range_list",["require","exports","module","ace/range"], function(require, exports, module) {
"use strict";
var Range = require("./range").Range;
var comparePoints = Range.comparePoints;

var RangeList = function() {
    this.ranges = [];
};

(function() {
    this.comparePoints = comparePoints;

    this.pointIndex = function(pos, excludeEdges, startIndex) {
        var list = this.ranges;

        for (var i = startIndex || 0; i < list.length; i++) {
            var range = list[i];
            var cmpEnd = comparePoints(pos, range.end);
            if (cmpEnd > 0)
                continue;
            var cmpStart = comparePoints(pos, range.start);
            if (cmpEnd === 0)
                return excludeEdges && cmpStart !== 0 ? -i-2 : i;
            if (cmpStart > 0 || (cmpStart === 0 && !excludeEdges))
                return i;

            return -i-1;
        }
        return -i - 1;
    };

    this.add = function(range) {
        var excludeEdges = !range.isEmpty();
        var startIndex = this.pointIndex(range.start, excludeEdges);
        if (startIndex < 0)
            startIndex = -startIndex - 1;

        var endIndex = this.pointIndex(range.end, excludeEdges, startIndex);

        if (endIndex < 0)
            endIndex = -endIndex - 1;
        else
            endIndex++;
        return this.ranges.splice(startIndex, endIndex - startIndex, range);
    };

    this.addList = function(list) {
        var removed = [];
        for (var i = list.length; i--; ) {
            removed.push.call(removed, this.add(list[i]));
        }
        return removed;
    };

    this.substractPoint = function(pos) {
        var i = this.pointIndex(pos);

        if (i >= 0)
            return this.ranges.splice(i, 1);
    };
    this.merge = function() {
        var removed = [];
        var list = this.ranges;
        
        list = list.sort(function(a, b) {
            return comparePoints(a.start, b.start);
        });
        
        var next = list[0], range;
        for (var i = 1; i < list.length; i++) {
            range = next;
            next = list[i];
            var cmp = comparePoints(range.end, next.start);
            if (cmp < 0)
                continue;

            if (cmp == 0 && !range.isEmpty() && !next.isEmpty())
                continue;

            if (comparePoints(range.end, next.end) < 0) {
                range.end.row = next.end.row;
                range.end.column = next.end.column;
            }

            list.splice(i, 1);
            removed.push(next);
            next = range;
            i--;
        }
        
        this.ranges = list;

        return removed;
    };

    this.contains = function(row, column) {
        return this.pointIndex({row: row, column: column}) >= 0;
    };

    this.containsPoint = function(pos) {
        return this.pointIndex(pos) >= 0;
    };

    this.rangeAtPoint = function(pos) {
        var i = this.pointIndex(pos);
        if (i >= 0)
            return this.ranges[i];
    };


    this.clipRows = function(startRow, endRow) {
        var list = this.ranges;
        if (list[0].start.row > endRow || list[list.length - 1].start.row < startRow)
            return [];

        var startIndex = this.pointIndex({row: startRow, column: 0});
        if (startIndex < 0)
            startIndex = -startIndex - 1;
        var endIndex = this.pointIndex({row: endRow, column: 0}, startIndex);
        if (endIndex < 0)
            endIndex = -endIndex - 1;

        var clipped = [];
        for (var i = startIndex; i < endIndex; i++) {
            clipped.push(list[i]);
        }
        return clipped;
    };

    this.removeAll = function() {
        return this.ranges.splice(0, this.ranges.length);
    };

    this.attach = function(session) {
        if (this.session)
            this.detach();

        this.session = session;
        this.onChange = this.$onChange.bind(this);

        this.session.on('change', this.onChange);
    };

    this.detach = function() {
        if (!this.session)
            return;
        this.session.removeListener('change', this.onChange);
        this.session = null;
    };

    this.$onChange = function(e) {
        var changeRange = e.data.range;
        if (e.data.action[0] == "i"){
            var start = changeRange.start;
            var end = changeRange.end;
        } else {
            var end = changeRange.start;
            var start = changeRange.end;
        }
        var startRow = start.row;
        var endRow = end.row;
        var lineDif = endRow - startRow;

        var colDiff = -start.column + end.column;
        var ranges = this.ranges;

        for (var i = 0, n = ranges.length; i < n; i++) {
            var r = ranges[i];
            if (r.end.row < startRow)
                continue;
            if (r.start.row > startRow)
                break;

            if (r.start.row == startRow && r.start.column >= start.column ) {
                if (r.start.column == start.column && this.$insertRight) {
                } else {
                    r.start.column += colDiff;
                    r.start.row += lineDif;
                }
            }
            if (r.end.row == startRow && r.end.column >= start.column) {
                if (r.end.column == start.column && this.$insertRight) {
                    continue;
                }
                if (r.end.column == start.column && colDiff > 0 && i < n - 1) {                
                    if (r.end.column > r.start.column && r.end.column == ranges[i+1].start.column)
                        r.end.column -= colDiff;
                }
                r.end.column += colDiff;
                r.end.row += lineDif;
            }
        }

        if (lineDif != 0 && i < n) {
            for (; i < n; i++) {
                var r = ranges[i];
                r.start.row += lineDif;
                r.end.row += lineDif;
            }
        }
    };

}).call(RangeList.prototype);

exports.RangeList = RangeList;
});

define("ace/edit_session/fold",["require","exports","module","ace/range","ace/range_list","ace/lib/oop"], function(require, exports, module) {
"use strict";

var Range = require("../range").Range;
var RangeList = require("../range_list").RangeList;
var oop = require("../lib/oop")
var Fold = exports.Fold = function(range, placeholder) {
    this.foldLine = null;
    this.placeholder = placeholder;
    this.range = range;
    this.start = range.start;
    this.end = range.end;

    this.sameRow = range.start.row == range.end.row;
    this.subFolds = this.ranges = [];
};

oop.inherits(Fold, RangeList);

(function() {

    this.toString = function() {
        return '"' + this.placeholder + '" ' + this.range.toString();
    };

    this.setFoldLine = function(foldLine) {
        this.foldLine = foldLine;
        this.subFolds.forEach(function(fold) {
            fold.setFoldLine(foldLine);
        });
    };

    this.clone = function() {
        var range = this.range.clone();
        var fold = new Fold(range, this.placeholder);
        this.subFolds.forEach(function(subFold) {
            fold.subFolds.push(subFold.clone());
        });
        fold.collapseChildren = this.collapseChildren;
        return fold;
    };

    this.addSubFold = function(fold) {
        if (this.range.isEqual(fold))
            return;

        if (!this.range.containsRange(fold))
            throw new Error("A fold can't intersect already existing fold" + fold.range + this.range);
        consumeRange(fold, this.start);

        var row = fold.start.row, column = fold.start.column;
        for (var i = 0, cmp = -1; i < this.subFolds.length; i++) {
            cmp = this.subFolds[i].range.compare(row, column);
            if (cmp != 1)
                break;
        }
        var afterStart = this.subFolds[i];

        if (cmp == 0)
            return afterStart.addSubFold(fold);
        var row = fold.range.end.row, column = fold.range.end.column;
        for (var j = i, cmp = -1; j < this.subFolds.length; j++) {
            cmp = this.subFolds[j].range.compare(row, column);
            if (cmp != 1)
                break;
        }
        var afterEnd = this.subFolds[j];

        if (cmp == 0)
            throw new Error("A fold can't intersect already existing fold" + fold.range + this.range);

        var consumedFolds = this.subFolds.splice(i, j - i, fold);
        fold.setFoldLine(this.foldLine);

        return fold;
    };
    
    this.restoreRange = function(range) {
        return restoreRange(range, this.start);
    };

}).call(Fold.prototype);

function consumePoint(point, anchor) {
    point.row -= anchor.row;
    if (point.row == 0)
        point.column -= anchor.column;
}
function consumeRange(range, anchor) {
    consumePoint(range.start, anchor);
    consumePoint(range.end, anchor);
}
function restorePoint(point, anchor) {
    if (point.row == 0)
        point.column += anchor.column;
    point.row += anchor.row;
}
function restoreRange(range, anchor) {
    restorePoint(range.start, anchor);
    restorePoint(range.end, anchor);
}

});

define("ace/edit_session/folding",["require","exports","module","ace/range","ace/edit_session/fold_line","ace/edit_session/fold","ace/token_iterator"], function(require, exports, module) {
"use strict";

var Range = require("../range").Range;
var FoldLine = require("./fold_line").FoldLine;
var Fold = require("./fold").Fold;
var TokenIterator = require("../token_iterator").TokenIterator;

function Folding() {
    this.getFoldAt = function(row, column, side) {
        var foldLine = this.getFoldLine(row);
        if (!foldLine)
            return null;

        var folds = foldLine.folds;
        for (var i = 0; i < folds.length; i++) {
            var fold = folds[i];
            if (fold.range.contains(row, column)) {
                if (side == 1 && fold.range.isEnd(row, column)) {
                    continue;
                } else if (side == -1 && fold.range.isStart(row, column)) {
                    continue;
                }
                return fold;
            }
        }
    };
    this.getFoldsInRange = function(range) {
        var start = range.start;
        var end = range.end;
        var foldLines = this.$foldData;
        var foundFolds = [];

        start.column += 1;
        end.column -= 1;

        for (var i = 0; i < foldLines.length; i++) {
            var cmp = foldLines[i].range.compareRange(range);
            if (cmp == 2) {
                continue;
            }
            else if (cmp == -2) {
                break;
            }

            var folds = foldLines[i].folds;
            for (var j = 0; j < folds.length; j++) {
                var fold = folds[j];
                cmp = fold.range.compareRange(range);
                if (cmp == -2) {
                    break;
                } else if (cmp == 2) {
                    continue;
                } else
                if (cmp == 42) {
                    break;
                }
                foundFolds.push(fold);
            }
        }
        start.column -= 1;
        end.column += 1;

        return foundFolds;
    };

    this.getFoldsInRangeList = function(ranges) {
        if (Array.isArray(ranges)) {
            var folds = [];
            ranges.forEach(function(range) {
                folds = folds.concat(this.getFoldsInRange(range));
            }, this);
        } else {
            var folds = this.getFoldsInRange(ranges);
        }
        return folds;
    }
    this.getAllFolds = function() {
        var folds = [];
        var foldLines = this.$foldData;
        
        for (var i = 0; i < foldLines.length; i++)
            for (var j = 0; j < foldLines[i].folds.length; j++)
                folds.push(foldLines[i].folds[j]);

        return folds;
    };
    this.getFoldStringAt = function(row, column, trim, foldLine) {
        foldLine = foldLine || this.getFoldLine(row);
        if (!foldLine)
            return null;

        var lastFold = {
            end: { column: 0 }
        };
        var str, fold;
        for (var i = 0; i < foldLine.folds.length; i++) {
            fold = foldLine.folds[i];
            var cmp = fold.range.compareEnd(row, column);
            if (cmp == -1) {
                str = this
                    .getLine(fold.start.row)
                    .substring(lastFold.end.column, fold.start.column);
                break;
            }
            else if (cmp === 0) {
                return null;
            }
            lastFold = fold;
        }
        if (!str)
            str = this.getLine(fold.start.row).substring(lastFold.end.column);

        if (trim == -1)
            return str.substring(0, column - lastFold.end.column);
        else if (trim == 1)
            return str.substring(column - lastFold.end.column);
        else
            return str;
    };

    this.getFoldLine = function(docRow, startFoldLine) {
        var foldData = this.$foldData;
        var i = 0;
        if (startFoldLine)
            i = foldData.indexOf(startFoldLine);
        if (i == -1)
            i = 0;
        for (i; i < foldData.length; i++) {
            var foldLine = foldData[i];
            if (foldLine.start.row <= docRow && foldLine.end.row >= docRow) {
                return foldLine;
            } else if (foldLine.end.row > docRow) {
                return null;
            }
        }
        return null;
    };
    this.getNextFoldLine = function(docRow, startFoldLine) {
        var foldData = this.$foldData;
        var i = 0;
        if (startFoldLine)
            i = foldData.indexOf(startFoldLine);
        if (i == -1)
            i = 0;
        for (i; i < foldData.length; i++) {
            var foldLine = foldData[i];
            if (foldLine.end.row >= docRow) {
                return foldLine;
            }
        }
        return null;
    };

    this.getFoldedRowCount = function(first, last) {
        var foldData = this.$foldData, rowCount = last-first+1;
        for (var i = 0; i < foldData.length; i++) {
            var foldLine = foldData[i],
                end = foldLine.end.row,
                start = foldLine.start.row;
            if (end >= last) {
                if(start < last) {
                    if(start >= first)
                        rowCount -= last-start;
                    else
                        rowCount = 0;//in one fold
                }
                break;
            } else if(end >= first){
                if (start >= first) //fold inside range
                    rowCount -=  end-start;
                else
                    rowCount -=  end-first+1;
            }
        }
        return rowCount;
    };

    this.$addFoldLine = function(foldLine) {
        this.$foldData.push(foldLine);
        this.$foldData.sort(function(a, b) {
            return a.start.row - b.start.row;
        });
        return foldLine;
    };
    this.addFold = function(placeholder, range) {
        var foldData = this.$foldData;
        var added = false;
        var fold;
        
        if (placeholder instanceof Fold)
            fold = placeholder;
        else {
            fold = new Fold(range, placeholder);
            fold.collapseChildren = range.collapseChildren;
        }
        this.$clipRangeToDocument(fold.range);

        var startRow = fold.start.row;
        var startColumn = fold.start.column;
        var endRow = fold.end.row;
        var endColumn = fold.end.column;
        if (!(startRow < endRow || 
            startRow == endRow && startColumn <= endColumn - 2))
            throw new Error("The range has to be at least 2 characters width");

        var startFold = this.getFoldAt(startRow, startColumn, 1);
        var endFold = this.getFoldAt(endRow, endColumn, -1);
        if (startFold && endFold == startFold)
            return startFold.addSubFold(fold);

        if (startFold && !startFold.range.isStart(startRow, startColumn))
            this.removeFold(startFold);
        
        if (endFold && !endFold.range.isEnd(endRow, endColumn))
            this.removeFold(endFold);
        var folds = this.getFoldsInRange(fold.range);
        if (folds.length > 0) {
            this.removeFolds(folds);
            folds.forEach(function(subFold) {
                fold.addSubFold(subFold);
            });
        }

        for (var i = 0; i < foldData.length; i++) {
            var foldLine = foldData[i];
            if (endRow == foldLine.start.row) {
                foldLine.addFold(fold);
                added = true;
                break;
            } else if (startRow == foldLine.end.row) {
                foldLine.addFold(fold);
                added = true;
                if (!fold.sameRow) {
                    var foldLineNext = foldData[i + 1];
                    if (foldLineNext && foldLineNext.start.row == endRow) {
                        foldLine.merge(foldLineNext);
                        break;
                    }
                }
                break;
            } else if (endRow <= foldLine.start.row) {
                break;
            }
        }

        if (!added)
            foldLine = this.$addFoldLine(new FoldLine(this.$foldData, fold));

        if (this.$useWrapMode)
            this.$updateWrapData(foldLine.start.row, foldLine.start.row);
        else
            this.$updateRowLengthCache(foldLine.start.row, foldLine.start.row);
        this.$modified = true;
        this._emit("changeFold", { data: fold, action: "add" });

        return fold;
    };

    this.addFolds = function(folds) {
        folds.forEach(function(fold) {
            this.addFold(fold);
        }, this);
    };

    this.removeFold = function(fold) {
        var foldLine = fold.foldLine;
        var startRow = foldLine.start.row;
        var endRow = foldLine.end.row;

        var foldLines = this.$foldData;
        var folds = foldLine.folds;
        if (folds.length == 1) {
            foldLines.splice(foldLines.indexOf(foldLine), 1);
        } else
        if (foldLine.range.isEnd(fold.end.row, fold.end.column)) {
            folds.pop();
            foldLine.end.row = folds[folds.length - 1].end.row;
            foldLine.end.column = folds[folds.length - 1].end.column;
        } else
        if (foldLine.range.isStart(fold.start.row, fold.start.column)) {
            folds.shift();
            foldLine.start.row = folds[0].start.row;
            foldLine.start.column = folds[0].start.column;
        } else
        if (fold.sameRow) {
            folds.splice(folds.indexOf(fold), 1);
        } else
        {
            var newFoldLine = foldLine.split(fold.start.row, fold.start.column);
            folds = newFoldLine.folds;
            folds.shift();
            newFoldLine.start.row = folds[0].start.row;
            newFoldLine.start.column = folds[0].start.column;
        }

        if (!this.$updating) {
            if (this.$useWrapMode)
                this.$updateWrapData(startRow, endRow);
            else
                this.$updateRowLengthCache(startRow, endRow);
        }
        this.$modified = true;
        this._emit("changeFold", { data: fold, action: "remove" });
    };

    this.removeFolds = function(folds) {
        var cloneFolds = [];
        for (var i = 0; i < folds.length; i++) {
            cloneFolds.push(folds[i]);
        }

        cloneFolds.forEach(function(fold) {
            this.removeFold(fold);
        }, this);
        this.$modified = true;
    };

    this.expandFold = function(fold) {
        this.removeFold(fold);
        fold.subFolds.forEach(function(subFold) {
            fold.restoreRange(subFold);
            this.addFold(subFold);
        }, this);
        if (fold.collapseChildren > 0) {
            this.foldAll(fold.start.row+1, fold.end.row, fold.collapseChildren-1);
        }
        fold.subFolds = [];
    };

    this.expandFolds = function(folds) {
        folds.forEach(function(fold) {
            this.expandFold(fold);
        }, this);
    };

    this.unfold = function(location, expandInner) {
        var range, folds;
        if (location == null) {
            range = new Range(0, 0, this.getLength(), 0);
            expandInner = true;
        } else if (typeof location == "number")
            range = new Range(location, 0, location, this.getLine(location).length);
        else if ("row" in location)
            range = Range.fromPoints(location, location);
        else
            range = location;
        
        folds = this.getFoldsInRangeList(range);
        if (expandInner) {
            this.removeFolds(folds);
        } else {
            var subFolds = folds;
            while (subFolds.length) {
                this.expandFolds(subFolds);
                subFolds = this.getFoldsInRangeList(range);
            }
        }
        if (folds.length)
            return folds;
    };
    this.isRowFolded = function(docRow, startFoldRow) {
        return !!this.getFoldLine(docRow, startFoldRow);
    };

    this.getRowFoldEnd = function(docRow, startFoldRow) {
        var foldLine = this.getFoldLine(docRow, startFoldRow);
        return foldLine ? foldLine.end.row : docRow;
    };

    this.getRowFoldStart = function(docRow, startFoldRow) {
        var foldLine = this.getFoldLine(docRow, startFoldRow);
        return foldLine ? foldLine.start.row : docRow;
    };

    this.getFoldDisplayLine = function(foldLine, endRow, endColumn, startRow, startColumn) {
        if (startRow == null)
            startRow = foldLine.start.row;
        if (startColumn == null)
            startColumn = 0;
        if (endRow == null)
            endRow = foldLine.end.row;
        if (endColumn == null)
            endColumn = this.getLine(endRow).length;
        var doc = this.doc;
        var textLine = "";

        foldLine.walk(function(placeholder, row, column, lastColumn) {
            if (row < startRow)
                return;
            if (row == startRow) {
                if (column < startColumn)
                    return;
                lastColumn = Math.max(startColumn, lastColumn);
            }

            if (placeholder != null) {
                textLine += placeholder;
            } else {
                textLine += doc.getLine(row).substring(lastColumn, column);
            }
        }, endRow, endColumn);
        return textLine;
    };

    this.getDisplayLine = function(row, endColumn, startRow, startColumn) {
        var foldLine = this.getFoldLine(row);

        if (!foldLine) {
            var line;
            line = this.doc.getLine(row);
            return line.substring(startColumn || 0, endColumn || line.length);
        } else {
            return this.getFoldDisplayLine(
                foldLine, row, endColumn, startRow, startColumn);
        }
    };

    this.$cloneFoldData = function() {
        var fd = [];
        fd = this.$foldData.map(function(foldLine) {
            var folds = foldLine.folds.map(function(fold) {
                return fold.clone();
            });
            return new FoldLine(fd, folds);
        });

        return fd;
    };

    this.toggleFold = function(tryToUnfold) {
        var selection = this.selection;
        var range = selection.getRange();
        var fold;
        var bracketPos;

        if (range.isEmpty()) {
            var cursor = range.start;
            fold = this.getFoldAt(cursor.row, cursor.column);

            if (fold) {
                this.expandFold(fold);
                return;
            } else if (bracketPos = this.findMatchingBracket(cursor)) {
                if (range.comparePoint(bracketPos) == 1) {
                    range.end = bracketPos;
                } else {
                    range.start = bracketPos;
                    range.start.column++;
                    range.end.column--;
                }
            } else if (bracketPos = this.findMatchingBracket({row: cursor.row, column: cursor.column + 1})) {
                if (range.comparePoint(bracketPos) == 1)
                    range.end = bracketPos;
                else
                    range.start = bracketPos;

                range.start.column++;
            } else {
                range = this.getCommentFoldRange(cursor.row, cursor.column) || range;
            }
        } else {
            var folds = this.getFoldsInRange(range);
            if (tryToUnfold && folds.length) {
                this.expandFolds(folds);
                return;
            } else if (folds.length == 1 ) {
                fold = folds[0];
            }
        }

        if (!fold)
            fold = this.getFoldAt(range.start.row, range.start.column);

        if (fold && fold.range.toString() == range.toString()) {
            this.expandFold(fold);
            return;
        }

        var placeholder = "...";
        if (!range.isMultiLine()) {
            placeholder = this.getTextRange(range);
            if(placeholder.length < 4)
                return;
            placeholder = placeholder.trim().substring(0, 2) + "..";
        }

        this.addFold(placeholder, range);
    };

    this.getCommentFoldRange = function(row, column, dir) {
        var iterator = new TokenIterator(this, row, column);
        var token = iterator.getCurrentToken();
        if (token && /^comment|string/.test(token.type)) {
            var range = new Range();
            var re = new RegExp(token.type.replace(/\..*/, "\\."));
            if (dir != 1) {
                do {
                    token = iterator.stepBackward();
                } while(token && re.test(token.type));
                iterator.stepForward();
            }
            
            range.start.row = iterator.getCurrentTokenRow();
            range.start.column = iterator.getCurrentTokenColumn() + 2;

            iterator = new TokenIterator(this, row, column);
            
            if (dir != -1) {
                do {
                    token = iterator.stepForward();
                } while(token && re.test(token.type));
                token = iterator.stepBackward();
            } else
                token = iterator.getCurrentToken();

            range.end.row = iterator.getCurrentTokenRow();
            range.end.column = iterator.getCurrentTokenColumn() + token.value.length - 2;
            return range;
        }
    };

    this.foldAll = function(startRow, endRow, depth) {
        if (depth == undefined)
            depth = 100000; // JSON.stringify doesn't hanle Infinity
        var foldWidgets = this.foldWidgets;
        if (!foldWidgets)
            return; // mode doesn't support folding
        endRow = endRow || this.getLength();
        startRow = startRow || 0;
        for (var row = startRow; row < endRow; row++) {
            if (foldWidgets[row] == null)
                foldWidgets[row] = this.getFoldWidget(row);
            if (foldWidgets[row] != "start")
                continue;

            var range = this.getFoldWidgetRange(row);
            if (range && range.isMultiLine()
                && range.end.row <= endRow
                && range.start.row >= startRow
            ) {
                row = range.end.row;
                try {
                    var fold = this.addFold("...", range);
                    if (fold)
                        fold.collapseChildren = depth;
                } catch(e) {}
            }
        }
    };
    this.$foldStyles = {
        "manual": 1,
        "markbegin": 1,
        "markbeginend": 1
    };
    this.$foldStyle = "markbegin";
    this.setFoldStyle = function(style) {
        if (!this.$foldStyles[style])
            throw new Error("invalid fold style: " + style + "[" + Object.keys(this.$foldStyles).join(", ") + "]");
        
        if (this.$foldStyle == style)
            return;

        this.$foldStyle = style;
        
        if (style == "manual")
            this.unfold();
        var mode = this.$foldMode;
        this.$setFolding(null);
        this.$setFolding(mode);
    };

    this.$setFolding = function(foldMode) {
        if (this.$foldMode == foldMode)
            return;
            
        this.$foldMode = foldMode;
        
        this.off('change', this.$updateFoldWidgets);
        this.off('tokenizerUpdate', this.$tokenizerUpdateFoldWidgets);
        this._emit("changeAnnotation");
        
        if (!foldMode || this.$foldStyle == "manual") {
            this.foldWidgets = null;
            return;
        }
        
        this.foldWidgets = [];
        this.getFoldWidget = foldMode.getFoldWidget.bind(foldMode, this, this.$foldStyle);
        this.getFoldWidgetRange = foldMode.getFoldWidgetRange.bind(foldMode, this, this.$foldStyle);
        
        this.$updateFoldWidgets = this.updateFoldWidgets.bind(this);
        this.$tokenizerUpdateFoldWidgets = this.tokenizerUpdateFoldWidgets.bind(this);
        this.on('change', this.$updateFoldWidgets);
        this.on('tokenizerUpdate', this.$tokenizerUpdateFoldWidgets);
    };

    this.getParentFoldRangeData = function (row, ignoreCurrent) {
        var fw = this.foldWidgets;
        if (!fw || (ignoreCurrent && fw[row]))
            return {};

        var i = row - 1, firstRange;
        while (i >= 0) {
            var c = fw[i];
            if (c == null)
                c = fw[i] = this.getFoldWidget(i);

            if (c == "start") {
                var range = this.getFoldWidgetRange(i);
                if (!firstRange)
                    firstRange = range;
                if (range && range.end.row >= row)
                    break;
            }
            i--;
        }

        return {
            range: i !== -1 && range,
            firstRange: firstRange
        };
    }

    this.onFoldWidgetClick = function(row, e) {
        e = e.domEvent;
        var options = {
            children: e.shiftKey,
            all: e.ctrlKey || e.metaKey,
            siblings: e.altKey
        };
        
        var range = this.$toggleFoldWidget(row, options);
        if (!range) {
            var el = (e.target || e.srcElement)
            if (el && /ace_fold-widget/.test(el.className))
                el.className += " ace_invalid";
        }
    };
    
    this.$toggleFoldWidget = function(row, options) {
        if (!this.getFoldWidget)
            return;
        var type = this.getFoldWidget(row);
        var line = this.getLine(row);

        var dir = type === "end" ? -1 : 1;
        var fold = this.getFoldAt(row, dir === -1 ? 0 : line.length, dir);

        if (fold) {
            if (options.children || options.all)
                this.removeFold(fold);
            else
                this.expandFold(fold);
            return;
        }

        var range = this.getFoldWidgetRange(row, true);
        if (range && !range.isMultiLine()) {
            fold = this.getFoldAt(range.start.row, range.start.column, 1);
            if (fold && range.isEqual(fold.range)) {
                this.removeFold(fold);
                return;
            }
        }
        
        if (options.siblings) {
            var data = this.getParentFoldRangeData(row);
            if (data.range) {
                var startRow = data.range.start.row + 1;
                var endRow = data.range.end.row;
            }
            this.foldAll(startRow, endRow, options.all ? 10000 : 0);
        } else if (options.children) {
            endRow = range ? range.end.row : this.getLength();
            this.foldAll(row + 1, endRow, options.all ? 10000 : 0);
        } else if (range) {
            if (options.all) 
                range.collapseChildren = 10000;
            this.addFold("...", range);
        }
        
        return range;
    };
    
    
    
    this.toggleFoldWidget = function(toggleParent) {
        var row = this.selection.getCursor().row;
        row = this.getRowFoldStart(row);
        var range = this.$toggleFoldWidget(row, {});
        
        if (range)
            return;
        var data = this.getParentFoldRangeData(row, true);
        range = data.range || data.firstRange;
        
        if (range) {
            row = range.start.row;
            var fold = this.getFoldAt(row, this.getLine(row).length, 1);

            if (fold) {
                this.removeFold(fold);
            } else {
                this.addFold("...", range);
            }
        }
    };

    this.updateFoldWidgets = function(e) {
        var delta = e.data;
        var range = delta.range;
        var firstRow = range.start.row;
        var len = range.end.row - firstRow;

        if (len === 0) {
            this.foldWidgets[firstRow] = null;
        } else if (delta.action == "removeText" || delta.action == "removeLines") {
            this.foldWidgets.splice(firstRow, len + 1, null);
        } else {
            var args = Array(len + 1);
            args.unshift(firstRow, 1);
            this.foldWidgets.splice.apply(this.foldWidgets, args);
        }
    };
    this.tokenizerUpdateFoldWidgets = function(e) {
        var rows = e.data;
        if (rows.first != rows.last) {
            if (this.foldWidgets.length > rows.first)
                this.foldWidgets.splice(rows.first, this.foldWidgets.length);
        }
    }
}

exports.Folding = Folding;

});

define("ace/edit_session/bracket_match",["require","exports","module","ace/token_iterator","ace/range"], function(require, exports, module) {
"use strict";

var TokenIterator = require("../token_iterator").TokenIterator;
var Range = require("../range").Range;


function BracketMatch() {

    this.findMatchingBracket = function(position, chr) {
        if (position.column == 0) return null;

        var charBeforeCursor = chr || this.getLine(position.row).charAt(position.column-1);
        if (charBeforeCursor == "") return null;

        var match = charBeforeCursor.match(/([\(\[\{])|([\)\]\}])/);
        if (!match)
            return null;

        if (match[1])
            return this.$findClosingBracket(match[1], position);
        else
            return this.$findOpeningBracket(match[2], position);
    };
    
    this.getBracketRange = function(pos) {
        var line = this.getLine(pos.row);
        var before = true, range;

        var chr = line.charAt(pos.column-1);
        var match = chr && chr.match(/([\(\[\{])|([\)\]\}])/);
        if (!match) {
            chr = line.charAt(pos.column);
            pos = {row: pos.row, column: pos.column + 1};
            match = chr && chr.match(/([\(\[\{])|([\)\]\}])/);
            before = false;
        }
        if (!match)
            return null;

        if (match[1]) {
            var bracketPos = this.$findClosingBracket(match[1], pos);
            if (!bracketPos)
                return null;
            range = Range.fromPoints(pos, bracketPos);
            if (!before) {
                range.end.column++;
                range.start.column--;
            }
            range.cursor = range.end;
        } else {
            var bracketPos = this.$findOpeningBracket(match[2], pos);
            if (!bracketPos)
                return null;
            range = Range.fromPoints(bracketPos, pos);
            if (!before) {
                range.start.column++;
                range.end.column--;
            }
            range.cursor = range.start;
        }
        
        return range;
    };

    this.$brackets = {
        ")": "(",
        "(": ")",
        "]": "[",
        "[": "]",
        "{": "}",
        "}": "{"
    };

    this.$findOpeningBracket = function(bracket, position, typeRe) {
        var openBracket = this.$brackets[bracket];
        var depth = 1;

        var iterator = new TokenIterator(this, position.row, position.column);
        var token = iterator.getCurrentToken();
        if (!token)
            token = iterator.stepForward();
        if (!token)
            return;
        
         if (!typeRe){
            typeRe = new RegExp(
                "(\\.?" +
                token.type.replace(".", "\\.").replace("rparen", ".paren")
                    .replace(/\b(?:end|start|begin)\b/, "")
                + ")+"
            );
        }
        var valueIndex = position.column - iterator.getCurrentTokenColumn() - 2;
        var value = token.value;
        
        while (true) {
        
            while (valueIndex >= 0) {
                var chr = value.charAt(valueIndex);
                if (chr == openBracket) {
                    depth -= 1;
                    if (depth == 0) {
                        return {row: iterator.getCurrentTokenRow(),
                            column: valueIndex + iterator.getCurrentTokenColumn()};
                    }
                }
                else if (chr == bracket) {
                    depth += 1;
                }
                valueIndex -= 1;
            }
            do {
                token = iterator.stepBackward();
            } while (token && !typeRe.test(token.type));

            if (token == null)
                break;
                
            value = token.value;
            valueIndex = value.length - 1;
        }
        
        return null;
    };

    this.$findClosingBracket = function(bracket, position, typeRe) {
        var closingBracket = this.$brackets[bracket];
        var depth = 1;

        var iterator = new TokenIterator(this, position.row, position.column);
        var token = iterator.getCurrentToken();
        if (!token)
            token = iterator.stepForward();
        if (!token)
            return;

        if (!typeRe){
            typeRe = new RegExp(
                "(\\.?" +
                token.type.replace(".", "\\.").replace("lparen", ".paren")
                    .replace(/\b(?:end|start|begin)\b/, "")
                + ")+"
            );
        }
        var valueIndex = position.column - iterator.getCurrentTokenColumn();

        while (true) {

            var value = token.value;
            var valueLength = value.length;
            while (valueIndex < valueLength) {
                var chr = value.charAt(valueIndex);
                if (chr == closingBracket) {
                    depth -= 1;
                    if (depth == 0) {
                        return {row: iterator.getCurrentTokenRow(),
                            column: valueIndex + iterator.getCurrentTokenColumn()};
                    }
                }
                else if (chr == bracket) {
                    depth += 1;
                }
                valueIndex += 1;
            }
            do {
                token = iterator.stepForward();
            } while (token && !typeRe.test(token.type));

            if (token == null)
                break;

            valueIndex = 0;
        }
        
        return null;
    };
}
exports.BracketMatch = BracketMatch;

});

define("ace/edit_session",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/config","ace/lib/event_emitter","ace/selection","ace/mode/text","ace/range","ace/document","ace/background_tokenizer","ace/search_highlight","ace/edit_session/folding","ace/edit_session/bracket_match"], function(require, exports, module) {
"use strict";

var oop = require("./lib/oop");
var lang = require("./lib/lang");
var config = require("./config");
var EventEmitter = require("./lib/event_emitter").EventEmitter;
var Selection = require("./selection").Selection;
var TextMode = require("./mode/text").Mode;
var Range = require("./range").Range;
var Document = require("./document").Document;
var BackgroundTokenizer = require("./background_tokenizer").BackgroundTokenizer;
var SearchHighlight = require("./search_highlight").SearchHighlight;

var EditSession = function(text, mode) {
    this.$breakpoints = [];
    this.$decorations = [];
    this.$frontMarkers = {};
    this.$backMarkers = {};
    this.$markerId = 1;
    this.$undoSelect = true;

    this.$foldData = [];
    this.$foldData.toString = function() {
        return this.join("\n");
    }
    this.on("changeFold", this.onChangeFold.bind(this));
    this.$onChange = this.onChange.bind(this);

    if (typeof text != "object" || !text.getLine)
        text = new Document(text);

    this.setDocument(text);
    this.selection = new Selection(this);

    config.resetOptions(this);
    this.setMode(mode);
    config._signal("session", this);
};


(function() {

    oop.implement(this, EventEmitter);
    this.setDocument = function(doc) {
        if (this.doc)
            this.doc.removeListener("change", this.$onChange);

        this.doc = doc;
        doc.on("change", this.$onChange);

        if (this.bgTokenizer)
            this.bgTokenizer.setDocument(this.getDocument());

        this.resetCaches();
    };
    this.getDocument = function() {
        return this.doc;
    };
    this.$resetRowCache = function(docRow) {
        if (!docRow) {
            this.$docRowCache = [];
            this.$screenRowCache = [];
            return;
        }
        var l = this.$docRowCache.length;
        var i = this.$getRowCacheIndex(this.$docRowCache, docRow) + 1;
        if (l > i) {
            this.$docRowCache.splice(i, l);
            this.$screenRowCache.splice(i, l);
        }
    };

    this.$getRowCacheIndex = function(cacheArray, val) {
        var low = 0;
        var hi = cacheArray.length - 1;

        while (low <= hi) {
            var mid = (low + hi) >> 1;
            var c = cacheArray[mid];

            if (val > c)
                low = mid + 1;
            else if (val < c)
                hi = mid - 1;
            else
                return mid;
        }

        return low -1;
    };

    this.resetCaches = function() {
        this.$modified = true;
        this.$wrapData = [];
        this.$rowLengthCache = [];
        this.$resetRowCache(0);
        if (this.bgTokenizer)
            this.bgTokenizer.start(0);
    };

    this.onChangeFold = function(e) {
        var fold = e.data;
        this.$resetRowCache(fold.start.row);
    };

    this.onChange = function(e) {
        var delta = e.data;
        this.$modified = true;

        this.$resetRowCache(delta.range.start.row);

        var removedFolds = this.$updateInternalDataOnChange(e);
        if (!this.$fromUndo && this.$undoManager && !delta.ignore) {
            this.$deltasDoc.push(delta);
            if (removedFolds && removedFolds.length != 0) {
                this.$deltasFold.push({
                    action: "removeFolds",
                    folds:  removedFolds
                });
            }

            this.$informUndoManager.schedule();
        }

        this.bgTokenizer && this.bgTokenizer.$updateOnChange(delta);
        this._signal("change", e);
    };
    this.setValue = function(text) {
        this.doc.setValue(text);
        this.selection.moveTo(0, 0);

        this.$resetRowCache(0);
        this.$deltas = [];
        this.$deltasDoc = [];
        this.$deltasFold = [];
        this.setUndoManager(this.$undoManager);
        this.getUndoManager().reset();
    };
    this.getValue =
    this.toString = function() {
        return this.doc.getValue();
    };
    this.getSelection = function() {
        return this.selection;
    };
    this.getState = function(row) {
        return this.bgTokenizer.getState(row);
    };
    this.getTokens = function(row) {
        return this.bgTokenizer.getTokens(row);
    };
    this.getTokenAt = function(row, column) {
        var tokens = this.bgTokenizer.getTokens(row);
        var token, c = 0;
        if (column == null) {
            i = tokens.length - 1;
            c = this.getLine(row).length;
        } else {
            for (var i = 0; i < tokens.length; i++) {
                c += tokens[i].value.length;
                if (c >= column)
                    break;
            }
        }
        token = tokens[i];
        if (!token)
            return null;
        token.index = i;
        token.start = c - token.value.length;
        return token;
    };
    this.setUndoManager = function(undoManager) {
        this.$undoManager = undoManager;
        this.$deltas = [];
        this.$deltasDoc = [];
        this.$deltasFold = [];

        if (this.$informUndoManager)
            this.$informUndoManager.cancel();

        if (undoManager) {
            var self = this;

            this.$syncInformUndoManager = function() {
                self.$informUndoManager.cancel();

                if (self.$deltasFold.length) {
                    self.$deltas.push({
                        group: "fold",
                        deltas: self.$deltasFold
                    });
                    self.$deltasFold = [];
                }

                if (self.$deltasDoc.length) {
                    self.$deltas.push({
                        group: "doc",
                        deltas: self.$deltasDoc
                    });
                    self.$deltasDoc = [];
                }

                if (self.$deltas.length > 0) {
                    undoManager.execute({
                        action: "aceupdate",
                        args: [self.$deltas, self],
                        merge: self.mergeUndoDeltas
                    });
                }
                self.mergeUndoDeltas = false;
                self.$deltas = [];
            };
            this.$informUndoManager = lang.delayedCall(this.$syncInformUndoManager);
        }
    };
    this.markUndoGroup = function() {
        if (this.$syncInformUndoManager)
            this.$syncInformUndoManager();
    };
    
    this.$defaultUndoManager = {
        undo: function() {},
        redo: function() {},
        reset: function() {}
    };
    this.getUndoManager = function() {
        return this.$undoManager || this.$defaultUndoManager;
    };
    this.getTabString = function() {
        if (this.getUseSoftTabs()) {
            return lang.stringRepeat(" ", this.getTabSize());
        } else {
            return "\t";
        }
    };
    this.setUseSoftTabs = function(val) {
        this.setOption("useSoftTabs", val);
    };
    this.getUseSoftTabs = function() {
        return this.$useSoftTabs && !this.$mode.$indentWithTabs;
    };
    this.setTabSize = function(tabSize) {
        this.setOption("tabSize", tabSize);
    };
    this.getTabSize = function() {
        return this.$tabSize;
    };
    this.isTabStop = function(position) {
        return this.$useSoftTabs && (position.column % this.$tabSize === 0);
    };

    this.$overwrite = false;
    this.setOverwrite = function(overwrite) {
        this.setOption("overwrite", overwrite);
    };
    this.getOverwrite = function() {
        return this.$overwrite;
    };
    this.toggleOverwrite = function() {
        this.setOverwrite(!this.$overwrite);
    };
    this.addGutterDecoration = function(row, className) {
        if (!this.$decorations[row])
            this.$decorations[row] = "";
        this.$decorations[row] += " " + className;
        this._signal("changeBreakpoint", {});
    };
    this.removeGutterDecoration = function(row, className) {
        this.$decorations[row] = (this.$decorations[row] || "").replace(" " + className, "");
        this._signal("changeBreakpoint", {});
    };
    this.getBreakpoints = function() {
        return this.$breakpoints;
    };
    this.setBreakpoints = function(rows) {
        this.$breakpoints = [];
        for (var i=0; i<rows.length; i++) {
            this.$breakpoints[rows[i]] = "ace_breakpoint";
        }
        this._signal("changeBreakpoint", {});
    };
    this.clearBreakpoints = function() {
        this.$breakpoints = [];
        this._signal("changeBreakpoint", {});
    };
    this.setBreakpoint = function(row, className) {
        if (className === undefined)
            className = "ace_breakpoint";
        if (className)
            this.$breakpoints[row] = className;
        else
            delete this.$breakpoints[row];
        this._signal("changeBreakpoint", {});
    };
    this.clearBreakpoint = function(row) {
        delete this.$breakpoints[row];
        this._signal("changeBreakpoint", {});
    };
    this.addMarker = function(range, clazz, type, inFront) {
        var id = this.$markerId++;

        var marker = {
            range : range,
            type : type || "line",
            renderer: typeof type == "function" ? type : null,
            clazz : clazz,
            inFront: !!inFront,
            id: id
        };

        if (inFront) {
            this.$frontMarkers[id] = marker;
            this._signal("changeFrontMarker");
        } else {
            this.$backMarkers[id] = marker;
            this._signal("changeBackMarker");
        }

        return id;
    };
    this.addDynamicMarker = function(marker, inFront) {
        if (!marker.update)
            return;
        var id = this.$markerId++;
        marker.id = id;
        marker.inFront = !!inFront;

        if (inFront) {
            this.$frontMarkers[id] = marker;
            this._signal("changeFrontMarker");
        } else {
            this.$backMarkers[id] = marker;
            this._signal("changeBackMarker");
        }

        return marker;
    };
    this.removeMarker = function(markerId) {
        var marker = this.$frontMarkers[markerId] || this.$backMarkers[markerId];
        if (!marker)
            return;

        var markers = marker.inFront ? this.$frontMarkers : this.$backMarkers;
        if (marker) {
            delete (markers[markerId]);
            this._signal(marker.inFront ? "changeFrontMarker" : "changeBackMarker");
        }
    };
    this.getMarkers = function(inFront) {
        return inFront ? this.$frontMarkers : this.$backMarkers;
    };

    this.highlight = function(re) {
        if (!this.$searchHighlight) {
            var highlight = new SearchHighlight(null, "ace_selected-word", "text");
            this.$searchHighlight = this.addDynamicMarker(highlight);
        }
        this.$searchHighlight.setRegexp(re);
    };
    this.highlightLines = function(startRow, endRow, clazz, inFront) {
        if (typeof endRow != "number") {
            clazz = endRow;
            endRow = startRow;
        }
        if (!clazz)
            clazz = "ace_step";

        var range = new Range(startRow, 0, endRow, Infinity);
        range.id = this.addMarker(range, clazz, "fullLine", inFront);
        return range;
    };
    this.setAnnotations = function(annotations) {
        this.$annotations = annotations;
        this._signal("changeAnnotation", {});
    };
    this.getAnnotations = function() {
        return this.$annotations || [];
    };
    this.clearAnnotations = function() {
        this.setAnnotations([]);
    };
    this.$detectNewLine = function(text) {
        var match = text.match(/^.*?(\r?\n)/m);
        if (match) {
            this.$autoNewLine = match[1];
        } else {
            this.$autoNewLine = "\n";
        }
    };
    this.getWordRange = function(row, column) {
        var line = this.getLine(row);

        var inToken = false;
        if (column > 0)
            inToken = !!line.charAt(column - 1).match(this.tokenRe);

        if (!inToken)
            inToken = !!line.charAt(column).match(this.tokenRe);

        if (inToken)
            var re = this.tokenRe;
        else if (/^\s+$/.test(line.slice(column-1, column+1)))
            var re = /\s/;
        else
            var re = this.nonTokenRe;

        var start = column;
        if (start > 0) {
            do {
                start--;
            }
            while (start >= 0 && line.charAt(start).match(re));
            start++;
        }

        var end = column;
        while (end < line.length && line.charAt(end).match(re)) {
            end++;
        }

        return new Range(row, start, row, end);
    };
    this.getAWordRange = function(row, column) {
        var wordRange = this.getWordRange(row, column);
        var line = this.getLine(wordRange.end.row);

        while (line.charAt(wordRange.end.column).match(/[ \t]/)) {
            wordRange.end.column += 1;
        }
        return wordRange;
    };
    this.setNewLineMode = function(newLineMode) {
        this.doc.setNewLineMode(newLineMode);
    };
    this.getNewLineMode = function() {
        return this.doc.getNewLineMode();
    };
    this.setUseWorker = function(useWorker) { this.setOption("useWorker", useWorker); };
    this.getUseWorker = function() { return this.$useWorker; };
    this.onReloadTokenizer = function(e) {
        var rows = e.data;
        this.bgTokenizer.start(rows.first);
        this._signal("tokenizerUpdate", e);
    };

    this.$modes = {};
    this.$mode = null;
    this.$modeId = null;
    this.setMode = function(mode, cb) {
        if (mode && typeof mode === "object") {
            if (mode.getTokenizer)
                return this.$onChangeMode(mode);
            var options = mode;
            var path = options.path;
        } else {
            path = mode || "ace/mode/text";
        }
        if (!this.$modes["ace/mode/text"])
            this.$modes["ace/mode/text"] = new TextMode();

        if (this.$modes[path] && !options) {
            this.$onChangeMode(this.$modes[path]);
            cb && cb();
            return;
        }
        this.$modeId = path;
        config.loadModule(["mode", path], function(m) {
            if (this.$modeId !== path)
                return cb && cb();
            if (this.$modes[path] && !options) {
                this.$onChangeMode(this.$modes[path]);
            } else if (m && m.Mode) {
                m = new m.Mode(options);
                if (!options) {
                    this.$modes[path] = m;
                    m.$id = path;
                }
                this.$onChangeMode(m);
            }
            cb && cb();
        }.bind(this));
        if (!this.$mode)
            this.$onChangeMode(this.$modes["ace/mode/text"], true);
    };

    this.$onChangeMode = function(mode, $isPlaceholder) {
        if (!$isPlaceholder)
            this.$modeId = mode.$id;
        if (this.$mode === mode) 
            return;

        this.$mode = mode;

        this.$stopWorker();

        if (this.$useWorker)
            this.$startWorker();

        var tokenizer = mode.getTokenizer();

        if(tokenizer.addEventListener !== undefined) {
            var onReloadTokenizer = this.onReloadTokenizer.bind(this);
            tokenizer.addEventListener("update", onReloadTokenizer);
        }

        if (!this.bgTokenizer) {
            this.bgTokenizer = new BackgroundTokenizer(tokenizer);
            var _self = this;
            this.bgTokenizer.addEventListener("update", function(e) {
                _self._signal("tokenizerUpdate", e);
            });
        } else {
            this.bgTokenizer.setTokenizer(tokenizer);
        }

        this.bgTokenizer.setDocument(this.getDocument());

        this.tokenRe = mode.tokenRe;
        this.nonTokenRe = mode.nonTokenRe;

        
        if (!$isPlaceholder) {
            if (mode.attachToSession)
                mode.attachToSession(this);
            this.$options.wrapMethod.set.call(this, this.$wrapMethod);
            this.$setFolding(mode.foldingRules);
            this.bgTokenizer.start(0);
            this._emit("changeMode");
        }
    };

    this.$stopWorker = function() {
        if (this.$worker) {
            this.$worker.terminate();
            this.$worker = null;
        }
    };

    this.$startWorker = function() {
        try {
            this.$worker = this.$mode.createWorker(this);
        } catch (e) {
            config.warn("Could not load worker", e);
            this.$worker = null;
        }
    };
    this.getMode = function() {
        return this.$mode;
    };

    this.$scrollTop = 0;
    this.setScrollTop = function(scrollTop) {
        if (this.$scrollTop === scrollTop || isNaN(scrollTop))
            return;

        this.$scrollTop = scrollTop;
        this._signal("changeScrollTop", scrollTop);
    };
    this.getScrollTop = function() {
        return this.$scrollTop;
    };

    this.$scrollLeft = 0;
    this.setScrollLeft = function(scrollLeft) {
        if (this.$scrollLeft === scrollLeft || isNaN(scrollLeft))
            return;

        this.$scrollLeft = scrollLeft;
        this._signal("changeScrollLeft", scrollLeft);
    };
    this.getScrollLeft = function() {
        return this.$scrollLeft;
    };
    this.getScreenWidth = function() {
        this.$computeWidth();
        if (this.lineWidgets) 
            return Math.max(this.getLineWidgetMaxWidth(), this.screenWidth);
        return this.screenWidth;
    };
    
    this.getLineWidgetMaxWidth = function() {
        if (this.lineWidgetsWidth != null) return this.lineWidgetsWidth;
        var width = 0;
        this.lineWidgets.forEach(function(w) {
            if (w && w.screenWidth > width)
                width = w.screenWidth;
        });
        return this.lineWidgetWidth = width;
    };

    this.$computeWidth = function(force) {
        if (this.$modified || force) {
            this.$modified = false;

            if (this.$useWrapMode)
                return this.screenWidth = this.$wrapLimit;

            var lines = this.doc.getAllLines();
            var cache = this.$rowLengthCache;
            var longestScreenLine = 0;
            var foldIndex = 0;
            var foldLine = this.$foldData[foldIndex];
            var foldStart = foldLine ? foldLine.start.row : Infinity;
            var len = lines.length;

            for (var i = 0; i < len; i++) {
                if (i > foldStart) {
                    i = foldLine.end.row + 1;
                    if (i >= len)
                        break;
                    foldLine = this.$foldData[foldIndex++];
                    foldStart = foldLine ? foldLine.start.row : Infinity;
                }

                if (cache[i] == null)
                    cache[i] = this.$getStringScreenWidth(lines[i])[0];

                if (cache[i] > longestScreenLine)
                    longestScreenLine = cache[i];
            }
            this.screenWidth = longestScreenLine;
        }
    };
    this.getLine = function(row) {
        return this.doc.getLine(row);
    };
    this.getLines = function(firstRow, lastRow) {
        return this.doc.getLines(firstRow, lastRow);
    };
    this.getLength = function() {
        return this.doc.getLength();
    };
    this.getTextRange = function(range) {
        return this.doc.getTextRange(range || this.selection.getRange());
    };
    this.insert = function(position, text) {
        return this.doc.insert(position, text);
    };
    this.remove = function(range) {
        return this.doc.remove(range);
    };
    this.undoChanges = function(deltas, dontSelect) {
        if (!deltas.length)
            return;

        this.$fromUndo = true;
        var lastUndoRange = null;
        for (var i = deltas.length - 1; i != -1; i--) {
            var delta = deltas[i];
            if (delta.group == "doc") {
                this.doc.revertDeltas(delta.deltas);
                lastUndoRange =
                    this.$getUndoSelection(delta.deltas, true, lastUndoRange);
            } else {
                delta.deltas.forEach(function(foldDelta) {
                    this.addFolds(foldDelta.folds);
                }, this);
            }
        }
        this.$fromUndo = false;
        lastUndoRange &&
            this.$undoSelect &&
            !dontSelect &&
            this.selection.setSelectionRange(lastUndoRange);
        return lastUndoRange;
    };
    this.redoChanges = function(deltas, dontSelect) {
        if (!deltas.length)
            return;

        this.$fromUndo = true;
        var lastUndoRange = null;
        for (var i = 0; i < deltas.length; i++) {
            var delta = deltas[i];
            if (delta.group == "doc") {
                this.doc.applyDeltas(delta.deltas);
                lastUndoRange =
                    this.$getUndoSelection(delta.deltas, false, lastUndoRange);
            }
        }
        this.$fromUndo = false;
        lastUndoRange &&
            this.$undoSelect &&
            !dontSelect &&
            this.selection.setSelectionRange(lastUndoRange);
        return lastUndoRange;
    };
    this.setUndoSelect = function(enable) {
        this.$undoSelect = enable;
    };

    this.$getUndoSelection = function(deltas, isUndo, lastUndoRange) {
        function isInsert(delta) {
            var insert =
                delta.action === "insertText" || delta.action === "insertLines";
            return isUndo ? !insert : insert;
        }

        var delta = deltas[0];
        var range, point;
        var lastDeltaIsInsert = false;
        if (isInsert(delta)) {
            range = Range.fromPoints(delta.range.start, delta.range.end);
            lastDeltaIsInsert = true;
        } else {
            range = Range.fromPoints(delta.range.start, delta.range.start);
            lastDeltaIsInsert = false;
        }

        for (var i = 1; i < deltas.length; i++) {
            delta = deltas[i];
            if (isInsert(delta)) {
                point = delta.range.start;
                if (range.compare(point.row, point.column) == -1) {
                    range.setStart(delta.range.start);
                }
                point = delta.range.end;
                if (range.compare(point.row, point.column) == 1) {
                    range.setEnd(delta.range.end);
                }
                lastDeltaIsInsert = true;
            } else {
                point = delta.range.start;
                if (range.compare(point.row, point.column) == -1) {
                    range =
                        Range.fromPoints(delta.range.start, delta.range.start);
                }
                lastDeltaIsInsert = false;
            }
        }
        if (lastUndoRange != null) {
            if (Range.comparePoints(lastUndoRange.start, range.start) === 0) {
                lastUndoRange.start.column += range.end.column - range.start.column;
                lastUndoRange.end.column += range.end.column - range.start.column;
            }

            var cmp = lastUndoRange.compareRange(range);
            if (cmp == 1) {
                range.setStart(lastUndoRange.start);
            } else if (cmp == -1) {
                range.setEnd(lastUndoRange.end);
            }
        }

        return range;
    };
    this.replace = function(range, text) {
        return this.doc.replace(range, text);
    };
    this.moveText = function(fromRange, toPosition, copy) {
        var text = this.getTextRange(fromRange);
        var folds = this.getFoldsInRange(fromRange);

        var toRange = Range.fromPoints(toPosition, toPosition);
        if (!copy) {
            this.remove(fromRange);
            var rowDiff = fromRange.start.row - fromRange.end.row;
            var collDiff = rowDiff ? -fromRange.end.column : fromRange.start.column - fromRange.end.column;
            if (collDiff) {
                if (toRange.start.row == fromRange.end.row && toRange.start.column > fromRange.end.column)
                    toRange.start.column += collDiff;
                if (toRange.end.row == fromRange.end.row && toRange.end.column > fromRange.end.column)
                    toRange.end.column += collDiff;
            }
            if (rowDiff && toRange.start.row >= fromRange.end.row) {
                toRange.start.row += rowDiff;
                toRange.end.row += rowDiff;
            }
        }

        toRange.end = this.insert(toRange.start, text);
        if (folds.length) {
            var oldStart = fromRange.start;
            var newStart = toRange.start;
            var rowDiff = newStart.row - oldStart.row;
            var collDiff = newStart.column - oldStart.column;
            this.addFolds(folds.map(function(x) {
                x = x.clone();
                if (x.start.row == oldStart.row)
                    x.start.column += collDiff;
                if (x.end.row == oldStart.row)
                    x.end.column += collDiff;
                x.start.row += rowDiff;
                x.end.row += rowDiff;
                return x;
            }));
        }

        return toRange;
    };
    this.indentRows = function(startRow, endRow, indentString) {
        indentString = indentString.replace(/\t/g, this.getTabString());
        for (var row=startRow; row<=endRow; row++)
            this.insert({row: row, column:0}, indentString);
    };
    this.outdentRows = function (range) {
        var rowRange = range.collapseRows();
        var deleteRange = new Range(0, 0, 0, 0);
        var size = this.getTabSize();

        for (var i = rowRange.start.row; i <= rowRange.end.row; ++i) {
            var line = this.getLine(i);

            deleteRange.start.row = i;
            deleteRange.end.row = i;
            for (var j = 0; j < size; ++j)
                if (line.charAt(j) != ' ')
                    break;
            if (j < size && line.charAt(j) == '\t') {
                deleteRange.start.column = j;
                deleteRange.end.column = j + 1;
            } else {
                deleteRange.start.column = 0;
                deleteRange.end.column = j;
            }
            this.remove(deleteRange);
        }
    };

    this.$moveLines = function(firstRow, lastRow, dir) {
        firstRow = this.getRowFoldStart(firstRow);
        lastRow = this.getRowFoldEnd(lastRow);
        if (dir < 0) {
            var row = this.getRowFoldStart(firstRow + dir);
            if (row < 0) return 0;
            var diff = row-firstRow;
        } else if (dir > 0) {
            var row = this.getRowFoldEnd(lastRow + dir);
            if (row > this.doc.getLength()-1) return 0;
            var diff = row-lastRow;
        } else {
            firstRow = this.$clipRowToDocument(firstRow);
            lastRow = this.$clipRowToDocument(lastRow);
            var diff = lastRow - firstRow + 1;
        }

        var range = new Range(firstRow, 0, lastRow, Number.MAX_VALUE);
        var folds = this.getFoldsInRange(range).map(function(x){
            x = x.clone();
            x.start.row += diff;
            x.end.row += diff;
            return x;
        });

        var lines = dir == 0
            ? this.doc.getLines(firstRow, lastRow)
            : this.doc.removeLines(firstRow, lastRow);
        this.doc.insertLines(firstRow+diff, lines);
        folds.length && this.addFolds(folds);
        return diff;
    };
    this.moveLinesUp = function(firstRow, lastRow) {
        return this.$moveLines(firstRow, lastRow, -1);
    };
    this.moveLinesDown = function(firstRow, lastRow) {
        return this.$moveLines(firstRow, lastRow, 1);
    };
    this.duplicateLines = function(firstRow, lastRow) {
        return this.$moveLines(firstRow, lastRow, 0);
    };


    this.$clipRowToDocument = function(row) {
        return Math.max(0, Math.min(row, this.doc.getLength()-1));
    };

    this.$clipColumnToRow = function(row, column) {
        if (column < 0)
            return 0;
        return Math.min(this.doc.getLine(row).length, column);
    };


    this.$clipPositionToDocument = function(row, column) {
        column = Math.max(0, column);

        if (row < 0) {
            row = 0;
            column = 0;
        } else {
            var len = this.doc.getLength();
            if (row >= len) {
                row = len - 1;
                column = this.doc.getLine(len-1).length;
            } else {
                column = Math.min(this.doc.getLine(row).length, column);
            }
        }

        return {
            row: row,
            column: column
        };
    };

    this.$clipRangeToDocument = function(range) {
        if (range.start.row < 0) {
            range.start.row = 0;
            range.start.column = 0;
        } else {
            range.start.column = this.$clipColumnToRow(
                range.start.row,
                range.start.column
            );
        }

        var len = this.doc.getLength() - 1;
        if (range.end.row > len) {
            range.end.row = len;
            range.end.column = this.doc.getLine(len).length;
        } else {
            range.end.column = this.$clipColumnToRow(
                range.end.row,
                range.end.column
            );
        }
        return range;
    };
    this.$wrapLimit = 80;
    this.$useWrapMode = false;
    this.$wrapLimitRange = {
        min : null,
        max : null
    };
    this.setUseWrapMode = function(useWrapMode) {
        if (useWrapMode != this.$useWrapMode) {
            this.$useWrapMode = useWrapMode;
            this.$modified = true;
            this.$resetRowCache(0);
            if (useWrapMode) {
                var len = this.getLength();
                this.$wrapData = Array(len);
                this.$updateWrapData(0, len - 1);
            }

            this._signal("changeWrapMode");
        }
    };
    this.getUseWrapMode = function() {
        return this.$useWrapMode;
    };
    this.setWrapLimitRange = function(min, max) {
        if (this.$wrapLimitRange.min !== min || this.$wrapLimitRange.max !== max) {
            this.$wrapLimitRange = { min: min, max: max };
            this.$modified = true;
            if (this.$useWrapMode)
                this._signal("changeWrapMode");
        }
    };
    this.adjustWrapLimit = function(desiredLimit, $printMargin) {
        var limits = this.$wrapLimitRange;
        if (limits.max < 0)
            limits = {min: $printMargin, max: $printMargin};
        var wrapLimit = this.$constrainWrapLimit(desiredLimit, limits.min, limits.max);
        if (wrapLimit != this.$wrapLimit && wrapLimit > 1) {
            this.$wrapLimit = wrapLimit;
            this.$modified = true;
            if (this.$useWrapMode) {
                this.$updateWrapData(0, this.getLength() - 1);
                this.$resetRowCache(0);
                this._signal("changeWrapLimit");
            }
            return true;
        }
        return false;
    };

    this.$constrainWrapLimit = function(wrapLimit, min, max) {
        if (min)
            wrapLimit = Math.max(min, wrapLimit);

        if (max)
            wrapLimit = Math.min(max, wrapLimit);

        return wrapLimit;
    };
    this.getWrapLimit = function() {
        return this.$wrapLimit;
    };
    this.setWrapLimit = function (limit) {
        this.setWrapLimitRange(limit, limit);
    };
    this.getWrapLimitRange = function() {
        return {
            min : this.$wrapLimitRange.min,
            max : this.$wrapLimitRange.max
        };
    };

    this.$updateInternalDataOnChange = function(e) {
        var useWrapMode = this.$useWrapMode;
        var len;
        var action = e.data.action;
        var firstRow = e.data.range.start.row;
        var lastRow = e.data.range.end.row;
        var start = e.data.range.start;
        var end = e.data.range.end;
        var removedFolds = null;

        if (action.indexOf("Lines") != -1) {
            if (action == "insertLines") {
                lastRow = firstRow + (e.data.lines.length);
            } else {
                lastRow = firstRow;
            }
            len = e.data.lines ? e.data.lines.length : lastRow - firstRow;
        } else {
            len = lastRow - firstRow;
        }

        this.$updating = true;
        if (len != 0) {
            if (action.indexOf("remove") != -1) {
                this[useWrapMode ? "$wrapData" : "$rowLengthCache"].splice(firstRow, len);

                var foldLines = this.$foldData;
                removedFolds = this.getFoldsInRange(e.data.range);
                this.removeFolds(removedFolds);

                var foldLine = this.getFoldLine(end.row);
                var idx = 0;
                if (foldLine) {
                    foldLine.addRemoveChars(end.row, end.column, start.column - end.column);
                    foldLine.shiftRow(-len);

                    var foldLineBefore = this.getFoldLine(firstRow);
                    if (foldLineBefore && foldLineBefore !== foldLine) {
                        foldLineBefore.merge(foldLine);
                        foldLine = foldLineBefore;
                    }
                    idx = foldLines.indexOf(foldLine) + 1;
                }

                for (idx; idx < foldLines.length; idx++) {
                    var foldLine = foldLines[idx];
                    if (foldLine.start.row >= end.row) {
                        foldLine.shiftRow(-len);
                    }
                }

                lastRow = firstRow;
            } else {
                var args = Array(len);
                args.unshift(firstRow, 0);
                var arr = useWrapMode ? this.$wrapData : this.$rowLengthCache
                arr.splice.apply(arr, args);
                var foldLines = this.$foldData;
                var foldLine = this.getFoldLine(firstRow);
                var idx = 0;
                if (foldLine) {
                    var cmp = foldLine.range.compareInside(start.row, start.column);
                    if (cmp == 0) {
                        foldLine = foldLine.split(start.row, start.column);
                        if (foldLine) {
                            foldLine.shiftRow(len);
                            foldLine.addRemoveChars(lastRow, 0, end.column - start.column);
                        }
                    } else
                    if (cmp == -1) {
                        foldLine.addRemoveChars(firstRow, 0, end.column - start.column);
                        foldLine.shiftRow(len);
                    }
                    idx = foldLines.indexOf(foldLine) + 1;
                }

                for (idx; idx < foldLines.length; idx++) {
                    var foldLine = foldLines[idx];
                    if (foldLine.start.row >= firstRow) {
                        foldLine.shiftRow(len);
                    }
                }
            }
        } else {
            len = Math.abs(e.data.range.start.column - e.data.range.end.column);
            if (action.indexOf("remove") != -1) {
                removedFolds = this.getFoldsInRange(e.data.range);
                this.removeFolds(removedFolds);

                len = -len;
            }
            var foldLine = this.getFoldLine(firstRow);
            if (foldLine) {
                foldLine.addRemoveChars(firstRow, start.column, len);
            }
        }

        if (useWrapMode && this.$wrapData.length != this.doc.getLength()) {
            console.error("doc.getLength() and $wrapData.length have to be the same!");
        }
        this.$updating = false;

        if (useWrapMode)
            this.$updateWrapData(firstRow, lastRow);
        else
            this.$updateRowLengthCache(firstRow, lastRow);

        return removedFolds;
    };

    this.$updateRowLengthCache = function(firstRow, lastRow, b) {
        this.$rowLengthCache[firstRow] = null;
        this.$rowLengthCache[lastRow] = null;
    };

    this.$updateWrapData = function(firstRow, lastRow) {
        var lines = this.doc.getAllLines();
        var tabSize = this.getTabSize();
        var wrapData = this.$wrapData;
        var wrapLimit = this.$wrapLimit;
        var tokens;
        var foldLine;

        var row = firstRow;
        lastRow = Math.min(lastRow, lines.length - 1);
        while (row <= lastRow) {
            foldLine = this.getFoldLine(row, foldLine);
            if (!foldLine) {
                tokens = this.$getDisplayTokens(lines[row]);
                wrapData[row] = this.$computeWrapSplits(tokens, wrapLimit, tabSize);
                row ++;
            } else {
                tokens = [];
                foldLine.walk(function(placeholder, row, column, lastColumn) {
                        var walkTokens;
                        if (placeholder != null) {
                            walkTokens = this.$getDisplayTokens(
                                            placeholder, tokens.length);
                            walkTokens[0] = PLACEHOLDER_START;
                            for (var i = 1; i < walkTokens.length; i++) {
                                walkTokens[i] = PLACEHOLDER_BODY;
                            }
                        } else {
                            walkTokens = this.$getDisplayTokens(
                                lines[row].substring(lastColumn, column),
                                tokens.length);
                        }
                        tokens = tokens.concat(walkTokens);
                    }.bind(this),
                    foldLine.end.row,
                    lines[foldLine.end.row].length + 1
                );

                wrapData[foldLine.start.row] = this.$computeWrapSplits(tokens, wrapLimit, tabSize);
                row = foldLine.end.row + 1;
            }
        }
    };
    var CHAR = 1,
        CHAR_EXT = 2,
        PLACEHOLDER_START = 3,
        PLACEHOLDER_BODY =  4,
        PUNCTUATION = 9,
        SPACE = 10,
        TAB = 11,
        TAB_SPACE = 12;


    this.$computeWrapSplits = function(tokens, wrapLimit) {
        if (tokens.length == 0) {
            return [];
        }

        var splits = [];
        var displayLength = tokens.length;
        var lastSplit = 0, lastDocSplit = 0;

        var isCode = this.$wrapAsCode;

        function addSplit(screenPos) {
            var displayed = tokens.slice(lastSplit, screenPos);
            var len = displayed.length;
            displayed.join("").
                replace(/12/g, function() {
                    len -= 1;
                }).
                replace(/2/g, function() {
                    len -= 1;
                });

            lastDocSplit += len;
            splits.push(lastDocSplit);
            lastSplit = screenPos;
        }

        while (displayLength - lastSplit > wrapLimit) {
            var split = lastSplit + wrapLimit;
            if (tokens[split - 1] >= SPACE && tokens[split] >= SPACE) {
                addSplit(split);
                continue;
            }
            if (tokens[split] == PLACEHOLDER_START || tokens[split] == PLACEHOLDER_BODY) {
                for (split; split != lastSplit - 1; split--) {
                    if (tokens[split] == PLACEHOLDER_START) {
                        break;
                    }
                }
                if (split > lastSplit) {
                    addSplit(split);
                    continue;
                }
                split = lastSplit + wrapLimit;
                for (split; split < tokens.length; split++) {
                    if (tokens[split] != PLACEHOLDER_BODY) {
                        break;
                    }
                }
                if (split == tokens.length) {
                    break;  // Breaks the while-loop.
                }
                addSplit(split);
                continue;
            }
            var minSplit = Math.max(split - (isCode ? 10 : wrapLimit-(wrapLimit>>2)), lastSplit - 1);
            while (split > minSplit && tokens[split] < PLACEHOLDER_START) {
                split --;
            }
            if (isCode) {
                while (split > minSplit && tokens[split] < PLACEHOLDER_START) {
                    split --;
                }
                while (split > minSplit && tokens[split] == PUNCTUATION) {
                    split --;
                }
            } else {
                while (split > minSplit && tokens[split] < SPACE) {
                    split --;
                }
            }
            if (split > minSplit) {
                addSplit(++split);
                continue;
            }
            split = lastSplit + wrapLimit;
            if (tokens[split] == CHAR_EXT)
                split--;
            addSplit(split);
        }
        return splits;
    };
    this.$getDisplayTokens = function(str, offset) {
        var arr = [];
        var tabSize;
        offset = offset || 0;

        for (var i = 0; i < str.length; i++) {
            var c = str.charCodeAt(i);
            if (c == 9) {
                tabSize = this.getScreenTabSize(arr.length + offset);
                arr.push(TAB);
                for (var n = 1; n < tabSize; n++) {
                    arr.push(TAB_SPACE);
                }
            }
            else if (c == 32) {
                arr.push(SPACE);
            } else if((c > 39 && c < 48) || (c > 57 && c < 64)) {
                arr.push(PUNCTUATION);
            }
            else if (c >= 0x1100 && isFullWidth(c)) {
                arr.push(CHAR, CHAR_EXT);
            } else {
                arr.push(CHAR);
            }
        }
        return arr;
    };
    this.$getStringScreenWidth = function(str, maxScreenColumn, screenColumn) {
        if (maxScreenColumn == 0)
            return [0, 0];
        if (maxScreenColumn == null)
            maxScreenColumn = Infinity;
        screenColumn = screenColumn || 0;

        var c, column;
        for (column = 0; column < str.length; column++) {
            c = str.charCodeAt(column);
            if (c == 9) {
                screenColumn += this.getScreenTabSize(screenColumn);
            }
            else if (c >= 0x1100 && isFullWidth(c)) {
                screenColumn += 2;
            } else {
                screenColumn += 1;
            }
            if (screenColumn > maxScreenColumn) {
                break;
            }
        }

        return [screenColumn, column];
    };

    this.lineWidgets = null;
    this.getRowLength = function(row) {
        if (this.lineWidgets)
            var h = this.lineWidgets[row] && this.lineWidgets[row].rowCount || 0;
        else 
            h = 0
        if (!this.$useWrapMode || !this.$wrapData[row]) {
            return 1 + h;
        } else {
            return this.$wrapData[row].length + 1 + h;
        }
    };
    this.getRowLineCount = function(row) {
        if (!this.$useWrapMode || !this.$wrapData[row]) {
            return 1;
        } else {
            return this.$wrapData[row].length + 1;
        }
    };
    this.getScreenLastRowColumn = function(screenRow) {
        var pos = this.screenToDocumentPosition(screenRow, Number.MAX_VALUE);
        return this.documentToScreenColumn(pos.row, pos.column);
    };
    this.getDocumentLastRowColumn = function(docRow, docColumn) {
        var screenRow = this.documentToScreenRow(docRow, docColumn);
        return this.getScreenLastRowColumn(screenRow);
    };
    this.getDocumentLastRowColumnPosition = function(docRow, docColumn) {
        var screenRow = this.documentToScreenRow(docRow, docColumn);
        return this.screenToDocumentPosition(screenRow, Number.MAX_VALUE / 10);
    };
    this.getRowSplitData = function(row) {
        if (!this.$useWrapMode) {
            return undefined;
        } else {
            return this.$wrapData[row];
        }
    };
    this.getScreenTabSize = function(screenColumn) {
        return this.$tabSize - screenColumn % this.$tabSize;
    };


    this.screenToDocumentRow = function(screenRow, screenColumn) {
        return this.screenToDocumentPosition(screenRow, screenColumn).row;
    };


    this.screenToDocumentColumn = function(screenRow, screenColumn) {
        return this.screenToDocumentPosition(screenRow, screenColumn).column;
    };
    this.screenToDocumentPosition = function(screenRow, screenColumn) {
        if (screenRow < 0)
            return {row: 0, column: 0};

        var line;
        var docRow = 0;
        var docColumn = 0;
        var column;
        var row = 0;
        var rowLength = 0;

        var rowCache = this.$screenRowCache;
        var i = this.$getRowCacheIndex(rowCache, screenRow);
        var l = rowCache.length;
        if (l && i >= 0) {
            var row = rowCache[i];
            var docRow = this.$docRowCache[i];
            var doCache = screenRow > rowCache[l - 1];
        } else {
            var doCache = !l;
        }

        var maxRow = this.getLength() - 1;
        var foldLine = this.getNextFoldLine(docRow);
        var foldStart = foldLine ? foldLine.start.row : Infinity;

        while (row <= screenRow) {
            rowLength = this.getRowLength(docRow);
            if (row + rowLength > screenRow || docRow >= maxRow) {
                break;
            } else {
                row += rowLength;
                docRow++;
                if (docRow > foldStart) {
                    docRow = foldLine.end.row+1;
                    foldLine = this.getNextFoldLine(docRow, foldLine);
                    foldStart = foldLine ? foldLine.start.row : Infinity;
                }
            }

            if (doCache) {
                this.$docRowCache.push(docRow);
                this.$screenRowCache.push(row);
            }
        }

        if (foldLine && foldLine.start.row <= docRow) {
            line = this.getFoldDisplayLine(foldLine);
            docRow = foldLine.start.row;
        } else if (row + rowLength <= screenRow || docRow > maxRow) {
            return {
                row: maxRow,
                column: this.getLine(maxRow).length
            };
        } else {
            line = this.getLine(docRow);
            foldLine = null;
        }

        if (this.$useWrapMode) {
            var splits = this.$wrapData[docRow];
            if (splits) {
                var splitIndex = Math.floor(screenRow - row);
                column = splits[splitIndex];
                if(splitIndex > 0 && splits.length) {
                    docColumn = splits[splitIndex - 1] || splits[splits.length - 1];
                    line = line.substring(docColumn);
                }
            }
        }

        docColumn += this.$getStringScreenWidth(line, screenColumn)[1];
        if (this.$useWrapMode && docColumn >= column)
            docColumn = column - 1;

        if (foldLine)
            return foldLine.idxToPosition(docColumn);

        return {row: docRow, column: docColumn};
    };
    this.documentToScreenPosition = function(docRow, docColumn) {
        if (typeof docColumn === "undefined")
            var pos = this.$clipPositionToDocument(docRow.row, docRow.column);
        else
            pos = this.$clipPositionToDocument(docRow, docColumn);

        docRow = pos.row;
        docColumn = pos.column;

        var screenRow = 0;
        var foldStartRow = null;
        var fold = null;
        fold = this.getFoldAt(docRow, docColumn, 1);
        if (fold) {
            docRow = fold.start.row;
            docColumn = fold.start.column;
        }

        var rowEnd, row = 0;


        var rowCache = this.$docRowCache;
        var i = this.$getRowCacheIndex(rowCache, docRow);
        var l = rowCache.length;
        if (l && i >= 0) {
            var row = rowCache[i];
            var screenRow = this.$screenRowCache[i];
            var doCache = docRow > rowCache[l - 1];
        } else {
            var doCache = !l;
        }

        var foldLine = this.getNextFoldLine(row);
        var foldStart = foldLine ?foldLine.start.row :Infinity;

        while (row < docRow) {
            if (row >= foldStart) {
                rowEnd = foldLine.end.row + 1;
                if (rowEnd > docRow)
                    break;
                foldLine = this.getNextFoldLine(rowEnd, foldLine);
                foldStart = foldLine ?foldLine.start.row :Infinity;
            }
            else {
                rowEnd = row + 1;
            }

            screenRow += this.getRowLength(row);
            row = rowEnd;

            if (doCache) {
                this.$docRowCache.push(row);
                this.$screenRowCache.push(screenRow);
            }
        }
        var textLine = "";
        if (foldLine && row >= foldStart) {
            textLine = this.getFoldDisplayLine(foldLine, docRow, docColumn);
            foldStartRow = foldLine.start.row;
        } else {
            textLine = this.getLine(docRow).substring(0, docColumn);
            foldStartRow = docRow;
        }
        if (this.$useWrapMode) {
            var wrapRow = this.$wrapData[foldStartRow];
            if (wrapRow) {
                var screenRowOffset = 0;
                while (textLine.length >= wrapRow[screenRowOffset]) {
                    screenRow ++;
                    screenRowOffset++;
                }
                textLine = textLine.substring(
                    wrapRow[screenRowOffset - 1] || 0, textLine.length
                );
            }
        }

        return {
            row: screenRow,
            column: this.$getStringScreenWidth(textLine)[0]
        };
    };
    this.documentToScreenColumn = function(row, docColumn) {
        return this.documentToScreenPosition(row, docColumn).column;
    };
    this.documentToScreenRow = function(docRow, docColumn) {
        return this.documentToScreenPosition(docRow, docColumn).row;
    };
    this.getScreenLength = function() {
        var screenRows = 0;
        var fold = null;
        if (!this.$useWrapMode) {
            screenRows = this.getLength();
            var foldData = this.$foldData;
            for (var i = 0; i < foldData.length; i++) {
                fold = foldData[i];
                screenRows -= fold.end.row - fold.start.row;
            }
        } else {
            var lastRow = this.$wrapData.length;
            var row = 0, i = 0;
            var fold = this.$foldData[i++];
            var foldStart = fold ? fold.start.row :Infinity;

            while (row < lastRow) {
                var splits = this.$wrapData[row];
                screenRows += splits ? splits.length + 1 : 1;
                row ++;
                if (row > foldStart) {
                    row = fold.end.row+1;
                    fold = this.$foldData[i++];
                    foldStart = fold ?fold.start.row :Infinity;
                }
            }
        }
        if (this.lineWidgets)
            screenRows += this.$getWidgetScreenLength();

        return screenRows;
    };
    this.$setFontMetrics = function(fm) {
    };
    
    this.destroy = function() {
        if (this.bgTokenizer) {
            this.bgTokenizer.setDocument(null);
            this.bgTokenizer = null;
        }
        this.$stopWorker();
    };
    function isFullWidth(c) {
        if (c < 0x1100)
            return false;
        return c >= 0x1100 && c <= 0x115F ||
               c >= 0x11A3 && c <= 0x11A7 ||
               c >= 0x11FA && c <= 0x11FF ||
               c >= 0x2329 && c <= 0x232A ||
               c >= 0x2E80 && c <= 0x2E99 ||
               c >= 0x2E9B && c <= 0x2EF3 ||
               c >= 0x2F00 && c <= 0x2FD5 ||
               c >= 0x2FF0 && c <= 0x2FFB ||
               c >= 0x3000 && c <= 0x303E ||
               c >= 0x3041 && c <= 0x3096 ||
               c >= 0x3099 && c <= 0x30FF ||
               c >= 0x3105 && c <= 0x312D ||
               c >= 0x3131 && c <= 0x318E ||
               c >= 0x3190 && c <= 0x31BA ||
               c >= 0x31C0 && c <= 0x31E3 ||
               c >= 0x31F0 && c <= 0x321E ||
               c >= 0x3220 && c <= 0x3247 ||
               c >= 0x3250 && c <= 0x32FE ||
               c >= 0x3300 && c <= 0x4DBF ||
               c >= 0x4E00 && c <= 0xA48C ||
               c >= 0xA490 && c <= 0xA4C6 ||
               c >= 0xA960 && c <= 0xA97C ||
               c >= 0xAC00 && c <= 0xD7A3 ||
               c >= 0xD7B0 && c <= 0xD7C6 ||
               c >= 0xD7CB && c <= 0xD7FB ||
               c >= 0xF900 && c <= 0xFAFF ||
               c >= 0xFE10 && c <= 0xFE19 ||
               c >= 0xFE30 && c <= 0xFE52 ||
               c >= 0xFE54 && c <= 0xFE66 ||
               c >= 0xFE68 && c <= 0xFE6B ||
               c >= 0xFF01 && c <= 0xFF60 ||
               c >= 0xFFE0 && c <= 0xFFE6;
    };

}).call(EditSession.prototype);

require("./edit_session/folding").Folding.call(EditSession.prototype);
require("./edit_session/bracket_match").BracketMatch.call(EditSession.prototype);


config.defineOptions(EditSession.prototype, "session", {
    wrap: {
        set: function(value) {
            if (!value || value == "off")
                value = false;
            else if (value == "free")
                value = true;
            else if (value == "printMargin")
                value = -1;
            else if (typeof value == "string")
                value = parseInt(value, 10) || false;

            if (this.$wrap == value)
                return;
            this.$wrap = value;
            if (!value) {
                this.setUseWrapMode(false);
            } else {
                var col = typeof value == "number" ? value : null;
                this.setWrapLimitRange(col, col);
                this.setUseWrapMode(true);
            }
        },
        get: function() {
            if (this.getUseWrapMode()) {
                if (this.$wrap == -1)
                    return "printMargin";
                if (!this.getWrapLimitRange().min)
                    return "free";
                return this.$wrap;
            }
            return "off";
        },
        handlesSet: true
    },    
    wrapMethod: {
        set: function(val) {
            val = val == "auto"
                ? this.$mode.type != "text"
                : val != "text";
            if (val != this.$wrapAsCode) {
                this.$wrapAsCode = val;
                if (this.$useWrapMode) {
                    this.$modified = true;
                    this.$resetRowCache(0);
                    this.$updateWrapData(0, this.getLength() - 1);
                }
            }
        },
        initialValue: "auto"
    },
    firstLineNumber: {
        set: function() {this._signal("changeBreakpoint");},
        initialValue: 1
    },
    useWorker: {
        set: function(useWorker) {
            this.$useWorker = useWorker;

            this.$stopWorker();
            if (useWorker)
                this.$startWorker();
        },
        initialValue: true
    },
    useSoftTabs: {initialValue: true},
    tabSize: {
        set: function(tabSize) {
            if (isNaN(tabSize) || this.$tabSize === tabSize) return;

            this.$modified = true;
            this.$rowLengthCache = [];
            this.$tabSize = tabSize;
            this._signal("changeTabSize");
        },
        initialValue: 4,
        handlesSet: true
    },
    overwrite: {
        set: function(val) {this._signal("changeOverwrite");},
        initialValue: false
    },
    newLineMode: {
        set: function(val) {this.doc.setNewLineMode(val)},
        get: function() {return this.doc.getNewLineMode()},
        handlesSet: true
    },
    mode: {
        set: function(val) { this.setMode(val) },
        get: function() { return this.$modeId }
    }
});

exports.EditSession = EditSession;
});

define("ace/search",["require","exports","module","ace/lib/lang","ace/lib/oop","ace/range"], function(require, exports, module) {
"use strict";

var lang = require("./lib/lang");
var oop = require("./lib/oop");
var Range = require("./range").Range;

var Search = function() {
    this.$options = {};
};

(function() {
    this.set = function(options) {
        oop.mixin(this.$options, options);
        return this;
    };
    this.getOptions = function() {
        return lang.copyObject(this.$options);
    };
    this.setOptions = function(options) {
        this.$options = options;
    };
    this.find = function(session) {
        var options = this.$options;
        var iterator = this.$matchIterator(session, options);
        if (!iterator)
            return false;

        var firstRange = null;
        iterator.forEach(function(range, row, offset) {
            if (!range.start) {
                var column = range.offset + (offset || 0);
                firstRange = new Range(row, column, row, column + range.length);
                if (!range.length && options.start && options.start.start
                    && options.skipCurrent != false && firstRange.isEqual(options.start)
                ) {
                    firstRange = null;
                    return false;
                }
            } else
                firstRange = range;
            return true;
        });

        return firstRange;
    };
    this.findAll = function(session) {
        var options = this.$options;
        if (!options.needle)
            return [];
        this.$assembleRegExp(options);

        var range = options.range;
        var lines = range
            ? session.getLines(range.start.row, range.end.row)
            : session.doc.getAllLines();

        var ranges = [];
        var re = options.re;
        if (options.$isMultiLine) {
            var len = re.length;
            var maxRow = lines.length - len;
            var prevRange;
            outer: for (var row = re.offset || 0; row <= maxRow; row++) {
                for (var j = 0; j < len; j++)
                    if (lines[row + j].search(re[j]) == -1)
                        continue outer;
                
                var startLine = lines[row];
                var line = lines[row + len - 1];
                var startIndex = startLine.length - startLine.match(re[0])[0].length;
                var endIndex = line.match(re[len - 1])[0].length;
                
                if (prevRange && prevRange.end.row === row &&
                    prevRange.end.column > startIndex
                ) {
                    continue;
                }
                ranges.push(prevRange = new Range(
                    row, startIndex, row + len - 1, endIndex
                ));
                if (len > 2)
                    row = row + len - 2;
            }
        } else {
            for (var i = 0; i < lines.length; i++) {
                var matches = lang.getMatchOffsets(lines[i], re);
                for (var j = 0; j < matches.length; j++) {
                    var match = matches[j];
                    ranges.push(new Range(i, match.offset, i, match.offset + match.length));
                }
            }
        }

        if (range) {
            var startColumn = range.start.column;
            var endColumn = range.start.column;
            var i = 0, j = ranges.length - 1;
            while (i < j && ranges[i].start.column < startColumn && ranges[i].start.row == range.start.row)
                i++;

            while (i < j && ranges[j].end.column > endColumn && ranges[j].end.row == range.end.row)
                j--;
            
            ranges = ranges.slice(i, j + 1);
            for (i = 0, j = ranges.length; i < j; i++) {
                ranges[i].start.row += range.start.row;
                ranges[i].end.row += range.start.row;
            }
        }

        return ranges;
    };
    this.replace = function(input, replacement) {
        var options = this.$options;

        var re = this.$assembleRegExp(options);
        if (options.$isMultiLine)
            return replacement;

        if (!re)
            return;

        var match = re.exec(input);
        if (!match || match[0].length != input.length)
            return null;
        
        replacement = input.replace(re, replacement);
        if (options.preserveCase) {
            replacement = replacement.split("");
            for (var i = Math.min(input.length, input.length); i--; ) {
                var ch = input[i];
                if (ch && ch.toLowerCase() != ch)
                    replacement[i] = replacement[i].toUpperCase();
                else
                    replacement[i] = replacement[i].toLowerCase();
            }
            replacement = replacement.join("");
        }
        
        return replacement;
    };

    this.$matchIterator = function(session, options) {
        var re = this.$assembleRegExp(options);
        if (!re)
            return false;

        var callback;
        if (options.$isMultiLine) {
            var len = re.length;
            var matchIterator = function(line, row, offset) {
                var startIndex = line.search(re[0]);
                if (startIndex == -1)
                    return;
                for (var i = 1; i < len; i++) {
                    line = session.getLine(row + i);
                    if (line.search(re[i]) == -1)
                        return;
                }

                var endIndex = line.match(re[len - 1])[0].length;

                var range = new Range(row, startIndex, row + len - 1, endIndex);
                if (re.offset == 1) {
                    range.start.row--;
                    range.start.column = Number.MAX_VALUE;
                } else if (offset)
                    range.start.column += offset;

                if (callback(range))
                    return true;
            };
        } else if (options.backwards) {
            var matchIterator = function(line, row, startIndex) {
                var matches = lang.getMatchOffsets(line, re);
                for (var i = matches.length-1; i >= 0; i--)
                    if (callback(matches[i], row, startIndex))
                        return true;
            };
        } else {
            var matchIterator = function(line, row, startIndex) {
                var matches = lang.getMatchOffsets(line, re);
                for (var i = 0; i < matches.length; i++)
                    if (callback(matches[i], row, startIndex))
                        return true;
            };
        }
        
        var lineIterator = this.$lineIterator(session, options);

        return {
            forEach: function(_callback) {
                callback = _callback;
                lineIterator.forEach(matchIterator);
            }
        };
    };

    this.$assembleRegExp = function(options, $disableFakeMultiline) {
        if (options.needle instanceof RegExp)
            return options.re = options.needle;

        var needle = options.needle;

        if (!options.needle)
            return options.re = false;

        if (!options.regExp)
            needle = lang.escapeRegExp(needle);

        if (options.wholeWord)
            needle = "\\b" + needle + "\\b";

        var modifier = options.caseSensitive ? "gm" : "gmi";

        options.$isMultiLine = !$disableFakeMultiline && /[\n\r]/.test(needle);
        if (options.$isMultiLine)
            return options.re = this.$assembleMultilineRegExp(needle, modifier);

        try {
            var re = new RegExp(needle, modifier);
        } catch(e) {
            re = false;
        }
        return options.re = re;
    };

    this.$assembleMultilineRegExp = function(needle, modifier) {
        var parts = needle.replace(/\r\n|\r|\n/g, "$\n^").split("\n");
        var re = [];
        for (var i = 0; i < parts.length; i++) try {
            re.push(new RegExp(parts[i], modifier));
        } catch(e) {
            return false;
        }
        if (parts[0] == "") {
            re.shift();
            re.offset = 1;
        } else {
            re.offset = 0;
        }
        return re;
    };

    this.$lineIterator = function(session, options) {
        var backwards = options.backwards == true;
        var skipCurrent = options.skipCurrent != false;

        var range = options.range;
        var start = options.start;
        if (!start)
            start = range ? range[backwards ? "end" : "start"] : session.selection.getRange();
         
        if (start.start)
            start = start[skipCurrent != backwards ? "end" : "start"];

        var firstRow = range ? range.start.row : 0;
        var lastRow = range ? range.end.row : session.getLength() - 1;

        var forEach = backwards ? function(callback) {
                var row = start.row;

                var line = session.getLine(row).substring(0, start.column);
                if (callback(line, row))
                    return;

                for (row--; row >= firstRow; row--)
                    if (callback(session.getLine(row), row))
                        return;

                if (options.wrap == false)
                    return;

                for (row = lastRow, firstRow = start.row; row >= firstRow; row--)
                    if (callback(session.getLine(row), row))
                        return;
            } : function(callback) {
                var row = start.row;

                var line = session.getLine(row).substr(start.column);
                if (callback(line, row, start.column))
                    return;

                for (row = row+1; row <= lastRow; row++)
                    if (callback(session.getLine(row), row))
                        return;

                if (options.wrap == false)
                    return;

                for (row = firstRow, lastRow = start.row; row <= lastRow; row++)
                    if (callback(session.getLine(row), row))
                        return;
            };
        
        return {forEach: forEach};
    };

}).call(Search.prototype);

exports.Search = Search;
});

define("ace/keyboard/hash_handler",["require","exports","module","ace/lib/keys","ace/lib/useragent"], function(require, exports, module) {
"use strict";

var keyUtil = require("../lib/keys");
var useragent = require("../lib/useragent");
var KEY_MODS = keyUtil.KEY_MODS;

function HashHandler(config, platform) {
    this.platform = platform || (useragent.isMac ? "mac" : "win");
    this.commands = {};
    this.commandKeyBinding = {};
    this.addCommands(config);
    this.$singleCommand = true;
}

function MultiHashHandler(config, platform) {
    HashHandler.call(this, config, platform);
    this.$singleCommand = false;
}

MultiHashHandler.prototype = HashHandler.prototype;

(function() {
    

    this.addCommand = function(command) {
        if (this.commands[command.name])
            this.removeCommand(command);

        this.commands[command.name] = command;

        if (command.bindKey)
            this._buildKeyHash(command);
    };

    this.removeCommand = function(command, keepCommand) {
        var name = command && (typeof command === 'string' ? command : command.name);
        command = this.commands[name];
        if (!keepCommand)
            delete this.commands[name];
        var ckb = this.commandKeyBinding;
        for (var keyId in ckb) {
            var cmdGroup = ckb[keyId];
            if (cmdGroup == command) {
                delete ckb[keyId];
            } else if (Array.isArray(cmdGroup)) {
                var i = cmdGroup.indexOf(command);
                if (i != -1) {
                    cmdGroup.splice(i, 1);
                    if (cmdGroup.length == 1)
                        ckb[keyId] = cmdGroup[0];
                }
            }
        }
    };

    this.bindKey = function(key, command, asDefault) {
        if (typeof key == "object")
            key = key[this.platform];
        if (!key)
            return;
        if (typeof command == "function")
            return this.addCommand({exec: command, bindKey: key, name: command.name || key});
        
        key.split("|").forEach(function(keyPart) {
            var chain = "";
            if (keyPart.indexOf(" ") != -1) {
                var parts = keyPart.split(/\s+/);
                keyPart = parts.pop();
                parts.forEach(function(keyPart) {
                    var binding = this.parseKeys(keyPart);
                    var id = KEY_MODS[binding.hashId] + binding.key;
                    chain += (chain ? " " : "") + id;
                    this._addCommandToBinding(chain, "chainKeys");
                }, this);
                chain += " ";
            }
            var binding = this.parseKeys(keyPart);
            var id = KEY_MODS[binding.hashId] + binding.key;
            this._addCommandToBinding(chain + id, command, asDefault);
        }, this);
    };
    
    this._addCommandToBinding = function(keyId, command, asDefault) {
        var ckb = this.commandKeyBinding, i;
        if (!command) {
            delete ckb[keyId];
        } else if (!ckb[keyId] || this.$singleCommand) {
            ckb[keyId] = command;
        } else {
            if (!Array.isArray(ckb[keyId])) {
                ckb[keyId] = [ckb[keyId]];
            } else if ((i = ckb[keyId].indexOf(command)) != -1) {
                ckb[keyId].splice(i, 1);
            }
            
            if (asDefault || command.isDefault)
                ckb[keyId].unshift(command);
            else
                ckb[keyId].push(command);
        }
    };

    this.addCommands = function(commands) {
        commands && Object.keys(commands).forEach(function(name) {
            var command = commands[name];
            if (!command)
                return;
            
            if (typeof command === "string")
                return this.bindKey(command, name);

            if (typeof command === "function")
                command = { exec: command };

            if (typeof command !== "object")
                return;

            if (!command.name)
                command.name = name;

            this.addCommand(command);
        }, this);
    };

    this.removeCommands = function(commands) {
        Object.keys(commands).forEach(function(name) {
            this.removeCommand(commands[name]);
        }, this);
    };

    this.bindKeys = function(keyList) {
        Object.keys(keyList).forEach(function(key) {
            this.bindKey(key, keyList[key]);
        }, this);
    };

    this._buildKeyHash = function(command) {
        this.bindKey(command.bindKey, command);
    };
    this.parseKeys = function(keys) {
        var parts = keys.toLowerCase().split(/[\-\+]([\-\+])?/).filter(function(x){return x});
        var key = parts.pop();

        var keyCode = keyUtil[key];
        if (keyUtil.FUNCTION_KEYS[keyCode])
            key = keyUtil.FUNCTION_KEYS[keyCode].toLowerCase();
        else if (!parts.length)
            return {key: key, hashId: -1};
        else if (parts.length == 1 && parts[0] == "shift")
            return {key: key.toUpperCase(), hashId: -1};

        var hashId = 0;
        for (var i = parts.length; i--;) {
            var modifier = keyUtil.KEY_MODS[parts[i]];
            if (modifier == null) {
                if (typeof console != "undefined")
                    console.error("invalid modifier " + parts[i] + " in " + keys);
                return false;
            }
            hashId |= modifier;
        }
        return {key: key, hashId: hashId};
    };

    this.findKeyCommand = function findKeyCommand(hashId, keyString) {
        var key = KEY_MODS[hashId] + keyString;
        return this.commandKeyBinding[key];
    };

    this.handleKeyboard = function(data, hashId, keyString, keyCode) {
        var key = KEY_MODS[hashId] + keyString;
        var command = this.commandKeyBinding[key];
        if (data.$keyChain) {
            data.$keyChain += " " + key;
            command = this.commandKeyBinding[data.$keyChain] || command;
        }
        
        if (command) {
            if (command == "chainKeys" || command[command.length - 1] == "chainKeys") {
                data.$keyChain = data.$keyChain || key;
                return {command: "null"};
            }
        }
        
        if (data.$keyChain && keyCode > 0)
            data.$keyChain = "";
        return {command: command};
    };

}).call(HashHandler.prototype);

exports.HashHandler = HashHandler;
exports.MultiHashHandler = MultiHashHandler;
});

define("ace/commands/command_manager",["require","exports","module","ace/lib/oop","ace/keyboard/hash_handler","ace/lib/event_emitter"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var MultiHashHandler = require("../keyboard/hash_handler").MultiHashHandler;
var EventEmitter = require("../lib/event_emitter").EventEmitter;

var CommandManager = function(platform, commands) {
    MultiHashHandler.call(this, commands, platform);
    this.byName = this.commands;
    this.setDefaultHandler("exec", function(e) {
        return e.command.exec(e.editor, e.args || {});
    });
};

oop.inherits(CommandManager, MultiHashHandler);

(function() {

    oop.implement(this, EventEmitter);

    this.exec = function(command, editor, args) {
        if (Array.isArray(command)) {
            for (var i = command.length; i--; ) {
                if (this.exec(command[i], editor, args)) return true;
            }
            return false;
        }
        
        if (typeof command === "string")
            command = this.commands[command];

        if (!command)
            return false;

        if (editor && editor.$readOnly && !command.readOnly)
            return false;

        var e = {editor: editor, command: command, args: args};
        e.returnValue = this._emit("exec", e);
        this._signal("afterExec", e);

        return e.returnValue === false ? false : true;
    };

    this.toggleRecording = function(editor) {
        if (this.$inReplay)
            return;

        editor && editor._emit("changeStatus");
        if (this.recording) {
            this.macro.pop();
            this.removeEventListener("exec", this.$addCommandToMacro);

            if (!this.macro.length)
                this.macro = this.oldMacro;

            return this.recording = false;
        }
        if (!this.$addCommandToMacro) {
            this.$addCommandToMacro = function(e) {
                this.macro.push([e.command, e.args]);
            }.bind(this);
        }

        this.oldMacro = this.macro;
        this.macro = [];
        this.on("exec", this.$addCommandToMacro);
        return this.recording = true;
    };

    this.replay = function(editor) {
        if (this.$inReplay || !this.macro)
            return;

        if (this.recording)
            return this.toggleRecording(editor);

        try {
            this.$inReplay = true;
            this.macro.forEach(function(x) {
                if (typeof x == "string")
                    this.exec(x, editor);
                else
                    this.exec(x[0], editor, x[1]);
            }, this);
        } finally {
            this.$inReplay = false;
        }
    };

    this.trimMacro = function(m) {
        return m.map(function(x){
            if (typeof x[0] != "string")
                x[0] = x[0].name;
            if (!x[1])
                x = x[0];
            return x;
        });
    };

}).call(CommandManager.prototype);

exports.CommandManager = CommandManager;

});

define("ace/commands/default_commands",["require","exports","module","ace/lib/lang","ace/config","ace/range"], function(require, exports, module) {
"use strict";

var lang = require("../lib/lang");
var config = require("../config");
var Range = require("../range").Range;

function bindKey(win, mac) {
    return {win: win, mac: mac};
}
exports.commands = [{
    name: "showSettingsMenu",
    bindKey: bindKey("Ctrl-,", "Command-,"),
    exec: function(editor) {
        config.loadModule("ace/ext/settings_menu", function(module) {
            module.init(editor);
            editor.showSettingsMenu();
        });
    },
    readOnly: true
}, {
    name: "goToNextError",
    bindKey: bindKey("Alt-E", "Ctrl-E"),
    exec: function(editor) {
        config.loadModule("ace/ext/error_marker", function(module) {
            module.showErrorMarker(editor, 1);
        });
    },
    scrollIntoView: "animate",
    readOnly: true
}, {
    name: "goToPreviousError",
    bindKey: bindKey("Alt-Shift-E", "Ctrl-Shift-E"),
    exec: function(editor) {
        config.loadModule("ace/ext/error_marker", function(module) {
            module.showErrorMarker(editor, -1);
        });
    },
    scrollIntoView: "animate",
    readOnly: true
}, {
    name: "selectall",
    bindKey: bindKey("Ctrl-A", "Command-A"),
    exec: function(editor) { editor.selectAll(); },
    readOnly: true
}, {
    name: "centerselection",
    bindKey: bindKey(null, "Ctrl-L"),
    exec: function(editor) { editor.centerSelection(); },
    readOnly: true
}, {
    name: "gotoline",
    bindKey: bindKey("Ctrl-L", "Command-L"),
    exec: function(editor) {
        var line = parseInt(prompt("Enter line number:"), 10);
        if (!isNaN(line)) {
            editor.gotoLine(line);
        }
    },
    readOnly: true
}, {
    name: "fold",
    bindKey: bindKey("Alt-L|Ctrl-F1", "Command-Alt-L|Command-F1"),
    exec: function(editor) { editor.session.toggleFold(false); },
    multiSelectAction: "forEach",
    scrollIntoView: "center",
    readOnly: true
}, {
    name: "unfold",
    bindKey: bindKey("Alt-Shift-L|Ctrl-Shift-F1", "Command-Alt-Shift-L|Command-Shift-F1"),
    exec: function(editor) { editor.session.toggleFold(true); },
    multiSelectAction: "forEach",
    scrollIntoView: "center",
    readOnly: true
}, {
    name: "toggleFoldWidget",
    bindKey: bindKey("F2", "F2"),
    exec: function(editor) { editor.session.toggleFoldWidget(); },
    multiSelectAction: "forEach",
    scrollIntoView: "center",
    readOnly: true
}, {
    name: "toggleParentFoldWidget",
    bindKey: bindKey("Alt-F2", "Alt-F2"),
    exec: function(editor) { editor.session.toggleFoldWidget(true); },
    multiSelectAction: "forEach",
    scrollIntoView: "center",
    readOnly: true
}, {
    name: "foldall",
    bindKey: bindKey(null, "Ctrl-Command-Option-0"),
    exec: function(editor) { editor.session.foldAll(); },
    scrollIntoView: "center",
    readOnly: true
}, {
    name: "foldOther",
    bindKey: bindKey("Alt-0", "Command-Option-0"),
    exec: function(editor) { 
        editor.session.foldAll();
        editor.session.unfold(editor.selection.getAllRanges());
    },
    scrollIntoView: "center",
    readOnly: true
}, {
    name: "unfoldall",
    bindKey: bindKey("Alt-Shift-0", "Command-Option-Shift-0"),
    exec: function(editor) { editor.session.unfold(); },
    scrollIntoView: "center",
    readOnly: true
}, {
    name: "findnext",
    bindKey: bindKey("Ctrl-K", "Command-G"),
    exec: function(editor) { editor.findNext(); },
    multiSelectAction: "forEach",
    scrollIntoView: "center",
    readOnly: true
}, {
    name: "findprevious",
    bindKey: bindKey("Ctrl-Shift-K", "Command-Shift-G"),
    exec: function(editor) { editor.findPrevious(); },
    multiSelectAction: "forEach",
    scrollIntoView: "center",
    readOnly: true
}, {
    name: "selectOrFindNext",
    bindKey: bindKey("Alt-K", "Ctrl-G"),
    exec: function(editor) {
        if (editor.selection.isEmpty())
            editor.selection.selectWord();
        else
            editor.findNext(); 
    },
    readOnly: true
}, {
    name: "selectOrFindPrevious",
    bindKey: bindKey("Alt-Shift-K", "Ctrl-Shift-G"),
    exec: function(editor) { 
        if (editor.selection.isEmpty())
            editor.selection.selectWord();
        else
            editor.findPrevious();
    },
    readOnly: true
}, {
    name: "find",
    bindKey: bindKey("Ctrl-F", "Command-F"),
    exec: function(editor) {
        config.loadModule("ace/ext/searchbox", function(e) {e.Search(editor)});
    },
    readOnly: true
}, {
    name: "overwrite",
    bindKey: "Insert",
    exec: function(editor) { editor.toggleOverwrite(); },
    readOnly: true
}, {
    name: "selecttostart",
    bindKey: bindKey("Ctrl-Shift-Home", "Command-Shift-Up"),
    exec: function(editor) { editor.getSelection().selectFileStart(); },
    multiSelectAction: "forEach",
    readOnly: true,
    scrollIntoView: "animate",
    aceCommandGroup: "fileJump"
}, {
    name: "gotostart",
    bindKey: bindKey("Ctrl-Home", "Command-Home|Command-Up"),
    exec: function(editor) { editor.navigateFileStart(); },
    multiSelectAction: "forEach",
    readOnly: true,
    scrollIntoView: "animate",
    aceCommandGroup: "fileJump"
}, {
    name: "selectup",
    bindKey: bindKey("Shift-Up", "Shift-Up"),
    exec: function(editor) { editor.getSelection().selectUp(); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
}, {
    name: "golineup",
    bindKey: bindKey("Up", "Up|Ctrl-P"),
    exec: function(editor, args) { editor.navigateUp(args.times); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
}, {
    name: "selecttoend",
    bindKey: bindKey("Ctrl-Shift-End", "Command-Shift-Down"),
    exec: function(editor) { editor.getSelection().selectFileEnd(); },
    multiSelectAction: "forEach",
    readOnly: true,
    scrollIntoView: "animate",
    aceCommandGroup: "fileJump"
}, {
    name: "gotoend",
    bindKey: bindKey("Ctrl-End", "Command-End|Command-Down"),
    exec: function(editor) { editor.navigateFileEnd(); },
    multiSelectAction: "forEach",
    readOnly: true,
    scrollIntoView: "animate",
    aceCommandGroup: "fileJump"
}, {
    name: "selectdown",
    bindKey: bindKey("Shift-Down", "Shift-Down"),
    exec: function(editor) { editor.getSelection().selectDown(); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
}, {
    name: "golinedown",
    bindKey: bindKey("Down", "Down|Ctrl-N"),
    exec: function(editor, args) { editor.navigateDown(args.times); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
}, {
    name: "selectwordleft",
    bindKey: bindKey("Ctrl-Shift-Left", "Option-Shift-Left"),
    exec: function(editor) { editor.getSelection().selectWordLeft(); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
}, {
    name: "gotowordleft",
    bindKey: bindKey("Ctrl-Left", "Option-Left"),
    exec: function(editor) { editor.navigateWordLeft(); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
}, {
    name: "selecttolinestart",
    bindKey: bindKey("Alt-Shift-Left", "Command-Shift-Left"),
    exec: function(editor) { editor.getSelection().selectLineStart(); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
}, {
    name: "gotolinestart",
    bindKey: bindKey("Alt-Left|Home", "Command-Left|Home|Ctrl-A"),
    exec: function(editor) { editor.navigateLineStart(); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
}, {
    name: "selectleft",
    bindKey: bindKey("Shift-Left", "Shift-Left"),
    exec: function(editor) { editor.getSelection().selectLeft(); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
}, {
    name: "gotoleft",
    bindKey: bindKey("Left", "Left|Ctrl-B"),
    exec: function(editor, args) { editor.navigateLeft(args.times); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
}, {
    name: "selectwordright",
    bindKey: bindKey("Ctrl-Shift-Right", "Option-Shift-Right"),
    exec: function(editor) { editor.getSelection().selectWordRight(); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
}, {
    name: "gotowordright",
    bindKey: bindKey("Ctrl-Right", "Option-Right"),
    exec: function(editor) { editor.navigateWordRight(); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
}, {
    name: "selecttolineend",
    bindKey: bindKey("Alt-Shift-Right", "Command-Shift-Right"),
    exec: function(editor) { editor.getSelection().selectLineEnd(); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
}, {
    name: "gotolineend",
    bindKey: bindKey("Alt-Right|End", "Command-Right|End|Ctrl-E"),
    exec: function(editor) { editor.navigateLineEnd(); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
}, {
    name: "selectright",
    bindKey: bindKey("Shift-Right", "Shift-Right"),
    exec: function(editor) { editor.getSelection().selectRight(); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
}, {
    name: "gotoright",
    bindKey: bindKey("Right", "Right|Ctrl-F"),
    exec: function(editor, args) { editor.navigateRight(args.times); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
}, {
    name: "selectpagedown",
    bindKey: "Shift-PageDown",
    exec: function(editor) { editor.selectPageDown(); },
    readOnly: true
}, {
    name: "pagedown",
    bindKey: bindKey(null, "Option-PageDown"),
    exec: function(editor) { editor.scrollPageDown(); },
    readOnly: true
}, {
    name: "gotopagedown",
    bindKey: bindKey("PageDown", "PageDown|Ctrl-V"),
    exec: function(editor) { editor.gotoPageDown(); },
    readOnly: true
}, {
    name: "selectpageup",
    bindKey: "Shift-PageUp",
    exec: function(editor) { editor.selectPageUp(); },
    readOnly: true
}, {
    name: "pageup",
    bindKey: bindKey(null, "Option-PageUp"),
    exec: function(editor) { editor.scrollPageUp(); },
    readOnly: true
}, {
    name: "gotopageup",
    bindKey: "PageUp",
    exec: function(editor) { editor.gotoPageUp(); },
    readOnly: true
}, {
    name: "scrollup",
    bindKey: bindKey("Ctrl-Up", null),
    exec: function(e) { e.renderer.scrollBy(0, -2 * e.renderer.layerConfig.lineHeight); },
    readOnly: true
}, {
    name: "scrolldown",
    bindKey: bindKey("Ctrl-Down", null),
    exec: function(e) { e.renderer.scrollBy(0, 2 * e.renderer.layerConfig.lineHeight); },
    readOnly: true
}, {
    name: "selectlinestart",
    bindKey: "Shift-Home",
    exec: function(editor) { editor.getSelection().selectLineStart(); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
}, {
    name: "selectlineend",
    bindKey: "Shift-End",
    exec: function(editor) { editor.getSelection().selectLineEnd(); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
}, {
    name: "togglerecording",
    bindKey: bindKey("Ctrl-Alt-E", "Command-Option-E"),
    exec: function(editor) { editor.commands.toggleRecording(editor); },
    readOnly: true
}, {
    name: "replaymacro",
    bindKey: bindKey("Ctrl-Shift-E", "Command-Shift-E"),
    exec: function(editor) { editor.commands.replay(editor); },
    readOnly: true
}, {
    name: "jumptomatching",
    bindKey: bindKey("Ctrl-P", "Ctrl-P"),
    exec: function(editor) { editor.jumpToMatching(); },
    multiSelectAction: "forEach",
    scrollIntoView: "animate",
    readOnly: true
}, {
    name: "selecttomatching",
    bindKey: bindKey("Ctrl-Shift-P", "Ctrl-Shift-P"),
    exec: function(editor) { editor.jumpToMatching(true); },
    multiSelectAction: "forEach",
    scrollIntoView: "animate",
    readOnly: true
}, {
    name: "expandToMatching",
    bindKey: bindKey("Ctrl-Shift-M", "Ctrl-Shift-M"),
    exec: function(editor) { editor.jumpToMatching(true, true); },
    multiSelectAction: "forEach",
    scrollIntoView: "animate",
    readOnly: true
}, {
    name: "passKeysToBrowser",
    bindKey: bindKey(null, null),
    exec: function() {},
    passEvent: true,
    readOnly: true
},
{
    name: "cut",
    exec: function(editor) {
        var range = editor.getSelectionRange();
        editor._emit("cut", range);

        if (!editor.selection.isEmpty()) {
            editor.session.remove(range);
            editor.clearSelection();
        }
    },
    scrollIntoView: "cursor",
    multiSelectAction: "forEach"
}, {
    name: "removeline",
    bindKey: bindKey("Ctrl-D", "Command-D"),
    exec: function(editor) { editor.removeLines(); },
    scrollIntoView: "cursor",
    multiSelectAction: "forEachLine"
}, {
    name: "duplicateSelection",
    bindKey: bindKey("Ctrl-Shift-D", "Command-Shift-D"),
    exec: function(editor) { editor.duplicateSelection(); },
    scrollIntoView: "cursor",
    multiSelectAction: "forEach"
}, {
    name: "sortlines",
    bindKey: bindKey("Ctrl-Alt-S", "Command-Alt-S"),
    exec: function(editor) { editor.sortLines(); },
    scrollIntoView: "selection",
    multiSelectAction: "forEachLine"
}, {
    name: "togglecomment",
    bindKey: bindKey("Ctrl-/", "Command-/"),
    exec: function(editor) { editor.toggleCommentLines(); },
    multiSelectAction: "forEachLine",
    scrollIntoView: "selectionPart"
}, {
    name: "toggleBlockComment",
    bindKey: bindKey("Ctrl-Shift-/", "Command-Shift-/"),
    exec: function(editor) { editor.toggleBlockComment(); },
    multiSelectAction: "forEach",
    scrollIntoView: "selectionPart"
}, {
    name: "modifyNumberUp",
    bindKey: bindKey("Ctrl-Shift-Up", "Alt-Shift-Up"),
    exec: function(editor) { editor.modifyNumber(1); },
    scrollIntoView: "cursor",
    multiSelectAction: "forEach"
}, {
    name: "modifyNumberDown",
    bindKey: bindKey("Ctrl-Shift-Down", "Alt-Shift-Down"),
    exec: function(editor) { editor.modifyNumber(-1); },
    scrollIntoView: "cursor",
    multiSelectAction: "forEach"
}, {
    name: "replace",
    bindKey: bindKey("Ctrl-H", "Command-Option-F"),
    exec: function(editor) {
        config.loadModule("ace/ext/searchbox", function(e) {e.Search(editor, true)});
    }
}, {
    name: "undo",
    bindKey: bindKey("Ctrl-Z", "Command-Z"),
    exec: function(editor) { editor.undo(); }
}, {
    name: "redo",
    bindKey: bindKey("Ctrl-Shift-Z|Ctrl-Y", "Command-Shift-Z|Command-Y"),
    exec: function(editor) { editor.redo(); }
}, {
    name: "copylinesup",
    bindKey: bindKey("Alt-Shift-Up", "Command-Option-Up"),
    exec: function(editor) { editor.copyLinesUp(); },
    scrollIntoView: "cursor"
}, {
    name: "movelinesup",
    bindKey: bindKey("Alt-Up", "Option-Up"),
    exec: function(editor) { editor.moveLinesUp(); },
    scrollIntoView: "cursor"
}, {
    name: "copylinesdown",
    bindKey: bindKey("Alt-Shift-Down", "Command-Option-Down"),
    exec: function(editor) { editor.copyLinesDown(); },
    scrollIntoView: "cursor"
}, {
    name: "movelinesdown",
    bindKey: bindKey("Alt-Down", "Option-Down"),
    exec: function(editor) { editor.moveLinesDown(); },
    scrollIntoView: "cursor"
}, {
    name: "del",
    bindKey: bindKey("Delete", "Delete|Ctrl-D|Shift-Delete"),
    exec: function(editor) { editor.remove("right"); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor"
}, {
    name: "backspace",
    bindKey: bindKey(
        "Shift-Backspace|Backspace",
        "Ctrl-Backspace|Shift-Backspace|Backspace|Ctrl-H"
    ),
    exec: function(editor) { editor.remove("left"); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor"
}, {
    name: "cut_or_delete",
    bindKey: bindKey("Shift-Delete", null),
    exec: function(editor) { 
        if (editor.selection.isEmpty()) {
            editor.remove("left");
        } else {
            return false;
        }
    },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor"
}, {
    name: "removetolinestart",
    bindKey: bindKey("Alt-Backspace", "Command-Backspace"),
    exec: function(editor) { editor.removeToLineStart(); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor"
}, {
    name: "removetolineend",
    bindKey: bindKey("Alt-Delete", "Ctrl-K"),
    exec: function(editor) { editor.removeToLineEnd(); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor"
}, {
    name: "removewordleft",
    bindKey: bindKey("Ctrl-Backspace", "Alt-Backspace|Ctrl-Alt-Backspace"),
    exec: function(editor) { editor.removeWordLeft(); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor"
}, {
    name: "removewordright",
    bindKey: bindKey("Ctrl-Delete", "Alt-Delete"),
    exec: function(editor) { editor.removeWordRight(); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor"
}, {
    name: "outdent",
    bindKey: bindKey("Shift-Tab", "Shift-Tab"),
    exec: function(editor) { editor.blockOutdent(); },
    multiSelectAction: "forEach",
    scrollIntoView: "selectionPart"
}, {
    name: "indent",
    bindKey: bindKey("Tab", "Tab"),
    exec: function(editor) { editor.indent(); },
    multiSelectAction: "forEach",
    scrollIntoView: "selectionPart"
}, {
    name: "blockoutdent",
    bindKey: bindKey("Ctrl-[", "Ctrl-["),
    exec: function(editor) { editor.blockOutdent(); },
    multiSelectAction: "forEachLine",
    scrollIntoView: "selectionPart"
}, {
    name: "blockindent",
    bindKey: bindKey("Ctrl-]", "Ctrl-]"),
    exec: function(editor) { editor.blockIndent(); },
    multiSelectAction: "forEachLine",
    scrollIntoView: "selectionPart"
}, {
    name: "insertstring",
    exec: function(editor, str) { editor.insert(str); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor"
}, {
    name: "inserttext",
    exec: function(editor, args) {
        editor.insert(lang.stringRepeat(args.text  || "", args.times || 1));
    },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor"
}, {
    name: "splitline",
    bindKey: bindKey(null, "Ctrl-O"),
    exec: function(editor) { editor.splitLine(); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor"
}, {
    name: "transposeletters",
    bindKey: bindKey("Ctrl-T", "Ctrl-T"),
    exec: function(editor) { editor.transposeLetters(); },
    multiSelectAction: function(editor) {editor.transposeSelections(1); },
    scrollIntoView: "cursor"
}, {
    name: "touppercase",
    bindKey: bindKey("Ctrl-U", "Ctrl-U"),
    exec: function(editor) { editor.toUpperCase(); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor"
}, {
    name: "tolowercase",
    bindKey: bindKey("Ctrl-Shift-U", "Ctrl-Shift-U"),
    exec: function(editor) { editor.toLowerCase(); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor"
}, {
    name: "expandtoline",
    bindKey: bindKey("Ctrl-Shift-L", "Command-Shift-L"),
    exec: function(editor) {
        var range = editor.selection.getRange();

        range.start.column = range.end.column = 0;
        range.end.row++;
        editor.selection.setRange(range, false);
    },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
}, {
    name: "joinlines",
    bindKey: bindKey(null, null),
    exec: function(editor) {
        var isBackwards = editor.selection.isBackwards();
        var selectionStart = isBackwards ? editor.selection.getSelectionLead() : editor.selection.getSelectionAnchor();
        var selectionEnd = isBackwards ? editor.selection.getSelectionAnchor() : editor.selection.getSelectionLead();
        var firstLineEndCol = editor.session.doc.getLine(selectionStart.row).length;
        var selectedText = editor.session.doc.getTextRange(editor.selection.getRange());
        var selectedCount = selectedText.replace(/\n\s*/, " ").length;
        var insertLine = editor.session.doc.getLine(selectionStart.row);

        for (var i = selectionStart.row + 1; i <= selectionEnd.row + 1; i++) {
            var curLine = lang.stringTrimLeft(lang.stringTrimRight(editor.session.doc.getLine(i)));
            if (curLine.length !== 0) {
                curLine = " " + curLine;
            }
            insertLine += curLine;
        }

        if (selectionEnd.row + 1 < (editor.session.doc.getLength() - 1)) {
            insertLine += editor.session.doc.getNewLineCharacter();
        }

        editor.clearSelection();
        editor.session.doc.replace(new Range(selectionStart.row, 0, selectionEnd.row + 2, 0), insertLine);

        if (selectedCount > 0) {
            editor.selection.moveCursorTo(selectionStart.row, selectionStart.column);
            editor.selection.selectTo(selectionStart.row, selectionStart.column + selectedCount);
        } else {
            firstLineEndCol = editor.session.doc.getLine(selectionStart.row).length > firstLineEndCol ? (firstLineEndCol + 1) : firstLineEndCol;
            editor.selection.moveCursorTo(selectionStart.row, firstLineEndCol);
        }
    },
    multiSelectAction: "forEach",
    readOnly: true
}, {
    name: "invertSelection",
    bindKey: bindKey(null, null),
    exec: function(editor) {
        var endRow = editor.session.doc.getLength() - 1;
        var endCol = editor.session.doc.getLine(endRow).length;
        var ranges = editor.selection.rangeList.ranges;
        var newRanges = [];
        if (ranges.length < 1) {
            ranges = [editor.selection.getRange()];
        }

        for (var i = 0; i < ranges.length; i++) {
            if (i == (ranges.length - 1)) {
                if (!(ranges[i].end.row === endRow && ranges[i].end.column === endCol)) {
                    newRanges.push(new Range(ranges[i].end.row, ranges[i].end.column, endRow, endCol));
                }
            }

            if (i === 0) {
                if (!(ranges[i].start.row === 0 && ranges[i].start.column === 0)) {
                    newRanges.push(new Range(0, 0, ranges[i].start.row, ranges[i].start.column));
                }
            } else {
                newRanges.push(new Range(ranges[i-1].end.row, ranges[i-1].end.column, ranges[i].start.row, ranges[i].start.column));
            }
        }

        editor.exitMultiSelectMode();
        editor.clearSelection();

        for(var i = 0; i < newRanges.length; i++) {
            editor.selection.addRange(newRanges[i], false);
        }
    },
    readOnly: true,
    scrollIntoView: "none"
}];

});

define("ace/editor",["require","exports","module","ace/lib/fixoldbrowsers","ace/lib/oop","ace/lib/dom","ace/lib/lang","ace/lib/useragent","ace/keyboard/textinput","ace/mouse/mouse_handler","ace/mouse/fold_handler","ace/keyboard/keybinding","ace/edit_session","ace/search","ace/range","ace/lib/event_emitter","ace/commands/command_manager","ace/commands/default_commands","ace/config","ace/token_iterator"], function(require, exports, module) {
"use strict";

require("./lib/fixoldbrowsers");

var oop = require("./lib/oop");
var dom = require("./lib/dom");
var lang = require("./lib/lang");
var useragent = require("./lib/useragent");
var TextInput = require("./keyboard/textinput").TextInput;
var MouseHandler = require("./mouse/mouse_handler").MouseHandler;
var FoldHandler = require("./mouse/fold_handler").FoldHandler;
var KeyBinding = require("./keyboard/keybinding").KeyBinding;
var EditSession = require("./edit_session").EditSession;
var Search = require("./search").Search;
var Range = require("./range").Range;
var EventEmitter = require("./lib/event_emitter").EventEmitter;
var CommandManager = require("./commands/command_manager").CommandManager;
var defaultCommands = require("./commands/default_commands").commands;
var config = require("./config");
var TokenIterator = require("./token_iterator").TokenIterator;
var Editor = function(renderer, session) {
    var container = renderer.getContainerElement();
    this.container = container;
    this.renderer = renderer;

    this.commands = new CommandManager(useragent.isMac ? "mac" : "win", defaultCommands);
    this.textInput  = new TextInput(renderer.getTextAreaContainer(), this);
    this.renderer.textarea = this.textInput.getElement();
    this.keyBinding = new KeyBinding(this);
    this.$mouseHandler = new MouseHandler(this);
    new FoldHandler(this);

    this.$blockScrolling = 0;
    this.$search = new Search().set({
        wrap: true
    });

    this.$historyTracker = this.$historyTracker.bind(this);
    this.commands.on("exec", this.$historyTracker);

    this.$initOperationListeners();
    
    this._$emitInputEvent = lang.delayedCall(function() {
        this._signal("input", {});
        if (this.session && this.session.bgTokenizer)
            this.session.bgTokenizer.scheduleStart();
    }.bind(this));
    
    this.on("change", function(_, _self) {
        _self._$emitInputEvent.schedule(31);
    });

    this.setSession(session || new EditSession(""));
    config.resetOptions(this);
    config._signal("editor", this);
};

(function(){

    oop.implement(this, EventEmitter);

    this.$initOperationListeners = function() {
        function last(a) {return a[a.length - 1]}

        this.selections = [];
        this.commands.on("exec", this.startOperation.bind(this), true);
        this.commands.on("afterExec", this.endOperation.bind(this), true);

        this.$opResetTimer = lang.delayedCall(this.endOperation.bind(this));

        this.on("change", function() {
            this.curOp || this.startOperation();
            this.curOp.docChanged = true;
        }.bind(this), true);

        this.on("changeSelection", function() {
            this.curOp || this.startOperation();
            this.curOp.selectionChanged = true;
        }.bind(this), true);
    };

    this.curOp = null;
    this.prevOp = {};
    this.startOperation = function(commadEvent) {
        if (this.curOp) {
            if (!commadEvent || this.curOp.command)
                return;
            this.prevOp = this.curOp;
        }
        if (!commadEvent) {
            this.previousCommand = null;
            commadEvent = {};
        }

        this.$opResetTimer.schedule();
        this.curOp = {
            command: commadEvent.command || {},
            args: commadEvent.args,
            scrollTop: this.renderer.scrollTop
        };
        if (this.curOp.command.name && this.curOp.command.scrollIntoView !== undefined)
            this.$blockScrolling++;
    };

    this.endOperation = function(e) {
        if (this.curOp) {
            if (e && e.returnValue === false)
                return this.curOp = null;
            this._signal("beforeEndOperation");
            var command = this.curOp.command;
            if (command.name && this.$blockScrolling > 0)
                this.$blockScrolling--;
            if (command && command.scrollIntoView) {
                switch (command.scrollIntoView) {
                    case "center":
                        this.renderer.scrollCursorIntoView(null, 0.5);
                        break;
                    case "animate":
                    case "cursor":
                        this.renderer.scrollCursorIntoView();
                        break;
                    case "selectionPart":
                        var range = this.selection.getRange();
                        var config = this.renderer.layerConfig;
                        if (range.start.row >= config.lastRow || range.end.row <= config.firstRow) {
                            this.renderer.scrollSelectionIntoView(this.selection.anchor, this.selection.lead);
                        }
                        break;
                    default:
                        break;
                }
                if (command.scrollIntoView == "animate")
                    this.renderer.animateScrolling(this.curOp.scrollTop);
            }
            
            this.prevOp = this.curOp;
            this.curOp = null;
        }
    };
    this.$mergeableCommands = ["backspace", "del", "insertstring"];
    this.$historyTracker = function(e) {
        if (!this.$mergeUndoDeltas)
            return;

        var prev = this.prevOp;
        var mergeableCommands = this.$mergeableCommands;
        var shouldMerge = prev.command && (e.command.name == prev.command.name);
        if (e.command.name == "insertstring") {
            var text = e.args;
            if (this.mergeNextCommand === undefined)
                this.mergeNextCommand = true;

            shouldMerge = shouldMerge
                && this.mergeNextCommand // previous command allows to coalesce with
                && (!/\s/.test(text) || /\s/.test(prev.args)); // previous insertion was of same type

            this.mergeNextCommand = true;
        } else {
            shouldMerge = shouldMerge
                && mergeableCommands.indexOf(e.command.name) !== -1; // the command is mergeable
        }

        if (
            this.$mergeUndoDeltas != "always"
            && Date.now() - this.sequenceStartTime > 2000
        ) {
            shouldMerge = false; // the sequence is too long
        }

        if (shouldMerge)
            this.session.mergeUndoDeltas = true;
        else if (mergeableCommands.indexOf(e.command.name) !== -1)
            this.sequenceStartTime = Date.now();
    };
    this.setKeyboardHandler = function(keyboardHandler, cb) {
        if (keyboardHandler && typeof keyboardHandler === "string") {
            this.$keybindingId = keyboardHandler;
            var _self = this;
            config.loadModule(["keybinding", keyboardHandler], function(module) {
                if (_self.$keybindingId == keyboardHandler)
                    _self.keyBinding.setKeyboardHandler(module && module.handler);
                cb && cb();
            });
        } else {
            this.$keybindingId = null;
            this.keyBinding.setKeyboardHandler(keyboardHandler);
            cb && cb();
        }
    };
    this.getKeyboardHandler = function() {
        return this.keyBinding.getKeyboardHandler();
    };
    this.setSession = function(session) {
        if (this.session == session)
            return;

        var oldSession = this.session;
        if (oldSession) {
            this.session.removeEventListener("change", this.$onDocumentChange);
            this.session.removeEventListener("changeMode", this.$onChangeMode);
            this.session.removeEventListener("tokenizerUpdate", this.$onTokenizerUpdate);
            this.session.removeEventListener("changeTabSize", this.$onChangeTabSize);
            this.session.removeEventListener("changeWrapLimit", this.$onChangeWrapLimit);
            this.session.removeEventListener("changeWrapMode", this.$onChangeWrapMode);
            this.session.removeEventListener("onChangeFold", this.$onChangeFold);
            this.session.removeEventListener("changeFrontMarker", this.$onChangeFrontMarker);
            this.session.removeEventListener("changeBackMarker", this.$onChangeBackMarker);
            this.session.removeEventListener("changeBreakpoint", this.$onChangeBreakpoint);
            this.session.removeEventListener("changeAnnotation", this.$onChangeAnnotation);
            this.session.removeEventListener("changeOverwrite", this.$onCursorChange);
            this.session.removeEventListener("changeScrollTop", this.$onScrollTopChange);
            this.session.removeEventListener("changeScrollLeft", this.$onScrollLeftChange);

            var selection = this.session.getSelection();
            selection.removeEventListener("changeCursor", this.$onCursorChange);
            selection.removeEventListener("changeSelection", this.$onSelectionChange);
        }

        this.session = session;
        if (session) {
            this.$onDocumentChange = this.onDocumentChange.bind(this);
            session.addEventListener("change", this.$onDocumentChange);
            this.renderer.setSession(session);
    
            this.$onChangeMode = this.onChangeMode.bind(this);
            session.addEventListener("changeMode", this.$onChangeMode);
    
            this.$onTokenizerUpdate = this.onTokenizerUpdate.bind(this);
            session.addEventListener("tokenizerUpdate", this.$onTokenizerUpdate);
    
            this.$onChangeTabSize = this.renderer.onChangeTabSize.bind(this.renderer);
            session.addEventListener("changeTabSize", this.$onChangeTabSize);
    
            this.$onChangeWrapLimit = this.onChangeWrapLimit.bind(this);
            session.addEventListener("changeWrapLimit", this.$onChangeWrapLimit);
    
            this.$onChangeWrapMode = this.onChangeWrapMode.bind(this);
            session.addEventListener("changeWrapMode", this.$onChangeWrapMode);
    
            this.$onChangeFold = this.onChangeFold.bind(this);
            session.addEventListener("changeFold", this.$onChangeFold);
    
            this.$onChangeFrontMarker = this.onChangeFrontMarker.bind(this);
            this.session.addEventListener("changeFrontMarker", this.$onChangeFrontMarker);
    
            this.$onChangeBackMarker = this.onChangeBackMarker.bind(this);
            this.session.addEventListener("changeBackMarker", this.$onChangeBackMarker);
    
            this.$onChangeBreakpoint = this.onChangeBreakpoint.bind(this);
            this.session.addEventListener("changeBreakpoint", this.$onChangeBreakpoint);
    
            this.$onChangeAnnotation = this.onChangeAnnotation.bind(this);
            this.session.addEventListener("changeAnnotation", this.$onChangeAnnotation);
    
            this.$onCursorChange = this.onCursorChange.bind(this);
            this.session.addEventListener("changeOverwrite", this.$onCursorChange);
    
            this.$onScrollTopChange = this.onScrollTopChange.bind(this);
            this.session.addEventListener("changeScrollTop", this.$onScrollTopChange);
    
            this.$onScrollLeftChange = this.onScrollLeftChange.bind(this);
            this.session.addEventListener("changeScrollLeft", this.$onScrollLeftChange);
    
            this.selection = session.getSelection();
            this.selection.addEventListener("changeCursor", this.$onCursorChange);
    
            this.$onSelectionChange = this.onSelectionChange.bind(this);
            this.selection.addEventListener("changeSelection", this.$onSelectionChange);
    
            this.onChangeMode();
    
            this.$blockScrolling += 1;
            this.onCursorChange();
            this.$blockScrolling -= 1;
    
            this.onScrollTopChange();
            this.onScrollLeftChange();
            this.onSelectionChange();
            this.onChangeFrontMarker();
            this.onChangeBackMarker();
            this.onChangeBreakpoint();
            this.onChangeAnnotation();
            this.session.getUseWrapMode() && this.renderer.adjustWrapLimit();
            this.renderer.updateFull();
        } else {
            this.selection = null;
            this.renderer.setSession(session);
        }

        this._signal("changeSession", {
            session: session,
            oldSession: oldSession
        });
        
        oldSession && oldSession._signal("changeEditor", {oldEditor: this});
        session && session._signal("changeEditor", {editor: this});
    };
    this.getSession = function() {
        return this.session;
    };
    this.setValue = function(val, cursorPos) {
        this.session.doc.setValue(val);

        if (!cursorPos)
            this.selectAll();
        else if (cursorPos == 1)
            this.navigateFileEnd();
        else if (cursorPos == -1)
            this.navigateFileStart();

        return val;
    };
    this.getValue = function() {
        return this.session.getValue();
    };
    this.getSelection = function() {
        return this.selection;
    };
    this.resize = function(force) {
        this.renderer.onResize(force);
    };
    this.setTheme = function(theme, cb) {
        this.renderer.setTheme(theme, cb);
    };
    this.getTheme = function() {
        return this.renderer.getTheme();
    };
    this.setStyle = function(style) {
        this.renderer.setStyle(style);
    };
    this.unsetStyle = function(style) {
        this.renderer.unsetStyle(style);
    };
    this.getFontSize = function () {
        return this.getOption("fontSize") ||
           dom.computedStyle(this.container, "fontSize");
    };
    this.setFontSize = function(size) {
        this.setOption("fontSize", size);
    };

    this.$highlightBrackets = function() {
        if (this.session.$bracketHighlight) {
            this.session.removeMarker(this.session.$bracketHighlight);
            this.session.$bracketHighlight = null;
        }

        if (this.$highlightPending) {
            return;
        }
        var self = this;
        this.$highlightPending = true;
        setTimeout(function() {
            self.$highlightPending = false;
            var session = self.session;
            if (!session || !session.bgTokenizer) return;
            var pos = session.findMatchingBracket(self.getCursorPosition());
            if (pos) {
                var range = new Range(pos.row, pos.column, pos.row, pos.column + 1);
            } else if (session.$mode.getMatching) {
                var range = session.$mode.getMatching(self.session);
            }
            if (range)
                session.$bracketHighlight = session.addMarker(range, "ace_bracket", "text");
        }, 50);
    };
    this.$highlightTags = function() {
        if (this.$highlightTagPending)
            return;
        var self = this;
        this.$highlightTagPending = true;
        setTimeout(function() {
            self.$highlightTagPending = false;
            
            var session = self.session;
            if (!session || !session.bgTokenizer) return;
            
            var pos = self.getCursorPosition();
            var iterator = new TokenIterator(self.session, pos.row, pos.column);
            var token = iterator.getCurrentToken();
            
            if (!token || !/\b(?:tag-open|tag-name)/.test(token.type)) {
                session.removeMarker(session.$tagHighlight);
                session.$tagHighlight = null;
                return;
            }
            
            if (token.type.indexOf("tag-open") != -1) {
                token = iterator.stepForward();
                if (!token)
                    return;
            }
            
            var tag = token.value;
            var depth = 0;
            var prevToken = iterator.stepBackward();
            
            if (prevToken.value == '<'){
                do {
                    prevToken = token;
                    token = iterator.stepForward();
                    
                    if (token && token.value === tag && token.type.indexOf('tag-name') !== -1) {
                        if (prevToken.value === '<'){
                            depth++;
                        } else if (prevToken.value === '</'){
                            depth--;
                        }
                    }
                    
                } while (token && depth >= 0);
            } else {
                do {
                    token = prevToken;
                    prevToken = iterator.stepBackward();
                    
                    if (token && token.value === tag && token.type.indexOf('tag-name') !== -1) {
                        if (prevToken.value === '<') {
                            depth++;
                        } else if (prevToken.value === '</') {
                            depth--;
                        }
                    }
                } while (prevToken && depth <= 0);
                iterator.stepForward();
            }
            
            if (!token) {
                session.removeMarker(session.$tagHighlight);
                session.$tagHighlight = null;
                return;
            }
            
            var row = iterator.getCurrentTokenRow();
            var column = iterator.getCurrentTokenColumn();
            var range = new Range(row, column, row, column+token.value.length);
            if (session.$tagHighlight && range.compareRange(session.$backMarkers[session.$tagHighlight].range)!==0) {
                session.removeMarker(session.$tagHighlight);
                session.$tagHighlight = null;
            }
            
            if (range && !session.$tagHighlight)
                session.$tagHighlight = session.addMarker(range, "ace_bracket", "text");
        }, 50);
    };
    this.focus = function() {
        var _self = this;
        setTimeout(function() {
            _self.textInput.focus();
        });
        this.textInput.focus();
    };
    this.isFocused = function() {
        return this.textInput.isFocused();
    };
    this.blur = function() {
        this.textInput.blur();
    };
    this.onFocus = function(e) {
        if (this.$isFocused)
            return;
        this.$isFocused = true;
        this.renderer.showCursor();
        this.renderer.visualizeFocus();
        this._emit("focus", e);
    };
    this.onBlur = function(e) {
        if (!this.$isFocused)
            return;
        this.$isFocused = false;
        this.renderer.hideCursor();
        this.renderer.visualizeBlur();
        this._emit("blur", e);
    };

    this.$cursorChange = function() {
        this.renderer.updateCursor();
    };
    this.onDocumentChange = function(e) {
        var delta = e.data;
        var range = delta.range;
        var lastRow;

        if (range.start.row == range.end.row && delta.action != "insertLines" && delta.action != "removeLines")
            lastRow = range.end.row;
        else
            lastRow = Infinity;
        this.renderer.updateLines(range.start.row, lastRow, this.session.$useWrapMode);

        this._signal("change", e);
        this.$cursorChange();
        this.$updateHighlightActiveLine();
    };

    this.onTokenizerUpdate = function(e) {
        var rows = e.data;
        this.renderer.updateLines(rows.first, rows.last);
    };


    this.onScrollTopChange = function() {
        this.renderer.scrollToY(this.session.getScrollTop());
    };

    this.onScrollLeftChange = function() {
        this.renderer.scrollToX(this.session.getScrollLeft());
    };
    this.onCursorChange = function() {
        this.$cursorChange();

        if (!this.$blockScrolling) {
            config.warn("Automatically scrolling cursor into view after selection change",
                "this will be disabled in the next version",
                "set editor.$blockScrolling = Infinity to disable this message"
            );
            this.renderer.scrollCursorIntoView();
        }

        this.$highlightBrackets();
        this.$highlightTags();
        this.$updateHighlightActiveLine();
        this._signal("changeSelection");
    };

    this.$updateHighlightActiveLine = function() {
        var session = this.getSession();

        var highlight;
        if (this.$highlightActiveLine) {
            if ((this.$selectionStyle != "line" || !this.selection.isMultiLine()))
                highlight = this.getCursorPosition();
            if (this.renderer.$maxLines && this.session.getLength() === 1 && !(this.renderer.$minLines > 1))
                highlight = false;
        }

        if (session.$highlightLineMarker && !highlight) {
            session.removeMarker(session.$highlightLineMarker.id);
            session.$highlightLineMarker = null;
        } else if (!session.$highlightLineMarker && highlight) {
            var range = new Range(highlight.row, highlight.column, highlight.row, Infinity);
            range.id = session.addMarker(range, "ace_active-line", "screenLine");
            session.$highlightLineMarker = range;
        } else if (highlight) {
            session.$highlightLineMarker.start.row = highlight.row;
            session.$highlightLineMarker.end.row = highlight.row;
            session.$highlightLineMarker.start.column = highlight.column;
            session._signal("changeBackMarker");
        }
    };

    this.onSelectionChange = function(e) {
        var session = this.session;

        if (session.$selectionMarker) {
            session.removeMarker(session.$selectionMarker);
        }
        session.$selectionMarker = null;

        if (!this.selection.isEmpty()) {
            var range = this.selection.getRange();
            var style = this.getSelectionStyle();
            session.$selectionMarker = session.addMarker(range, "ace_selection", style);
        } else {
            this.$updateHighlightActiveLine();
        }

        var re = this.$highlightSelectedWord && this.$getSelectionHighLightRegexp();
        this.session.highlight(re);

        this._signal("changeSelection");
    };

    this.$getSelectionHighLightRegexp = function() {
        var session = this.session;

        var selection = this.getSelectionRange();
        if (selection.isEmpty() || selection.isMultiLine())
            return;

        var startOuter = selection.start.column - 1;
        var endOuter = selection.end.column + 1;
        var line = session.getLine(selection.start.row);
        var lineCols = line.length;
        var needle = line.substring(Math.max(startOuter, 0),
                                    Math.min(endOuter, lineCols));
        if ((startOuter >= 0 && /^[\w\d]/.test(needle)) ||
            (endOuter <= lineCols && /[\w\d]$/.test(needle)))
            return;

        needle = line.substring(selection.start.column, selection.end.column);
        if (!/^[\w\d]+$/.test(needle))
            return;

        var re = this.$search.$assembleRegExp({
            wholeWord: true,
            caseSensitive: true,
            needle: needle
        });

        return re;
    };


    this.onChangeFrontMarker = function() {
        this.renderer.updateFrontMarkers();
    };

    this.onChangeBackMarker = function() {
        this.renderer.updateBackMarkers();
    };


    this.onChangeBreakpoint = function() {
        this.renderer.updateBreakpoints();
    };

    this.onChangeAnnotation = function() {
        this.renderer.setAnnotations(this.session.getAnnotations());
    };


    this.onChangeMode = function(e) {
        this.renderer.updateText();
        this._emit("changeMode", e);
    };


    this.onChangeWrapLimit = function() {
        this.renderer.updateFull();
    };

    this.onChangeWrapMode = function() {
        this.renderer.onResize(true);
    };


    this.onChangeFold = function() {
        this.$updateHighlightActiveLine();
        this.renderer.updateFull();
    };
    this.getSelectedText = function() {
        return this.session.getTextRange(this.getSelectionRange());
    };
    this.getCopyText = function() {
        var text = this.getSelectedText();
        this._signal("copy", text);
        return text;
    };
    this.onCopy = function() {
        this.commands.exec("copy", this);
    };
    this.onCut = function() {
        this.commands.exec("cut", this);
    };
    this.onPaste = function(text) {
        if (this.$readOnly)
            return;

        var e = {text: text};
        this._signal("paste", e);
        text = e.text;
        if (!this.inMultiSelectMode || this.inVirtualSelectionMode) {
            this.insert(text);
        } else {
            var lines = text.split(/\r\n|\r|\n/);
            var ranges = this.selection.rangeList.ranges;
    
            if (lines.length > ranges.length || lines.length < 2 || !lines[1])
                return this.commands.exec("insertstring", this, text);
    
            for (var i = ranges.length; i--;) {
                var range = ranges[i];
                if (!range.isEmpty())
                    this.session.remove(range);
    
                this.session.insert(range.start, lines[i]);
            }
        }
        this.renderer.scrollCursorIntoView();
    };

    this.execCommand = function(command, args) {
        return this.commands.exec(command, this, args);
    };
    this.insert = function(text, pasted) {
        var session = this.session;
        var mode = session.getMode();
        var cursor = this.getCursorPosition();

        if (this.getBehavioursEnabled() && !pasted) {
            var transform = mode.transformAction(session.getState(cursor.row), 'insertion', this, session, text);
            if (transform) {
                if (text !== transform.text) {
                    this.session.mergeUndoDeltas = false;
                    this.$mergeNextCommand = false;
                }
                text = transform.text;

            }
        }
        
        if (text == "\t")
            text = this.session.getTabString();
        if (!this.selection.isEmpty()) {
            var range = this.getSelectionRange();
            cursor = this.session.remove(range);
            this.clearSelection();
        }
        else if (this.session.getOverwrite()) {
            var range = new Range.fromPoints(cursor, cursor);
            range.end.column += text.length;
            this.session.remove(range);
        }

        if (text == "\n" || text == "\r\n") {
            var line = session.getLine(cursor.row);
            if (cursor.column > line.search(/\S|$/)) {
                var d = line.substr(cursor.column).search(/\S|$/);
                session.doc.removeInLine(cursor.row, cursor.column, cursor.column + d);
            }
        }
        this.clearSelection();

        var start = cursor.column;
        var lineState = session.getState(cursor.row);
        var line = session.getLine(cursor.row);
        var shouldOutdent = mode.checkOutdent(lineState, line, text);
        var end = session.insert(cursor, text);

        if (transform && transform.selection) {
            if (transform.selection.length == 2) { // Transform relative to the current column
                this.selection.setSelectionRange(
                    new Range(cursor.row, start + transform.selection[0],
                              cursor.row, start + transform.selection[1]));
            } else { // Transform relative to the current row.
                this.selection.setSelectionRange(
                    new Range(cursor.row + transform.selection[0],
                              transform.selection[1],
                              cursor.row + transform.selection[2],
                              transform.selection[3]));
            }
        }

        if (session.getDocument().isNewLine(text)) {
            var lineIndent = mode.getNextLineIndent(lineState, line.slice(0, cursor.column), session.getTabString());

            session.insert({row: cursor.row+1, column: 0}, lineIndent);
        }
        if (shouldOutdent)
            mode.autoOutdent(lineState, session, cursor.row);
    };

    this.onTextInput = function(text) {
        this.keyBinding.onTextInput(text);
    };

    this.onCommandKey = function(e, hashId, keyCode) {
        this.keyBinding.onCommandKey(e, hashId, keyCode);
    };
    this.setOverwrite = function(overwrite) {
        this.session.setOverwrite(overwrite);
    };
    this.getOverwrite = function() {
        return this.session.getOverwrite();
    };
    this.toggleOverwrite = function() {
        this.session.toggleOverwrite();
    };
    this.setScrollSpeed = function(speed) {
        this.setOption("scrollSpeed", speed);
    };
    this.getScrollSpeed = function() {
        return this.getOption("scrollSpeed");
    };
    this.setDragDelay = function(dragDelay) {
        this.setOption("dragDelay", dragDelay);
    };
    this.getDragDelay = function() {
        return this.getOption("dragDelay");
    };
    this.setSelectionStyle = function(val) {
        this.setOption("selectionStyle", val);
    };
    this.getSelectionStyle = function() {
        return this.getOption("selectionStyle");
    };
    this.setHighlightActiveLine = function(shouldHighlight) {
        this.setOption("highlightActiveLine", shouldHighlight);
    };
    this.getHighlightActiveLine = function() {
        return this.getOption("highlightActiveLine");
    };
    this.setHighlightGutterLine = function(shouldHighlight) {
        this.setOption("highlightGutterLine", shouldHighlight);
    };

    this.getHighlightGutterLine = function() {
        return this.getOption("highlightGutterLine");
    };
    this.setHighlightSelectedWord = function(shouldHighlight) {
        this.setOption("highlightSelectedWord", shouldHighlight);
    };
    this.getHighlightSelectedWord = function() {
        return this.$highlightSelectedWord;
    };

    this.setAnimatedScroll = function(shouldAnimate){
        this.renderer.setAnimatedScroll(shouldAnimate);
    };

    this.getAnimatedScroll = function(){
        return this.renderer.getAnimatedScroll();
    };
    this.setShowInvisibles = function(showInvisibles) {
        this.renderer.setShowInvisibles(showInvisibles);
    };
    this.getShowInvisibles = function() {
        return this.renderer.getShowInvisibles();
    };

    this.setDisplayIndentGuides = function(display) {
        this.renderer.setDisplayIndentGuides(display);
    };

    this.getDisplayIndentGuides = function() {
        return this.renderer.getDisplayIndentGuides();
    };
    this.setShowPrintMargin = function(showPrintMargin) {
        this.renderer.setShowPrintMargin(showPrintMargin);
    };
    this.getShowPrintMargin = function() {
        return this.renderer.getShowPrintMargin();
    };
    this.setPrintMarginColumn = function(showPrintMargin) {
        this.renderer.setPrintMarginColumn(showPrintMargin);
    };
    this.getPrintMarginColumn = function() {
        return this.renderer.getPrintMarginColumn();
    };
    this.setReadOnly = function(readOnly) {
        this.setOption("readOnly", readOnly);
    };
    this.getReadOnly = function() {
        return this.getOption("readOnly");
    };
    this.setBehavioursEnabled = function (enabled) {
        this.setOption("behavioursEnabled", enabled);
    };
    this.getBehavioursEnabled = function () {
        return this.getOption("behavioursEnabled");
    };
    this.setWrapBehavioursEnabled = function (enabled) {
        this.setOption("wrapBehavioursEnabled", enabled);
    };
    this.getWrapBehavioursEnabled = function () {
        return this.getOption("wrapBehavioursEnabled");
    };
    this.setShowFoldWidgets = function(show) {
        this.setOption("showFoldWidgets", show);

    };
    this.getShowFoldWidgets = function() {
        return this.getOption("showFoldWidgets");
    };

    this.setFadeFoldWidgets = function(fade) {
        this.setOption("fadeFoldWidgets", fade);
    };

    this.getFadeFoldWidgets = function() {
        return this.getOption("fadeFoldWidgets");
    };
    this.remove = function(dir) {
        if (this.selection.isEmpty()){
            if (dir == "left")
                this.selection.selectLeft();
            else
                this.selection.selectRight();
        }

        var range = this.getSelectionRange();
        if (this.getBehavioursEnabled()) {
            var session = this.session;
            var state = session.getState(range.start.row);
            var new_range = session.getMode().transformAction(state, 'deletion', this, session, range);

            if (range.end.column === 0) {
                var text = session.getTextRange(range);
                if (text[text.length - 1] == "\n") {
                    var line = session.getLine(range.end.row);
                    if (/^\s+$/.test(line)) {
                        range.end.column = line.length;
                    }
                }
            }
            if (new_range)
                range = new_range;
        }

        this.session.remove(range);
        this.clearSelection();
    };
    this.removeWordRight = function() {
        if (this.selection.isEmpty())
            this.selection.selectWordRight();

        this.session.remove(this.getSelectionRange());
        this.clearSelection();
    };
    this.removeWordLeft = function() {
        if (this.selection.isEmpty())
            this.selection.selectWordLeft();

        this.session.remove(this.getSelectionRange());
        this.clearSelection();
    };
    this.removeToLineStart = function() {
        if (this.selection.isEmpty())
            this.selection.selectLineStart();

        this.session.remove(this.getSelectionRange());
        this.clearSelection();
    };
    this.removeToLineEnd = function() {
        if (this.selection.isEmpty())
            this.selection.selectLineEnd();

        var range = this.getSelectionRange();
        if (range.start.column == range.end.column && range.start.row == range.end.row) {
            range.end.column = 0;
            range.end.row++;
        }

        this.session.remove(range);
        this.clearSelection();
    };
    this.splitLine = function() {
        if (!this.selection.isEmpty()) {
            this.session.remove(this.getSelectionRange());
            this.clearSelection();
        }

        var cursor = this.getCursorPosition();
        this.insert("\n");
        this.moveCursorToPosition(cursor);
    };
    this.transposeLetters = function() {
        if (!this.selection.isEmpty()) {
            return;
        }

        var cursor = this.getCursorPosition();
        var column = cursor.column;
        if (column === 0)
            return;

        var line = this.session.getLine(cursor.row);
        var swap, range;
        if (column < line.length) {
            swap = line.charAt(column) + line.charAt(column-1);
            range = new Range(cursor.row, column-1, cursor.row, column+1);
        }
        else {
            swap = line.charAt(column-1) + line.charAt(column-2);
            range = new Range(cursor.row, column-2, cursor.row, column);
        }
        this.session.replace(range, swap);
    };
    this.toLowerCase = function() {
        var originalRange = this.getSelectionRange();
        if (this.selection.isEmpty()) {
            this.selection.selectWord();
        }

        var range = this.getSelectionRange();
        var text = this.session.getTextRange(range);
        this.session.replace(range, text.toLowerCase());
        this.selection.setSelectionRange(originalRange);
    };
    this.toUpperCase = function() {
        var originalRange = this.getSelectionRange();
        if (this.selection.isEmpty()) {
            this.selection.selectWord();
        }

        var range = this.getSelectionRange();
        var text = this.session.getTextRange(range);
        this.session.replace(range, text.toUpperCase());
        this.selection.setSelectionRange(originalRange);
    };
    this.indent = function() {
        var session = this.session;
        var range = this.getSelectionRange();

        if (range.start.row < range.end.row) {
            var rows = this.$getSelectedRows();
            session.indentRows(rows.first, rows.last, "\t");
            return;
        } else if (range.start.column < range.end.column) {
            var text = session.getTextRange(range);
            if (!/^\s+$/.test(text)) {
                var rows = this.$getSelectedRows();
                session.indentRows(rows.first, rows.last, "\t");
                return;
            }
        }
        
        var line = session.getLine(range.start.row);
        var position = range.start;
        var size = session.getTabSize();
        var column = session.documentToScreenColumn(position.row, position.column);

        if (this.session.getUseSoftTabs()) {
            var count = (size - column % size);
            var indentString = lang.stringRepeat(" ", count);
        } else {
            var count = column % size;
            while (line[range.start.column] == " " && count) {
                range.start.column--;
                count--;
            }
            this.selection.setSelectionRange(range);
            indentString = "\t";
        }
        return this.insert(indentString);
    };
    this.blockIndent = function() {
        var rows = this.$getSelectedRows();
        this.session.indentRows(rows.first, rows.last, "\t");
    };
    this.blockOutdent = function() {
        var selection = this.session.getSelection();
        this.session.outdentRows(selection.getRange());
    };
    this.sortLines = function() {
        var rows = this.$getSelectedRows();
        var session = this.session;

        var lines = [];
        for (i = rows.first; i <= rows.last; i++)
            lines.push(session.getLine(i));

        lines.sort(function(a, b) {
            if (a.toLowerCase() < b.toLowerCase()) return -1;
            if (a.toLowerCase() > b.toLowerCase()) return 1;
            return 0;
        });

        var deleteRange = new Range(0, 0, 0, 0);
        for (var i = rows.first; i <= rows.last; i++) {
            var line = session.getLine(i);
            deleteRange.start.row = i;
            deleteRange.end.row = i;
            deleteRange.end.column = line.length;
            session.replace(deleteRange, lines[i-rows.first]);
        }
    };
    this.toggleCommentLines = function() {
        var state = this.session.getState(this.getCursorPosition().row);
        var rows = this.$getSelectedRows();
        this.session.getMode().toggleCommentLines(state, this.session, rows.first, rows.last);
    };

    this.toggleBlockComment = function() {
        var cursor = this.getCursorPosition();
        var state = this.session.getState(cursor.row);
        var range = this.getSelectionRange();
        this.session.getMode().toggleBlockComment(state, this.session, range, cursor);
    };
    this.getNumberAt = function(row, column) {
        var _numberRx = /[\-]?[0-9]+(?:\.[0-9]+)?/g;
        _numberRx.lastIndex = 0;

        var s = this.session.getLine(row);
        while (_numberRx.lastIndex < column) {
            var m = _numberRx.exec(s);
            if(m.index <= column && m.index+m[0].length >= column){
                var number = {
                    value: m[0],
                    start: m.index,
                    end: m.index+m[0].length
                };
                return number;
            }
        }
        return null;
    };
    this.modifyNumber = function(amount) {
        var row = this.selection.getCursor().row;
        var column = this.selection.getCursor().column;
        var charRange = new Range(row, column-1, row, column);

        var c = this.session.getTextRange(charRange);
        if (!isNaN(parseFloat(c)) && isFinite(c)) {
            var nr = this.getNumberAt(row, column);
            if (nr) {
                var fp = nr.value.indexOf(".") >= 0 ? nr.start + nr.value.indexOf(".") + 1 : nr.end;
                var decimals = nr.start + nr.value.length - fp;

                var t = parseFloat(nr.value);
                t *= Math.pow(10, decimals);


                if(fp !== nr.end && column < fp){
                    amount *= Math.pow(10, nr.end - column - 1);
                } else {
                    amount *= Math.pow(10, nr.end - column);
                }

                t += amount;
                t /= Math.pow(10, decimals);
                var nnr = t.toFixed(decimals);
                var replaceRange = new Range(row, nr.start, row, nr.end);
                this.session.replace(replaceRange, nnr);
                this.moveCursorTo(row, Math.max(nr.start +1, column + nnr.length - nr.value.length));

            }
        }
    };
    this.removeLines = function() {
        var rows = this.$getSelectedRows();
        var range;
        if (rows.first === 0 || rows.last+1 < this.session.getLength())
            range = new Range(rows.first, 0, rows.last+1, 0);
        else
            range = new Range(
                rows.first-1, this.session.getLine(rows.first-1).length,
                rows.last, this.session.getLine(rows.last).length
            );
        this.session.remove(range);
        this.clearSelection();
    };

    this.duplicateSelection = function() {
        var sel = this.selection;
        var doc = this.session;
        var range = sel.getRange();
        var reverse = sel.isBackwards();
        if (range.isEmpty()) {
            var row = range.start.row;
            doc.duplicateLines(row, row);
        } else {
            var point = reverse ? range.start : range.end;
            var endPoint = doc.insert(point, doc.getTextRange(range), false);
            range.start = point;
            range.end = endPoint;

            sel.setSelectionRange(range, reverse);
        }
    };
    this.moveLinesDown = function() {
        this.$moveLines(1, false);
    };
    this.moveLinesUp = function() {
        this.$moveLines(-1, false);
    };
    this.moveText = function(range, toPosition, copy) {
        return this.session.moveText(range, toPosition, copy);
    };
    this.copyLinesUp = function() {
        this.$moveLines(-1, true);
    };
    this.copyLinesDown = function() {
        this.$moveLines(1, true);
    };
    this.$moveLines = function(dir, copy) {
        var rows, moved;
        var selection = this.selection;
        if (!selection.inMultiSelectMode || this.inVirtualSelectionMode) {
            var range = selection.toOrientedRange();
            rows = this.$getSelectedRows(range);
            moved = this.session.$moveLines(rows.first, rows.last, copy ? 0 : dir);
            if (copy && dir == -1) moved = 0;
            range.moveBy(moved, 0);
            selection.fromOrientedRange(range);
        } else {
            var ranges = selection.rangeList.ranges;
            selection.rangeList.detach(this.session);
            this.inVirtualSelectionMode = true;
            
            var diff = 0;
            var totalDiff = 0;
            var l = ranges.length;
            for (var i = 0; i < l; i++) {
                var rangeIndex = i;
                ranges[i].moveBy(diff, 0);
                rows = this.$getSelectedRows(ranges[i]);
                var first = rows.first;
                var last = rows.last;
                while (++i < l) {
                    if (totalDiff) ranges[i].moveBy(totalDiff, 0);
                    var subRows = this.$getSelectedRows(ranges[i]);
                    if (copy && subRows.first != last)
                        break;
                    else if (!copy && subRows.first > last + 1)
                        break;
                    last = subRows.last;
                }
                i--;
                diff = this.session.$moveLines(first, last, copy ? 0 : dir);
                if (copy && dir == -1) rangeIndex = i + 1;
                while (rangeIndex <= i) {
                    ranges[rangeIndex].moveBy(diff, 0);
                    rangeIndex++;
                }
                if (!copy) diff = 0;
                totalDiff += diff;
            }
            
            selection.fromOrientedRange(selection.ranges[0]);
            selection.rangeList.attach(this.session);
            this.inVirtualSelectionMode = false;
        }
    };
    this.$getSelectedRows = function(range) {
        range = (range || this.getSelectionRange()).collapseRows();

        return {
            first: this.session.getRowFoldStart(range.start.row),
            last: this.session.getRowFoldEnd(range.end.row)
        };
    };

    this.onCompositionStart = function(text) {
        this.renderer.showComposition(this.getCursorPosition());
    };

    this.onCompositionUpdate = function(text) {
        this.renderer.setCompositionText(text);
    };

    this.onCompositionEnd = function() {
        this.renderer.hideComposition();
    };
    this.getFirstVisibleRow = function() {
        return this.renderer.getFirstVisibleRow();
    };
    this.getLastVisibleRow = function() {
        return this.renderer.getLastVisibleRow();
    };
    this.isRowVisible = function(row) {
        return (row >= this.getFirstVisibleRow() && row <= this.getLastVisibleRow());
    };
    this.isRowFullyVisible = function(row) {
        return (row >= this.renderer.getFirstFullyVisibleRow() && row <= this.renderer.getLastFullyVisibleRow());
    };
    this.$getVisibleRowCount = function() {
        return this.renderer.getScrollBottomRow() - this.renderer.getScrollTopRow() + 1;
    };

    this.$moveByPage = function(dir, select) {
        var renderer = this.renderer;
        var config = this.renderer.layerConfig;
        var rows = dir * Math.floor(config.height / config.lineHeight);

        this.$blockScrolling++;
        if (select === true) {
            this.selection.$moveSelection(function(){
                this.moveCursorBy(rows, 0);
            });
        } else if (select === false) {
            this.selection.moveCursorBy(rows, 0);
            this.selection.clearSelection();
        }
        this.$blockScrolling--;

        var scrollTop = renderer.scrollTop;

        renderer.scrollBy(0, rows * config.lineHeight);
        if (select != null)
            renderer.scrollCursorIntoView(null, 0.5);

        renderer.animateScrolling(scrollTop);
    };
    this.selectPageDown = function() {
        this.$moveByPage(1, true);
    };
    this.selectPageUp = function() {
        this.$moveByPage(-1, true);
    };
    this.gotoPageDown = function() {
       this.$moveByPage(1, false);
    };
    this.gotoPageUp = function() {
        this.$moveByPage(-1, false);
    };
    this.scrollPageDown = function() {
        this.$moveByPage(1);
    };
    this.scrollPageUp = function() {
        this.$moveByPage(-1);
    };
    this.scrollToRow = function(row) {
        this.renderer.scrollToRow(row);
    };
    this.scrollToLine = function(line, center, animate, callback) {
        this.renderer.scrollToLine(line, center, animate, callback);
    };
    this.centerSelection = function() {
        var range = this.getSelectionRange();
        var pos = {
            row: Math.floor(range.start.row + (range.end.row - range.start.row) / 2),
            column: Math.floor(range.start.column + (range.end.column - range.start.column) / 2)
        };
        this.renderer.alignCursor(pos, 0.5);
    };
    this.getCursorPosition = function() {
        return this.selection.getCursor();
    };
    this.getCursorPositionScreen = function() {
        return this.session.documentToScreenPosition(this.getCursorPosition());
    };
    this.getSelectionRange = function() {
        return this.selection.getRange();
    };
    this.selectAll = function() {
        this.$blockScrolling += 1;
        this.selection.selectAll();
        this.$blockScrolling -= 1;
    };
    this.clearSelection = function() {
        this.selection.clearSelection();
    };
    this.moveCursorTo = function(row, column) {
        this.selection.moveCursorTo(row, column);
    };
    this.moveCursorToPosition = function(pos) {
        this.selection.moveCursorToPosition(pos);
    };
    this.jumpToMatching = function(select, expand) {
        var cursor = this.getCursorPosition();
        var iterator = new TokenIterator(this.session, cursor.row, cursor.column);
        var prevToken = iterator.getCurrentToken();
        var token = prevToken || iterator.stepForward();

        if (!token) return;
        var matchType;
        var found = false;
        var depth = {};
        var i = cursor.column - token.start;
        var bracketType;
        var brackets = {
            ")": "(",
            "(": "(",
            "]": "[",
            "[": "[",
            "{": "{",
            "}": "{"
        };
        
        do {
            if (token.value.match(/[{}()\[\]]/g)) {
                for (; i < token.value.length && !found; i++) {
                    if (!brackets[token.value[i]]) {
                        continue;
                    }

                    bracketType = brackets[token.value[i]] + '.' + token.type.replace("rparen", "lparen");

                    if (isNaN(depth[bracketType])) {
                        depth[bracketType] = 0;
                    }

                    switch (token.value[i]) {
                        case '(':
                        case '[':
                        case '{':
                            depth[bracketType]++;
                            break;
                        case ')':
                        case ']':
                        case '}':
                            depth[bracketType]--;

                            if (depth[bracketType] === -1) {
                                matchType = 'bracket';
                                found = true;
                            }
                        break;
                    }
                }
            }
            else if (token && token.type.indexOf('tag-name') !== -1) {
                if (isNaN(depth[token.value])) {
                    depth[token.value] = 0;
                }
                
                if (prevToken.value === '<') {
                    depth[token.value]++;
                }
                else if (prevToken.value === '</') {
                    depth[token.value]--;
                }
                
                if (depth[token.value] === -1) {
                    matchType = 'tag';
                    found = true;
                }
            }

            if (!found) {
                prevToken = token;
                token = iterator.stepForward();
                i = 0;
            }
        } while (token && !found);
        if (!matchType)
            return;

        var range, pos;
        if (matchType === 'bracket') {
            range = this.session.getBracketRange(cursor);
            if (!range) {
                range = new Range(
                    iterator.getCurrentTokenRow(),
                    iterator.getCurrentTokenColumn() + i - 1,
                    iterator.getCurrentTokenRow(),
                    iterator.getCurrentTokenColumn() + i - 1
                );
                pos = range.start;
                if (expand || pos.row === cursor.row && Math.abs(pos.column - cursor.column) < 2)
                    range = this.session.getBracketRange(pos);
            }
        }
        else if (matchType === 'tag') {
            if (token && token.type.indexOf('tag-name') !== -1) 
                var tag = token.value;
            else
                return;

            range = new Range(
                iterator.getCurrentTokenRow(),
                iterator.getCurrentTokenColumn() - 2,
                iterator.getCurrentTokenRow(),
                iterator.getCurrentTokenColumn() - 2
            );
            if (range.compare(cursor.row, cursor.column) === 0) {
                found = false;
                do {
                    token = prevToken;
                    prevToken = iterator.stepBackward();
                    
                    if (prevToken) {
                        if (prevToken.type.indexOf('tag-close') !== -1) {
                            range.setEnd(iterator.getCurrentTokenRow(), iterator.getCurrentTokenColumn() + 1);
                        }

                        if (token.value === tag && token.type.indexOf('tag-name') !== -1) {
                            if (prevToken.value === '<') {
                                depth[tag]++;
                            }
                            else if (prevToken.value === '</') {
                                depth[tag]--;
                            }
                            
                            if (depth[tag] === 0)
                                found = true;
                        }
                    }
                } while (prevToken && !found);
            }
            if (token && token.type.indexOf('tag-name')) {
                pos = range.start;
                if (pos.row == cursor.row && Math.abs(pos.column - cursor.column) < 2)
                    pos = range.end;
            }
        }

        pos = range && range.cursor || pos;
        if (pos) {
            if (select) {
                if (range && expand) {
                    this.selection.setRange(range);
                } else if (range && range.isEqual(this.getSelectionRange())) {
                    this.clearSelection();
                } else {
                    this.selection.selectTo(pos.row, pos.column);
                }
            } else {
                this.selection.moveTo(pos.row, pos.column);
            }
        }
    };
    this.gotoLine = function(lineNumber, column, animate) {
        this.selection.clearSelection();
        this.session.unfold({row: lineNumber - 1, column: column || 0});

        this.$blockScrolling += 1;
        this.exitMultiSelectMode && this.exitMultiSelectMode();
        this.moveCursorTo(lineNumber - 1, column || 0);
        this.$blockScrolling -= 1;

        if (!this.isRowFullyVisible(lineNumber - 1))
            this.scrollToLine(lineNumber - 1, true, animate);
    };
    this.navigateTo = function(row, column) {
        this.selection.moveTo(row, column);
    };
    this.navigateUp = function(times) {
        if (this.selection.isMultiLine() && !this.selection.isBackwards()) {
            var selectionStart = this.selection.anchor.getPosition();
            return this.moveCursorToPosition(selectionStart);
        }
        this.selection.clearSelection();
        this.selection.moveCursorBy(-times || -1, 0);
    };
    this.navigateDown = function(times) {
        if (this.selection.isMultiLine() && this.selection.isBackwards()) {
            var selectionEnd = this.selection.anchor.getPosition();
            return this.moveCursorToPosition(selectionEnd);
        }
        this.selection.clearSelection();
        this.selection.moveCursorBy(times || 1, 0);
    };
    this.navigateLeft = function(times) {
        if (!this.selection.isEmpty()) {
            var selectionStart = this.getSelectionRange().start;
            this.moveCursorToPosition(selectionStart);
        }
        else {
            times = times || 1;
            while (times--) {
                this.selection.moveCursorLeft();
            }
        }
        this.clearSelection();
    };
    this.navigateRight = function(times) {
        if (!this.selection.isEmpty()) {
            var selectionEnd = this.getSelectionRange().end;
            this.moveCursorToPosition(selectionEnd);
        }
        else {
            times = times || 1;
            while (times--) {
                this.selection.moveCursorRight();
            }
        }
        this.clearSelection();
    };
    this.navigateLineStart = function() {
        this.selection.moveCursorLineStart();
        this.clearSelection();
    };
    this.navigateLineEnd = function() {
        this.selection.moveCursorLineEnd();
        this.clearSelection();
    };
    this.navigateFileEnd = function() {
        this.selection.moveCursorFileEnd();
        this.clearSelection();
    };
    this.navigateFileStart = function() {
        this.selection.moveCursorFileStart();
        this.clearSelection();
    };
    this.navigateWordRight = function() {
        this.selection.moveCursorWordRight();
        this.clearSelection();
    };
    this.navigateWordLeft = function() {
        this.selection.moveCursorWordLeft();
        this.clearSelection();
    };
    this.replace = function(replacement, options) {
        if (options)
            this.$search.set(options);

        var range = this.$search.find(this.session);
        var replaced = 0;
        if (!range)
            return replaced;

        if (this.$tryReplace(range, replacement)) {
            replaced = 1;
        }
        if (range !== null) {
            this.selection.setSelectionRange(range);
            this.renderer.scrollSelectionIntoView(range.start, range.end);
        }

        return replaced;
    };
    this.replaceAll = function(replacement, options) {
        if (options) {
            this.$search.set(options);
        }

        var ranges = this.$search.findAll(this.session);
        var replaced = 0;
        if (!ranges.length)
            return replaced;

        this.$blockScrolling += 1;

        var selection = this.getSelectionRange();
        this.selection.moveTo(0, 0);

        for (var i = ranges.length - 1; i >= 0; --i) {
            if(this.$tryReplace(ranges[i], replacement)) {
                replaced++;
            }
        }

        this.selection.setSelectionRange(selection);
        this.$blockScrolling -= 1;

        return replaced;
    };

    this.$tryReplace = function(range, replacement) {
        var input = this.session.getTextRange(range);
        replacement = this.$search.replace(input, replacement);
        if (replacement !== null) {
            range.end = this.session.replace(range, replacement);
            return range;
        } else {
            return null;
        }
    };
    this.getLastSearchOptions = function() {
        return this.$search.getOptions();
    };
    this.find = function(needle, options, animate) {
        if (!options)
            options = {};

        if (typeof needle == "string" || needle instanceof RegExp)
            options.needle = needle;
        else if (typeof needle == "object")
            oop.mixin(options, needle);

        var range = this.selection.getRange();
        if (options.needle == null) {
            needle = this.session.getTextRange(range)
                || this.$search.$options.needle;
            if (!needle) {
                range = this.session.getWordRange(range.start.row, range.start.column);
                needle = this.session.getTextRange(range);
            }
            this.$search.set({needle: needle});
        }

        this.$search.set(options);
        if (!options.start)
            this.$search.set({start: range});

        var newRange = this.$search.find(this.session);
        if (options.preventScroll)
            return newRange;
        if (newRange) {
            this.revealRange(newRange, animate);
            return newRange;
        }
        if (options.backwards)
            range.start = range.end;
        else
            range.end = range.start;
        this.selection.setRange(range);
    };
    this.findNext = function(options, animate) {
        this.find({skipCurrent: true, backwards: false}, options, animate);
    };
    this.findPrevious = function(options, animate) {
        this.find(options, {skipCurrent: true, backwards: true}, animate);
    };

    this.revealRange = function(range, animate) {
        this.$blockScrolling += 1;
        this.session.unfold(range);
        this.selection.setSelectionRange(range);
        this.$blockScrolling -= 1;

        var scrollTop = this.renderer.scrollTop;
        this.renderer.scrollSelectionIntoView(range.start, range.end, 0.5);
        if (animate !== false)
            this.renderer.animateScrolling(scrollTop);
    };
    this.undo = function() {
        this.$blockScrolling++;
        this.session.getUndoManager().undo();
        this.$blockScrolling--;
        this.renderer.scrollCursorIntoView(null, 0.5);
    };
    this.redo = function() {
        this.$blockScrolling++;
        this.session.getUndoManager().redo();
        this.$blockScrolling--;
        this.renderer.scrollCursorIntoView(null, 0.5);
    };
    this.destroy = function() {
        this.renderer.destroy();
        this._signal("destroy", this);
        if (this.session) {
            this.session.destroy();
        }
    };
    this.setAutoScrollEditorIntoView = function(enable) {
        if (!enable)
            return;
        var rect;
        var self = this;
        var shouldScroll = false;
        if (!this.$scrollAnchor)
            this.$scrollAnchor = document.createElement("div");
        var scrollAnchor = this.$scrollAnchor;
        scrollAnchor.style.cssText = "position:absolute";
        this.container.insertBefore(scrollAnchor, this.container.firstChild);
        var onChangeSelection = this.on("changeSelection", function() {
            shouldScroll = true;
        });
        var onBeforeRender = this.renderer.on("beforeRender", function() {
            if (shouldScroll)
                rect = self.renderer.container.getBoundingClientRect();
        });
        var onAfterRender = this.renderer.on("afterRender", function() {
            if (shouldScroll && rect && (self.isFocused()
                || self.searchBox && self.searchBox.isFocused())
            ) {
                var renderer = self.renderer;
                var pos = renderer.$cursorLayer.$pixelPos;
                var config = renderer.layerConfig;
                var top = pos.top - config.offset;
                if (pos.top >= 0 && top + rect.top < 0) {
                    shouldScroll = true;
                } else if (pos.top < config.height &&
                    pos.top + rect.top + config.lineHeight > window.innerHeight) {
                    shouldScroll = false;
                } else {
                    shouldScroll = null;
                }
                if (shouldScroll != null) {
                    scrollAnchor.style.top = top + "px";
                    scrollAnchor.style.left = pos.left + "px";
                    scrollAnchor.style.height = config.lineHeight + "px";
                    scrollAnchor.scrollIntoView(shouldScroll);
                }
                shouldScroll = rect = null;
            }
        });
        this.setAutoScrollEditorIntoView = function(enable) {
            if (enable)
                return;
            delete this.setAutoScrollEditorIntoView;
            this.removeEventListener("changeSelection", onChangeSelection);
            this.renderer.removeEventListener("afterRender", onAfterRender);
            this.renderer.removeEventListener("beforeRender", onBeforeRender);
        };
    };


    this.$resetCursorStyle = function() {
        var style = this.$cursorStyle || "ace";
        var cursorLayer = this.renderer.$cursorLayer;
        if (!cursorLayer)
            return;
        cursorLayer.setSmoothBlinking(/smooth/.test(style));
        cursorLayer.isBlinking = !this.$readOnly && style != "wide";
        dom.setCssClass(cursorLayer.element, "ace_slim-cursors", /slim/.test(style));
    };

}).call(Editor.prototype);



config.defineOptions(Editor.prototype, "editor", {
    selectionStyle: {
        set: function(style) {
            this.onSelectionChange();
            this._signal("changeSelectionStyle", {data: style});
        },
        initialValue: "line"
    },
    highlightActiveLine: {
        set: function() {this.$updateHighlightActiveLine();},
        initialValue: true
    },
    highlightSelectedWord: {
        set: function(shouldHighlight) {this.$onSelectionChange();},
        initialValue: true
    },
    readOnly: {
        set: function(readOnly) {
            this.$resetCursorStyle(); 
        },
        initialValue: false
    },
    cursorStyle: {
        set: function(val) { this.$resetCursorStyle(); },
        values: ["ace", "slim", "smooth", "wide"],
        initialValue: "ace"
    },
    mergeUndoDeltas: {
        values: [false, true, "always"],
        initialValue: true
    },
    behavioursEnabled: {initialValue: true},
    wrapBehavioursEnabled: {initialValue: true},
    autoScrollEditorIntoView: {
        set: function(val) {this.setAutoScrollEditorIntoView(val)}
    },

    hScrollBarAlwaysVisible: "renderer",
    vScrollBarAlwaysVisible: "renderer",
    highlightGutterLine: "renderer",
    animatedScroll: "renderer",
    showInvisibles: "renderer",
    showPrintMargin: "renderer",
    printMarginColumn: "renderer",
    printMargin: "renderer",
    fadeFoldWidgets: "renderer",
    showFoldWidgets: "renderer",
    showLineNumbers: "renderer",
    showGutter: "renderer",
    displayIndentGuides: "renderer",
    fontSize: "renderer",
    fontFamily: "renderer",
    maxLines: "renderer",
    minLines: "renderer",
    scrollPastEnd: "renderer",
    fixedWidthGutter: "renderer",
    theme: "renderer",

    scrollSpeed: "$mouseHandler",
    dragDelay: "$mouseHandler",
    dragEnabled: "$mouseHandler",
    focusTimout: "$mouseHandler",
    tooltipFollowsMouse: "$mouseHandler",

    firstLineNumber: "session",
    overwrite: "session",
    newLineMode: "session",
    useWorker: "session",
    useSoftTabs: "session",
    tabSize: "session",
    wrap: "session",
    foldStyle: "session",
    mode: "session"
});

exports.Editor = Editor;
});

define("ace/undomanager",["require","exports","module"], function(require, exports, module) {
"use strict";
var UndoManager = function() {
    this.reset();
};

(function() {
    this.execute = function(options) {
        var deltas = options.args[0];
        this.$doc  = options.args[1];
        if (options.merge && this.hasUndo()){
            this.dirtyCounter--;
            deltas = this.$undoStack.pop().concat(deltas);
        }
        this.$undoStack.push(deltas);
        this.$redoStack = [];

        if (this.dirtyCounter < 0) {
            this.dirtyCounter = NaN;
        }
        this.dirtyCounter++;
    };
    this.undo = function(dontSelect) {
        var deltas = this.$undoStack.pop();
        var undoSelectionRange = null;
        if (deltas) {
            undoSelectionRange =
                this.$doc.undoChanges(deltas, dontSelect);
            this.$redoStack.push(deltas);
            this.dirtyCounter--;
        }

        return undoSelectionRange;
    };
    this.redo = function(dontSelect) {
        var deltas = this.$redoStack.pop();
        var redoSelectionRange = null;
        if (deltas) {
            redoSelectionRange =
                this.$doc.redoChanges(deltas, dontSelect);
            this.$undoStack.push(deltas);
            this.dirtyCounter++;
        }

        return redoSelectionRange;
    };
    this.reset = function() {
        this.$undoStack = [];
        this.$redoStack = [];
        this.dirtyCounter = 0;
    };
    this.hasUndo = function() {
        return this.$undoStack.length > 0;
    };
    this.hasRedo = function() {
        return this.$redoStack.length > 0;
    };
    this.markClean = function() {
        this.dirtyCounter = 0;
    };
    this.isClean = function() {
        return this.dirtyCounter === 0;
    };

}).call(UndoManager.prototype);

exports.UndoManager = UndoManager;
});

define("ace/layer/gutter",["require","exports","module","ace/lib/dom","ace/lib/oop","ace/lib/lang","ace/lib/event_emitter"], function(require, exports, module) {
"use strict";

var dom = require("../lib/dom");
var oop = require("../lib/oop");
var lang = require("../lib/lang");
var EventEmitter = require("../lib/event_emitter").EventEmitter;

var Gutter = function(parentEl) {
    this.element = dom.createElement("div");
    this.element.className = "ace_layer ace_gutter-layer";
    parentEl.appendChild(this.element);
    this.setShowFoldWidgets(this.$showFoldWidgets);
    
    this.gutterWidth = 0;

    this.$annotations = [];
    this.$updateAnnotations = this.$updateAnnotations.bind(this);

    this.$cells = [];
};

(function() {

    oop.implement(this, EventEmitter);

    this.setSession = function(session) {
        if (this.session)
            this.session.removeEventListener("change", this.$updateAnnotations);
        this.session = session;
        if (session)
            session.on("change", this.$updateAnnotations);
    };

    this.addGutterDecoration = function(row, className){
        if (window.console)
            console.warn && console.warn("deprecated use session.addGutterDecoration");
        this.session.addGutterDecoration(row, className);
    };

    this.removeGutterDecoration = function(row, className){
        if (window.console)
            console.warn && console.warn("deprecated use session.removeGutterDecoration");
        this.session.removeGutterDecoration(row, className);
    };

    this.setAnnotations = function(annotations) {
        this.$annotations = [];
        for (var i = 0; i < annotations.length; i++) {
            var annotation = annotations[i];
            var row = annotation.row;
            var rowInfo = this.$annotations[row];
            if (!rowInfo)
                rowInfo = this.$annotations[row] = {text: []};
           
            var annoText = annotation.text;
            annoText = annoText ? lang.escapeHTML(annoText) : annotation.html || "";

            if (rowInfo.text.indexOf(annoText) === -1)
                rowInfo.text.push(annoText);

            var type = annotation.type;
            if (type == "error")
                rowInfo.className = " ace_error";
            else if (type == "warning" && rowInfo.className != " ace_error")
                rowInfo.className = " ace_warning";
            else if (type == "info" && (!rowInfo.className))
                rowInfo.className = " ace_info";
        }
    };

    this.$updateAnnotations = function (e) {
        if (!this.$annotations.length)
            return;
        var delta = e.data;
        var range = delta.range;
        var firstRow = range.start.row;
        var len = range.end.row - firstRow;
        if (len === 0) {
        } else if (delta.action == "removeText" || delta.action == "removeLines") {
            this.$annotations.splice(firstRow, len + 1, null);
        } else {
            var args = new Array(len + 1);
            args.unshift(firstRow, 1);
            this.$annotations.splice.apply(this.$annotations, args);
        }
    };

    this.update = function(config) {
        var session = this.session;
        var firstRow = config.firstRow;
        var lastRow = Math.min(config.lastRow + config.gutterOffset,  // needed to compensate for hor scollbar
            session.getLength() - 1);
        var fold = session.getNextFoldLine(firstRow);
        var foldStart = fold ? fold.start.row : Infinity;
        var foldWidgets = this.$showFoldWidgets && session.foldWidgets;
        var breakpoints = session.$breakpoints;
        var decorations = session.$decorations;
        var firstLineNumber = session.$firstLineNumber;
        var lastLineNumber = 0;
        
        var gutterRenderer = session.gutterRenderer || this.$renderer;

        var cell = null;
        var index = -1;
        var row = firstRow;
        while (true) {
            if (row > foldStart) {
                row = fold.end.row + 1;
                fold = session.getNextFoldLine(row, fold);
                foldStart = fold ? fold.start.row : Infinity;
            }
            if (row > lastRow) {
                while (this.$cells.length > index + 1) {
                    cell = this.$cells.pop();
                    this.element.removeChild(cell.element);
                }
                break;
            }

            cell = this.$cells[++index];
            if (!cell) {
                cell = {element: null, textNode: null, foldWidget: null};
                cell.element = dom.createElement("div");
                cell.textNode = document.createTextNode('');
                cell.element.appendChild(cell.textNode);
                this.element.appendChild(cell.element);
                this.$cells[index] = cell;
            }

            var className = "ace_gutter-cell ";
            if (breakpoints[row])
                className += breakpoints[row];
            if (decorations[row])
                className += decorations[row];
            if (this.$annotations[row])
                className += this.$annotations[row].className;
            if (cell.element.className != className)
                cell.element.className = className;

            var height = session.getRowLength(row) * config.lineHeight + "px";
            if (height != cell.element.style.height)
                cell.element.style.height = height;

            if (foldWidgets) {
                var c = foldWidgets[row];
                if (c == null)
                    c = foldWidgets[row] = session.getFoldWidget(row);
            }

            if (c) {
                if (!cell.foldWidget) {
                    cell.foldWidget = dom.createElement("span");
                    cell.element.appendChild(cell.foldWidget);
                }
                var className = "ace_fold-widget ace_" + c;
                if (c == "start" && row == foldStart && row < fold.end.row)
                    className += " ace_closed";
                else
                    className += " ace_open";
                if (cell.foldWidget.className != className)
                    cell.foldWidget.className = className;

                var height = config.lineHeight + "px";
                if (cell.foldWidget.style.height != height)
                    cell.foldWidget.style.height = height;
            } else {
                if (cell.foldWidget) {
                    cell.element.removeChild(cell.foldWidget);
                    cell.foldWidget = null;
                }
            }
            
            var text = lastLineNumber = gutterRenderer
                ? gutterRenderer.getText(session, row)
                : row + firstLineNumber;
            if (text != cell.textNode.data)
                cell.textNode.data = text;

            row++;
        }

        this.element.style.height = config.minHeight + "px";

        if (this.$fixedWidth || session.$useWrapMode)
            lastLineNumber = session.getLength() + firstLineNumber;

        var gutterWidth = gutterRenderer 
            ? gutterRenderer.getWidth(session, lastLineNumber, config)
            : lastLineNumber.toString().length * config.characterWidth;
        
        var padding = this.$padding || this.$computePadding();
        gutterWidth += padding.left + padding.right;
        if (gutterWidth !== this.gutterWidth && !isNaN(gutterWidth)) {
            this.gutterWidth = gutterWidth;
            this.element.style.width = Math.ceil(this.gutterWidth) + "px";
            this._emit("changeGutterWidth", gutterWidth);
        }
    };

    this.$fixedWidth = false;
    
    this.$showLineNumbers = true;
    this.$renderer = "";
    this.setShowLineNumbers = function(show) {
        this.$renderer = !show && {
            getWidth: function() {return ""},
            getText: function() {return ""}
        };
    };
    
    this.getShowLineNumbers = function() {
        return this.$showLineNumbers;
    };
    
    this.$showFoldWidgets = true;
    this.setShowFoldWidgets = function(show) {
        if (show)
            dom.addCssClass(this.element, "ace_folding-enabled");
        else
            dom.removeCssClass(this.element, "ace_folding-enabled");

        this.$showFoldWidgets = show;
        this.$padding = null;
    };
    
    this.getShowFoldWidgets = function() {
        return this.$showFoldWidgets;
    };

    this.$computePadding = function() {
        if (!this.element.firstChild)
            return {left: 0, right: 0};
        var style = dom.computedStyle(this.element.firstChild);
        this.$padding = {};
        this.$padding.left = parseInt(style.paddingLeft) + 1 || 0;
        this.$padding.right = parseInt(style.paddingRight) || 0;
        return this.$padding;
    };

    this.getRegion = function(point) {
        var padding = this.$padding || this.$computePadding();
        var rect = this.element.getBoundingClientRect();
        if (point.x < padding.left + rect.left)
            return "markers";
        if (this.$showFoldWidgets && point.x > rect.right - padding.right)
            return "foldWidgets";
    };

}).call(Gutter.prototype);

exports.Gutter = Gutter;

});

define("ace/layer/marker",["require","exports","module","ace/range","ace/lib/dom"], function(require, exports, module) {
"use strict";

var Range = require("../range").Range;
var dom = require("../lib/dom");

var Marker = function(parentEl) {
    this.element = dom.createElement("div");
    this.element.className = "ace_layer ace_marker-layer";
    parentEl.appendChild(this.element);
};

(function() {

    this.$padding = 0;

    this.setPadding = function(padding) {
        this.$padding = padding;
    };
    this.setSession = function(session) {
        this.session = session;
    };
    
    this.setMarkers = function(markers) {
        this.markers = markers;
    };

    this.update = function(config) {
        var config = config || this.config;
        if (!config)
            return;

        this.config = config;


        var html = [];
        for (var key in this.markers) {
            var marker = this.markers[key];

            if (!marker.range) {
                marker.update(html, this, this.session, config);
                continue;
            }

            var range = marker.range.clipRows(config.firstRow, config.lastRow);
            if (range.isEmpty()) continue;

            range = range.toScreenRange(this.session);
            if (marker.renderer) {
                var top = this.$getTop(range.start.row, config);
                var left = this.$padding + range.start.column * config.characterWidth;
                marker.renderer(html, range, left, top, config);
            } else if (marker.type == "fullLine") {
                this.drawFullLineMarker(html, range, marker.clazz, config);
            } else if (marker.type == "screenLine") {
                this.drawScreenLineMarker(html, range, marker.clazz, config);
            } else if (range.isMultiLine()) {
                if (marker.type == "text")
                    this.drawTextMarker(html, range, marker.clazz, config);
                else
                    this.drawMultiLineMarker(html, range, marker.clazz, config);
            } else {
                this.drawSingleLineMarker(html, range, marker.clazz + " ace_start", config);
            }
        }
        this.element.innerHTML = html.join("");
    };

    this.$getTop = function(row, layerConfig) {
        return (row - layerConfig.firstRowScreen) * layerConfig.lineHeight;
    };
    this.drawTextMarker = function(stringBuilder, range, clazz, layerConfig, extraStyle) {
        var row = range.start.row;

        var lineRange = new Range(
            row, range.start.column,
            row, this.session.getScreenLastRowColumn(row)
        );
        this.drawSingleLineMarker(stringBuilder, lineRange, clazz + " ace_start", layerConfig, 1, extraStyle);
        row = range.end.row;
        lineRange = new Range(row, 0, row, range.end.column);
        this.drawSingleLineMarker(stringBuilder, lineRange, clazz, layerConfig, 0, extraStyle);

        for (row = range.start.row + 1; row < range.end.row; row++) {
            lineRange.start.row = row;
            lineRange.end.row = row;
            lineRange.end.column = this.session.getScreenLastRowColumn(row);
            this.drawSingleLineMarker(stringBuilder, lineRange, clazz, layerConfig, 1, extraStyle);
        }
    };
    this.drawMultiLineMarker = function(stringBuilder, range, clazz, config, extraStyle) {
        var padding = this.$padding;
        var height = config.lineHeight;
        var top = this.$getTop(range.start.row, config);
        var left = padding + range.start.column * config.characterWidth;
        extraStyle = extraStyle || "";

        stringBuilder.push(
            "<div class='", clazz, " ace_start' style='",
            "height:", height, "px;",
            "right:0;",
            "top:", top, "px;",
            "left:", left, "px;", extraStyle, "'></div>"
        );
        top = this.$getTop(range.end.row, config);
        var width = range.end.column * config.characterWidth;

        stringBuilder.push(
            "<div class='", clazz, "' style='",
            "height:", height, "px;",
            "width:", width, "px;",
            "top:", top, "px;",
            "left:", padding, "px;", extraStyle, "'></div>"
        );
        height = (range.end.row - range.start.row - 1) * config.lineHeight;
        if (height < 0)
            return;
        top = this.$getTop(range.start.row + 1, config);

        stringBuilder.push(
            "<div class='", clazz, "' style='",
            "height:", height, "px;",
            "right:0;",
            "top:", top, "px;",
            "left:", padding, "px;", extraStyle, "'></div>"
        );
    };
    this.drawSingleLineMarker = function(stringBuilder, range, clazz, config, extraLength, extraStyle) {
        var height = config.lineHeight;
        var width = (range.end.column + (extraLength || 0) - range.start.column) * config.characterWidth;

        var top = this.$getTop(range.start.row, config);
        var left = this.$padding + range.start.column * config.characterWidth;

        stringBuilder.push(
            "<div class='", clazz, "' style='",
            "height:", height, "px;",
            "width:", width, "px;",
            "top:", top, "px;",
            "left:", left, "px;", extraStyle || "", "'></div>"
        );
    };

    this.drawFullLineMarker = function(stringBuilder, range, clazz, config, extraStyle) {
        var top = this.$getTop(range.start.row, config);
        var height = config.lineHeight;
        if (range.start.row != range.end.row)
            height += this.$getTop(range.end.row, config) - top;

        stringBuilder.push(
            "<div class='", clazz, "' style='",
            "height:", height, "px;",
            "top:", top, "px;",
            "left:0;right:0;", extraStyle || "", "'></div>"
        );
    };
    
    this.drawScreenLineMarker = function(stringBuilder, range, clazz, config, extraStyle) {
        var top = this.$getTop(range.start.row, config);
        var height = config.lineHeight;

        stringBuilder.push(
            "<div class='", clazz, "' style='",
            "height:", height, "px;",
            "top:", top, "px;",
            "left:0;right:0;", extraStyle || "", "'></div>"
        );
    };

}).call(Marker.prototype);

exports.Marker = Marker;

});

define("ace/layer/text",["require","exports","module","ace/lib/oop","ace/lib/dom","ace/lib/lang","ace/lib/useragent","ace/lib/event_emitter"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var dom = require("../lib/dom");
var lang = require("../lib/lang");
var useragent = require("../lib/useragent");
var EventEmitter = require("../lib/event_emitter").EventEmitter;

var Text = function(parentEl) {
    this.element = dom.createElement("div");
    this.element.className = "ace_layer ace_text-layer";
    parentEl.appendChild(this.element);
    this.$updateEolChar = this.$updateEolChar.bind(this);
};

(function() {

    oop.implement(this, EventEmitter);

    this.EOF_CHAR = "\xB6";
    this.EOL_CHAR_LF = "\xAC";
    this.EOL_CHAR_CRLF = "\xa4";
    this.EOL_CHAR = this.EOL_CHAR_LF;
    this.TAB_CHAR = "\u2192"; //"\u21E5";
    this.SPACE_CHAR = "\xB7";
    this.$padding = 0;

    this.$updateEolChar = function() {
        var EOL_CHAR = this.session.doc.getNewLineCharacter() == "\n"
           ? this.EOL_CHAR_LF
           : this.EOL_CHAR_CRLF;
        if (this.EOL_CHAR != EOL_CHAR) {
            this.EOL_CHAR = EOL_CHAR;
            return true;
        }
    }

    this.setPadding = function(padding) {
        this.$padding = padding;
        this.element.style.padding = "0 " + padding + "px";
    };

    this.getLineHeight = function() {
        return this.$fontMetrics.$characterSize.height || 0;
    };

    this.getCharacterWidth = function() {
        return this.$fontMetrics.$characterSize.width || 0;
    };
    
    this.$setFontMetrics = function(measure) {
        this.$fontMetrics = measure;
        this.$fontMetrics.on("changeCharacterSize", function(e) {
            this._signal("changeCharacterSize", e);
        }.bind(this));
        this.$pollSizeChanges();
    }

    this.checkForSizeChanges = function() {
        this.$fontMetrics.checkForSizeChanges();
    };
    this.$pollSizeChanges = function() {
        return this.$pollSizeChangesTimer = this.$fontMetrics.$pollSizeChanges();
    };
    this.setSession = function(session) {
        this.session = session;
        if (session)
            this.$computeTabString();
    };

    this.showInvisibles = false;
    this.setShowInvisibles = function(showInvisibles) {
        if (this.showInvisibles == showInvisibles)
            return false;

        this.showInvisibles = showInvisibles;
        this.$computeTabString();
        return true;
    };

    this.displayIndentGuides = true;
    this.setDisplayIndentGuides = function(display) {
        if (this.displayIndentGuides == display)
            return false;

        this.displayIndentGuides = display;
        this.$computeTabString();
        return true;
    };

    this.$tabStrings = [];
    this.onChangeTabSize =
    this.$computeTabString = function() {
        var tabSize = this.session.getTabSize();
        this.tabSize = tabSize;
        var tabStr = this.$tabStrings = [0];
        for (var i = 1; i < tabSize + 1; i++) {
            if (this.showInvisibles) {
                tabStr.push("<span class='ace_invisible ace_invisible_tab'>"
                    + this.TAB_CHAR
                    + lang.stringRepeat(" ", i - 1)
                    + "</span>");
            } else {
                tabStr.push(lang.stringRepeat(" ", i));
            }
        }
        if (this.displayIndentGuides) {
            this.$indentGuideRe =  /\s\S| \t|\t |\s$/;
            var className = "ace_indent-guide";
            var spaceClass = "";
            var tabClass = "";
            if (this.showInvisibles) {
                className += " ace_invisible";
                spaceClass = " ace_invisible_space";
                tabClass = " ace_invisible_tab";
                var spaceContent = lang.stringRepeat(this.SPACE_CHAR, this.tabSize);
                var tabContent = this.TAB_CHAR + lang.stringRepeat(" ", this.tabSize - 1);
            } else{
                var spaceContent = lang.stringRepeat(" ", this.tabSize);
                var tabContent = spaceContent;
            }

            this.$tabStrings[" "] = "<span class='" + className + spaceClass + "'>" + spaceContent + "</span>";
            this.$tabStrings["\t"] = "<span class='" + className + tabClass + "'>" + tabContent + "</span>";
        }
    };

    this.updateLines = function(config, firstRow, lastRow) {
        if (this.config.lastRow != config.lastRow ||
            this.config.firstRow != config.firstRow) {
            this.scrollLines(config);
        }
        this.config = config;

        var first = Math.max(firstRow, config.firstRow);
        var last = Math.min(lastRow, config.lastRow);

        var lineElements = this.element.childNodes;
        var lineElementsIdx = 0;

        for (var row = config.firstRow; row < first; row++) {
            var foldLine = this.session.getFoldLine(row);
            if (foldLine) {
                if (foldLine.containsRow(first)) {
                    first = foldLine.start.row;
                    break;
                } else {
                    row = foldLine.end.row;
                }
            }
            lineElementsIdx ++;
        }

        var row = first;
        var foldLine = this.session.getNextFoldLine(row);
        var foldStart = foldLine ? foldLine.start.row : Infinity;

        while (true) {
            if (row > foldStart) {
                row = foldLine.end.row+1;
                foldLine = this.session.getNextFoldLine(row, foldLine);
                foldStart = foldLine ? foldLine.start.row :Infinity;
            }
            if (row > last)
                break;

            var lineElement = lineElements[lineElementsIdx++];
            if (lineElement) {
                var html = [];
                this.$renderLine(
                    html, row, !this.$useLineGroups(), row == foldStart ? foldLine : false
                );
                lineElement.style.height = config.lineHeight * this.session.getRowLength(row) + "px";
                lineElement.innerHTML = html.join("");
            }
            row++;
        }
    };

    this.scrollLines = function(config) {
        var oldConfig = this.config;
        this.config = config;

        if (!oldConfig || oldConfig.lastRow < config.firstRow)
            return this.update(config);

        if (config.lastRow < oldConfig.firstRow)
            return this.update(config);

        var el = this.element;
        if (oldConfig.firstRow < config.firstRow)
            for (var row=this.session.getFoldedRowCount(oldConfig.firstRow, config.firstRow - 1); row>0; row--)
                el.removeChild(el.firstChild);

        if (oldConfig.lastRow > config.lastRow)
            for (var row=this.session.getFoldedRowCount(config.lastRow + 1, oldConfig.lastRow); row>0; row--)
                el.removeChild(el.lastChild);

        if (config.firstRow < oldConfig.firstRow) {
            var fragment = this.$renderLinesFragment(config, config.firstRow, oldConfig.firstRow - 1);
            if (el.firstChild)
                el.insertBefore(fragment, el.firstChild);
            else
                el.appendChild(fragment);
        }

        if (config.lastRow > oldConfig.lastRow) {
            var fragment = this.$renderLinesFragment(config, oldConfig.lastRow + 1, config.lastRow);
            el.appendChild(fragment);
        }
    };

    this.$renderLinesFragment = function(config, firstRow, lastRow) {
        var fragment = this.element.ownerDocument.createDocumentFragment();
        var row = firstRow;
        var foldLine = this.session.getNextFoldLine(row);
        var foldStart = foldLine ? foldLine.start.row : Infinity;

        while (true) {
            if (row > foldStart) {
                row = foldLine.end.row+1;
                foldLine = this.session.getNextFoldLine(row, foldLine);
                foldStart = foldLine ? foldLine.start.row : Infinity;
            }
            if (row > lastRow)
                break;

            var container = dom.createElement("div");

            var html = [];
            this.$renderLine(html, row, false, row == foldStart ? foldLine : false);
            container.innerHTML = html.join("");
            if (this.$useLineGroups()) {
                container.className = 'ace_line_group';
                fragment.appendChild(container);
                container.style.height = config.lineHeight * this.session.getRowLength(row) + "px";

            } else {
                while(container.firstChild)
                    fragment.appendChild(container.firstChild);
            }

            row++;
        }
        return fragment;
    };

    this.update = function(config) {
        this.config = config;

        var html = [];
        var firstRow = config.firstRow, lastRow = config.lastRow;

        var row = firstRow;
        var foldLine = this.session.getNextFoldLine(row);
        var foldStart = foldLine ? foldLine.start.row : Infinity;

        while (true) {
            if (row > foldStart) {
                row = foldLine.end.row+1;
                foldLine = this.session.getNextFoldLine(row, foldLine);
                foldStart = foldLine ? foldLine.start.row :Infinity;
            }
            if (row > lastRow)
                break;

            if (this.$useLineGroups())
                html.push("<div class='ace_line_group' style='height:", config.lineHeight*this.session.getRowLength(row), "px'>")

            this.$renderLine(html, row, false, row == foldStart ? foldLine : false);

            if (this.$useLineGroups())
                html.push("</div>"); // end the line group

            row++;
        }
        this.element.innerHTML = html.join("");
    };

    this.$textToken = {
        "text": true,
        "rparen": true,
        "lparen": true
    };

    this.$renderToken = function(stringBuilder, screenColumn, token, value) {
        var self = this;
        var replaceReg = /\t|&|<|( +)|([\x00-\x1f\x80-\xa0\xad\u1680\u180E\u2000-\u200f\u2028\u2029\u202F\u205F\u3000\uFEFF])|[\u1100-\u115F\u11A3-\u11A7\u11FA-\u11FF\u2329-\u232A\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3000-\u303E\u3041-\u3096\u3099-\u30FF\u3105-\u312D\u3131-\u318E\u3190-\u31BA\u31C0-\u31E3\u31F0-\u321E\u3220-\u3247\u3250-\u32FE\u3300-\u4DBF\u4E00-\uA48C\uA490-\uA4C6\uA960-\uA97C\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFAFF\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE66\uFE68-\uFE6B\uFF01-\uFF60\uFFE0-\uFFE6]/g;
        var replaceFunc = function(c, a, b, tabIdx, idx4) {
            if (a) {
                return self.showInvisibles
                    ? "<span class='ace_invisible ace_invisible_space'>" + lang.stringRepeat(self.SPACE_CHAR, c.length) + "</span>"
                    : c;
            } else if (c == "&") {
                return "&#38;";
            } else if (c == "<") {
                return "&#60;";
            } else if (c == "\t") {
                var tabSize = self.session.getScreenTabSize(screenColumn + tabIdx);
                screenColumn += tabSize - 1;
                return self.$tabStrings[tabSize];
            } else if (c == "\u3000") {
                var classToUse = self.showInvisibles ? "ace_cjk ace_invisible ace_invisible_space" : "ace_cjk";
                var space = self.showInvisibles ? self.SPACE_CHAR : "";
                screenColumn += 1;
                return "<span class='" + classToUse + "' style='width:" +
                    (self.config.characterWidth * 2) +
                    "px'>" + space + "</span>";
            } else if (b) {
                return "<span class='ace_invisible ace_invisible_space ace_invalid'>" + self.SPACE_CHAR + "</span>";
            } else {
                screenColumn += 1;
                return "<span class='ace_cjk' style='width:" +
                    (self.config.characterWidth * 2) +
                    "px'>" + c + "</span>";
            }
        };

        var output = value.replace(replaceReg, replaceFunc);

        if (!this.$textToken[token.type]) {
            var classes = "ace_" + token.type.replace(/\./g, " ace_");
            var style = "";
            if (token.type == "fold")
                style = " style='width:" + (token.value.length * this.config.characterWidth) + "px;' ";
            stringBuilder.push("<span class='", classes, "'", style, ">", output, "</span>");
        }
        else {
            stringBuilder.push(output);
        }
        return screenColumn + value.length;
    };

    this.renderIndentGuide = function(stringBuilder, value, max) {
        var cols = value.search(this.$indentGuideRe);
        if (cols <= 0 || cols >= max)
            return value;
        if (value[0] == " ") {
            cols -= cols % this.tabSize;
            stringBuilder.push(lang.stringRepeat(this.$tabStrings[" "], cols/this.tabSize));
            return value.substr(cols);
        } else if (value[0] == "\t") {
            stringBuilder.push(lang.stringRepeat(this.$tabStrings["\t"], cols));
            return value.substr(cols);
        }
        return value;
    };

    this.$renderWrappedLine = function(stringBuilder, tokens, splits, onlyContents) {
        var chars = 0;
        var split = 0;
        var splitChars = splits[0];
        var screenColumn = 0;

        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            var value = token.value;
            if (i == 0 && this.displayIndentGuides) {
                chars = value.length;
                value = this.renderIndentGuide(stringBuilder, value, splitChars);
                if (!value)
                    continue;
                chars -= value.length;
            }

            if (chars + value.length < splitChars) {
                screenColumn = this.$renderToken(stringBuilder, screenColumn, token, value);
                chars += value.length;
            } else {
                while (chars + value.length >= splitChars) {
                    screenColumn = this.$renderToken(
                        stringBuilder, screenColumn,
                        token, value.substring(0, splitChars - chars)
                    );
                    value = value.substring(splitChars - chars);
                    chars = splitChars;

                    if (!onlyContents) {
                        stringBuilder.push("</div>",
                            "<div class='ace_line' style='height:",
                            this.config.lineHeight, "px'>"
                        );
                    }

                    split ++;
                    screenColumn = 0;
                    splitChars = splits[split] || Number.MAX_VALUE;
                }
                if (value.length != 0) {
                    chars += value.length;
                    screenColumn = this.$renderToken(
                        stringBuilder, screenColumn, token, value
                    );
                }
            }
        }
    };

    this.$renderSimpleLine = function(stringBuilder, tokens) {
        var screenColumn = 0;
        var token = tokens[0];
        var value = token.value;
        if (this.displayIndentGuides)
            value = this.renderIndentGuide(stringBuilder, value);
        if (value)
            screenColumn = this.$renderToken(stringBuilder, screenColumn, token, value);
        for (var i = 1; i < tokens.length; i++) {
            token = tokens[i];
            value = token.value;
            screenColumn = this.$renderToken(stringBuilder, screenColumn, token, value);
        }
    };
    this.$renderLine = function(stringBuilder, row, onlyContents, foldLine) {
        if (!foldLine && foldLine != false)
            foldLine = this.session.getFoldLine(row);

        if (foldLine)
            var tokens = this.$getFoldLineTokens(row, foldLine);
        else
            var tokens = this.session.getTokens(row);


        if (!onlyContents) {
            stringBuilder.push(
                "<div class='ace_line' style='height:", 
                    this.config.lineHeight * (
                        this.$useLineGroups() ? 1 :this.session.getRowLength(row)
                    ), "px'>"
            );
        }

        if (tokens.length) {
            var splits = this.session.getRowSplitData(row);
            if (splits && splits.length)
                this.$renderWrappedLine(stringBuilder, tokens, splits, onlyContents);
            else
                this.$renderSimpleLine(stringBuilder, tokens);
        }

        if (this.showInvisibles) {
            if (foldLine)
                row = foldLine.end.row

            stringBuilder.push(
                "<span class='ace_invisible ace_invisible_eol'>",
                row == this.session.getLength() - 1 ? this.EOF_CHAR : this.EOL_CHAR,
                "</span>"
            );
        }
        if (!onlyContents)
            stringBuilder.push("</div>");
    };

    this.$getFoldLineTokens = function(row, foldLine) {
        var session = this.session;
        var renderTokens = [];

        function addTokens(tokens, from, to) {
            var idx = 0, col = 0;
            while ((col + tokens[idx].value.length) < from) {
                col += tokens[idx].value.length;
                idx++;

                if (idx == tokens.length)
                    return;
            }
            if (col != from) {
                var value = tokens[idx].value.substring(from - col);
                if (value.length > (to - from))
                    value = value.substring(0, to - from);

                renderTokens.push({
                    type: tokens[idx].type,
                    value: value
                });

                col = from + value.length;
                idx += 1;
            }

            while (col < to && idx < tokens.length) {
                var value = tokens[idx].value;
                if (value.length + col > to) {
                    renderTokens.push({
                        type: tokens[idx].type,
                        value: value.substring(0, to - col)
                    });
                } else
                    renderTokens.push(tokens[idx]);
                col += value.length;
                idx += 1;
            }
        }

        var tokens = session.getTokens(row);
        foldLine.walk(function(placeholder, row, column, lastColumn, isNewRow) {
            if (placeholder != null) {
                renderTokens.push({
                    type: "fold",
                    value: placeholder
                });
            } else {
                if (isNewRow)
                    tokens = session.getTokens(row);

                if (tokens.length)
                    addTokens(tokens, lastColumn, column);
            }
        }, foldLine.end.row, this.session.getLine(foldLine.end.row).length);

        return renderTokens;
    };

    this.$useLineGroups = function() {
        return this.session.getUseWrapMode();
    };

    this.destroy = function() {
        clearInterval(this.$pollSizeChangesTimer);
        if (this.$measureNode)
            this.$measureNode.parentNode.removeChild(this.$measureNode);
        delete this.$measureNode;
    };

}).call(Text.prototype);

exports.Text = Text;

});

define("ace/layer/cursor",["require","exports","module","ace/lib/dom"], function(require, exports, module) {
"use strict";

var dom = require("../lib/dom");
var IE8;

var Cursor = function(parentEl) {
    this.element = dom.createElement("div");
    this.element.className = "ace_layer ace_cursor-layer";
    parentEl.appendChild(this.element);
    
    if (IE8 === undefined)
        IE8 = "opacity" in this.element;

    this.isVisible = false;
    this.isBlinking = true;
    this.blinkInterval = 1000;
    this.smoothBlinking = false;

    this.cursors = [];
    this.cursor = this.addCursor();
    dom.addCssClass(this.element, "ace_hidden-cursors");
    this.$updateCursors = this.$updateVisibility.bind(this);
};

(function() {
    
    this.$updateVisibility = function(val) {
        var cursors = this.cursors;
        for (var i = cursors.length; i--; )
            cursors[i].style.visibility = val ? "" : "hidden";
    };
    this.$updateOpacity = function(val) {
        var cursors = this.cursors;
        for (var i = cursors.length; i--; )
            cursors[i].style.opacity = val ? "" : "0";
    };
    

    this.$padding = 0;
    this.setPadding = function(padding) {
        this.$padding = padding;
    };

    this.setSession = function(session) {
        this.session = session;
    };

    this.setBlinking = function(blinking) {
        if (blinking != this.isBlinking){
            this.isBlinking = blinking;
            this.restartTimer();
        }
    };

    this.setBlinkInterval = function(blinkInterval) {
        if (blinkInterval != this.blinkInterval){
            this.blinkInterval = blinkInterval;
            this.restartTimer();
        }
    };

    this.setSmoothBlinking = function(smoothBlinking) {
        if (smoothBlinking != this.smoothBlinking && !IE8) {
            this.smoothBlinking = smoothBlinking;
            dom.setCssClass(this.element, "ace_smooth-blinking", smoothBlinking);
            this.$updateCursors(true);
            this.$updateCursors = (smoothBlinking 
                ? this.$updateOpacity
                : this.$updateVisibility).bind(this);
            this.restartTimer();
        }
    };

    this.addCursor = function() {
        var el = dom.createElement("div");
        el.className = "ace_cursor";
        this.element.appendChild(el);
        this.cursors.push(el);
        return el;
    };

    this.removeCursor = function() {
        if (this.cursors.length > 1) {
            var el = this.cursors.pop();
            el.parentNode.removeChild(el);
            return el;
        }
    };

    this.hideCursor = function() {
        this.isVisible = false;
        dom.addCssClass(this.element, "ace_hidden-cursors");
        this.restartTimer();
    };

    this.showCursor = function() {
        this.isVisible = true;
        dom.removeCssClass(this.element, "ace_hidden-cursors");
        this.restartTimer();
    };

    this.restartTimer = function() {
        var update = this.$updateCursors;
        clearInterval(this.intervalId);
        clearTimeout(this.timeoutId);
        if (this.smoothBlinking) {
            dom.removeCssClass(this.element, "ace_smooth-blinking");
        }
        
        update(true);

        if (!this.isBlinking || !this.blinkInterval || !this.isVisible)
            return;

        if (this.smoothBlinking) {
            setTimeout(function(){
                dom.addCssClass(this.element, "ace_smooth-blinking");
            }.bind(this));
        }
        
        var blink = function(){
            this.timeoutId = setTimeout(function() {
                update(false);
            }, 0.6 * this.blinkInterval);
        }.bind(this);

        this.intervalId = setInterval(function() {
            update(true);
            blink();
        }, this.blinkInterval);

        blink();
    };

    this.getPixelPosition = function(position, onScreen) {
        if (!this.config || !this.session)
            return {left : 0, top : 0};

        if (!position)
            position = this.session.selection.getCursor();
        var pos = this.session.documentToScreenPosition(position);
        var cursorLeft = this.$padding + pos.column * this.config.characterWidth;
        var cursorTop = (pos.row - (onScreen ? this.config.firstRowScreen : 0)) *
            this.config.lineHeight;

        return {left : cursorLeft, top : cursorTop};
    };

    this.update = function(config) {
        this.config = config;

        var selections = this.session.$selectionMarkers;
        var i = 0, cursorIndex = 0;

        if (selections === undefined || selections.length === 0){
            selections = [{cursor: null}];
        }

        for (var i = 0, n = selections.length; i < n; i++) {
            var pixelPos = this.getPixelPosition(selections[i].cursor, true);
            if ((pixelPos.top > config.height + config.offset ||
                 pixelPos.top < 0) && i > 1) {
                continue;
            }

            var style = (this.cursors[cursorIndex++] || this.addCursor()).style;
            
            if (!this.drawCursor) {
                style.left = pixelPos.left + "px";
                style.top = pixelPos.top + "px";
                style.width = config.characterWidth + "px";
                style.height = config.lineHeight + "px";
            } else {
                this.drawCursor(style, pixelPos, config, selections[i], this.session);
            }
        }
        while (this.cursors.length > cursorIndex)
            this.removeCursor();

        var overwrite = this.session.getOverwrite();
        this.$setOverwrite(overwrite);
        this.$pixelPos = pixelPos;
        this.restartTimer();
    };
    
    this.drawCursor = null;

    this.$setOverwrite = function(overwrite) {
        if (overwrite != this.overwrite) {
            this.overwrite = overwrite;
            if (overwrite)
                dom.addCssClass(this.element, "ace_overwrite-cursors");
            else
                dom.removeCssClass(this.element, "ace_overwrite-cursors");
        }
    };

    this.destroy = function() {
        clearInterval(this.intervalId);
        clearTimeout(this.timeoutId);
    };

}).call(Cursor.prototype);

exports.Cursor = Cursor;

});

define("ace/scrollbar",["require","exports","module","ace/lib/oop","ace/lib/dom","ace/lib/event","ace/lib/event_emitter"], function(require, exports, module) {
"use strict";

var oop = require("./lib/oop");
var dom = require("./lib/dom");
var event = require("./lib/event");
var EventEmitter = require("./lib/event_emitter").EventEmitter;
var ScrollBar = function(parent) {
    this.element = dom.createElement("div");
    this.element.className = "ace_scrollbar ace_scrollbar" + this.classSuffix;

    this.inner = dom.createElement("div");
    this.inner.className = "ace_scrollbar-inner";
    this.element.appendChild(this.inner);

    parent.appendChild(this.element);

    this.setVisible(false);
    this.skipEvent = false;

    event.addListener(this.element, "scroll", this.onScroll.bind(this));
    event.addListener(this.element, "mousedown", event.preventDefault);
};

(function() {
    oop.implement(this, EventEmitter);

    this.setVisible = function(isVisible) {
        this.element.style.display = isVisible ? "" : "none";
        this.isVisible = isVisible;
    };
}).call(ScrollBar.prototype);
var VScrollBar = function(parent, renderer) {
    ScrollBar.call(this, parent);
    this.scrollTop = 0;
    renderer.$scrollbarWidth = 
    this.width = dom.scrollbarWidth(parent.ownerDocument);
    this.inner.style.width =
    this.element.style.width = (this.width || 15) + 5 + "px";
};

oop.inherits(VScrollBar, ScrollBar);

(function() {

    this.classSuffix = '-v';
    this.onScroll = function() {
        if (!this.skipEvent) {
            this.scrollTop = this.element.scrollTop;
            this._emit("scroll", {data: this.scrollTop});
        }
        this.skipEvent = false;
    };
    this.getWidth = function() {
        return this.isVisible ? this.width : 0;
    };
    this.setHeight = function(height) {
        this.element.style.height = height + "px";
    };
    this.setInnerHeight = function(height) {
        this.inner.style.height = height + "px";
    };
    this.setScrollHeight = function(height) {
        this.inner.style.height = height + "px";
    };
    this.setScrollTop = function(scrollTop) {
        if (this.scrollTop != scrollTop) {
            this.skipEvent = true;
            this.scrollTop = this.element.scrollTop = scrollTop;
        }
    };

}).call(VScrollBar.prototype);
var HScrollBar = function(parent, renderer) {
    ScrollBar.call(this, parent);
    this.scrollLeft = 0;
    this.height = renderer.$scrollbarWidth;
    this.inner.style.height =
    this.element.style.height = (this.height || 15) + 5 + "px";
};

oop.inherits(HScrollBar, ScrollBar);

(function() {

    this.classSuffix = '-h';
    this.onScroll = function() {
        if (!this.skipEvent) {
            this.scrollLeft = this.element.scrollLeft;
            this._emit("scroll", {data: this.scrollLeft});
        }
        this.skipEvent = false;
    };
    this.getHeight = function() {
        return this.isVisible ? this.height : 0;
    };
    this.setWidth = function(width) {
        this.element.style.width = width + "px";
    };
    this.setInnerWidth = function(width) {
        this.inner.style.width = width + "px";
    };
    this.setScrollWidth = function(width) {
        this.inner.style.width = width + "px";
    };
    this.setScrollLeft = function(scrollLeft) {
        if (this.scrollLeft != scrollLeft) {
            this.skipEvent = true;
            this.scrollLeft = this.element.scrollLeft = scrollLeft;
        }
    };

}).call(HScrollBar.prototype);


exports.ScrollBar = VScrollBar; // backward compatibility
exports.ScrollBarV = VScrollBar; // backward compatibility
exports.ScrollBarH = HScrollBar; // backward compatibility

exports.VScrollBar = VScrollBar;
exports.HScrollBar = HScrollBar;
});

define("ace/renderloop",["require","exports","module","ace/lib/event"], function(require, exports, module) {
"use strict";

var event = require("./lib/event");


var RenderLoop = function(onRender, win) {
    this.onRender = onRender;
    this.pending = false;
    this.changes = 0;
    this.window = win || window;
};

(function() {


    this.schedule = function(change) {
        this.changes = this.changes | change;
        if (!this.pending && this.changes) {
            this.pending = true;
            var _self = this;
            event.nextFrame(function() {
                _self.pending = false;
                var changes;
                while (changes = _self.changes) {
                    _self.changes = 0;
                    _self.onRender(changes);
                }
            }, this.window);
        }
    };

}).call(RenderLoop.prototype);

exports.RenderLoop = RenderLoop;
});

define("ace/layer/font_metrics",["require","exports","module","ace/lib/oop","ace/lib/dom","ace/lib/lang","ace/lib/useragent","ace/lib/event_emitter"], function(require, exports, module) {

var oop = require("../lib/oop");
var dom = require("../lib/dom");
var lang = require("../lib/lang");
var useragent = require("../lib/useragent");
var EventEmitter = require("../lib/event_emitter").EventEmitter;

var CHAR_COUNT = 0;

var FontMetrics = exports.FontMetrics = function(parentEl, interval) {
    this.el = dom.createElement("div");
    this.$setMeasureNodeStyles(this.el.style, true);
    
    this.$main = dom.createElement("div");
    this.$setMeasureNodeStyles(this.$main.style);
    
    this.$measureNode = dom.createElement("div");
    this.$setMeasureNodeStyles(this.$measureNode.style);
    
    
    this.el.appendChild(this.$main);
    this.el.appendChild(this.$measureNode);
    parentEl.appendChild(this.el);
    
    if (!CHAR_COUNT)
        this.$testFractionalRect();
    this.$measureNode.innerHTML = lang.stringRepeat("X", CHAR_COUNT);
    
    this.$characterSize = {width: 0, height: 0};
    this.checkForSizeChanges();
};

(function() {

    oop.implement(this, EventEmitter);
        
    this.$characterSize = {width: 0, height: 0};
    
    this.$testFractionalRect = function() {
        var el = dom.createElement("div");
        this.$setMeasureNodeStyles(el.style);
        el.style.width = "0.2px";
        document.documentElement.appendChild(el);
        var w = el.getBoundingClientRect().width;
        if (w > 0 && w < 1)
            CHAR_COUNT = 50;
        else
            CHAR_COUNT = 100;
        el.parentNode.removeChild(el);
    };
    
    this.$setMeasureNodeStyles = function(style, isRoot) {
        style.width = style.height = "auto";
        style.left = style.top = "0px";
        style.visibility = "hidden";
        style.position = "absolute";
        style.whiteSpace = "pre";

        if (useragent.isIE < 8) {
            style["font-family"] = "inherit";
        } else {
            style.font = "inherit";
        }
        style.overflow = isRoot ? "hidden" : "visible";
    };

    this.checkForSizeChanges = function() {
        var size = this.$measureSizes();
        if (size && (this.$characterSize.width !== size.width || this.$characterSize.height !== size.height)) {
            this.$measureNode.style.fontWeight = "bold";
            var boldSize = this.$measureSizes();
            this.$measureNode.style.fontWeight = "";
            this.$characterSize = size;
            this.charSizes = Object.create(null);
            this.allowBoldFonts = boldSize && boldSize.width === size.width && boldSize.height === size.height;
            this._emit("changeCharacterSize", {data: size});
        }
    };

    this.$pollSizeChanges = function() {
        if (this.$pollSizeChangesTimer)
            return this.$pollSizeChangesTimer;
        var self = this;
        return this.$pollSizeChangesTimer = setInterval(function() {
            self.checkForSizeChanges();
        }, 500);
    };
    
    this.setPolling = function(val) {
        if (val) {
            this.$pollSizeChanges();
        } else {
            if (this.$pollSizeChangesTimer)
                this.$pollSizeChangesTimer;
        }
    };

    this.$measureSizes = function() {
        if (CHAR_COUNT === 50) {
            var rect = null;
            try { 
               rect = this.$measureNode.getBoundingClientRect();
            } catch(e) {
               rect = {width: 0, height:0 };
            };
            var size = {
                height: rect.height,
                width: rect.width / CHAR_COUNT
            };
        } else {
            var size = {
                height: this.$measureNode.clientHeight,
                width: this.$measureNode.clientWidth / CHAR_COUNT
            };
        }
        if (size.width === 0 || size.height === 0)
            return null;
        return size;
    };

    this.$measureCharWidth = function(ch) {
        this.$main.innerHTML = lang.stringRepeat(ch, CHAR_COUNT);
        var rect = this.$main.getBoundingClientRect();
        return rect.width / CHAR_COUNT;
    };
    
    this.getCharacterWidth = function(ch) {
        var w = this.charSizes[ch];
        if (w === undefined) {
            this.charSizes[ch] = this.$measureCharWidth(ch) / this.$characterSize.width;
        }
        return w;
    };

    this.destroy = function() {
        clearInterval(this.$pollSizeChangesTimer);
        if (this.el && this.el.parentNode)
            this.el.parentNode.removeChild(this.el);
    };

}).call(FontMetrics.prototype);

});

define("ace/virtual_renderer",["require","exports","module","ace/lib/oop","ace/lib/dom","ace/config","ace/lib/useragent","ace/layer/gutter","ace/layer/marker","ace/layer/text","ace/layer/cursor","ace/scrollbar","ace/scrollbar","ace/renderloop","ace/layer/font_metrics","ace/lib/event_emitter"], function(require, exports, module) {
"use strict";

var oop = require("./lib/oop");
var dom = require("./lib/dom");
var config = require("./config");
var useragent = require("./lib/useragent");
var GutterLayer = require("./layer/gutter").Gutter;
var MarkerLayer = require("./layer/marker").Marker;
var TextLayer = require("./layer/text").Text;
var CursorLayer = require("./layer/cursor").Cursor;
var HScrollBar = require("./scrollbar").HScrollBar;
var VScrollBar = require("./scrollbar").VScrollBar;
var RenderLoop = require("./renderloop").RenderLoop;
var FontMetrics = require("./layer/font_metrics").FontMetrics;
var EventEmitter = require("./lib/event_emitter").EventEmitter;
var editorCss = ".ace_editor {\
position: relative;\
overflow: hidden;\
font: 12px/normal 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;\
direction: ltr;\
}\
.ace_scroller {\
position: absolute;\
overflow: hidden;\
top: 0;\
bottom: 0;\
background-color: inherit;\
-ms-user-select: none;\
-moz-user-select: none;\
-webkit-user-select: none;\
user-select: none;\
cursor: text;\
}\
.ace_content {\
position: absolute;\
-moz-box-sizing: border-box;\
-webkit-box-sizing: border-box;\
box-sizing: border-box;\
min-width: 100%;\
}\
.ace_dragging .ace_scroller:before{\
position: absolute;\
top: 0;\
left: 0;\
right: 0;\
bottom: 0;\
content: '';\
background: rgba(250, 250, 250, 0.01);\
z-index: 1000;\
}\
.ace_dragging.ace_dark .ace_scroller:before{\
background: rgba(0, 0, 0, 0.01);\
}\
.ace_selecting, .ace_selecting * {\
cursor: text !important;\
}\
.ace_gutter {\
position: absolute;\
overflow : hidden;\
width: auto;\
top: 0;\
bottom: 0;\
left: 0;\
cursor: default;\
z-index: 4;\
-ms-user-select: none;\
-moz-user-select: none;\
-webkit-user-select: none;\
user-select: none;\
}\
.ace_gutter-active-line {\
position: absolute;\
left: 0;\
right: 0;\
}\
.ace_scroller.ace_scroll-left {\
box-shadow: 17px 0 16px -16px rgba(0, 0, 0, 0.4) inset;\
}\
.ace_gutter-cell {\
padding-left: 19px;\
padding-right: 6px;\
background-repeat: no-repeat;\
}\
.ace_gutter-cell.ace_error {\
background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABOFBMVEX/////////QRswFAb/Ui4wFAYwFAYwFAaWGAfDRymzOSH/PxswFAb/SiUwFAYwFAbUPRvjQiDllog5HhHdRybsTi3/Tyv9Tir+Syj/UC3////XurebMBIwFAb/RSHbPx/gUzfdwL3kzMivKBAwFAbbvbnhPx66NhowFAYwFAaZJg8wFAaxKBDZurf/RB6mMxb/SCMwFAYwFAbxQB3+RB4wFAb/Qhy4Oh+4QifbNRcwFAYwFAYwFAb/QRzdNhgwFAYwFAbav7v/Uy7oaE68MBK5LxLewr/r2NXewLswFAaxJw4wFAbkPRy2PyYwFAaxKhLm1tMwFAazPiQwFAaUGAb/QBrfOx3bvrv/VC/maE4wFAbRPBq6MRO8Qynew8Dp2tjfwb0wFAbx6eju5+by6uns4uH9/f36+vr/GkHjAAAAYnRSTlMAGt+64rnWu/bo8eAA4InH3+DwoN7j4eLi4xP99Nfg4+b+/u9B/eDs1MD1mO7+4PHg2MXa347g7vDizMLN4eG+Pv7i5evs/v79yu7S3/DV7/498Yv24eH+4ufQ3Ozu/v7+y13sRqwAAADLSURBVHjaZc/XDsFgGIBhtDrshlitmk2IrbHFqL2pvXf/+78DPokj7+Fz9qpU/9UXJIlhmPaTaQ6QPaz0mm+5gwkgovcV6GZzd5JtCQwgsxoHOvJO15kleRLAnMgHFIESUEPmawB9ngmelTtipwwfASilxOLyiV5UVUyVAfbG0cCPHig+GBkzAENHS0AstVF6bacZIOzgLmxsHbt2OecNgJC83JERmePUYq8ARGkJx6XtFsdddBQgZE2nPR6CICZhawjA4Fb/chv+399kfR+MMMDGOQAAAABJRU5ErkJggg==\");\
background-repeat: no-repeat;\
background-position: 2px center;\
}\
.ace_gutter-cell.ace_warning {\
background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAmVBMVEX///8AAAD///8AAAAAAABPSzb/5sAAAAB/blH/73z/ulkAAAAAAAD85pkAAAAAAAACAgP/vGz/rkDerGbGrV7/pkQICAf////e0IsAAAD/oED/qTvhrnUAAAD/yHD/njcAAADuv2r/nz//oTj/p064oGf/zHAAAAA9Nir/tFIAAAD/tlTiuWf/tkIAAACynXEAAAAAAAAtIRW7zBpBAAAAM3RSTlMAABR1m7RXO8Ln31Z36zT+neXe5OzooRDfn+TZ4p3h2hTf4t3k3ucyrN1K5+Xaks52Sfs9CXgrAAAAjklEQVR42o3PbQ+CIBQFYEwboPhSYgoYunIqqLn6/z8uYdH8Vmdnu9vz4WwXgN/xTPRD2+sgOcZjsge/whXZgUaYYvT8QnuJaUrjrHUQreGczuEafQCO/SJTufTbroWsPgsllVhq3wJEk2jUSzX3CUEDJC84707djRc5MTAQxoLgupWRwW6UB5fS++NV8AbOZgnsC7BpEAAAAABJRU5ErkJggg==\");\
background-position: 2px center;\
}\
.ace_gutter-cell.ace_info {\
background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAAAAAA6mKC9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAJ0Uk5TAAB2k804AAAAPklEQVQY02NgIB68QuO3tiLznjAwpKTgNyDbMegwisCHZUETUZV0ZqOquBpXj2rtnpSJT1AEnnRmL2OgGgAAIKkRQap2htgAAAAASUVORK5CYII=\");\
background-position: 2px center;\
}\
.ace_dark .ace_gutter-cell.ace_info {\
background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAJFBMVEUAAAChoaGAgIAqKiq+vr6tra1ZWVmUlJSbm5s8PDxubm56enrdgzg3AAAAAXRSTlMAQObYZgAAAClJREFUeNpjYMAPdsMYHegyJZFQBlsUlMFVCWUYKkAZMxZAGdxlDMQBAG+TBP4B6RyJAAAAAElFTkSuQmCC\");\
}\
.ace_scrollbar {\
position: absolute;\
right: 0;\
bottom: 0;\
z-index: 6;\
}\
.ace_scrollbar-inner {\
position: absolute;\
cursor: text;\
left: 0;\
top: 0;\
}\
.ace_scrollbar-v{\
overflow-x: hidden;\
overflow-y: scroll;\
top: 0;\
}\
.ace_scrollbar-h {\
overflow-x: scroll;\
overflow-y: hidden;\
left: 0;\
}\
.ace_print-margin {\
position: absolute;\
height: 100%;\
}\
.ace_text-input {\
position: absolute;\
z-index: 0;\
width: 0.5em;\
height: 1em;\
opacity: 0;\
background: transparent;\
-moz-appearance: none;\
appearance: none;\
border: none;\
resize: none;\
outline: none;\
overflow: hidden;\
font: inherit;\
padding: 0 1px;\
margin: 0 -1px;\
text-indent: -1em;\
-ms-user-select: text;\
-moz-user-select: text;\
-webkit-user-select: text;\
user-select: text;\
}\
.ace_text-input.ace_composition {\
background: inherit;\
color: inherit;\
z-index: 1000;\
opacity: 1;\
text-indent: 0;\
}\
.ace_layer {\
z-index: 1;\
position: absolute;\
overflow: hidden;\
word-wrap: normal;\
white-space: pre;\
height: 100%;\
width: 100%;\
-moz-box-sizing: border-box;\
-webkit-box-sizing: border-box;\
box-sizing: border-box;\
pointer-events: none;\
}\
.ace_gutter-layer {\
position: relative;\
width: auto;\
text-align: right;\
pointer-events: auto;\
}\
.ace_text-layer {\
font: inherit !important;\
}\
.ace_cjk {\
display: inline-block;\
text-align: center;\
}\
.ace_cursor-layer {\
z-index: 4;\
}\
.ace_cursor {\
z-index: 4;\
position: absolute;\
-moz-box-sizing: border-box;\
-webkit-box-sizing: border-box;\
box-sizing: border-box;\
border-left: 2px solid\
}\
.ace_slim-cursors .ace_cursor {\
border-left-width: 1px;\
}\
.ace_overwrite-cursors .ace_cursor {\
border-left-width: 0;\
border-bottom: 1px solid;\
}\
.ace_hidden-cursors .ace_cursor {\
opacity: 0.2;\
}\
.ace_smooth-blinking .ace_cursor {\
-webkit-transition: opacity 0.18s;\
transition: opacity 0.18s;\
}\
.ace_editor.ace_multiselect .ace_cursor {\
border-left-width: 1px;\
}\
.ace_marker-layer .ace_step, .ace_marker-layer .ace_stack {\
position: absolute;\
z-index: 3;\
}\
.ace_marker-layer .ace_selection {\
position: absolute;\
z-index: 5;\
}\
.ace_marker-layer .ace_bracket {\
position: absolute;\
z-index: 6;\
}\
.ace_marker-layer .ace_active-line {\
position: absolute;\
z-index: 2;\
}\
.ace_marker-layer .ace_selected-word {\
position: absolute;\
z-index: 4;\
-moz-box-sizing: border-box;\
-webkit-box-sizing: border-box;\
box-sizing: border-box;\
}\
.ace_line .ace_fold {\
-moz-box-sizing: border-box;\
-webkit-box-sizing: border-box;\
box-sizing: border-box;\
display: inline-block;\
height: 11px;\
margin-top: -2px;\
vertical-align: middle;\
background-image:\
url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAJCAYAAADU6McMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJpJREFUeNpi/P//PwOlgAXGYGRklAVSokD8GmjwY1wasKljQpYACtpCFeADcHVQfQyMQAwzwAZI3wJKvCLkfKBaMSClBlR7BOQikCFGQEErIH0VqkabiGCAqwUadAzZJRxQr/0gwiXIal8zQQPnNVTgJ1TdawL0T5gBIP1MUJNhBv2HKoQHHjqNrA4WO4zY0glyNKLT2KIfIMAAQsdgGiXvgnYAAAAASUVORK5CYII=\"),\
url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAA3CAYAAADNNiA5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACJJREFUeNpi+P//fxgTAwPDBxDxD078RSX+YeEyDFMCIMAAI3INmXiwf2YAAAAASUVORK5CYII=\");\
background-repeat: no-repeat, repeat-x;\
background-position: center center, top left;\
color: transparent;\
border: 1px solid black;\
border-radius: 2px;\
cursor: pointer;\
pointer-events: auto;\
}\
.ace_dark .ace_fold {\
}\
.ace_fold:hover{\
background-image:\
url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAJCAYAAADU6McMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJpJREFUeNpi/P//PwOlgAXGYGRklAVSokD8GmjwY1wasKljQpYACtpCFeADcHVQfQyMQAwzwAZI3wJKvCLkfKBaMSClBlR7BOQikCFGQEErIH0VqkabiGCAqwUadAzZJRxQr/0gwiXIal8zQQPnNVTgJ1TdawL0T5gBIP1MUJNhBv2HKoQHHjqNrA4WO4zY0glyNKLT2KIfIMAAQsdgGiXvgnYAAAAASUVORK5CYII=\"),\
url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAA3CAYAAADNNiA5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACBJREFUeNpi+P//fz4TAwPDZxDxD5X4i5fLMEwJgAADAEPVDbjNw87ZAAAAAElFTkSuQmCC\");\
}\
.ace_tooltip {\
background-color: #FFF;\
background-image: -webkit-linear-gradient(top, transparent, rgba(0, 0, 0, 0.1));\
background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.1));\
border: 1px solid gray;\
border-radius: 1px;\
box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);\
color: black;\
max-width: 100%;\
padding: 3px 4px;\
position: fixed;\
z-index: 999999;\
-moz-box-sizing: border-box;\
-webkit-box-sizing: border-box;\
box-sizing: border-box;\
cursor: default;\
white-space: pre;\
word-wrap: break-word;\
line-height: normal;\
font-style: normal;\
font-weight: normal;\
letter-spacing: normal;\
pointer-events: none;\
}\
.ace_folding-enabled > .ace_gutter-cell {\
padding-right: 13px;\
}\
.ace_fold-widget {\
-moz-box-sizing: border-box;\
-webkit-box-sizing: border-box;\
box-sizing: border-box;\
margin: 0 -12px 0 1px;\
display: none;\
width: 11px;\
vertical-align: top;\
background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAANElEQVR42mWKsQ0AMAzC8ixLlrzQjzmBiEjp0A6WwBCSPgKAXoLkqSot7nN3yMwR7pZ32NzpKkVoDBUxKAAAAABJRU5ErkJggg==\");\
background-repeat: no-repeat;\
background-position: center;\
border-radius: 3px;\
border: 1px solid transparent;\
cursor: pointer;\
}\
.ace_folding-enabled .ace_fold-widget {\
display: inline-block;   \
}\
.ace_fold-widget.ace_end {\
background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAANElEQVR42m3HwQkAMAhD0YzsRchFKI7sAikeWkrxwScEB0nh5e7KTPWimZki4tYfVbX+MNl4pyZXejUO1QAAAABJRU5ErkJggg==\");\
}\
.ace_fold-widget.ace_closed {\
background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAGCAYAAAAG5SQMAAAAOUlEQVR42jXKwQkAMAgDwKwqKD4EwQ26sSOkVWjgIIHAzPiCgaqiqnJHZnKICBERHN194O5b9vbLuAVRL+l0YWnZAAAAAElFTkSuQmCCXA==\");\
}\
.ace_fold-widget:hover {\
border: 1px solid rgba(0, 0, 0, 0.3);\
background-color: rgba(255, 255, 255, 0.2);\
box-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);\
}\
.ace_fold-widget:active {\
border: 1px solid rgba(0, 0, 0, 0.4);\
background-color: rgba(0, 0, 0, 0.05);\
box-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);\
}\
.ace_dark .ace_fold-widget {\
background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHklEQVQIW2P4//8/AzoGEQ7oGCaLLAhWiSwB146BAQCSTPYocqT0AAAAAElFTkSuQmCC\");\
}\
.ace_dark .ace_fold-widget.ace_end {\
background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAH0lEQVQIW2P4//8/AxQ7wNjIAjDMgC4AxjCVKBirIAAF0kz2rlhxpAAAAABJRU5ErkJggg==\");\
}\
.ace_dark .ace_fold-widget.ace_closed {\
background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAHElEQVQIW2P4//+/AxAzgDADlOOAznHAKgPWAwARji8UIDTfQQAAAABJRU5ErkJggg==\");\
}\
.ace_dark .ace_fold-widget:hover {\
box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);\
background-color: rgba(255, 255, 255, 0.1);\
}\
.ace_dark .ace_fold-widget:active {\
box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);\
}\
.ace_fold-widget.ace_invalid {\
background-color: #FFB4B4;\
border-color: #DE5555;\
}\
.ace_fade-fold-widgets .ace_fold-widget {\
-webkit-transition: opacity 0.4s ease 0.05s;\
transition: opacity 0.4s ease 0.05s;\
opacity: 0;\
}\
.ace_fade-fold-widgets:hover .ace_fold-widget {\
-webkit-transition: opacity 0.05s ease 0.05s;\
transition: opacity 0.05s ease 0.05s;\
opacity:1;\
}\
.ace_underline {\
text-decoration: underline;\
}\
.ace_bold {\
font-weight: bold;\
}\
.ace_nobold .ace_bold {\
font-weight: normal;\
}\
.ace_italic {\
font-style: italic;\
}\
.ace_error-marker {\
background-color: rgba(255, 0, 0,0.2);\
position: absolute;\
z-index: 9;\
}\
.ace_highlight-marker {\
background-color: rgba(255, 255, 0,0.2);\
position: absolute;\
z-index: 8;\
}\
";

dom.importCssString(editorCss, "ace_editor.css");

var VirtualRenderer = function(container, theme) {
    var _self = this;

    this.container = container || dom.createElement("div");
    this.$keepTextAreaAtCursor = !useragent.isOldIE;

    dom.addCssClass(this.container, "ace_editor");

    this.setTheme(theme);

    this.$gutter = dom.createElement("div");
    this.$gutter.className = "ace_gutter";
    this.container.appendChild(this.$gutter);

    this.scroller = dom.createElement("div");
    this.scroller.className = "ace_scroller";
    this.container.appendChild(this.scroller);

    this.content = dom.createElement("div");
    this.content.className = "ace_content";
    this.scroller.appendChild(this.content);

    this.$gutterLayer = new GutterLayer(this.$gutter);
    this.$gutterLayer.on("changeGutterWidth", this.onGutterResize.bind(this));

    this.$markerBack = new MarkerLayer(this.content);

    var textLayer = this.$textLayer = new TextLayer(this.content);
    this.canvas = textLayer.element;

    this.$markerFront = new MarkerLayer(this.content);

    this.$cursorLayer = new CursorLayer(this.content);
    this.$horizScroll = false;
    this.$vScroll = false;

    this.scrollBar = 
    this.scrollBarV = new VScrollBar(this.container, this);
    this.scrollBarH = new HScrollBar(this.container, this);
    this.scrollBarV.addEventListener("scroll", function(e) {
        if (!_self.$scrollAnimation)
            _self.session.setScrollTop(e.data - _self.scrollMargin.top);
    });
    this.scrollBarH.addEventListener("scroll", function(e) {
        if (!_self.$scrollAnimation)
            _self.session.setScrollLeft(e.data - _self.scrollMargin.left);
    });

    this.scrollTop = 0;
    this.scrollLeft = 0;

    this.cursorPos = {
        row : 0,
        column : 0
    };

    this.$fontMetrics = new FontMetrics(this.container, 500);
    this.$textLayer.$setFontMetrics(this.$fontMetrics);
    this.$textLayer.addEventListener("changeCharacterSize", function(e) {
        _self.updateCharacterSize();
        _self.onResize(true, _self.gutterWidth, _self.$size.width, _self.$size.height);
        _self._signal("changeCharacterSize", e);
    });

    this.$size = {
        width: 0,
        height: 0,
        scrollerHeight: 0,
        scrollerWidth: 0,
        $dirty: true
    };

    this.layerConfig = {
        width : 1,
        padding : 0,
        firstRow : 0,
        firstRowScreen: 0,
        lastRow : 0,
        lineHeight : 0,
        characterWidth : 0,
        minHeight : 1,
        maxHeight : 1,
        offset : 0,
        height : 1,
        gutterOffset: 1
    };
    
    this.scrollMargin = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        v: 0,
        h: 0
    };

    this.$loop = new RenderLoop(
        this.$renderChanges.bind(this),
        this.container.ownerDocument.defaultView
    );
    this.$loop.schedule(this.CHANGE_FULL);

    this.updateCharacterSize();
    this.setPadding(4);
    config.resetOptions(this);
    config._emit("renderer", this);
};

(function() {

    this.CHANGE_CURSOR = 1;
    this.CHANGE_MARKER = 2;
    this.CHANGE_GUTTER = 4;
    this.CHANGE_SCROLL = 8;
    this.CHANGE_LINES = 16;
    this.CHANGE_TEXT = 32;
    this.CHANGE_SIZE = 64;
    this.CHANGE_MARKER_BACK = 128;
    this.CHANGE_MARKER_FRONT = 256;
    this.CHANGE_FULL = 512;
    this.CHANGE_H_SCROLL = 1024;

    oop.implement(this, EventEmitter);

    this.updateCharacterSize = function() {
        if (this.$textLayer.allowBoldFonts != this.$allowBoldFonts) {
            this.$allowBoldFonts = this.$textLayer.allowBoldFonts;
            this.setStyle("ace_nobold", !this.$allowBoldFonts);
        }

        this.layerConfig.characterWidth =
        this.characterWidth = this.$textLayer.getCharacterWidth();
        this.layerConfig.lineHeight =
        this.lineHeight = this.$textLayer.getLineHeight();
        this.$updatePrintMargin();
    };
    this.setSession = function(session) {
        if (this.session)
            this.session.doc.off("changeNewLineMode", this.onChangeNewLineMode);
            
        this.session = session;
        if (session && this.scrollMargin.top && session.getScrollTop() <= 0)
            session.setScrollTop(-this.scrollMargin.top);

        this.$cursorLayer.setSession(session);
        this.$markerBack.setSession(session);
        this.$markerFront.setSession(session);
        this.$gutterLayer.setSession(session);
        this.$textLayer.setSession(session);
        if (!session)
            return;
        
        this.$loop.schedule(this.CHANGE_FULL);
        this.session.$setFontMetrics(this.$fontMetrics);
        
        this.onChangeNewLineMode = this.onChangeNewLineMode.bind(this);
        this.onChangeNewLineMode()
        this.session.doc.on("changeNewLineMode", this.onChangeNewLineMode);
    };
    this.updateLines = function(firstRow, lastRow, force) {
        if (lastRow === undefined)
            lastRow = Infinity;

        if (!this.$changedLines) {
            this.$changedLines = {
                firstRow: firstRow,
                lastRow: lastRow
            };
        }
        else {
            if (this.$changedLines.firstRow > firstRow)
                this.$changedLines.firstRow = firstRow;

            if (this.$changedLines.lastRow < lastRow)
                this.$changedLines.lastRow = lastRow;
        }
        if (this.$changedLines.lastRow < this.layerConfig.firstRow) {
            if (force)
                this.$changedLines.lastRow = this.layerConfig.lastRow;
            else
                return;
        }
        if (this.$changedLines.firstRow > this.layerConfig.lastRow)
            return;
        this.$loop.schedule(this.CHANGE_LINES);
    };

    this.onChangeNewLineMode = function() {
        this.$loop.schedule(this.CHANGE_TEXT);
        this.$textLayer.$updateEolChar();
    };
    
    this.onChangeTabSize = function() {
        this.$loop.schedule(this.CHANGE_TEXT | this.CHANGE_MARKER);
        this.$textLayer.onChangeTabSize();
    };
    this.updateText = function() {
        this.$loop.schedule(this.CHANGE_TEXT);
    };
    this.updateFull = function(force) {
        if (force)
            this.$renderChanges(this.CHANGE_FULL, true);
        else
            this.$loop.schedule(this.CHANGE_FULL);
    };
    this.updateFontSize = function() {
        this.$textLayer.checkForSizeChanges();
    };

    this.$changes = 0;
    this.$updateSizeAsync = function() {
        if (this.$loop.pending)
            this.$size.$dirty = true;
        else
            this.onResize();
    };
    this.onResize = function(force, gutterWidth, width, height) {
        if (this.resizing > 2)
            return;
        else if (this.resizing > 0)
            this.resizing++;
        else
            this.resizing = force ? 1 : 0;
        var el = this.container;
        if (!height)
            height = el.clientHeight || el.scrollHeight;
        if (!width)
            width = el.clientWidth || el.scrollWidth;
        var changes = this.$updateCachedSize(force, gutterWidth, width, height);

        
        if (!this.$size.scrollerHeight || (!width && !height))
            return this.resizing = 0;

        if (force)
            this.$gutterLayer.$padding = null;

        if (force)
            this.$renderChanges(changes | this.$changes, true);
        else
            this.$loop.schedule(changes | this.$changes);

        if (this.resizing)
            this.resizing = 0;
        this.scrollBarV.scrollLeft = this.scrollBarV.scrollTop = null;
    };
    
    this.$updateCachedSize = function(force, gutterWidth, width, height) {
        height -= (this.$extraHeight || 0);
        var changes = 0;
        var size = this.$size;
        var oldSize = {
            width: size.width,
            height: size.height,
            scrollerHeight: size.scrollerHeight,
            scrollerWidth: size.scrollerWidth
        };
        if (height && (force || size.height != height)) {
            size.height = height;
            changes |= this.CHANGE_SIZE;

            size.scrollerHeight = size.height;
            if (this.$horizScroll)
                size.scrollerHeight -= this.scrollBarH.getHeight();
            this.scrollBarV.element.style.bottom = this.scrollBarH.getHeight() + "px";

            changes = changes | this.CHANGE_SCROLL;
        }

        if (width && (force || size.width != width)) {
            changes |= this.CHANGE_SIZE;
            size.width = width;
            
            if (gutterWidth == null)
                gutterWidth = this.$showGutter ? this.$gutter.offsetWidth : 0;
            
            this.gutterWidth = gutterWidth;
            
            this.scrollBarH.element.style.left = 
            this.scroller.style.left = gutterWidth + "px";
            size.scrollerWidth = Math.max(0, width - gutterWidth - this.scrollBarV.getWidth());           
            
            this.scrollBarH.element.style.right = 
            this.scroller.style.right = this.scrollBarV.getWidth() + "px";
            this.scroller.style.bottom = this.scrollBarH.getHeight() + "px";

            if (this.session && this.session.getUseWrapMode() && this.adjustWrapLimit() || force)
                changes |= this.CHANGE_FULL;
        }
        
        size.$dirty = !width || !height;

        if (changes)
            this._signal("resize", oldSize);

        return changes;
    };

    this.onGutterResize = function() {
        var gutterWidth = this.$showGutter ? this.$gutter.offsetWidth : 0;
        if (gutterWidth != this.gutterWidth)
            this.$changes |= this.$updateCachedSize(true, gutterWidth, this.$size.width, this.$size.height);

        if (this.session.getUseWrapMode() && this.adjustWrapLimit()) {
            this.$loop.schedule(this.CHANGE_FULL);
        } else if (this.$size.$dirty) {
            this.$loop.schedule(this.CHANGE_FULL);
        } else {
            this.$computeLayerConfig();
            this.$loop.schedule(this.CHANGE_MARKER);
        }
    };
    this.adjustWrapLimit = function() {
        var availableWidth = this.$size.scrollerWidth - this.$padding * 2;
        var limit = Math.floor(availableWidth / this.characterWidth);
        return this.session.adjustWrapLimit(limit, this.$showPrintMargin && this.$printMarginColumn);
    };
    this.setAnimatedScroll = function(shouldAnimate){
        this.setOption("animatedScroll", shouldAnimate);
    };
    this.getAnimatedScroll = function() {
        return this.$animatedScroll;
    };
    this.setShowInvisibles = function(showInvisibles) {
        this.setOption("showInvisibles", showInvisibles);
    };
    this.getShowInvisibles = function() {
        return this.getOption("showInvisibles");
    };
    this.getDisplayIndentGuides = function() {
        return this.getOption("displayIndentGuides");
    };

    this.setDisplayIndentGuides = function(display) {
        this.setOption("displayIndentGuides", display);
    };
    this.setShowPrintMargin = function(showPrintMargin) {
        this.setOption("showPrintMargin", showPrintMargin);
    };
    this.getShowPrintMargin = function() {
        return this.getOption("showPrintMargin");
    };
    this.setPrintMarginColumn = function(showPrintMargin) {
        this.setOption("printMarginColumn", showPrintMargin);
    };
    this.getPrintMarginColumn = function() {
        return this.getOption("printMarginColumn");
    };
    this.getShowGutter = function(){
        return this.getOption("showGutter");
    };
    this.setShowGutter = function(show){
        return this.setOption("showGutter", show);
    };

    this.getFadeFoldWidgets = function(){
        return this.getOption("fadeFoldWidgets")
    };

    this.setFadeFoldWidgets = function(show) {
        this.setOption("fadeFoldWidgets", show);
    };

    this.setHighlightGutterLine = function(shouldHighlight) {
        this.setOption("highlightGutterLine", shouldHighlight);
    };

    this.getHighlightGutterLine = function() {
        return this.getOption("highlightGutterLine");
    };

    this.$updateGutterLineHighlight = function() {
        var pos = this.$cursorLayer.$pixelPos;
        var height = this.layerConfig.lineHeight;
        if (this.session.getUseWrapMode()) {
            var cursor = this.session.selection.getCursor();
            cursor.column = 0;
            pos = this.$cursorLayer.getPixelPosition(cursor, true);
            height *= this.session.getRowLength(cursor.row);
        }
        this.$gutterLineHighlight.style.top = pos.top - this.layerConfig.offset + "px";
        this.$gutterLineHighlight.style.height = height + "px";
    };

    this.$updatePrintMargin = function() {
        if (!this.$showPrintMargin && !this.$printMarginEl)
            return;

        if (!this.$printMarginEl) {
            var containerEl = dom.createElement("div");
            containerEl.className = "ace_layer ace_print-margin-layer";
            this.$printMarginEl = dom.createElement("div");
            this.$printMarginEl.className = "ace_print-margin";
            containerEl.appendChild(this.$printMarginEl);
            this.content.insertBefore(containerEl, this.content.firstChild);
        }

        var style = this.$printMarginEl.style;
        style.left = ((this.characterWidth * this.$printMarginColumn) + this.$padding) + "px";
        style.visibility = this.$showPrintMargin ? "visible" : "hidden";
        
        if (this.session && this.session.$wrap == -1)
            this.adjustWrapLimit();
    };
    this.getContainerElement = function() {
        return this.container;
    };
    this.getMouseEventTarget = function() {
        return this.content;
    };
    this.getTextAreaContainer = function() {
        return this.container;
    };
    this.$moveTextAreaToCursor = function() {
        if (!this.$keepTextAreaAtCursor)
            return;
        var config = this.layerConfig;
        var posTop = this.$cursorLayer.$pixelPos.top;
        var posLeft = this.$cursorLayer.$pixelPos.left;
        posTop -= config.offset;

        var style = this.textarea.style;
        var h = this.lineHeight;
        if (posTop < 0 || posTop > config.height - h) {
            style.top = style.left = "0";
            return;
        }

        var w = this.characterWidth;
        if (this.$composition) {
            var val = this.textarea.value.replace(/^\x01+/, "");
            w *= (this.session.$getStringScreenWidth(val)[0]+2);
            h += 2;
        }
        posLeft -= this.scrollLeft;
        if (posLeft > this.$size.scrollerWidth - w)
            posLeft = this.$size.scrollerWidth - w;

        posLeft += this.gutterWidth;
        style.height = h + "px";
        style.width = w + "px";
        style.left = Math.min(posLeft, this.$size.scrollerWidth - w) + "px";
        style.top = Math.min(posTop, this.$size.height - h) + "px";
    };
    this.getFirstVisibleRow = function() {
        return this.layerConfig.firstRow;
    };
    this.getFirstFullyVisibleRow = function() {
        return this.layerConfig.firstRow + (this.layerConfig.offset === 0 ? 0 : 1);
    };
    this.getLastFullyVisibleRow = function() {
        var flint = Math.floor((this.layerConfig.height + this.layerConfig.offset) / this.layerConfig.lineHeight);
        return this.layerConfig.firstRow - 1 + flint;
    };
    this.getLastVisibleRow = function() {
        return this.layerConfig.lastRow;
    };

    this.$padding = null;
    this.setPadding = function(padding) {
        this.$padding = padding;
        this.$textLayer.setPadding(padding);
        this.$cursorLayer.setPadding(padding);
        this.$markerFront.setPadding(padding);
        this.$markerBack.setPadding(padding);
        this.$loop.schedule(this.CHANGE_FULL);
        this.$updatePrintMargin();
    };
    
    this.setScrollMargin = function(top, bottom, left, right) {
        var sm = this.scrollMargin;
        sm.top = top|0;
        sm.bottom = bottom|0;
        sm.right = right|0;
        sm.left = left|0;
        sm.v = sm.top + sm.bottom;
        sm.h = sm.left + sm.right;
        if (sm.top && this.scrollTop <= 0 && this.session)
            this.session.setScrollTop(-sm.top);
        this.updateFull();
    };
    this.getHScrollBarAlwaysVisible = function() {
        return this.$hScrollBarAlwaysVisible;
    };
    this.setHScrollBarAlwaysVisible = function(alwaysVisible) {
        this.setOption("hScrollBarAlwaysVisible", alwaysVisible);
    };
    this.getVScrollBarAlwaysVisible = function() {
        return this.$vScrollBarAlwaysVisible;
    };
    this.setVScrollBarAlwaysVisible = function(alwaysVisible) {
        this.setOption("vScrollBarAlwaysVisible", alwaysVisible);
    };

    this.$updateScrollBarV = function() {
        var scrollHeight = this.layerConfig.maxHeight;
        var scrollerHeight = this.$size.scrollerHeight;
        if (!this.$maxLines && this.$scrollPastEnd) {
            scrollHeight -= (scrollerHeight - this.lineHeight) * this.$scrollPastEnd;
            if (this.scrollTop > scrollHeight - scrollerHeight) {
                scrollHeight = this.scrollTop + scrollerHeight;
                this.scrollBarV.scrollTop = null;
            }
        }
        this.scrollBarV.setScrollHeight(scrollHeight + this.scrollMargin.v);
        this.scrollBarV.setScrollTop(this.scrollTop + this.scrollMargin.top);
    };
    this.$updateScrollBarH = function() {
        this.scrollBarH.setScrollWidth(this.layerConfig.width + 2 * this.$padding + this.scrollMargin.h);
        this.scrollBarH.setScrollLeft(this.scrollLeft + this.scrollMargin.left);
    };
    
    this.$frozen = false;
    this.freeze = function() {
        this.$frozen = true;
    };
    
    this.unfreeze = function() {
        this.$frozen = false;
    };

    this.$renderChanges = function(changes, force) {
        if (this.$changes) {
            changes |= this.$changes;
            this.$changes = 0;
        }
        if ((!this.session || !this.container.offsetWidth || this.$frozen) || (!changes && !force)) {
            this.$changes |= changes;
            return; 
        } 
        if (this.$size.$dirty) {
            this.$changes |= changes;
            return this.onResize(true);
        }
        if (!this.lineHeight) {
            this.$textLayer.checkForSizeChanges();
        }
        
        this._signal("beforeRender");
        var config = this.layerConfig;
        if (changes & this.CHANGE_FULL ||
            changes & this.CHANGE_SIZE ||
            changes & this.CHANGE_TEXT ||
            changes & this.CHANGE_LINES ||
            changes & this.CHANGE_SCROLL ||
            changes & this.CHANGE_H_SCROLL
        ) {
            changes |= this.$computeLayerConfig();
            if (config.firstRow != this.layerConfig.firstRow && config.firstRowScreen == this.layerConfig.firstRowScreen) {
                var st = this.scrollTop + (config.firstRow - this.layerConfig.firstRow) * this.lineHeight;
                if (st > 0) {
                    this.scrollTop = st;
                    changes = changes | this.CHANGE_SCROLL;
                    changes |= this.$computeLayerConfig();
                }
            }
            config = this.layerConfig;
            this.$updateScrollBarV();
            if (changes & this.CHANGE_H_SCROLL)
                this.$updateScrollBarH();
            this.$gutterLayer.element.style.marginTop = (-config.offset) + "px";
            this.content.style.marginTop = (-config.offset) + "px";
            this.content.style.width = config.width + 2 * this.$padding + "px";
            this.content.style.height = config.minHeight + "px";
        }
        if (changes & this.CHANGE_H_SCROLL) {
            this.content.style.marginLeft = -this.scrollLeft + "px";
            this.scroller.className = this.scrollLeft <= 0 ? "ace_scroller" : "ace_scroller ace_scroll-left";
        }
        if (changes & this.CHANGE_FULL) {
            this.$textLayer.update(config);
            if (this.$showGutter)
                this.$gutterLayer.update(config);
            this.$markerBack.update(config);
            this.$markerFront.update(config);
            this.$cursorLayer.update(config);
            this.$moveTextAreaToCursor();
            this.$highlightGutterLine && this.$updateGutterLineHighlight();
            this._signal("afterRender");
            return;
        }
        if (changes & this.CHANGE_SCROLL) {
            if (changes & this.CHANGE_TEXT || changes & this.CHANGE_LINES)
                this.$textLayer.update(config);
            else
                this.$textLayer.scrollLines(config);

            if (this.$showGutter)
                this.$gutterLayer.update(config);
            this.$markerBack.update(config);
            this.$markerFront.update(config);
            this.$cursorLayer.update(config);
            this.$highlightGutterLine && this.$updateGutterLineHighlight();
            this.$moveTextAreaToCursor();
            this._signal("afterRender");
            return;
        }

        if (changes & this.CHANGE_TEXT) {
            this.$textLayer.update(config);
            if (this.$showGutter)
                this.$gutterLayer.update(config);
        }
        else if (changes & this.CHANGE_LINES) {
            if (this.$updateLines() || (changes & this.CHANGE_GUTTER) && this.$showGutter)
                this.$gutterLayer.update(config);
        }
        else if (changes & this.CHANGE_TEXT || changes & this.CHANGE_GUTTER) {
            if (this.$showGutter)
                this.$gutterLayer.update(config);
        }

        if (changes & this.CHANGE_CURSOR) {
            this.$cursorLayer.update(config);
            this.$moveTextAreaToCursor();
            this.$highlightGutterLine && this.$updateGutterLineHighlight();
        }

        if (changes & (this.CHANGE_MARKER | this.CHANGE_MARKER_FRONT)) {
            this.$markerFront.update(config);
        }

        if (changes & (this.CHANGE_MARKER | this.CHANGE_MARKER_BACK)) {
            this.$markerBack.update(config);
        }

        this._signal("afterRender");
    };

    
    this.$autosize = function() {
        var height = this.session.getScreenLength() * this.lineHeight;
        var maxHeight = this.$maxLines * this.lineHeight;
        var desiredHeight = Math.max(
            (this.$minLines||1) * this.lineHeight,
            Math.min(maxHeight, height)
        ) + this.scrollMargin.v + (this.$extraHeight || 0);
        var vScroll = height > maxHeight;
        
        if (desiredHeight != this.desiredHeight ||
            this.$size.height != this.desiredHeight || vScroll != this.$vScroll) {
            if (vScroll != this.$vScroll) {
                this.$vScroll = vScroll;
                this.scrollBarV.setVisible(vScroll);
            }
            
            var w = this.container.clientWidth;
            this.container.style.height = desiredHeight + "px";
            this.$updateCachedSize(true, this.$gutterWidth, w, desiredHeight);
            this.desiredHeight = desiredHeight;
            
            this._signal("autosize");
        }
    };
    
    this.$computeLayerConfig = function() {
        if (this.$maxLines && this.lineHeight > 1)
            this.$autosize();

        var session = this.session;
        var size = this.$size;
        
        var hideScrollbars = size.height <= 2 * this.lineHeight;
        var screenLines = this.session.getScreenLength();
        var maxHeight = screenLines * this.lineHeight;

        var offset = this.scrollTop % this.lineHeight;
        var minHeight = size.scrollerHeight + this.lineHeight;

        var longestLine = this.$getLongestLine();
        
        var horizScroll = !hideScrollbars && (this.$hScrollBarAlwaysVisible ||
            size.scrollerWidth - longestLine - 2 * this.$padding < 0);

        var hScrollChanged = this.$horizScroll !== horizScroll;
        if (hScrollChanged) {
            this.$horizScroll = horizScroll;
            this.scrollBarH.setVisible(horizScroll);
        }
        
        var scrollPastEnd = !this.$maxLines && this.$scrollPastEnd
            ? (size.scrollerHeight - this.lineHeight) * this.$scrollPastEnd
            : 0;
        maxHeight += scrollPastEnd;
        
        this.session.setScrollTop(Math.max(-this.scrollMargin.top,
            Math.min(this.scrollTop, maxHeight - size.scrollerHeight + this.scrollMargin.bottom)));

        this.session.setScrollLeft(Math.max(-this.scrollMargin.left, Math.min(this.scrollLeft, 
            longestLine + 2 * this.$padding - size.scrollerWidth + this.scrollMargin.right)));
        
        var vScroll = !hideScrollbars && (this.$vScrollBarAlwaysVisible ||
            size.scrollerHeight - maxHeight + scrollPastEnd < 0 || this.scrollTop);
        var vScrollChanged = this.$vScroll !== vScroll;
        if (vScrollChanged) {
            this.$vScroll = vScroll;
            this.scrollBarV.setVisible(vScroll);
        }

        var lineCount = Math.ceil(minHeight / this.lineHeight) - 1;
        var firstRow = Math.max(0, Math.round((this.scrollTop - offset) / this.lineHeight));
        var lastRow = firstRow + lineCount;
        var firstRowScreen, firstRowHeight;
        var lineHeight = this.lineHeight;
        firstRow = session.screenToDocumentRow(firstRow, 0);
        var foldLine = session.getFoldLine(firstRow);
        if (foldLine) {
            firstRow = foldLine.start.row;
        }

        firstRowScreen = session.documentToScreenRow(firstRow, 0);
        firstRowHeight = session.getRowLength(firstRow) * lineHeight;

        lastRow = Math.min(session.screenToDocumentRow(lastRow, 0), session.getLength() - 1);
        minHeight = size.scrollerHeight + session.getRowLength(lastRow) * lineHeight +
                                                firstRowHeight;

        offset = this.scrollTop - firstRowScreen * lineHeight;

        var changes = 0;
        if (this.layerConfig.width != longestLine) 
            changes = this.CHANGE_H_SCROLL;
        if (hScrollChanged || vScrollChanged) {
            changes = this.$updateCachedSize(true, this.gutterWidth, size.width, size.height);
            this._signal("scrollbarVisibilityChanged");
            if (vScrollChanged)
                longestLine = this.$getLongestLine();
        }
        
        this.layerConfig = {
            width : longestLine,
            padding : this.$padding,
            firstRow : firstRow,
            firstRowScreen: firstRowScreen,
            lastRow : lastRow,
            lineHeight : lineHeight,
            characterWidth : this.characterWidth,
            minHeight : minHeight,
            maxHeight : maxHeight,
            offset : offset,
            gutterOffset : Math.max(0, Math.ceil((offset + size.height - size.scrollerHeight) / lineHeight)),
            height : this.$size.scrollerHeight
        };

        return changes;
    };

    this.$updateLines = function() {
        var firstRow = this.$changedLines.firstRow;
        var lastRow = this.$changedLines.lastRow;
        this.$changedLines = null;

        var layerConfig = this.layerConfig;

        if (firstRow > layerConfig.lastRow + 1) { return; }
        if (lastRow < layerConfig.firstRow) { return; }
        if (lastRow === Infinity) {
            if (this.$showGutter)
                this.$gutterLayer.update(layerConfig);
            this.$textLayer.update(layerConfig);
            return;
        }
        this.$textLayer.updateLines(layerConfig, firstRow, lastRow);
        return true;
    };

    this.$getLongestLine = function() {
        var charCount = this.session.getScreenWidth();
        if (this.showInvisibles && !this.session.$useWrapMode)
            charCount += 1;

        return Math.max(this.$size.scrollerWidth - 2 * this.$padding, Math.round(charCount * this.characterWidth));
    };
    this.updateFrontMarkers = function() {
        this.$markerFront.setMarkers(this.session.getMarkers(true));
        this.$loop.schedule(this.CHANGE_MARKER_FRONT);
    };
    this.updateBackMarkers = function() {
        this.$markerBack.setMarkers(this.session.getMarkers());
        this.$loop.schedule(this.CHANGE_MARKER_BACK);
    };
    this.addGutterDecoration = function(row, className){
        this.$gutterLayer.addGutterDecoration(row, className);
    };
    this.removeGutterDecoration = function(row, className){
        this.$gutterLayer.removeGutterDecoration(row, className);
    };
    this.updateBreakpoints = function(rows) {
        this.$loop.schedule(this.CHANGE_GUTTER);
    };
    this.setAnnotations = function(annotations) {
        this.$gutterLayer.setAnnotations(annotations);
        this.$loop.schedule(this.CHANGE_GUTTER);
    };
    this.updateCursor = function() {
        this.$loop.schedule(this.CHANGE_CURSOR);
    };
    this.hideCursor = function() {
        this.$cursorLayer.hideCursor();
    };
    this.showCursor = function() {
        this.$cursorLayer.showCursor();
    };

    this.scrollSelectionIntoView = function(anchor, lead, offset) {
        this.scrollCursorIntoView(anchor, offset);
        this.scrollCursorIntoView(lead, offset);
    };
    this.scrollCursorIntoView = function(cursor, offset, $viewMargin) {
        if (this.$size.scrollerHeight === 0)
            return;

        var pos = this.$cursorLayer.getPixelPosition(cursor);

        var left = pos.left;
        var top = pos.top;
        
        var topMargin = $viewMargin && $viewMargin.top || 0;
        var bottomMargin = $viewMargin && $viewMargin.bottom || 0;
        
        var scrollTop = this.$scrollAnimation ? this.session.getScrollTop() : this.scrollTop;
        
        if (scrollTop + topMargin > top) {
            if (offset)
                top -= offset * this.$size.scrollerHeight;
            if (top === 0)
                top = -this.scrollMargin.top;
            this.session.setScrollTop(top);
        } else if (scrollTop + this.$size.scrollerHeight - bottomMargin < top + this.lineHeight) {
            if (offset)
                top += offset * this.$size.scrollerHeight;
            this.session.setScrollTop(top + this.lineHeight - this.$size.scrollerHeight);
        }

        var scrollLeft = this.scrollLeft;

        if (scrollLeft > left) {
            if (left < this.$padding + 2 * this.layerConfig.characterWidth)
                left = -this.scrollMargin.left;
            this.session.setScrollLeft(left);
        } else if (scrollLeft + this.$size.scrollerWidth < left + this.characterWidth) {
            this.session.setScrollLeft(Math.round(left + this.characterWidth - this.$size.scrollerWidth));
        } else if (scrollLeft <= this.$padding && left - scrollLeft < this.characterWidth) {
            this.session.setScrollLeft(0);
        }
    };
    this.getScrollTop = function() {
        return this.session.getScrollTop();
    };
    this.getScrollLeft = function() {
        return this.session.getScrollLeft();
    };
    this.getScrollTopRow = function() {
        return this.scrollTop / this.lineHeight;
    };
    this.getScrollBottomRow = function() {
        return Math.max(0, Math.floor((this.scrollTop + this.$size.scrollerHeight) / this.lineHeight) - 1);
    };
    this.scrollToRow = function(row) {
        this.session.setScrollTop(row * this.lineHeight);
    };

    this.alignCursor = function(cursor, alignment) {
        if (typeof cursor == "number")
            cursor = {row: cursor, column: 0};

        var pos = this.$cursorLayer.getPixelPosition(cursor);
        var h = this.$size.scrollerHeight - this.lineHeight;
        var offset = pos.top - h * (alignment || 0);

        this.session.setScrollTop(offset);
        return offset;
    };

    this.STEPS = 8;
    this.$calcSteps = function(fromValue, toValue){
        var i = 0;
        var l = this.STEPS;
        var steps = [];

        var func  = function(t, x_min, dx) {
            return dx * (Math.pow(t - 1, 3) + 1) + x_min;
        };

        for (i = 0; i < l; ++i)
            steps.push(func(i / this.STEPS, fromValue, toValue - fromValue));

        return steps;
    };
    this.scrollToLine = function(line, center, animate, callback) {
        var pos = this.$cursorLayer.getPixelPosition({row: line, column: 0});
        var offset = pos.top;
        if (center)
            offset -= this.$size.scrollerHeight / 2;

        var initialScroll = this.scrollTop;
        this.session.setScrollTop(offset);
        if (animate !== false)
            this.animateScrolling(initialScroll, callback);
    };

    this.animateScrolling = function(fromValue, callback) {
        var toValue = this.scrollTop;
        if (!this.$animatedScroll)
            return;
        var _self = this;
        
        if (fromValue == toValue)
            return;
        
        if (this.$scrollAnimation) {
            var oldSteps = this.$scrollAnimation.steps;
            if (oldSteps.length) {
                fromValue = oldSteps[0];
                if (fromValue == toValue)
                    return;
            }
        }
        
        var steps = _self.$calcSteps(fromValue, toValue);
        this.$scrollAnimation = {from: fromValue, to: toValue, steps: steps};

        clearInterval(this.$timer);

        _self.session.setScrollTop(steps.shift());
        _self.session.$scrollTop = toValue;
        this.$timer = setInterval(function() {
            if (steps.length) {
                _self.session.setScrollTop(steps.shift());
                _self.session.$scrollTop = toValue;
            } else if (toValue != null) {
                _self.session.$scrollTop = -1;
                _self.session.setScrollTop(toValue);
                toValue = null;
            } else {
                _self.$timer = clearInterval(_self.$timer);
                _self.$scrollAnimation = null;
                callback && callback();
            }
        }, 10);
    };
    this.scrollToY = function(scrollTop) {
        if (this.scrollTop !== scrollTop) {
            this.$loop.schedule(this.CHANGE_SCROLL);
            this.scrollTop = scrollTop;
        }
    };
    this.scrollToX = function(scrollLeft) {
        if (this.scrollLeft !== scrollLeft)
            this.scrollLeft = scrollLeft;
        this.$loop.schedule(this.CHANGE_H_SCROLL);
    };
    this.scrollTo = function(x, y) {
        this.session.setScrollTop(y);
        this.session.setScrollLeft(y);
    };
    this.scrollBy = function(deltaX, deltaY) {
        deltaY && this.session.setScrollTop(this.session.getScrollTop() + deltaY);
        deltaX && this.session.setScrollLeft(this.session.getScrollLeft() + deltaX);
    };
    this.isScrollableBy = function(deltaX, deltaY) {
        if (deltaY < 0 && this.session.getScrollTop() >= 1 - this.scrollMargin.top)
           return true;
        if (deltaY > 0 && this.session.getScrollTop() + this.$size.scrollerHeight
            - this.layerConfig.maxHeight < -1 + this.scrollMargin.bottom)
           return true;
        if (deltaX < 0 && this.session.getScrollLeft() >= 1 - this.scrollMargin.left)
            return true;
        if (deltaX > 0 && this.session.getScrollLeft() + this.$size.scrollerWidth
            - this.layerConfig.width < -1 + this.scrollMargin.right)
           return true;
    };

    this.pixelToScreenCoordinates = function(x, y) {
        var canvasPos = this.scroller.getBoundingClientRect();

        var offset = (x + this.scrollLeft - canvasPos.left - this.$padding) / this.characterWidth;
        var row = Math.floor((y + this.scrollTop - canvasPos.top) / this.lineHeight);
        var col = Math.round(offset);

        return {row: row, column: col, side: offset - col > 0 ? 1 : -1};
    };

    this.screenToTextCoordinates = function(x, y) {
        var canvasPos = this.scroller.getBoundingClientRect();

        var col = Math.round(
            (x + this.scrollLeft - canvasPos.left - this.$padding) / this.characterWidth
        );

        var row = (y + this.scrollTop - canvasPos.top) / this.lineHeight;

        return this.session.screenToDocumentPosition(row, Math.max(col, 0));
    };
    this.textToScreenCoordinates = function(row, column) {
        var canvasPos = this.scroller.getBoundingClientRect();
        var pos = this.session.documentToScreenPosition(row, column);

        var x = this.$padding + Math.round(pos.column * this.characterWidth);
        var y = pos.row * this.lineHeight;

        return {
            pageX: canvasPos.left + x - this.scrollLeft,
            pageY: canvasPos.top + y - this.scrollTop
        };
    };
    this.visualizeFocus = function() {
        dom.addCssClass(this.container, "ace_focus");
    };
    this.visualizeBlur = function() {
        dom.removeCssClass(this.container, "ace_focus");
    };
    this.showComposition = function(position) {
        if (!this.$composition)
            this.$composition = {
                keepTextAreaAtCursor: this.$keepTextAreaAtCursor,
                cssText: this.textarea.style.cssText
            };

        this.$keepTextAreaAtCursor = true;
        dom.addCssClass(this.textarea, "ace_composition");
        this.textarea.style.cssText = "";
        this.$moveTextAreaToCursor();
    };
    this.setCompositionText = function(text) {
        this.$moveTextAreaToCursor();
    };
    this.hideComposition = function() {
        if (!this.$composition)
            return;

        dom.removeCssClass(this.textarea, "ace_composition");
        this.$keepTextAreaAtCursor = this.$composition.keepTextAreaAtCursor;
        this.textarea.style.cssText = this.$composition.cssText;
        this.$composition = null;
    };
    this.setTheme = function(theme, cb) {
        var _self = this;
        this.$themeId = theme;
        _self._dispatchEvent('themeChange',{theme:theme});

        if (!theme || typeof theme == "string") {
            var moduleName = theme || this.$options.theme.initialValue;
            config.loadModule(["theme", moduleName], afterLoad);
        } else {
            afterLoad(theme);
        }

        function afterLoad(module) {
            if (_self.$themeId != theme)
                return cb && cb();
            if (!module.cssClass)
                return;
            dom.importCssString(
                module.cssText,
                module.cssClass,
                _self.container.ownerDocument
            );

            if (_self.theme)
                dom.removeCssClass(_self.container, _self.theme.cssClass);

            var padding = "padding" in module ? module.padding 
                : "padding" in (_self.theme || {}) ? 4 : _self.$padding;
            if (_self.$padding && padding != _self.$padding)
                _self.setPadding(padding);
            _self.$theme = module.cssClass;

            _self.theme = module;
            dom.addCssClass(_self.container, module.cssClass);
            dom.setCssClass(_self.container, "ace_dark", module.isDark);
            if (_self.$size) {
                _self.$size.width = 0;
                _self.$updateSizeAsync();
            }

            _self._dispatchEvent('themeLoaded', {theme:module});
            cb && cb();
        }
    };
    this.getTheme = function() {
        return this.$themeId;
    };
    this.setStyle = function(style, include) {
        dom.setCssClass(this.container, style, include !== false);
    };
    this.unsetStyle = function(style) {
        dom.removeCssClass(this.container, style);
    };
    
    this.setCursorStyle = function(style) {
        if (this.scroller.style.cursor != style)
            this.scroller.style.cursor = style;
    };
    this.setMouseCursor = function(cursorStyle) {
        this.scroller.style.cursor = cursorStyle;
    };
    this.destroy = function() {
        this.$textLayer.destroy();
        this.$cursorLayer.destroy();
    };

}).call(VirtualRenderer.prototype);


config.defineOptions(VirtualRenderer.prototype, "renderer", {
    animatedScroll: {initialValue: false},
    showInvisibles: {
        set: function(value) {
            if (this.$textLayer.setShowInvisibles(value))
                this.$loop.schedule(this.CHANGE_TEXT);
        },
        initialValue: false
    },
    showPrintMargin: {
        set: function() { this.$updatePrintMargin(); },
        initialValue: true
    },
    printMarginColumn: {
        set: function() { this.$updatePrintMargin(); },
        initialValue: 80
    },
    printMargin: {
        set: function(val) {
            if (typeof val == "number")
                this.$printMarginColumn = val;
            this.$showPrintMargin = !!val;
            this.$updatePrintMargin();
        },
        get: function() {
            return this.$showPrintMargin && this.$printMarginColumn; 
        }
    },
    showGutter: {
        set: function(show){
            this.$gutter.style.display = show ? "block" : "none";
            this.$loop.schedule(this.CHANGE_FULL);
            this.onGutterResize();
        },
        initialValue: true
    },
    fadeFoldWidgets: {
        set: function(show) {
            dom.setCssClass(this.$gutter, "ace_fade-fold-widgets", show);
        },
        initialValue: false
    },
    showFoldWidgets: {
        set: function(show) {this.$gutterLayer.setShowFoldWidgets(show)},
        initialValue: true
    },
    showLineNumbers: {
        set: function(show) {
            this.$gutterLayer.setShowLineNumbers(show);
            this.$loop.schedule(this.CHANGE_GUTTER);
        },
        initialValue: true
    },
    displayIndentGuides: {
        set: function(show) {
            if (this.$textLayer.setDisplayIndentGuides(show))
                this.$loop.schedule(this.CHANGE_TEXT);
        },
        initialValue: true
    },
    highlightGutterLine: {
        set: function(shouldHighlight) {
            if (!this.$gutterLineHighlight) {
                this.$gutterLineHighlight = dom.createElement("div");
                this.$gutterLineHighlight.className = "ace_gutter-active-line";
                this.$gutter.appendChild(this.$gutterLineHighlight);
                return;
            }

            this.$gutterLineHighlight.style.display = shouldHighlight ? "" : "none";
            if (this.$cursorLayer.$pixelPos)
                this.$updateGutterLineHighlight();
        },
        initialValue: false,
        value: true
    },
    hScrollBarAlwaysVisible: {
        set: function(val) {
            if (!this.$hScrollBarAlwaysVisible || !this.$horizScroll)
                this.$loop.schedule(this.CHANGE_SCROLL);
        },
        initialValue: false
    },
    vScrollBarAlwaysVisible: {
        set: function(val) {
            if (!this.$vScrollBarAlwaysVisible || !this.$vScroll)
                this.$loop.schedule(this.CHANGE_SCROLL);
        },
        initialValue: false
    },
    fontSize:  {
        set: function(size) {
            if (typeof size == "number")
                size = size + "px";
            this.container.style.fontSize = size;
            this.updateFontSize();
        },
        initialValue: 12
    },
    fontFamily: {
        set: function(name) {
            this.container.style.fontFamily = name;
            this.updateFontSize();
        }
    },
    maxLines: {
        set: function(val) {
            this.updateFull();
        }
    },
    minLines: {
        set: function(val) {
            this.updateFull();
        }
    },
    scrollPastEnd: {
        set: function(val) {
            val = +val || 0;
            if (this.$scrollPastEnd == val)
                return;
            this.$scrollPastEnd = val;
            this.$loop.schedule(this.CHANGE_SCROLL);
        },
        initialValue: 0,
        handlesSet: true
    },
    fixedWidthGutter: {
        set: function(val) {
            this.$gutterLayer.$fixedWidth = !!val;
            this.$loop.schedule(this.CHANGE_GUTTER);
        }
    },
    theme: {
        set: function(val) { this.setTheme(val) },
        get: function() { return this.$themeId || this.theme; },
        initialValue: "./theme/textmate",
        handlesSet: true
    }
});

exports.VirtualRenderer = VirtualRenderer;
});

define("ace/worker/worker_client",["require","exports","module","ace/lib/oop","ace/lib/net","ace/lib/event_emitter","ace/config"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var net = require("../lib/net");
var EventEmitter = require("../lib/event_emitter").EventEmitter;
var config = require("../config");

var WorkerClient = function(topLevelNamespaces, mod, classname, workerUrl) {
    this.$sendDeltaQueue = this.$sendDeltaQueue.bind(this);
    this.changeListener = this.changeListener.bind(this);
    this.onMessage = this.onMessage.bind(this);
    if (require.nameToUrl && !require.toUrl)
        require.toUrl = require.nameToUrl;
    
    if (config.get("packaged") || !require.toUrl) {
        workerUrl = workerUrl || config.moduleUrl(mod, "worker");
    } else {
        var normalizePath = this.$normalizePath;
        workerUrl = workerUrl || normalizePath(require.toUrl("ace/worker/worker.js", null, "_"));

        var tlns = {};
        topLevelNamespaces.forEach(function(ns) {
            tlns[ns] = normalizePath(require.toUrl(ns, null, "_").replace(/(\.js)?(\?.*)?$/, ""));
        });
    }

    try {
        this.$worker = new Worker(workerUrl);
    } catch(e) {
        if (e instanceof window.DOMException) {
            var blob = this.$workerBlob(workerUrl);
            var URL = window.URL || window.webkitURL;
            var blobURL = URL.createObjectURL(blob);

            this.$worker = new Worker(blobURL);
            URL.revokeObjectURL(blobURL);
        } else {
            throw e;
        }
    }
    this.$worker.postMessage({
        init : true,
        tlns : tlns,
        module : mod,
        classname : classname
    });

    this.callbackId = 1;
    this.callbacks = {};

    this.$worker.onmessage = this.onMessage;
};

(function(){

    oop.implement(this, EventEmitter);

    this.onMessage = function(e) {
        var msg = e.data;
        switch(msg.type) {
            case "event":
                this._signal(msg.name, {data: msg.data});
                break;
            case "call":
                var callback = this.callbacks[msg.id];
                if (callback) {
                    callback(msg.data);
                    delete this.callbacks[msg.id];
                }
                break;
            case "error":
                this.reportError(msg.data);
                break;
            case "log":
                window.console && console.log && console.log.apply(console, msg.data);
                break;
        }
    };
    
    this.reportError = function(err) {
        window.console && console.error && console.error(err);
    };

    this.$normalizePath = function(path) {
        return net.qualifyURL(path);
    };

    this.terminate = function() {
        this._signal("terminate", {});
        this.deltaQueue = null;
        this.$worker.terminate();
        this.$worker = null;
        if (this.$doc)
            this.$doc.off("change", this.changeListener);
        this.$doc = null;
    };

    this.send = function(cmd, args) {
        this.$worker.postMessage({command: cmd, args: args});
    };

    this.call = function(cmd, args, callback) {
        if (callback) {
            var id = this.callbackId++;
            this.callbacks[id] = callback;
            args.push(id);
        }
        this.send(cmd, args);
    };

    this.emit = function(event, data) {
        try {
            this.$worker.postMessage({event: event, data: {data: data.data}});
        }
        catch(ex) {
            console.error(ex.stack);
        }
    };

    this.attachToDocument = function(doc) {
        if(this.$doc)
            this.terminate();

        this.$doc = doc;
        this.call("setValue", [doc.getValue()]);
        doc.on("change", this.changeListener);
    };

    this.changeListener = function(e) {
        if (!this.deltaQueue) {
            this.deltaQueue = [e.data];
            setTimeout(this.$sendDeltaQueue, 0);
        } else
            this.deltaQueue.push(e.data);
    };

    this.$sendDeltaQueue = function() {
        var q = this.deltaQueue;
        if (!q) return;
        this.deltaQueue = null;
        if (q.length > 20 && q.length > this.$doc.getLength() >> 1) {
            this.call("setValue", [this.$doc.getValue()]);
        } else
            this.emit("change", {data: q});
    };

    this.$workerBlob = function(workerUrl) {
        var script = "importScripts('" + net.qualifyURL(workerUrl) + "');";
        try {
            return new Blob([script], {"type": "application/javascript"});
        } catch (e) { // Backwards-compatibility
            var BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
            var blobBuilder = new BlobBuilder();
            blobBuilder.append(script);
            return blobBuilder.getBlob("application/javascript");
        }
    };

}).call(WorkerClient.prototype);


var UIWorkerClient = function(topLevelNamespaces, mod, classname) {
    this.$sendDeltaQueue = this.$sendDeltaQueue.bind(this);
    this.changeListener = this.changeListener.bind(this);
    this.callbackId = 1;
    this.callbacks = {};
    this.messageBuffer = [];

    var main = null;
    var emitSync = false;
    var sender = Object.create(EventEmitter);
    var _self = this;

    this.$worker = {};
    this.$worker.terminate = function() {};
    this.$worker.postMessage = function(e) {
        _self.messageBuffer.push(e);
        if (main) {
            if (emitSync)
                setTimeout(processNext);
            else
                processNext();
        }
    };
    this.setEmitSync = function(val) { emitSync = val };

    var processNext = function() {
        var msg = _self.messageBuffer.shift();
        if (msg.command)
            main[msg.command].apply(main, msg.args);
        else if (msg.event)
            sender._signal(msg.event, msg.data);
    };

    sender.postMessage = function(msg) {
        _self.onMessage({data: msg});
    };
    sender.callback = function(data, callbackId) {
        this.postMessage({type: "call", id: callbackId, data: data});
    };
    sender.emit = function(name, data) {
        this.postMessage({type: "event", name: name, data: data});
    };

    config.loadModule(["worker", mod], function(Main) {
        main = new Main[classname](sender);
        while (_self.messageBuffer.length)
            processNext();
    });
};

UIWorkerClient.prototype = WorkerClient.prototype;

exports.UIWorkerClient = UIWorkerClient;
exports.WorkerClient = WorkerClient;

});

define("ace/placeholder",["require","exports","module","ace/range","ace/lib/event_emitter","ace/lib/oop"], function(require, exports, module) {
"use strict";

var Range = require("./range").Range;
var EventEmitter = require("./lib/event_emitter").EventEmitter;
var oop = require("./lib/oop");

var PlaceHolder = function(session, length, pos, others, mainClass, othersClass) {
    var _self = this;
    this.length = length;
    this.session = session;
    this.doc = session.getDocument();
    this.mainClass = mainClass;
    this.othersClass = othersClass;
    this.$onUpdate = this.onUpdate.bind(this);
    this.doc.on("change", this.$onUpdate);
    this.$others = others;
    
    this.$onCursorChange = function() {
        setTimeout(function() {
            _self.onCursorChange();
        });
    };
    
    this.$pos = pos;
    var undoStack = session.getUndoManager().$undoStack || session.getUndoManager().$undostack || {length: -1};
    this.$undoStackDepth =  undoStack.length;
    this.setup();

    session.selection.on("changeCursor", this.$onCursorChange);
};

(function() {

    oop.implement(this, EventEmitter);
    this.setup = function() {
        var _self = this;
        var doc = this.doc;
        var session = this.session;
        var pos = this.$pos;
        
        this.selectionBefore = session.selection.toJSON();
        if (session.selection.inMultiSelectMode)
            session.selection.toSingleRange();

        this.pos = doc.createAnchor(pos.row, pos.column);
        this.markerId = session.addMarker(new Range(pos.row, pos.column, pos.row, pos.column + this.length), this.mainClass, null, false);
        this.pos.on("change", function(event) {
            session.removeMarker(_self.markerId);
            _self.markerId = session.addMarker(new Range(event.value.row, event.value.column, event.value.row, event.value.column+_self.length), _self.mainClass, null, false);
        });
        this.others = [];
        this.$others.forEach(function(other) {
            var anchor = doc.createAnchor(other.row, other.column);
            _self.others.push(anchor);
        });
        session.setUndoSelect(false);
    };
    this.showOtherMarkers = function() {
        if(this.othersActive) return;
        var session = this.session;
        var _self = this;
        this.othersActive = true;
        this.others.forEach(function(anchor) {
            anchor.markerId = session.addMarker(new Range(anchor.row, anchor.column, anchor.row, anchor.column+_self.length), _self.othersClass, null, false);
            anchor.on("change", function(event) {
                session.removeMarker(anchor.markerId);
                anchor.markerId = session.addMarker(new Range(event.value.row, event.value.column, event.value.row, event.value.column+_self.length), _self.othersClass, null, false);
            });
        });
    };
    this.hideOtherMarkers = function() {
        if(!this.othersActive) return;
        this.othersActive = false;
        for (var i = 0; i < this.others.length; i++) {
            this.session.removeMarker(this.others[i].markerId);
        }
    };
    this.onUpdate = function(event) {
        var delta = event.data;
        var range = delta.range;
        if(range.start.row !== range.end.row) return;
        if(range.start.row !== this.pos.row) return;
        if (this.$updating) return;
        this.$updating = true;
        var lengthDiff = delta.action === "insertText" ? range.end.column - range.start.column : range.start.column - range.end.column;
        
        if(range.start.column >= this.pos.column && range.start.column <= this.pos.column + this.length + 1) {
            var distanceFromStart = range.start.column - this.pos.column;
            this.length += lengthDiff;
            if(!this.session.$fromUndo) {
                if(delta.action === "insertText") {
                    for (var i = this.others.length - 1; i >= 0; i--) {
                        var otherPos = this.others[i];
                        var newPos = {row: otherPos.row, column: otherPos.column + distanceFromStart};
                        if(otherPos.row === range.start.row && range.start.column < otherPos.column)
                            newPos.column += lengthDiff;
                        this.doc.insert(newPos, delta.text);
                    }
                } else if(delta.action === "removeText") {
                    for (var i = this.others.length - 1; i >= 0; i--) {
                        var otherPos = this.others[i];
                        var newPos = {row: otherPos.row, column: otherPos.column + distanceFromStart};
                        if(otherPos.row === range.start.row && range.start.column < otherPos.column)
                            newPos.column += lengthDiff;
                        this.doc.remove(new Range(newPos.row, newPos.column, newPos.row, newPos.column - lengthDiff));
                    }
                }
                if(range.start.column === this.pos.column && delta.action === "insertText") {
                    setTimeout(function() {
                        this.pos.setPosition(this.pos.row, this.pos.column - lengthDiff);
                        for (var i = 0; i < this.others.length; i++) {
                            var other = this.others[i];
                            var newPos = {row: other.row, column: other.column - lengthDiff};
                            if(other.row === range.start.row && range.start.column < other.column)
                                newPos.column += lengthDiff;
                            other.setPosition(newPos.row, newPos.column);
                        }
                    }.bind(this), 0);
                }
                else if(range.start.column === this.pos.column && delta.action === "removeText") {
                    setTimeout(function() {
                        for (var i = 0; i < this.others.length; i++) {
                            var other = this.others[i];
                            if(other.row === range.start.row && range.start.column < other.column) {
                                other.setPosition(other.row, other.column - lengthDiff);
                            }
                        }
                    }.bind(this), 0);
                }
            }
            this.pos._emit("change", {value: this.pos});
            for (var i = 0; i < this.others.length; i++) {
                this.others[i]._emit("change", {value: this.others[i]});
            }
        }
        this.$updating = false;
    };

    this.onCursorChange = function(event) {
        if (this.$updating || !this.session) return;
        var pos = this.session.selection.getCursor();
        if (pos.row === this.pos.row && pos.column >= this.pos.column && pos.column <= this.pos.column + this.length) {
            this.showOtherMarkers();
            this._emit("cursorEnter", event);
        } else {
            this.hideOtherMarkers();
            this._emit("cursorLeave", event);
        }
    };    
    this.detach = function() {
        this.session.removeMarker(this.markerId);
        this.hideOtherMarkers();
        this.doc.removeEventListener("change", this.$onUpdate);
        this.session.selection.removeEventListener("changeCursor", this.$onCursorChange);
        this.pos.detach();
        for (var i = 0; i < this.others.length; i++) {
            this.others[i].detach();
        }
        this.session.setUndoSelect(true);
        this.session = null;
    };
    this.cancel = function() {
        if(this.$undoStackDepth === -1)
            throw Error("Canceling placeholders only supported with undo manager attached to session.");
        var undoManager = this.session.getUndoManager();
        var undosRequired = (undoManager.$undoStack || undoManager.$undostack).length - this.$undoStackDepth;
        for (var i = 0; i < undosRequired; i++) {
            undoManager.undo(true);
        }
        if (this.selectionBefore)
            this.session.selection.fromJSON(this.selectionBefore);
    };
}).call(PlaceHolder.prototype);


exports.PlaceHolder = PlaceHolder;
});

define("ace/mouse/multi_select_handler",["require","exports","module","ace/lib/event","ace/lib/useragent"], function(require, exports, module) {

var event = require("../lib/event");
var useragent = require("../lib/useragent");
function isSamePoint(p1, p2) {
    return p1.row == p2.row && p1.column == p2.column;
}

function onMouseDown(e) {
    var ev = e.domEvent;
    var alt = ev.altKey;
    var shift = ev.shiftKey;
    var ctrl = ev.ctrlKey;
    var accel = e.getAccelKey();
    var button = e.getButton();
    
    if (ctrl && useragent.isMac)
        button = ev.button;

    if (e.editor.inMultiSelectMode && button == 2) {
        e.editor.textInput.onContextMenu(e.domEvent);
        return;
    }
    
    if (!ctrl && !alt && !accel) {
        if (button === 0 && e.editor.inMultiSelectMode)
            e.editor.exitMultiSelectMode();
        return;
    }
    
    if (button !== 0)
        return;

    var editor = e.editor;
    var selection = editor.selection;
    var isMultiSelect = editor.inMultiSelectMode;
    var pos = e.getDocumentPosition();
    var cursor = selection.getCursor();
    var inSelection = e.inSelection() || (selection.isEmpty() && isSamePoint(pos, cursor));

    var mouseX = e.x, mouseY = e.y;
    var onMouseSelection = function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    };
    
    var session = editor.session;
    var screenAnchor = editor.renderer.pixelToScreenCoordinates(mouseX, mouseY);
    var screenCursor = screenAnchor;
    
    var selectionMode;
    if (editor.$mouseHandler.$enableJumpToDef) {
        if (ctrl && alt || accel && alt)
            selectionMode = "add";
        else if (alt)
            selectionMode = "block";
    } else {
        if (accel && !alt) {
            selectionMode = "add";
            if (!isMultiSelect && shift)
                return;
        } else if (alt) {
            selectionMode = "block";
        }
    }
    
    if (selectionMode && useragent.isMac && ev.ctrlKey) {
        editor.$mouseHandler.cancelContextMenu();
    }

    if (selectionMode == "add") {
        if (!isMultiSelect && inSelection)
            return; // dragging

        if (!isMultiSelect) {
            var range = selection.toOrientedRange();
            editor.addSelectionMarker(range);
        }

        var oldRange = selection.rangeList.rangeAtPoint(pos);
        
        
        editor.$blockScrolling++;
        editor.inVirtualSelectionMode = true;
        
        if (shift) {
            oldRange = null;
            range = selection.ranges[0];
            editor.removeSelectionMarker(range);
        }
        editor.once("mouseup", function() {
            var tmpSel = selection.toOrientedRange();

            if (oldRange && tmpSel.isEmpty() && isSamePoint(oldRange.cursor, tmpSel.cursor))
                selection.substractPoint(tmpSel.cursor);
            else {
                if (shift) {
                    selection.substractPoint(range.cursor);
                } else if (range) {
                    editor.removeSelectionMarker(range);
                    selection.addRange(range);
                }
                selection.addRange(tmpSel);
            }
            editor.$blockScrolling--;
            editor.inVirtualSelectionMode = false;
        });

    } else if (selectionMode == "block") {
        e.stop();
        editor.inVirtualSelectionMode = true;        
        var initialRange;
        var rectSel = [];
        var blockSelect = function() {
            var newCursor = editor.renderer.pixelToScreenCoordinates(mouseX, mouseY);
            var cursor = session.screenToDocumentPosition(newCursor.row, newCursor.column);

            if (isSamePoint(screenCursor, newCursor) && isSamePoint(cursor, selection.lead))
                return;
            screenCursor = newCursor;
            
            editor.$blockScrolling++;
            editor.selection.moveToPosition(cursor);
            editor.renderer.scrollCursorIntoView();

            editor.removeSelectionMarkers(rectSel);
            rectSel = selection.rectangularRangeBlock(screenCursor, screenAnchor);
            if (editor.$mouseHandler.$clickSelection && rectSel.length == 1 && rectSel[0].isEmpty())
                rectSel[0] = editor.$mouseHandler.$clickSelection.clone();
            rectSel.forEach(editor.addSelectionMarker, editor);
            editor.updateSelectionMarkers();
            editor.$blockScrolling--;
        };
        editor.$blockScrolling++;
        if (isMultiSelect && !accel) {
            selection.toSingleRange();
        } else if (!isMultiSelect && accel) {
            initialRange = selection.toOrientedRange();
            editor.addSelectionMarker(initialRange);
        }
        
        if (shift)
            screenAnchor = session.documentToScreenPosition(selection.lead);            
        else
            selection.moveToPosition(pos);
        editor.$blockScrolling--;
        
        screenCursor = {row: -1, column: -1};

        var onMouseSelectionEnd = function(e) {
            clearInterval(timerId);
            editor.removeSelectionMarkers(rectSel);
            if (!rectSel.length)
                rectSel = [selection.toOrientedRange()];
            editor.$blockScrolling++;
            if (initialRange) {
                editor.removeSelectionMarker(initialRange);
                selection.toSingleRange(initialRange);
            }
            for (var i = 0; i < rectSel.length; i++)
                selection.addRange(rectSel[i]);
            editor.inVirtualSelectionMode = false;
            editor.$mouseHandler.$clickSelection = null;
            editor.$blockScrolling--;
        };

        var onSelectionInterval = blockSelect;

        event.capture(editor.container, onMouseSelection, onMouseSelectionEnd);
        var timerId = setInterval(function() {onSelectionInterval();}, 20);

        return e.preventDefault();
    }
}


exports.onMouseDown = onMouseDown;

});

define("ace/commands/multi_select_commands",["require","exports","module","ace/keyboard/hash_handler"], function(require, exports, module) {
exports.defaultCommands = [{
    name: "addCursorAbove",
    exec: function(editor) { editor.selectMoreLines(-1); },
    bindKey: {win: "Ctrl-Alt-Up", mac: "Ctrl-Alt-Up"},
    scrollIntoView: "cursor",
    readonly: true
}, {
    name: "addCursorBelow",
    exec: function(editor) { editor.selectMoreLines(1); },
    bindKey: {win: "Ctrl-Alt-Down", mac: "Ctrl-Alt-Down"},
    scrollIntoView: "cursor",
    readonly: true
}, {
    name: "addCursorAboveSkipCurrent",
    exec: function(editor) { editor.selectMoreLines(-1, true); },
    bindKey: {win: "Ctrl-Alt-Shift-Up", mac: "Ctrl-Alt-Shift-Up"},
    scrollIntoView: "cursor",
    readonly: true
}, {
    name: "addCursorBelowSkipCurrent",
    exec: function(editor) { editor.selectMoreLines(1, true); },
    bindKey: {win: "Ctrl-Alt-Shift-Down", mac: "Ctrl-Alt-Shift-Down"},
    scrollIntoView: "cursor",
    readonly: true
}, {
    name: "selectMoreBefore",
    exec: function(editor) { editor.selectMore(-1); },
    bindKey: {win: "Ctrl-Alt-Left", mac: "Ctrl-Alt-Left"},
    scrollIntoView: "cursor",
    readonly: true
}, {
    name: "selectMoreAfter",
    exec: function(editor) { editor.selectMore(1); },
    bindKey: {win: "Ctrl-Alt-Right", mac: "Ctrl-Alt-Right"},
    scrollIntoView: "cursor",
    readonly: true
}, {
    name: "selectNextBefore",
    exec: function(editor) { editor.selectMore(-1, true); },
    bindKey: {win: "Ctrl-Alt-Shift-Left", mac: "Ctrl-Alt-Shift-Left"},
    scrollIntoView: "cursor",
    readonly: true
}, {
    name: "selectNextAfter",
    exec: function(editor) { editor.selectMore(1, true); },
    bindKey: {win: "Ctrl-Alt-Shift-Right", mac: "Ctrl-Alt-Shift-Right"},
    scrollIntoView: "cursor",
    readonly: true
}, {
    name: "splitIntoLines",
    exec: function(editor) { editor.multiSelect.splitIntoLines(); },
    bindKey: {win: "Ctrl-Alt-L", mac: "Ctrl-Alt-L"},
    readonly: true
}, {
    name: "alignCursors",
    exec: function(editor) { editor.alignCursors(); },
    bindKey: {win: "Ctrl-Alt-A", mac: "Ctrl-Alt-A"},
    scrollIntoView: "cursor"
}, {
    name: "findAll",
    exec: function(editor) { editor.findAll(); },
    bindKey: {win: "Ctrl-Alt-K", mac: "Ctrl-Alt-G"},
    scrollIntoView: "cursor",
    readonly: true
}];
exports.multiSelectCommands = [{
    name: "singleSelection",
    bindKey: "esc",
    exec: function(editor) { editor.exitMultiSelectMode(); },
    scrollIntoView: "cursor",
    readonly: true,
    isAvailable: function(editor) {return editor && editor.inMultiSelectMode}
}];

var HashHandler = require("../keyboard/hash_handler").HashHandler;
exports.keyboardHandler = new HashHandler(exports.multiSelectCommands);

});

define("ace/multi_select",["require","exports","module","ace/range_list","ace/range","ace/selection","ace/mouse/multi_select_handler","ace/lib/event","ace/lib/lang","ace/commands/multi_select_commands","ace/search","ace/edit_session","ace/editor","ace/config"], function(require, exports, module) {

var RangeList = require("./range_list").RangeList;
var Range = require("./range").Range;
var Selection = require("./selection").Selection;
var onMouseDown = require("./mouse/multi_select_handler").onMouseDown;
var event = require("./lib/event");
var lang = require("./lib/lang");
var commands = require("./commands/multi_select_commands");
exports.commands = commands.defaultCommands.concat(commands.multiSelectCommands);
var Search = require("./search").Search;
var search = new Search();

function find(session, needle, dir) {
    search.$options.wrap = true;
    search.$options.needle = needle;
    search.$options.backwards = dir == -1;
    return search.find(session);
}
var EditSession = require("./edit_session").EditSession;
(function() {
    this.getSelectionMarkers = function() {
        return this.$selectionMarkers;
    };
}).call(EditSession.prototype);
(function() {
    this.ranges = null;
    this.rangeList = null;
    this.addRange = function(range, $blockChangeEvents) {
        if (!range)
            return;

        if (!this.inMultiSelectMode && this.rangeCount === 0) {
            var oldRange = this.toOrientedRange();
            this.rangeList.add(oldRange);
            this.rangeList.add(range);
            if (this.rangeList.ranges.length != 2) {
                this.rangeList.removeAll();
                return $blockChangeEvents || this.fromOrientedRange(range);
            }
            this.rangeList.removeAll();
            this.rangeList.add(oldRange);
            this.$onAddRange(oldRange);
        }

        if (!range.cursor)
            range.cursor = range.end;

        var removed = this.rangeList.add(range);

        this.$onAddRange(range);

        if (removed.length)
            this.$onRemoveRange(removed);

        if (this.rangeCount > 1 && !this.inMultiSelectMode) {
            this._signal("multiSelect");
            this.inMultiSelectMode = true;
            this.session.$undoSelect = false;
            this.rangeList.attach(this.session);
        }

        return $blockChangeEvents || this.fromOrientedRange(range);
    };

    this.toSingleRange = function(range) {
        range = range || this.ranges[0];
        var removed = this.rangeList.removeAll();
        if (removed.length)
            this.$onRemoveRange(removed);

        range && this.fromOrientedRange(range);
    };
    this.substractPoint = function(pos) {
        var removed = this.rangeList.substractPoint(pos);
        if (removed) {
            this.$onRemoveRange(removed);
            return removed[0];
        }
    };
    this.mergeOverlappingRanges = function() {
        var removed = this.rangeList.merge();
        if (removed.length)
            this.$onRemoveRange(removed);
        else if(this.ranges[0])
            this.fromOrientedRange(this.ranges[0]);
    };

    this.$onAddRange = function(range) {
        this.rangeCount = this.rangeList.ranges.length;
        this.ranges.unshift(range);
        this._signal("addRange", {range: range});
    };

    this.$onRemoveRange = function(removed) {
        this.rangeCount = this.rangeList.ranges.length;
        if (this.rangeCount == 1 && this.inMultiSelectMode) {
            var lastRange = this.rangeList.ranges.pop();
            removed.push(lastRange);
            this.rangeCount = 0;
        }

        for (var i = removed.length; i--; ) {
            var index = this.ranges.indexOf(removed[i]);
            this.ranges.splice(index, 1);
        }

        this._signal("removeRange", {ranges: removed});

        if (this.rangeCount === 0 && this.inMultiSelectMode) {
            this.inMultiSelectMode = false;
            this._signal("singleSelect");
            this.session.$undoSelect = true;
            this.rangeList.detach(this.session);
        }

        lastRange = lastRange || this.ranges[0];
        if (lastRange && !lastRange.isEqual(this.getRange()))
            this.fromOrientedRange(lastRange);
    };
    this.$initRangeList = function() {
        if (this.rangeList)
            return;

        this.rangeList = new RangeList();
        this.ranges = [];
        this.rangeCount = 0;
    };
    this.getAllRanges = function() {
        return this.rangeCount ? this.rangeList.ranges.concat() : [this.getRange()];
    };

    this.splitIntoLines = function () {
        if (this.rangeCount > 1) {
            var ranges = this.rangeList.ranges;
            var lastRange = ranges[ranges.length - 1];
            var range = Range.fromPoints(ranges[0].start, lastRange.end);

            this.toSingleRange();
            this.setSelectionRange(range, lastRange.cursor == lastRange.start);
        } else {
            var range = this.getRange();
            var isBackwards = this.isBackwards();
            var startRow = range.start.row;
            var endRow = range.end.row;
            if (startRow == endRow) {
                if (isBackwards)
                    var start = range.end, end = range.start;
                else
                    var start = range.start, end = range.end;
                
                this.addRange(Range.fromPoints(end, end));
                this.addRange(Range.fromPoints(start, start));
                return;
            }

            var rectSel = [];
            var r = this.getLineRange(startRow, true);
            r.start.column = range.start.column;
            rectSel.push(r);

            for (var i = startRow + 1; i < endRow; i++)
                rectSel.push(this.getLineRange(i, true));

            r = this.getLineRange(endRow, true);
            r.end.column = range.end.column;
            rectSel.push(r);

            rectSel.forEach(this.addRange, this);
        }
    };
    this.toggleBlockSelection = function () {
        if (this.rangeCount > 1) {
            var ranges = this.rangeList.ranges;
            var lastRange = ranges[ranges.length - 1];
            var range = Range.fromPoints(ranges[0].start, lastRange.end);

            this.toSingleRange();
            this.setSelectionRange(range, lastRange.cursor == lastRange.start);
        } else {
            var cursor = this.session.documentToScreenPosition(this.selectionLead);
            var anchor = this.session.documentToScreenPosition(this.selectionAnchor);

            var rectSel = this.rectangularRangeBlock(cursor, anchor);
            rectSel.forEach(this.addRange, this);
        }
    };
    this.rectangularRangeBlock = function(screenCursor, screenAnchor, includeEmptyLines) {
        var rectSel = [];

        var xBackwards = screenCursor.column < screenAnchor.column;
        if (xBackwards) {
            var startColumn = screenCursor.column;
            var endColumn = screenAnchor.column;
        } else {
            var startColumn = screenAnchor.column;
            var endColumn = screenCursor.column;
        }

        var yBackwards = screenCursor.row < screenAnchor.row;
        if (yBackwards) {
            var startRow = screenCursor.row;
            var endRow = screenAnchor.row;
        } else {
            var startRow = screenAnchor.row;
            var endRow = screenCursor.row;
        }

        if (startColumn < 0)
            startColumn = 0;
        if (startRow < 0)
            startRow = 0;

        if (startRow == endRow)
            includeEmptyLines = true;

        for (var row = startRow; row <= endRow; row++) {
            var range = Range.fromPoints(
                this.session.screenToDocumentPosition(row, startColumn),
                this.session.screenToDocumentPosition(row, endColumn)
            );
            if (range.isEmpty()) {
                if (docEnd && isSamePoint(range.end, docEnd))
                    break;
                var docEnd = range.end;
            }
            range.cursor = xBackwards ? range.start : range.end;
            rectSel.push(range);
        }

        if (yBackwards)
            rectSel.reverse();

        if (!includeEmptyLines) {
            var end = rectSel.length - 1;
            while (rectSel[end].isEmpty() && end > 0)
                end--;
            if (end > 0) {
                var start = 0;
                while (rectSel[start].isEmpty())
                    start++;
            }
            for (var i = end; i >= start; i--) {
                if (rectSel[i].isEmpty())
                    rectSel.splice(i, 1);
            }
        }

        return rectSel;
    };
}).call(Selection.prototype);
var Editor = require("./editor").Editor;
(function() {
    this.updateSelectionMarkers = function() {
        this.renderer.updateCursor();
        this.renderer.updateBackMarkers();
    };
    this.addSelectionMarker = function(orientedRange) {
        if (!orientedRange.cursor)
            orientedRange.cursor = orientedRange.end;

        var style = this.getSelectionStyle();
        orientedRange.marker = this.session.addMarker(orientedRange, "ace_selection", style);

        this.session.$selectionMarkers.push(orientedRange);
        this.session.selectionMarkerCount = this.session.$selectionMarkers.length;
        return orientedRange;
    };
    this.removeSelectionMarker = function(range) {
        if (!range.marker)
            return;
        this.session.removeMarker(range.marker);
        var index = this.session.$selectionMarkers.indexOf(range);
        if (index != -1)
            this.session.$selectionMarkers.splice(index, 1);
        this.session.selectionMarkerCount = this.session.$selectionMarkers.length;
    };

    this.removeSelectionMarkers = function(ranges) {
        var markerList = this.session.$selectionMarkers;
        for (var i = ranges.length; i--; ) {
            var range = ranges[i];
            if (!range.marker)
                continue;
            this.session.removeMarker(range.marker);
            var index = markerList.indexOf(range);
            if (index != -1)
                markerList.splice(index, 1);
        }
        this.session.selectionMarkerCount = markerList.length;
    };

    this.$onAddRange = function(e) {
        this.addSelectionMarker(e.range);
        this.renderer.updateCursor();
        this.renderer.updateBackMarkers();
    };

    this.$onRemoveRange = function(e) {
        this.removeSelectionMarkers(e.ranges);
        this.renderer.updateCursor();
        this.renderer.updateBackMarkers();
    };

    this.$onMultiSelect = function(e) {
        if (this.inMultiSelectMode)
            return;
        this.inMultiSelectMode = true;

        this.setStyle("ace_multiselect");
        this.keyBinding.addKeyboardHandler(commands.keyboardHandler);
        this.commands.setDefaultHandler("exec", this.$onMultiSelectExec);

        this.renderer.updateCursor();
        this.renderer.updateBackMarkers();
    };

    this.$onSingleSelect = function(e) {
        if (this.session.multiSelect.inVirtualMode)
            return;
        this.inMultiSelectMode = false;

        this.unsetStyle("ace_multiselect");
        this.keyBinding.removeKeyboardHandler(commands.keyboardHandler);

        this.commands.removeDefaultHandler("exec", this.$onMultiSelectExec);
        this.renderer.updateCursor();
        this.renderer.updateBackMarkers();
        this._emit("changeSelection");
    };

    this.$onMultiSelectExec = function(e) {
        var command = e.command;
        var editor = e.editor;
        if (!editor.multiSelect)
            return;
        if (!command.multiSelectAction) {
            var result = command.exec(editor, e.args || {});
            editor.multiSelect.addRange(editor.multiSelect.toOrientedRange());
            editor.multiSelect.mergeOverlappingRanges();
        } else if (command.multiSelectAction == "forEach") {
            result = editor.forEachSelection(command, e.args);
        } else if (command.multiSelectAction == "forEachLine") {
            result = editor.forEachSelection(command, e.args, true);
        } else if (command.multiSelectAction == "single") {
            editor.exitMultiSelectMode();
            result = command.exec(editor, e.args || {});
        } else {
            result = command.multiSelectAction(editor, e.args || {});
        }
        return result;
    }; 
    this.forEachSelection = function(cmd, args, options) {
        if (this.inVirtualSelectionMode)
            return;
        var keepOrder = options && options.keepOrder;
        var $byLines = options == true || options && options.$byLines
        var session = this.session;
        var selection = this.selection;
        var rangeList = selection.rangeList;
        var ranges = (keepOrder ? selection : rangeList).ranges;
        var result;
        
        if (!ranges.length)
            return cmd.exec ? cmd.exec(this, args || {}) : cmd(this, args || {});
        
        var reg = selection._eventRegistry;
        selection._eventRegistry = {};

        var tmpSel = new Selection(session);
        this.inVirtualSelectionMode = true;
        for (var i = ranges.length; i--;) {
            if ($byLines) {
                while (i > 0 && ranges[i].start.row == ranges[i - 1].end.row)
                    i--;
            }
            tmpSel.fromOrientedRange(ranges[i]);
            tmpSel.index = i;
            this.selection = session.selection = tmpSel;
            var cmdResult = cmd.exec ? cmd.exec(this, args || {}) : cmd(this, args || {});
            if (!result && cmdResult !== undefined)
                result = cmdResult;
            tmpSel.toOrientedRange(ranges[i]);
        }
        tmpSel.detach();

        this.selection = session.selection = selection;
        this.inVirtualSelectionMode = false;
        selection._eventRegistry = reg;
        selection.mergeOverlappingRanges();
        
        var anim = this.renderer.$scrollAnimation;
        this.onCursorChange();
        this.onSelectionChange();
        if (anim && anim.from == anim.to)
            this.renderer.animateScrolling(anim.from);
        
        return result;
    };
    this.exitMultiSelectMode = function() {
        if (!this.inMultiSelectMode || this.inVirtualSelectionMode)
            return;
        this.multiSelect.toSingleRange();
    };

    this.getSelectedText = function() {
        var text = "";
        if (this.inMultiSelectMode && !this.inVirtualSelectionMode) {
            var ranges = this.multiSelect.rangeList.ranges;
            var buf = [];
            for (var i = 0; i < ranges.length; i++) {
                buf.push(this.session.getTextRange(ranges[i]));
            }
            var nl = this.session.getDocument().getNewLineCharacter();
            text = buf.join(nl);
            if (text.length == (buf.length - 1) * nl.length)
                text = "";
        } else if (!this.selection.isEmpty()) {
            text = this.session.getTextRange(this.getSelectionRange());
        }
        return text;
    };
    
    this.$checkMultiselectChange = function(e, anchor) {
        if (this.inMultiSelectMode && !this.inVirtualSelectionMode) {
            var range = this.multiSelect.ranges[0];
            if (this.multiSelect.isEmpty() && anchor == this.multiSelect.anchor)
                return;
            var pos = anchor == this.multiSelect.anchor
                ? range.cursor == range.start ? range.end : range.start
                : range.cursor;
            if (pos.row != anchor.row 
                || this.session.$clipPositionToDocument(pos.row, pos.column).column != anchor.column)
                this.multiSelect.toSingleRange(this.multiSelect.toOrientedRange());
        }
    };
    this.findAll = function(needle, options, additive) {
        options = options || {};
        options.needle = needle || options.needle;
        if (options.needle == undefined) {
            var range = this.selection.isEmpty()
                ? this.selection.getWordRange()
                : this.selection.getRange();
            options.needle = this.session.getTextRange(range);
        }    
        this.$search.set(options);
        
        var ranges = this.$search.findAll(this.session);
        if (!ranges.length)
            return 0;

        this.$blockScrolling += 1;
        var selection = this.multiSelect;

        if (!additive)
            selection.toSingleRange(ranges[0]);

        for (var i = ranges.length; i--; )
            selection.addRange(ranges[i], true);
        if (range && selection.rangeList.rangeAtPoint(range.start))
            selection.addRange(range, true);
        
        this.$blockScrolling -= 1;

        return ranges.length;
    };
    this.selectMoreLines = function(dir, skip) {
        var range = this.selection.toOrientedRange();
        var isBackwards = range.cursor == range.end;

        var screenLead = this.session.documentToScreenPosition(range.cursor);
        if (this.selection.$desiredColumn)
            screenLead.column = this.selection.$desiredColumn;

        var lead = this.session.screenToDocumentPosition(screenLead.row + dir, screenLead.column);

        if (!range.isEmpty()) {
            var screenAnchor = this.session.documentToScreenPosition(isBackwards ? range.end : range.start);
            var anchor = this.session.screenToDocumentPosition(screenAnchor.row + dir, screenAnchor.column);
        } else {
            var anchor = lead;
        }

        if (isBackwards) {
            var newRange = Range.fromPoints(lead, anchor);
            newRange.cursor = newRange.start;
        } else {
            var newRange = Range.fromPoints(anchor, lead);
            newRange.cursor = newRange.end;
        }

        newRange.desiredColumn = screenLead.column;
        if (!this.selection.inMultiSelectMode) {
            this.selection.addRange(range);
        } else {
            if (skip)
                var toRemove = range.cursor;
        }

        this.selection.addRange(newRange);
        if (toRemove)
            this.selection.substractPoint(toRemove);
    };
    this.transposeSelections = function(dir) {
        var session = this.session;
        var sel = session.multiSelect;
        var all = sel.ranges;

        for (var i = all.length; i--; ) {
            var range = all[i];
            if (range.isEmpty()) {
                var tmp = session.getWordRange(range.start.row, range.start.column);
                range.start.row = tmp.start.row;
                range.start.column = tmp.start.column;
                range.end.row = tmp.end.row;
                range.end.column = tmp.end.column;
            }
        }
        sel.mergeOverlappingRanges();

        var words = [];
        for (var i = all.length; i--; ) {
            var range = all[i];
            words.unshift(session.getTextRange(range));
        }

        if (dir < 0)
            words.unshift(words.pop());
        else
            words.push(words.shift());

        for (var i = all.length; i--; ) {
            var range = all[i];
            var tmp = range.clone();
            session.replace(range, words[i]);
            range.start.row = tmp.start.row;
            range.start.column = tmp.start.column;
        }
    };
    this.selectMore = function(dir, skip, stopAtFirst) {
        var session = this.session;
        var sel = session.multiSelect;

        var range = sel.toOrientedRange();
        if (range.isEmpty()) {
            range = session.getWordRange(range.start.row, range.start.column);
            range.cursor = dir == -1 ? range.start : range.end;
            this.multiSelect.addRange(range);
            if (stopAtFirst)
                return;
        }
        var needle = session.getTextRange(range);

        var newRange = find(session, needle, dir);
        if (newRange) {
            newRange.cursor = dir == -1 ? newRange.start : newRange.end;
            this.$blockScrolling += 1;
            this.session.unfold(newRange);
            this.multiSelect.addRange(newRange);
            this.$blockScrolling -= 1;
            this.renderer.scrollCursorIntoView(null, 0.5);
        }
        if (skip)
            this.multiSelect.substractPoint(range.cursor);
    };
    this.alignCursors = function() {
        var session = this.session;
        var sel = session.multiSelect;
        var ranges = sel.ranges;
        var row = -1;
        var sameRowRanges = ranges.filter(function(r) {
            if (r.cursor.row == row)
                return true;
            row = r.cursor.row;
        });
        
        if (!ranges.length || sameRowRanges.length == ranges.length - 1) {
            var range = this.selection.getRange();
            var fr = range.start.row, lr = range.end.row;
            var guessRange = fr == lr;
            if (guessRange) {
                var max = this.session.getLength();
                var line;
                do {
                    line = this.session.getLine(lr);
                } while (/[=:]/.test(line) && ++lr < max);
                do {
                    line = this.session.getLine(fr);
                } while (/[=:]/.test(line) && --fr > 0);
                
                if (fr < 0) fr = 0;
                if (lr >= max) lr = max - 1;
            }
            var lines = this.session.doc.removeLines(fr, lr);
            lines = this.$reAlignText(lines, guessRange);
            this.session.doc.insert({row: fr, column: 0}, lines.join("\n") + "\n");
            if (!guessRange) {
                range.start.column = 0;
                range.end.column = lines[lines.length - 1].length;
            }
            this.selection.setRange(range);
        } else {
            sameRowRanges.forEach(function(r) {
                sel.substractPoint(r.cursor);
            });

            var maxCol = 0;
            var minSpace = Infinity;
            var spaceOffsets = ranges.map(function(r) {
                var p = r.cursor;
                var line = session.getLine(p.row);
                var spaceOffset = line.substr(p.column).search(/\S/g);
                if (spaceOffset == -1)
                    spaceOffset = 0;

                if (p.column > maxCol)
                    maxCol = p.column;
                if (spaceOffset < minSpace)
                    minSpace = spaceOffset;
                return spaceOffset;
            });
            ranges.forEach(function(r, i) {
                var p = r.cursor;
                var l = maxCol - p.column;
                var d = spaceOffsets[i] - minSpace;
                if (l > d)
                    session.insert(p, lang.stringRepeat(" ", l - d));
                else
                    session.remove(new Range(p.row, p.column, p.row, p.column - l + d));

                r.start.column = r.end.column = maxCol;
                r.start.row = r.end.row = p.row;
                r.cursor = r.end;
            });
            sel.fromOrientedRange(ranges[0]);
            this.renderer.updateCursor();
            this.renderer.updateBackMarkers();
        }
    };

    this.$reAlignText = function(lines, forceLeft) {
        var isLeftAligned = true, isRightAligned = true;
        var startW, textW, endW;

        return lines.map(function(line) {
            var m = line.match(/(\s*)(.*?)(\s*)([=:].*)/);
            if (!m)
                return [line];

            if (startW == null) {
                startW = m[1].length;
                textW = m[2].length;
                endW = m[3].length;
                return m;
            }

            if (startW + textW + endW != m[1].length + m[2].length + m[3].length)
                isRightAligned = false;
            if (startW != m[1].length)
                isLeftAligned = false;

            if (startW > m[1].length)
                startW = m[1].length;
            if (textW < m[2].length)
                textW = m[2].length;
            if (endW > m[3].length)
                endW = m[3].length;

            return m;
        }).map(forceLeft ? alignLeft :
            isLeftAligned ? isRightAligned ? alignRight : alignLeft : unAlign);

        function spaces(n) {
            return lang.stringRepeat(" ", n);
        }

        function alignLeft(m) {
            return !m[2] ? m[0] : spaces(startW) + m[2]
                + spaces(textW - m[2].length + endW)
                + m[4].replace(/^([=:])\s+/, "$1 ");
        }
        function alignRight(m) {
            return !m[2] ? m[0] : spaces(startW + textW - m[2].length) + m[2]
                + spaces(endW, " ")
                + m[4].replace(/^([=:])\s+/, "$1 ");
        }
        function unAlign(m) {
            return !m[2] ? m[0] : spaces(startW) + m[2]
                + spaces(endW)
                + m[4].replace(/^([=:])\s+/, "$1 ");
        }
    };
}).call(Editor.prototype);


function isSamePoint(p1, p2) {
    return p1.row == p2.row && p1.column == p2.column;
}
exports.onSessionChange = function(e) {
    var session = e.session;
    if (session && !session.multiSelect) {
        session.$selectionMarkers = [];
        session.selection.$initRangeList();
        session.multiSelect = session.selection;
    }
    this.multiSelect = session && session.multiSelect;

    var oldSession = e.oldSession;
    if (oldSession) {
        oldSession.multiSelect.off("addRange", this.$onAddRange);
        oldSession.multiSelect.off("removeRange", this.$onRemoveRange);
        oldSession.multiSelect.off("multiSelect", this.$onMultiSelect);
        oldSession.multiSelect.off("singleSelect", this.$onSingleSelect);
        oldSession.multiSelect.lead.off("change",  this.$checkMultiselectChange);
        oldSession.multiSelect.anchor.off("change",  this.$checkMultiselectChange);
    }

    if (session) {
        session.multiSelect.on("addRange", this.$onAddRange);
        session.multiSelect.on("removeRange", this.$onRemoveRange);
        session.multiSelect.on("multiSelect", this.$onMultiSelect);
        session.multiSelect.on("singleSelect", this.$onSingleSelect);
        session.multiSelect.lead.on("change",  this.$checkMultiselectChange);
        session.multiSelect.anchor.on("change",  this.$checkMultiselectChange);
    }

    if (session && this.inMultiSelectMode != session.selection.inMultiSelectMode) {
        if (session.selection.inMultiSelectMode)
            this.$onMultiSelect();
        else
            this.$onSingleSelect();
    }
};
function MultiSelect(editor) {
    if (editor.$multiselectOnSessionChange)
        return;
    editor.$onAddRange = editor.$onAddRange.bind(editor);
    editor.$onRemoveRange = editor.$onRemoveRange.bind(editor);
    editor.$onMultiSelect = editor.$onMultiSelect.bind(editor);
    editor.$onSingleSelect = editor.$onSingleSelect.bind(editor);
    editor.$multiselectOnSessionChange = exports.onSessionChange.bind(editor);
    editor.$checkMultiselectChange = editor.$checkMultiselectChange.bind(editor);

    editor.$multiselectOnSessionChange(editor);
    editor.on("changeSession", editor.$multiselectOnSessionChange);

    editor.on("mousedown", onMouseDown);
    editor.commands.addCommands(commands.defaultCommands);

    addAltCursorListeners(editor);
}

function addAltCursorListeners(editor){
    var el = editor.textInput.getElement();
    var altCursor = false;
    event.addListener(el, "keydown", function(e) {
        if (e.keyCode == 18 && !(e.ctrlKey || e.shiftKey || e.metaKey)) {
            if (!altCursor) {
                editor.renderer.setMouseCursor("crosshair");
                altCursor = true;
            }
        } else if (altCursor) {
            reset();
        }
    });

    event.addListener(el, "keyup", reset);
    event.addListener(el, "blur", reset);
    function reset(e) {
        if (altCursor) {
            editor.renderer.setMouseCursor("");
            altCursor = false;
        }
    }
}

exports.MultiSelect = MultiSelect;


require("./config").defineOptions(Editor.prototype, "editor", {
    enableMultiselect: {
        set: function(val) {
            MultiSelect(this);
            if (val) {
                this.on("changeSession", this.$multiselectOnSessionChange);
                this.on("mousedown", onMouseDown);
            } else {
                this.off("changeSession", this.$multiselectOnSessionChange);
                this.off("mousedown", onMouseDown);
            }
        },
        value: true
    }
});



});

define("ace/mode/folding/fold_mode",["require","exports","module","ace/range"], function(require, exports, module) {
"use strict";

var Range = require("../../range").Range;

var FoldMode = exports.FoldMode = function() {};

(function() {

    this.foldingStartMarker = null;
    this.foldingStopMarker = null;
    this.getFoldWidget = function(session, foldStyle, row) {
        var line = session.getLine(row);
        if (this.foldingStartMarker.test(line))
            return "start";
        if (foldStyle == "markbeginend"
                && this.foldingStopMarker
                && this.foldingStopMarker.test(line))
            return "end";
        return "";
    };

    this.getFoldWidgetRange = function(session, foldStyle, row) {
        return null;
    };

    this.indentationBlock = function(session, row, column) {
        var re = /\S/;
        var line = session.getLine(row);
        var startLevel = line.search(re);
        if (startLevel == -1)
            return;

        var startColumn = column || line.length;
        var maxRow = session.getLength();
        var startRow = row;
        var endRow = row;

        while (++row < maxRow) {
            var level = session.getLine(row).search(re);

            if (level == -1)
                continue;

            if (level <= startLevel)
                break;

            endRow = row;
        }

        if (endRow > startRow) {
            var endColumn = session.getLine(endRow).length;
            return new Range(startRow, startColumn, endRow, endColumn);
        }
    };

    this.openingBracketBlock = function(session, bracket, row, column, typeRe) {
        var start = {row: row, column: column + 1};
        var end = session.$findClosingBracket(bracket, start, typeRe);
        if (!end)
            return;

        var fw = session.foldWidgets[end.row];
        if (fw == null)
            fw = session.getFoldWidget(end.row);

        if (fw == "start" && end.row > start.row) {
            end.row --;
            end.column = session.getLine(end.row).length;
        }
        return Range.fromPoints(start, end);
    };

    this.closingBracketBlock = function(session, bracket, row, column, typeRe) {
        var end = {row: row, column: column};
        var start = session.$findOpeningBracket(bracket, end);

        if (!start)
            return;

        start.column++;
        end.column--;

        return  Range.fromPoints(start, end);
    };
}).call(FoldMode.prototype);

});

define("ace/theme/textmate",["require","exports","module","ace/lib/dom"], function(require, exports, module) {
"use strict";

exports.isDark = false;
exports.cssClass = "ace-tm";
exports.cssText = ".ace-tm .ace_gutter {\
background: #f0f0f0;\
color: #333;\
}\
.ace-tm .ace_print-margin {\
width: 1px;\
background: #e8e8e8;\
}\
.ace-tm .ace_fold {\
background-color: #6B72E6;\
}\
.ace-tm {\
background-color: #FFFFFF;\
color: black;\
}\
.ace-tm .ace_cursor {\
color: black;\
}\
.ace-tm .ace_invisible {\
color: rgb(191, 191, 191);\
}\
.ace-tm .ace_storage,\
.ace-tm .ace_keyword {\
color: blue;\
}\
.ace-tm .ace_constant {\
color: rgb(197, 6, 11);\
}\
.ace-tm .ace_constant.ace_buildin {\
color: rgb(88, 72, 246);\
}\
.ace-tm .ace_constant.ace_language {\
color: rgb(88, 92, 246);\
}\
.ace-tm .ace_constant.ace_library {\
color: rgb(6, 150, 14);\
}\
.ace-tm .ace_invalid {\
background-color: rgba(255, 0, 0, 0.1);\
color: red;\
}\
.ace-tm .ace_support.ace_function {\
color: rgb(60, 76, 114);\
}\
.ace-tm .ace_support.ace_constant {\
color: rgb(6, 150, 14);\
}\
.ace-tm .ace_support.ace_type,\
.ace-tm .ace_support.ace_class {\
color: rgb(109, 121, 222);\
}\
.ace-tm .ace_keyword.ace_operator {\
color: rgb(104, 118, 135);\
}\
.ace-tm .ace_string {\
color: rgb(3, 106, 7);\
}\
.ace-tm .ace_comment {\
color: rgb(76, 136, 107);\
}\
.ace-tm .ace_comment.ace_doc {\
color: rgb(0, 102, 255);\
}\
.ace-tm .ace_comment.ace_doc.ace_tag {\
color: rgb(128, 159, 191);\
}\
.ace-tm .ace_constant.ace_numeric {\
color: rgb(0, 0, 205);\
}\
.ace-tm .ace_variable {\
color: rgb(49, 132, 149);\
}\
.ace-tm .ace_xml-pe {\
color: rgb(104, 104, 91);\
}\
.ace-tm .ace_entity.ace_name.ace_function {\
color: #0000A2;\
}\
.ace-tm .ace_heading {\
color: rgb(12, 7, 255);\
}\
.ace-tm .ace_list {\
color:rgb(185, 6, 144);\
}\
.ace-tm .ace_meta.ace_tag {\
color:rgb(0, 22, 142);\
}\
.ace-tm .ace_string.ace_regex {\
color: rgb(255, 0, 0)\
}\
.ace-tm .ace_marker-layer .ace_selection {\
background: rgb(181, 213, 255);\
}\
.ace-tm.ace_multiselect .ace_selection.ace_start {\
box-shadow: 0 0 3px 0px white;\
border-radius: 2px;\
}\
.ace-tm .ace_marker-layer .ace_step {\
background: rgb(252, 255, 0);\
}\
.ace-tm .ace_marker-layer .ace_stack {\
background: rgb(164, 229, 101);\
}\
.ace-tm .ace_marker-layer .ace_bracket {\
margin: -1px 0 0 -1px;\
border: 1px solid rgb(192, 192, 192);\
}\
.ace-tm .ace_marker-layer .ace_active-line {\
background: rgba(0, 0, 0, 0.07);\
}\
.ace-tm .ace_gutter-active-line {\
background-color : #dcdcdc;\
}\
.ace-tm .ace_marker-layer .ace_selected-word {\
background: rgb(250, 250, 255);\
border: 1px solid rgb(200, 200, 250);\
}\
.ace-tm .ace_indent-guide {\
background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==\") right repeat-y;\
}\
";

var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
});

define("ace/line_widgets",["require","exports","module","ace/lib/oop","ace/lib/dom","ace/range"], function(require, exports, module) {
"use strict";

var oop = require("./lib/oop");
var dom = require("./lib/dom");
var Range = require("./range").Range;


function LineWidgets(session) {
    this.session = session;
    this.session.widgetManager = this;
    this.session.getRowLength = this.getRowLength;
    this.session.$getWidgetScreenLength = this.$getWidgetScreenLength;
    this.updateOnChange = this.updateOnChange.bind(this);
    this.renderWidgets = this.renderWidgets.bind(this);
    this.measureWidgets = this.measureWidgets.bind(this);
    this.session._changedWidgets = [];
    this.$onChangeEditor = this.$onChangeEditor.bind(this);
    
    this.session.on("change", this.updateOnChange);
    this.session.on("changeEditor", this.$onChangeEditor);
}

(function() {
    this.getRowLength = function(row) {
        var h;
        if (this.lineWidgets)
            h = this.lineWidgets[row] && this.lineWidgets[row].rowCount || 0;
        else 
            h = 0;
        if (!this.$useWrapMode || !this.$wrapData[row]) {
            return 1 + h;
        } else {
            return this.$wrapData[row].length + 1 + h;
        }
    };

    this.$getWidgetScreenLength = function() {
        var screenRows = 0;
        this.lineWidgets.forEach(function(w){
            if (w && w.rowCount)
                screenRows +=w.rowCount;
        });
        return screenRows;
    };    
    
    this.$onChangeEditor = function(e) {
        this.attach(e.editor);
    };
    
    this.attach = function(editor) {
        if (editor  && editor.widgetManager && editor.widgetManager != this)
            editor.widgetManager.detach();

        if (this.editor == editor)
            return;

        this.detach();
        this.editor = editor;
        
        if (editor) {
            editor.widgetManager = this;
            editor.renderer.on("beforeRender", this.measureWidgets);
            editor.renderer.on("afterRender", this.renderWidgets);
        }
    };
    this.detach = function(e) {
        var editor = this.editor;
        if (!editor)
            return;
        
        this.editor = null;
        editor.widgetManager = null;
        
        editor.renderer.off("beforeRender", this.measureWidgets);
        editor.renderer.off("afterRender", this.renderWidgets);
        var lineWidgets = this.session.lineWidgets;
        lineWidgets && lineWidgets.forEach(function(w) {
            if (w && w.el && w.el.parentNode) {
                w._inDocument = false;
                w.el.parentNode.removeChild(w.el);
            }
        });
    };

    this.updateOnChange = function(e) {
        var lineWidgets = this.session.lineWidgets;
        if (!lineWidgets) return;
            
        var delta = e.data;
        var range = delta.range;
        var startRow = range.start.row;
        var len = range.end.row - startRow;

        if (len === 0) {
        } else if (delta.action == "removeText" || delta.action == "removeLines") {
            var removed = lineWidgets.splice(startRow + 1, len);
            removed.forEach(function(w) {
                w && this.removeLineWidget(w);
            }, this);
            this.$updateRows();
        } else {
            var args = new Array(len);
            args.unshift(startRow, 0);
            lineWidgets.splice.apply(lineWidgets, args);
            this.$updateRows();
        }
    };
    
    this.$updateRows = function() {
        var lineWidgets = this.session.lineWidgets;
        if (!lineWidgets) return;
        var noWidgets = true;
        lineWidgets.forEach(function(w, i) {
            if (w) {
                noWidgets = false;
                w.row = i;
            }
        });
        if (noWidgets)
            this.session.lineWidgets = null;
    };

    this.addLineWidget = function(w) {
        if (!this.session.lineWidgets)
            this.session.lineWidgets = new Array(this.session.getLength());
        
        this.session.lineWidgets[w.row] = w;
        
        var renderer = this.editor.renderer;
        if (w.html && !w.el) {
            w.el = dom.createElement("div");
            w.el.innerHTML = w.html;
        }
        if (w.el) {
            dom.addCssClass(w.el, "ace_lineWidgetContainer");
            w.el.style.position = "absolute";
            w.el.style.zIndex = 5;
            renderer.container.appendChild(w.el);
            w._inDocument = true;
        }
        
        if (!w.coverGutter) {
            w.el.style.zIndex = 3;
        }
        if (!w.pixelHeight) {
            w.pixelHeight = w.el.offsetHeight;
        }
        if (w.rowCount == null)
            w.rowCount = w.pixelHeight / renderer.layerConfig.lineHeight;
        
        this.session._emit("changeFold", {data:{start:{row: w.row}}});
        
        this.$updateRows();
        this.renderWidgets(null, renderer);
        return w;
    };
    
    this.removeLineWidget = function(w) {
        w._inDocument = false;
        if (w.el && w.el.parentNode)
            w.el.parentNode.removeChild(w.el);
        if (w.editor && w.editor.destroy) try {
            w.editor.destroy();
        } catch(e){}
        if (this.session.lineWidgets)
            this.session.lineWidgets[w.row] = undefined;
        this.session._emit("changeFold", {data:{start:{row: w.row}}});
        this.$updateRows();
    };
    
    this.onWidgetChanged = function(w) {
        this.session._changedWidgets.push(w);
        this.editor && this.editor.renderer.updateFull();
    };
    
    this.measureWidgets = function(e, renderer) {
        var changedWidgets = this.session._changedWidgets;
        var config = renderer.layerConfig;
        
        if (!changedWidgets || !changedWidgets.length) return;
        var min = Infinity;
        for (var i = 0; i < changedWidgets.length; i++) {
            var w = changedWidgets[i];
            if (!w._inDocument) {
                w._inDocument = true;
                renderer.container.appendChild(w.el);
            }
            
            w.h = w.el.offsetHeight;
            
            if (!w.fixedWidth) {
                w.w = w.el.offsetWidth;
                w.screenWidth = Math.ceil(w.w / config.characterWidth);
            }
            
            var rowCount = w.h / config.lineHeight;
            if (w.coverLine) {
                rowCount -= this.session.getRowLineCount(w.row);
                if (rowCount < 0)
                    rowCount = 0;
            }
            if (w.rowCount != rowCount) {
                w.rowCount = rowCount;
                if (w.row < min)
                    min = w.row;
            }
        }
        if (min != Infinity) {
            this.session._emit("changeFold", {data:{start:{row: min}}});
            this.session.lineWidgetWidth = null;
        }
        this.session._changedWidgets = [];
    };
    
    this.renderWidgets = function(e, renderer) {
        var config = renderer.layerConfig;
        var lineWidgets = this.session.lineWidgets;
        if (!lineWidgets)
            return;
        var first = Math.min(this.firstRow, config.firstRow);
        var last = Math.max(this.lastRow, config.lastRow, lineWidgets.length);
        
        while (first > 0 && !lineWidgets[first])
            first--;
        
        this.firstRow = config.firstRow;
        this.lastRow = config.lastRow;

        renderer.$cursorLayer.config = config;
        for (var i = first; i <= last; i++) {
            var w = lineWidgets[i];
            if (!w || !w.el) continue;

            if (!w._inDocument) {
                w._inDocument = true;
                renderer.container.appendChild(w.el);
            }
            var top = renderer.$cursorLayer.getPixelPosition({row: i, column:0}, true).top;
            if (!w.coverLine)
                top += config.lineHeight * this.session.getRowLineCount(w.row);
            w.el.style.top = top - config.offset + "px";
            
            var left = w.coverGutter ? 0 : renderer.gutterWidth;
            if (!w.fixedWidth)
                left -= renderer.scrollLeft;
            w.el.style.left = left + "px";

            if (w.fixedWidth) {
                w.el.style.right = renderer.scrollBar.getWidth() + "px";
            } else {
                w.el.style.right = "";
            }
        }
    };
    
}).call(LineWidgets.prototype);


exports.LineWidgets = LineWidgets;

});

define("ace/ext/error_marker",["require","exports","module","ace/line_widgets","ace/lib/dom","ace/range"], function(require, exports, module) {
"use strict";
var LineWidgets = require("../line_widgets").LineWidgets;
var dom = require("../lib/dom");
var Range = require("../range").Range;

function binarySearch(array, needle, comparator) {
    var first = 0;
    var last = array.length - 1;

    while (first <= last) {
        var mid = (first + last) >> 1;
        var c = comparator(needle, array[mid]);
        if (c > 0)
            first = mid + 1;
        else if (c < 0)
            last = mid - 1;
        else
            return mid;
    }
    return -(first + 1);
}

function findAnnotations(session, row, dir) {
    var annotations = session.getAnnotations().sort(Range.comparePoints);
    if (!annotations.length)
        return;
    
    var i = binarySearch(annotations, {row: row, column: -1}, Range.comparePoints);
    if (i < 0)
        i = -i - 1;
    
    if (i >= annotations.length)
        i = dir > 0 ? 0 : annotations.length - 1;
    else if (i === 0 && dir < 0)
        i = annotations.length - 1;
    
    var annotation = annotations[i];
    if (!annotation || !dir)
        return;

    if (annotation.row === row) {
        do {
            annotation = annotations[i += dir];
        } while (annotation && annotation.row === row);
        if (!annotation)
            return annotations.slice();
    }
    
    
    var matched = [];
    row = annotation.row;
    do {
        matched[dir < 0 ? "unshift" : "push"](annotation);
        annotation = annotations[i += dir];
    } while (annotation && annotation.row == row);
    return matched.length && matched;
}

exports.showErrorMarker = function(editor, dir) {
    var session = editor.session;
    if (!session.widgetManager) {
        session.widgetManager = new LineWidgets(session);
        session.widgetManager.attach(editor);
    }
    
    var pos = editor.getCursorPosition();
    var row = pos.row;
    var oldWidget = session.lineWidgets && session.lineWidgets[row];
    if (oldWidget) {
        oldWidget.destroy();
    } else {
        row -= dir;
    }
    var annotations = findAnnotations(session, row, dir);
    var gutterAnno;
    if (annotations) {
        var annotation = annotations[0];
        pos.column = (annotation.pos && typeof annotation.column != "number"
            ? annotation.pos.sc
            : annotation.column) || 0;
        pos.row = annotation.row;
        gutterAnno = editor.renderer.$gutterLayer.$annotations[pos.row];
    } else if (oldWidget) {
        return;
    } else {
        gutterAnno = {
            text: ["Looks good!"],
            className: "ace_ok"
        };
    }
    editor.session.unfold(pos.row);
    editor.selection.moveToPosition(pos);
    
    var w = {
        row: pos.row, 
        fixedWidth: true,
        coverGutter: true,
        el: dom.createElement("div")
    };
    var el = w.el.appendChild(dom.createElement("div"));
    var arrow = w.el.appendChild(dom.createElement("div"));
    arrow.className = "error_widget_arrow " + gutterAnno.className;
    
    var left = editor.renderer.$cursorLayer
        .getPixelPosition(pos).left;
    arrow.style.left = left + editor.renderer.gutterWidth - 5 + "px";
    
    w.el.className = "error_widget_wrapper";
    el.className = "error_widget " + gutterAnno.className;
    el.innerHTML = gutterAnno.text.join("<br>");
    
    el.appendChild(dom.createElement("div"));
    
    var kb = function(_, hashId, keyString) {
        if (hashId === 0 && (keyString === "esc" || keyString === "return")) {
            w.destroy();
            return {command: "null"};
        }
    };
    
    w.destroy = function() {
        if (editor.$mouseHandler.isMousePressed)
            return;
        editor.keyBinding.removeKeyboardHandler(kb);
        session.widgetManager.removeLineWidget(w);
        editor.off("changeSelection", w.destroy);
        editor.off("changeSession", w.destroy);
        editor.off("mouseup", w.destroy);
        editor.off("change", w.destroy);
    };
    
    editor.keyBinding.addKeyboardHandler(kb);
    editor.on("changeSelection", w.destroy);
    editor.on("changeSession", w.destroy);
    editor.on("mouseup", w.destroy);
    editor.on("change", w.destroy);
    
    editor.session.widgetManager.addLineWidget(w);
    
    w.el.onmousedown = editor.focus.bind(editor);
    
    editor.renderer.scrollCursorIntoView(null, 0.5, {bottom: w.el.offsetHeight});
};


dom.importCssString("\
    .error_widget_wrapper {\
        background: inherit;\
        color: inherit;\
        border:none\
    }\
    .error_widget {\
        border-top: solid 2px;\
        border-bottom: solid 2px;\
        margin: 5px 0;\
        padding: 10px 40px;\
        white-space: pre-wrap;\
    }\
    .error_widget.ace_error, .error_widget_arrow.ace_error{\
        border-color: #ff5a5a\
    }\
    .error_widget.ace_warning, .error_widget_arrow.ace_warning{\
        border-color: #F1D817\
    }\
    .error_widget.ace_info, .error_widget_arrow.ace_info{\
        border-color: #5a5a5a\
    }\
    .error_widget.ace_ok, .error_widget_arrow.ace_ok{\
        border-color: #5aaa5a\
    }\
    .error_widget_arrow {\
        position: absolute;\
        border: solid 5px;\
        border-top-color: transparent!important;\
        border-right-color: transparent!important;\
        border-left-color: transparent!important;\
        top: -5px;\
    }\
", "");

});

define("ace/ace",["require","exports","module","ace/lib/fixoldbrowsers","ace/lib/dom","ace/lib/event","ace/editor","ace/edit_session","ace/undomanager","ace/virtual_renderer","ace/worker/worker_client","ace/keyboard/hash_handler","ace/placeholder","ace/multi_select","ace/mode/folding/fold_mode","ace/theme/textmate","ace/ext/error_marker","ace/config"], function(require, exports, module) {
"use strict";

require("./lib/fixoldbrowsers");

var dom = require("./lib/dom");
var event = require("./lib/event");

var Editor = require("./editor").Editor;
var EditSession = require("./edit_session").EditSession;
var UndoManager = require("./undomanager").UndoManager;
var Renderer = require("./virtual_renderer").VirtualRenderer;
require("./worker/worker_client");
require("./keyboard/hash_handler");
require("./placeholder");
require("./multi_select");
require("./mode/folding/fold_mode");
require("./theme/textmate");
require("./ext/error_marker");

exports.config = require("./config");
exports.require = require;
exports.edit = function(el) {
    if (typeof(el) == "string") {
        var _id = el;
        el = document.getElementById(_id);
        if (!el)
            throw new Error("ace.edit can't find div #" + _id);
    }

    if (el && el.env && el.env.editor instanceof Editor)
        return el.env.editor;

    var value = "";
    if (el && /input|textarea/i.test(el.tagName)) {
        var oldNode = el;
        value = oldNode.value;
        el = dom.createElement("pre");
        oldNode.parentNode.replaceChild(el, oldNode);
    } else {
        value = dom.getInnerText(el);
        el.innerHTML = '';
    }

    var doc = exports.createEditSession(value);

    var editor = new Editor(new Renderer(el));
    editor.setSession(doc);

    var env = {
        document: doc,
        editor: editor,
        onResize: editor.resize.bind(editor, null)
    };
    if (oldNode) env.textarea = oldNode;
    event.addListener(window, "resize", env.onResize);
    editor.on("destroy", function() {
        event.removeListener(window, "resize", env.onResize);
        env.editor.container.env = null; // prevent memory leak on old ie
    });
    editor.container.env = editor.env = env;
    return editor;
};
exports.createEditSession = function(text, mode) {
    var doc = new EditSession(text, mode);
    doc.setUndoManager(new UndoManager());
    return doc;
}
exports.EditSession = EditSession;
exports.UndoManager = UndoManager;
});
            (function() {
                window.require(["ace/ace"], function(a) {
                    a && a.config.init(true);
                    if (!window.ace)
                        window.ace = a;
                    for (var key in a) if (a.hasOwnProperty(key))
                        window.ace[key] = a[key];
                });
            })();
        
ace.config.set('basePath', '/assets/ace');
ace.config.setModuleUrl("ace/mode/coffee_worker", "/assets/ace/worker-coffee-7516912750ad44ee43110e3157009ec246fb9f8a15cfdc12f747b80b14b130d4.js");
ace.config.setModuleUrl("ace/mode/css_worker", "/assets/ace/worker-css-ec8554771433dab6664e2ed73f0277293c4cb25191b4bdaf09d2f4980190a58b.js");
ace.config.setModuleUrl("ace/mode/html_worker", "/assets/ace/worker-html-099c831480b8f68116324024709883b246faa13b9a0b6971cc20cbae8defa267.js");
ace.config.setModuleUrl("ace/mode/javascript_worker", "/assets/ace/worker-javascript-0af2d483c2c08e4ff26ff817ac9be9dfc2285994554fa5b9b13de5862a516c81.js");
ace.config.setModuleUrl("ace/mode/json_worker", "/assets/ace/worker-json-f573a7859088b58443ffbbd0bb798f44e035057b04b234fb8914a2f7e5b89b9d.js");
ace.config.setModuleUrl("ace/mode/lua_worker", "/assets/ace/worker-lua-71ff555bbbd36290e40af74fcc2fd0cc9372de2f0b991a35eca085c9686828cf.js");
ace.config.setModuleUrl("ace/mode/php_worker", "/assets/ace/worker-php-4d5817cef44f0d8a6f62e37e28fc536ddb07c56908143d2782d075d651097987.js");
ace.config.setModuleUrl("ace/mode/xml_worker", "/assets/ace/worker-xml-6d38ed67ae0a3b1c2d9aba838a016e792c05f9d10db6f670f1aafc12b5a976ce.js");
ace.config.setModuleUrl("ace/mode/xquery_worker", "/assets/ace/worker-xquery-863be86c85622f0723cc88fe28596d52ba91fc6ccd1eb58ea88f0058a14413ba.js");


document.addEventListener("DOMContentLoaded", function () {

  var editor = ace.edit("editor");

  editor.$blockScrolling = Infinity;

  editor.setTheme("ace/theme/github");
  var textarea = $('textarea[name="doc[implementation]"]').hide();
  editor.getSession().setValue(textarea.val());
  editor.getSession().on('change', function(){
    textarea.val(editor.getSession().getValue());
  });

  editor.on("paste", function(e){
    var pastedLink = e.text;

    lang = "ruby";
    markupText = "```";

    if(pastedLink.search("github.com/") != -1 && pastedLink.search("api.github.com/") == -1){

      var text;

      console.log('1');

      if (pastedLink.search("commit/") != -1) {
        text = parseCommitUrl(pastedLink);
      }
      else{
        text = parseFileUrl(pastedLink);
      }

      var session = editor.session

      session.insert({
         row: editor.getCursorPosition().row,
         column: 0
      }, text)

    }
  });

});


// https://github.com/IgorMarques/that-s-the-way-you-do-it/commit/9aa9fc5d201240758f09e9c1b2aca919e2c288db
// "https://api.github.com/repos/octocat/Hello-World/git/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e

//transforms this https://github.com/IgorMarques/that-s-the-way-you-do-it/blob/master/app/models/doc.rb

//into this https://api.github.com/repos/IgorMarques/that-s-the-way-you-do-it/contents/app/models/doc.rb

//if it's a line link, gets only the line

// https://github.com/IgorMarques/that-s-the-way-you-do-it/blob/master/app/models/doc.rb#L2-L4

//if it's a multiple line link, gets all lines

//https://github.com/IgorMarques/that-s-the-way-you-do-it/blob/master/app/models/doc.rb#L2-L4
;
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
;
getExtension = /(?:\.([^.]+))?$/;
function getAppropriateLines(content, index, finalIndex){

  if(index != -1){
    var lines = content.split("\n");
    var result = "";
    for (var i = index; i <= finalIndex; i++) {
      result += lines[i-1] + "\n";
    }

    return result
  }

  return content;
}
;
function getPastedContent(e){
  var pastedText;

  if (window.clipboardData && window.clipboardData.getData) { // to work on IE
    pastedText = window.clipboardData.getData('Text');
  } else if (e.clipboardData && e.clipboardData.getData) {
    pastedText = e.clipboardData.getData('text/plain');
  }

  return pastedText;
}
;
codefyText = function(s){
  return markupText + lang + "\n" + s + markupText + "\n";
}

getLanguage = function(s){
  return langs[getExtension.exec(s)[1]] || lang;
}
;
function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
;
langs = {
  'rb': 'ruby',
  'js': 'javascript',
  'py': 'python',
  'c' : 'c',
  'css' : 'css',
  'html' : 'html',
  'php': 'php',
  'cpp': 'c++',
  'rs': 'rust',
  'exs': 'elixir',
  'scss': 'sass',
  'less': 'less',
  'ts': 'typescript',
  'go': 'go',
  'scala': 'scala'
}
;
parseCommitUrl = function(url){
  // var changes = JSON.parse(httpGet(getCommitApiUrl(url))["files"]);
  var changes = JSON.parse(httpGet(getCommitApiUrl(url)))["files"];

  var changed_files = url + "\n\n";

  for (var i = 0; i < changes.length; i++) {
    changed_files += formatCommitText(changes[i]);

  }
  return changed_files
}

// https://github.com/IgorMarques/that-s-the-way-you-do-it/commit/9aa9fc5d201240758f09e9c1b2aca919e2c288db
// "https://api.github.com/repos/octocat/Hello-World/git/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e

getRelevantLines = function(patch){
  return patch.split("@@")[2];
}

formatCommitText = function(change){
  //add language here
  lang = "diff";
  // lang = getLanguage(change["blob_url"])

  return codefyText(getRelevantLines(change["patch"])+ "\n")
}
;
parseFileUrl = function(pastedLink){
  var index = -1;
  var finalIndex;

  var fileName = pastedLink.split("#")[0];

  var lang = getLanguage(fileName);

  if(pastedLink.search("#L") != -1){
    index = parseInt(pastedLink.split("#L")[1]);
    finalIndex = pastedLink.split("#L")[1].split("-L")[1];
  }

  file = getFileApiUrl(pastedLink);

  content = Base64.decode(JSON.parse(httpGet(file))["content"]);

  var code = getAppropriateLines(content, index, finalIndex);

  return codefyText(code)
}
;
function getFileApiUrl(url){
  var x = url.split("github.com/")[1]
  var y = x.split("blob")[0] + x.split("blob/")[1].replace("master","contents")

  return "https://api.github.com/repos/" + y
}

function getCommitApiUrl(url){
  return "https://api.github.com/repos/" + url.split("github.com/")[1].split("commit")[0] + "commits/" + url.split("commit/")[1];
}
;
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//







