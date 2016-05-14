/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";

	var $          = global.jQuery;
	var todoStore  = __webpack_require__( 1 );
	var actions    = __webpack_require__( 3 ),
	    status     = __webpack_require__( 4 );
	var $todoList  = $( "#todos" );
	var todoInput  = $( "#todoInput" );
	var renderTodo = __webpack_require__( 5 );


	var todoListItemsActionCreators = __webpack_require__( 6 );


	todoStore.subscribe( function () {
	    
	    var todos = todoStore.getState().todos;
	    
	    var todoHTML = todos.map( renderTodo ).join( "" );
	    
	    $todoList.html( todoHTML );
	    
	} );

	$( "#addTodoForm" ).submit( function ( e ) {
	    
	    e.preventDefault();
	    var todo = todoInput.val();
	    if ( !todo ) {
	        
	        alert( "please give me stuff to do" );
	        
	    } else {
	        
	        todoStore.dispatch( {
	            "type": actions.ADD_TODO,
	            "text": todo
	        } );
	        todoInput.val( "" );
	        
	    }
	    
	    return false;
	    
	} );

	$todoList
	    .on( "click", ".updateTodo", function () {

	        var $t    = $( this ),
	            action;
	        action    = $t.data();
	        action.id = +action.id;

	        todoStore.dispatch( todoListItemsActionCreators( action, $t.parentsUntil( ".collection-item" ) ) )

	    } );


	todoStore.dispatch( {
	    "type": actions.ADD_TODO,
	    "text": "faire une sieste"
	} );
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var createStore = __webpack_require__( 2 );
	var actions     = __webpack_require__( 3 );
	var status      = __webpack_require__( 4 );

	module.exports = createStore( function ( state, action ) {
	    
	    if ( !state ) state = {
	        "todos"       : [],
	        "currentIndex": 0
	    };
	    if ( !action ) return state;
	    
	    switch ( action.type ) {
	        
	        case actions.ADD_TODO:
	            
	            return Object.assign( {}, state, {
	                todos: state.todos.concat( {
	                    text  : action.text,
	                    id    : state.currentIndex,
	                    status: status.PENDING
	                } )
	            }, {
	                currentIndex: state.currentIndex + 1
	            } );
	            
	            break;
	        
	        case actions.DELETE_TODO:
	            
	            return Object.assign( {}, state, {
	                "todos": state.todos.map( function ( todo ) {
	                    
	                    return {
	                        "id"    : todo.id,
	                        "text"  : todo.text,
	                        "status": todo.id === action.id ? status.DELETED : todo.status
	                    };
	                    
	                } )
	            } );
	            
	            
	            break;
	        
	        case actions.EDIT_TODO:
	            
	            return Object.assign( {}, state, {
	                "todos": state.todos.map( function ( todo ) {
	                    
	                    return {
	                        "id"    : todo.id,
	                        "text"  : todo.text,
	                        "status": todo.id === action.id ? status.EDITING : todo.status
	                    };
	                    
	                } )
	            } );
	            
	            break;
	        
	        case actions.RESOLVE_TODO:
	            
	            return Object.assign( {}, state, {
	                "todos": state.todos.map( function ( todo ) {
	                    
	                    return {
	                        "id"    : todo.id,
	                        "text"  : todo.text,
	                        "status": todo.id === action.id ? status.RESOLVED : todo.status
	                    };
	                    
	                } )
	            } );
	            
	            break;

	        case actions.UPDATE_TODO:

	            return Object.assign( {}, state, {
	                "todos": state.todos.map( function ( todo ) {

	                    if ( todo.id === action.id ) {

	                        return {
	                            "id"    : todo.id,
	                            "text"  : action.text,
	                            "status": status.PENDING
	                        };

	                    }

	                    return todo;

	                } )
	            } );

	            break;

	        case actions.CANCEL_TODO_UPDATE:

	            return Object.assign( {}, state, {
	                "todos": state.todos.map( function ( todo ) {

	                    if ( todo.id === action.id ) {

	                        return {
	                            "id"    : todo.id,
	                            "text"  : todo.text,
	                            "status": status.PENDING
	                        };

	                    }

	                    return todo;

	                } )
	            } );

	            break;
	        
	        default:
	            
	            return state;
	        
	    }

	} );

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = function createStore ( reducer, initialState, enhancer ) {
	    
	    "use strict";
	    
	    var tr = typeof reducer,
	        ti = typeof initialState,
	        te = typeof enhancer;

	    //TODO: add test for this
	    if ( tr !== "function" ) {
	        
	        throw  new TypeError( "Store : reducer must be a function" );
	        
	    }

	    //TODO: add test for this
	    if ( ti !== "undefined" && !(ti === "object") ) {
	        
	        throw new TypeError( "Store : initial state must be an object" );
	        
	    }
	    
	    var context = {
	        "state"           : initialState,
	        "subscribers"     : [],
	        "nextSubscriberId": 0,
	        "reducer"         : reducer,
	        "isDispatching"   : false
	    };

	    /**
	     * Store object declaration
	     * @typedef store
	     * @type Object
	     * @property {Function} dispatch
	     * @property {Function} subscribe
	     * @property {Function} getState
	     */
	    var store = {
	        /**
	         *
	         * @param action - a plain Object to be dispatched
	         * @returns action - the same plain object
	         */
	        "dispatch" : function ( action ) {

	            if ( context.isReducing === true ) {

	                //TODO: add test for this one
	                throw new Error( "Store : trying to dispatch an action inside the reducer" );
	                
	            }

	            if ( typeof action !== "object" ) {

	                throw new TypeError( "Store : action must be a plain object, instead was of type : " + typeof action );

	            }

	            context.isReducing = true;
	            try {

	                context.state = context.reducer( context.state, action );

	            } finally {

	                context.isReducing = false;

	            }

	            // calling slice makes a snapshot of the current subscribers
	            // if one of them tries to unsubscribe it will have no effect for this round of dispatching
	            context.subscribers.slice().forEach( function ( subscriber ) {

	                // subscribers are called with no arguments
	                // they may call store.getState to get the current state
	                // The subscribers exection is not try / catched. This should be done 
	                // inside the subscriber declaration because there is no way to properly handle errors
	                // here. Moreover it could result to undesired behaviour if some suscribers / components end up in
	                // intermediary state because of an error but the store kept dispatching actions.
	                subscriber();

	            } );

	            return action;
	            
	        },
	        /**
	         * @returns {Object}
	         */
	        "getState" : function () {
	            
	            return context.state;
	            
	        },
	        /**
	         *
	         * @param subscriber {Function}
	         * @returns {Function}
	         */
	        "subscribe": function ( subscriber ) {

	            if ( typeof subscriber !== "function" ) throw new TypeError( "store.subscribe : suscriber must be a function, instead was of type : " + typeof subscriber );
	            context.subscribers.push( subscriber );
	            var isActive = true;

	            
	            return function () {

	                var index;
	                if ( isActive ) {

	                    // this code is directly taken from the official repo https://github.com/reactjs/redux/blob/bb9fa19cf2a22d0149dcf134e36404a02d93b2b3/src/createStore.js#L60
	                    index = context.subscribers.indexOf( subscriber );
	                    context.subscribers.splice( index, 1 );
	                    isActive = false;

	                }

	                
	            };
	            
	        }
	    };
	    
	    if ( te === "function" ) return enhancer( store );
	    else return store;
	    
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = {
	    "ADD_TODO"          : "ADD_TODO",
	    "EDIT_TODO"         : "EDIT_TODO",
	    "DELETE_TODO"       : "DELETE_TODO",
	    "RESOLVE_TODO"      : "RESOLVE_TODO",
	    "UPDATE_TODO"       : "UPDATE_TODO",
	    "CANCEL_TODO_UPDATE": "CANCEL_TODO_UPDATE"
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = {
	    "PENDING" : "PENDING",
	    "DELETED" : "DELETED",
	    "RESOLVED": "RESOLVED",
	    "EDITING" : "EDITING"
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var status  = __webpack_require__( 4 );
	var actions = __webpack_require__( 3 );

	var cssStatus                = {};
	cssStatus[ status.PENDING ]  = "";
	cssStatus[ status.RESOLVED ] = " blue lighten-2 line-through ";
	cssStatus[ status.DELETED ]  = " red accent-2 line-through ";


	module.exports = function ( todo ) {


	    if ( todo.status === status.EDITING ) {

	        return "<li class='collection-item'>" +
	            "<div class='row'>" +
	            "<div class='col s11'>" +
	            "<div class='input-field'>" +
	            "<input value='" + todo.text + "' type='text'>" +
	            "</div>" +
	            "</div>" +
	            "<div class='col s1'>" +
	            "<i class='material-icons updateTodo' data-id='" + todo.id + "' data-type='" + actions.CANCEL_TODO_UPDATE + "'>replay</i>" +
	            "<i class='material-icons updateTodo' data-id='" + todo.id + "' data-type='" + actions.UPDATE_TODO + "'>done</i></div>" +
	            "</div>" +
	            "</li>";

	    } else {

	        return "<li class='collection-item " + cssStatus[ todo.status ] + "'>" + todo.text + "" +
	            "<i class='material-icons updateTodo' data-type='" + actions.RESOLVE_TODO + "' data-id='" + todo.id + "'>done</i>" +
	            "<i class='material-icons updateTodo' data-type='" + actions.DELETE_TODO + "' data-id='" + todo.id + "'>delete</i>" +
	            "<i class='material-icons updateTodo' data-type='" + actions.EDIT_TODO + "' data-id='" + todo.id + "'>mode_edit</i>" +
	            "</li>";

	    }
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var actions = __webpack_require__( 3 );

	module.exports = function ( action, $context ) {

	    switch ( action.type ) {


	        case actions.UPDATE_TODO:

	            return {
	                "type": actions.UPDATE_TODO,
	                "id"  : action.id,
	                "text": $context.find( "input" ).val()
	            };


	            break;


	        default:

	            return action;

	            break;

	    }


	};

/***/ }
/******/ ]);