/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Ral Ort Tal                                                       *
 * Created by wfoojjaec                                              *
 * For any copyright issues one should contact author directly       *
 *  via gmail or skype.                                              *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var throttle = 200;
var offset = 0;
//--------------------------------------------------------------------//
	/*	Window size ratio calculation
	 * */
function ratio() {
	return ( ( $( window ).width() > $( window ).height() ) ? $( window ).width() / $( window ).height() : $( window ).height() / $( window ).width() );
};
//--------------------------------------------------------------------//
$( document ).ready( function() {
//--------------------------------------------------------------------//
	/*	Header AScrollSpy tweak
	 * */
	offset = ( $( 'header.header' ).css( 'position' ) === 'fixed' ) ? $( 'header.header' ).outerHeight() : 0;
//--------------------------------------------------------------------//
	/*	Central logo menu
	 * */
	$( '.menu > div.caption' ).click( function() {
		if( $( this ).hasClass( 'active' ) )
			$( this ).siblings().slideUp( throttle );
		else
			$( this ).siblings().slideDown( throttle );
		$( this ).toggleClass( 'active' );
	} );
//--------------------------------------------------------------------//
	/*	Left sidebar menu
	 * */
	function pullMenu( right ) {
		if( right ) {
			$( 'aside' ).stop().animate( {
				'left' : 0
			}, throttle, function() {
				$( 'aside #navigation' ).mCustomScrollbar( 'update' );
				$( 'main, header.header, footer.footer' ).stop().animate( {
					'margin-left' : ( $( window ).width() < 1234 ) ? 0 : $( 'aside' ).outerWidth() + 'px',
					'width' : ( $( window ).width() < 1234 ) ? $( window ).width() + 'px' : $( window ).width() - $( 'aside' ).outerWidth() + 'px'
				}, throttle );
			} );
		}
		else {
			$( 'main, header.header, footer.footer' ).stop().animate( {
				'margin-left' : '0px',
				'width' : $( window ).width() + 'px'
			}, throttle );
			$( 'aside' ).stop().animate( {
				'left' : - $( 'aside' ).outerWidth() * ratio() + 'px'
			}, throttle );
		};
	};
	$( '.header > .container > span.pull-left' ).click( function() {
		$( this ).fadeOut();
		pullMenu( $( 'aside' ).offset().left < 0 );
	} );
	$( 'aside > .caption > h6 span.pull-right' ).click( function() {
		$( '.header > .container > span.pull-left' ).fadeIn();
		pullMenu( false );
	} );
	$( 'aside > div.more' ).click( function() {
		$( 'aside .mCustomScrollbar' ).mCustomScrollbar( 'scrollTo', Math.abs( $( 'aside .mCustomScrollbar .mCSB_container' ).position().top ) + $( 'aside #navigation' ).height(), { scrollInertia : throttle } );
	} );
//--------------------------------------------------------------------//
	/*	Sidebar menu shadow module
	 * */
	shadow( $( '.nav' ) );
//--------------------------------------------------------------------//
	/*	Smooth page scroll
	 * */
	$( '.scroll' ).click( function( event ) {
		var href = this.href.replace( this.hash, '' );
		if( href == '' | href == location.protocol + '//' + location.hostname + ( location.port ? ':' + location.port : '' ) + location.pathname + ( location.search ? location.search : '' ) )
			event.preventDefault();
		if( $( this.hash ).offset() ) {
			$( 'html, body' ).stop().animate( {
				scrollTop : $( this.hash ).offset().top - offset
			}, throttle, function() {
				if( $( window ).width() < 768 )
					pullMenu( false );
			} );
		};
	} );
//--------------------------------------------------------------------//
	/*	Custom select menu module
	 * */
	$( 'select' ).customSelectMenu();
	$( '.custom-select-menu .select' ).addClass( 'init-mCustomScrollbar theme-white-important' );
//--------------------------------------------------------------------//
	/*	Syntax highlighter module
	 * */
	function path() {
		var args = arguments, result = [];
		for( var i = 0; i < args.length; i++ )
			result.push( args[ i ].replace( '@', 'http://alexgorbatchev.com/pub/sh/current/scripts/' ) );
		return result;
	};
	SyntaxHighlighter.autoloader.apply( null, path(
	  'applescript            @shBrushAppleScript.js',
	  'actionscript3 as3      @shBrushAS3.js',
	  'bash shell             @shBrushBash.js',
	  'coldfusion cf          @shBrushColdFusion.js',
	  'cpp c                  @shBrushCpp.js',
	  'c# c-sharp csharp      @shBrushCSharp.js',
	  'css                    @shBrushCss.js',
	  'delphi pascal          @shBrushDelphi.js',
	  'diff patch pas         @shBrushDiff.js',
	  'erl erlang             @shBrushErlang.js',
	  'groovy                 @shBrushGroovy.js',
	  'java                   @shBrushJava.js',
	  'jfx javafx             @shBrushJavaFX.js',
	  'js jscript javascript  @shBrushJScript.js',
	  'perl pl                @shBrushPerl.js',
	  'php                    @shBrushPhp.js',
	  'text plain             @shBrushPlain.js',
	  'py python              @shBrushPython.js',
	  'ruby rails ror rb      @shBrushRuby.js',
	  'sass scss              @shBrushSass.js',
	  'scala                  @shBrushScala.js',
	  'sql                    @shBrushSql.js',
	  'vb vbnet               @shBrushVb.js',
	  'xml xhtml xslt html    @shBrushXml.js'
	) );
	SyntaxHighlighter.defaults[ 'toolbar' ] = false;
	SyntaxHighlighter.defaults[ 'tab-size' ] = 2;
	SyntaxHighlighter.all();
	after( {
		callback : function() {
			$( '.syntaxhighlighter' ).each( function() {
				$( this ).parent().addClass( 'syntaxhighlighter-wrapper' ).prepend( '<div class="underlay"></div>' );
				$( this ).addClass( 'init-mCustomScrollbar' );
				$( this ).find( '.line' ).hover( function() {
					$( this ).toggleClass( 'highlighted' );
					var className = ( $( this ).parent().hasClass( 'gutter' ) ) ? 'code' : 'gutter';
					$( this ).parents( '.syntaxhighlighter' ).first().find( '.' + className + ' .line' ).eq( $( this ).index() ).toggleClass( 'highlighted' );
				} );
				$( this ).find( '.code .container .line' ).click( function() {
					selection( $( this ).parent().get( 0 ) );
				} );
			} );
		},
		interval : function() {
			return $( '.syntaxhighlighter' ).length != 0;
		},
		time : throttle,
		id : '.syntaxhighlighter'
	} );
//--------------------------------------------------------------------//
	/*	Scrollbars
	 * */
	 var interval = setInterval( function() {
		var element = $( '.init-mCustomScrollbar' );
		if( element.length > 0 ) {
			element.each( function() {
				$( this ).mCustomScrollbar( {
					scrollInertia : 0,
					advanced : {
						//updateOnBrowserResize : true,
						updateOnContentResize : true
					},
					contentTouchScroll : true
				} );
				$( this ).removeClass( 'init-mCustomScrollbar' );
				$( this ).find( '.mCSB_container, .mCSB_dragger' );
			} );
			element = undefined;
		};
	 }, throttle );
//--------------------------------------------------------------------//
	/*	Window resize handler
	 * */
	function windowResize() {
		$( 'aside #navigation' ).height( $( window ).height() - $( 'aside > div.caption' ).outerHeight() - $( 'aside > div.more' ).outerHeight() );
		var height = 0;
		$( '.nav > li' ).each( function() {
			height += $( this ).outerHeight();
		} );
		if( height > $( 'aside #navigation' ).height() )
			$( 'aside > div.more' ).show();
		else
			$( 'aside > div.more' ).hide();
		$( 'aside' ).css( {
			'width' : ( $( window ).width() < 768 ) ? ( ( $( window ).width() / 2 <= 320 ) ? '100%' : '50%' ) : 'auto',
			'max-width' : ( $( window ).width() < 768 ) ? ( ( $( window ).width() / 2 <= 320 ) ? '100%' : '50%' ) : Math.max( $( window ).width() - 964, 270 ) + 'px',
		} );
		$( 'aside' ).css( 'left', - $( 'aside' ).outerWidth() * ratio() + 'px' );
		$( 'main, header.header, footer.footer' ).css( {
			'margin-left' : '0px',
			'width' : $( window ).width() + 'px'
		} );
		$( '.header > .container > span.pull-left' ).fadeIn();
		after( {
			callback : function() {
				$( '.syntaxhighlighter-wrapper' ).each( function() {
					var width = ( String( $( this ).find( '.gutter .line' ).length ).length ) * 7 + 30;
					$( this ).find( '.gutter' ).css( {
						'width' : width + 'px',
						'min-width' : width + 'px'
					} )
					$( this ).find( '.underlay' ).width( width );
					$( this ).find( '.gutter .line' ).each( function() {
						$( this ).height( $( this ).parents( '.syntaxhighlighter' ).first().find( '.code .line' ).eq( $( this ).index() ).height() );
					} );
				} );
				$( '.mCSB_container' ).css( {
					'padding-top' : '1px'
				} );
				$( '.mCustomScrollbar' ).mCustomScrollbar( 'update' );
			},
			interval : function() {
				return $( '.syntaxhighlighter-wrapper' ).length != 0;
			},
			time : 100,
			id : '.syntaxhighlighter-wrapper'
		} );
		delay( {
			callback : function() {
				//
			},
			time : throttle,
			id : 'delay'
		} );
	};
	$( window ).resize( function() {
		windowResize();
	} );
	windowResize()
	//	Some default preferences
	if( $( window ).width() >= 1234 ) {
		$( 'aside' ).css( {
			'left' : '0px',
			'width' : 'auto',
			'max-width' : Math.max( $( window ).width() - 964, 270 ) + 'px'
		} );
		$( 'main, header.header, footer.footer' ).css( {
			'margin-left' : $( 'aside' ).outerWidth() + 'px',
			'width' : $( window ).width() - $( 'aside' ).outerWidth() + 'px'
		} );
		$( '.header > .container > span.pull-left' ).hide();
	};
	//--//
} );
//--------------------------------------------------------------------//
	/*	Window load handler
	 * */
$( window ).load( function() {
	delay( {
		callback : function() {
//--------------------------------------------------------------------//
	/*	Bootstrap scrollspy mod
	 * */
			$( window ).ascrollspy( { target : '#navigation' } );
//--------------------------------------------------------------------//
	/*	Sync sidebar scroll
	 * */
			$( window ).scroll( function() {
				var position = ( $( 'aside #navigation .shadow-0' ).length != 0 ) ? $( 'aside #navigation .shadow-0' ).position().top : 0;
				$( 'aside .mCustomScrollbar' ).mCustomScrollbar( 'scrollTo', Math.abs(
					position - ( ( position == 0 ) ? 0 : $( 'aside #navigation .shadow-0' ).outerHeight() ) + $( 'aside > div.capion' ).outerHeight()
				), { scrollInertia : throttle } );
			} )
//--------------------------------------------------------------------//
	/*	Overlay
	 * */
			if( $( window ).width() < 768 )
				$( '#overlay' ).remove();
			else
				$( '#overlay' ).fadeOut( function() {
					$( '#overlay' ).remove();
				} )
		},
		time : throttle,
		id : 'overlay'
	} );
} );
//--------------------------------------------------------------------//
	/*	Custom plugins and code snippets
	 * */

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Hel Ohm Um Lo Cham                                                *
 * Created by wfoojjaec                                              *
 * For any copyright issues one should contact author directly       *
 *  via gmail or skype.                                              *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var delay = ( function() {
	var timeout = { };
		//	callback	- function()
		//	time		- call suppression delay
		//	id			- timeout identifier
	return function( data ) {
		if( 'function' === typeof data.callback ) {
			data.time = ( data.time ) ? Math.abs( Number( data.time ) ) : 100;
			data.id = ( data.id ) ? String( data.id ) : 'delay';
			clearTimeout( timeout[ data.id ] );
			timeout[ data.id ] = setTimeout( data.callback, data.time );
		};
	};
} )();
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Ral Tir Tal Sol                                                   *
 * Created by wfoojjaec                                              *
 * For any copyright issues one should contact author directly       *
 *  via gmail or skype.                                              *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var after = ( function() {
	var interval = { };
		//	callback	- function()
		//	selector	- element selector
		//	time		- call suppression delay
	return function( data ) {
		if( 'function' === typeof data.callback && 'function' === typeof data.interval ) {
			data.time = ( data.time ) ? Math.abs( Number( data.time ) ) : 100;
			data.id = ( data.id ) ? String( data.id ) : 'after';
			clearInterval( interval[ data.id ] );
			interval[ data.id ] = setInterval( function() {
				if( data.interval() === true ) {
					data.callback();
					clearInterval( interval[ data.id ] );
				};
			}, data.time );
		};
	};
} )();
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Amn Lem Ko                                                        *
 * Created by wfoojjaec                                              *
 * For any copyright issues one should contact author directly       *
 *  via gmail or skype.                                              *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var shadow = ( function() {
	return function( element ) {
		var child = null;
		function castShadow( target ) {
			element.children().removeClass( 'shadow-0 shadow-1 shadow-2' );
			if( target.length > 0 ) {
				target.addClass( 'shadow-0' );
				target.prev().addClass( 'shadow-1' ).prev().addClass( 'shadow-2' );
				target.next().addClass( 'shadow-1' ).next().addClass( 'shadow-2' );
			};
		};
		$( element ).hover( function( eventObject ) {
			castShadow( child );
		}, function( eventObject ) {
			child = null;
			castShadow( $( this ).children( '.active' ) );
		} );
		element.children().hover( function( eventObject ) {
			if( child )
				castShadow( $( this ) );
			else
				child = $( this );
		} );
		$( window ).scroll( function() {
			castShadow( element.children( '.active' ) );
		} );
		/*
		data.className = ( data.className ) ? String( className ) : 'shade';
		data.width = ( data.width ) ? Math.abs( Number( data.width ) ) : 1;
		data.spread = ( data.spread ) ? Math.abs( Number( data.spread ) ) : 2;
		*/
	};
} )();
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Ith El Eth                                                        *
 * Created by wfoojjaec                                              *
 * For any copyright issues one should contact author directly       *
 *  via gmail or skype.                                              *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var selection = ( function() {
	return function( element ) {
		if( element ) {
			var range, selection;
			if ( document.createRange ) {
				range = document.createRange();
				range.selectNode( element )
				selection = window.getSelection();
				selection.removeAllRanges();
				selection.addRange( range );
			} else {
				var range = document.body.createTextRange();
				range.moveToElementText( element );
				range.select();
			};
		}
		else {
			var text;
			if( text = window.getSelection ) // Not IE, используем метод getSelection
				text = window.getSelection().toString();
			else // IE, используем объект selection
				text = document.selection.createRange().text;
			return text;
		};
	};
} )();
/*	*/

/* ========================================================================
 * This is a MODIFIED version of mentioned script with a custom hash fix
 * ========================================================================
 * Copyleft 2013
 * ======================================================================== */

/* ========================================================================
 * Bootstrap: scrollspy.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#scrollspy
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */

+function ($) { "use strict";

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function AScrollSpy(element, options) {
    var href
    var process  = $.proxy(this.process, this)

    this.$element       = $(element).is('body') ? $(window) : $(element)
    this.$body          = $('body')
    this.$scrollElement = this.$element.on('scroll.bs.scroll-spy.data-api', process)
    this.options        = $.extend({}, AScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target
      || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      || '') + ' .nav li > a'
    this.offsets        = $([])
    this.targets        = $([])
    this.activeTarget   = null

    this.refresh()
    this.process()
  }

  AScrollSpy.DEFAULTS = {
    offset: 10
  }

  AScrollSpy.prototype.refresh = function () {
    var offsetMethod = this.$element[0] == window ? 'offset' : 'position'

    this.offsets = $([])
    this.targets = $([])

    var self     = this
    var $targets = this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
		var href  = $el.data('target') || $el.attr('href')
		//	MODIFIED
		var ahref = '#' + href.split( '#' )[ 1 ]
        //var $href = /^#\w/.test(href) && $(href)
		var $href = /^#\w/.test(ahref) && $(ahref)
		//--//
        return ($href
          && $href.length
          && [[ $href[offsetMethod]().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href ]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
		//	MODIFIED
        //self.offsets.push(this[0])
		self.offsets.push( this[ 0 ] - offset )
        //--//
        self.targets.push(this[1])
      })
  }

  AScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight
    var maxScroll    = scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets.last()[0]) && this.activate(i)
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
        && this.activate( targets[i] )
    }
  }

  AScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    $(this.selector)
      .parents('.active')
      .removeClass('active')

    var selector = this.selector
      + '[data-target="' + target + '"],'
      + this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length)  {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  var old = $.fn.ascrollspy

  $.fn.ascrollspy = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.ascrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.ascrollspy', (data = new AScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.ascrollspy.Constructor = AScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.ascrollspy.noConflict = function () {
    $.fn.ascrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      $spy.ascrollspy($spy.data())
    })
  })

}(window.jQuery);
