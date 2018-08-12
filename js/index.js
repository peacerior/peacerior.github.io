var _createClass = function () {
	function defineProperties( target, props ) {
		for ( var i = 0; i < props.length; i++ ) {
			var descriptor = props[ i ];
			descriptor.enumerable = descriptor.enumerable || false;
			descriptor.configurable = true;
			if ( "value" in descriptor ) descriptor.writable = true;
			Object.defineProperty( target, descriptor.key, descriptor );
		}
	}
	return function ( Constructor, protoProps, staticProps ) {
		if ( protoProps ) defineProperties( Constructor.prototype, protoProps );
		if ( staticProps ) defineProperties( Constructor, staticProps );
		return Constructor;
	};
}();

function _classCallCheck( instance, Constructor ) {
	if ( !( instance instanceof Constructor ) ) {
		throw new TypeError( "Cannot call a class as a function" );
	}
}
var Robot = function () {
	function Robot( color, light, size, x, y, struct ) {
		_classCallCheck( this, Robot );
		this.points = [];
		this.links = [];
		this.frame = 0;
		this.dir = 1;
		this.size = size * ( Math.random() * 10 );
		this.color = Math.round( color );
		this.light = light;
		// ---- points ----
		var id = 0;
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;
		try {
			for ( var _iterator = struct.points[ Symbol.iterator ](), _step; !( _iteratorNormalCompletion = ( _step = _iterator.next() )
					.done ); _iteratorNormalCompletion = true ) {
				var p = _step.value;
				this.points.push( new Point( id++, size * p[ 0 ] + x, size * p[ 1 ] + y, p[ 2 ] ) );
				//function Point(id, x, y, fn, w)
			}
			// ---- links ----
		} catch ( err ) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if ( !_iteratorNormalCompletion && _iterator.return ) {
					_iterator.return();
				}
			} finally {
				if ( _didIteratorError ) {
					throw _iteratorError;
				}
			}
		}
		var _iteratorNormalCompletion2 = true;
		var _didIteratorError2 = false;
		var _iteratorError2 = undefined;
		try {
			for ( var _iterator2 = struct.links[ Symbol.iterator ](), _step2; !( _iteratorNormalCompletion2 = ( _step2 = _iterator2.next() )
					.done ); _iteratorNormalCompletion2 = true ) {
				var l = _step2.value;
				var p0 = this.points[ l[ 0 ] ];
				var p1 = this.points[ l[ 1 ] ];
				var dx = p0.x - p1.x;
				var dy = p0.y - p1.y;
				this.links.push( new Link( this, p0, p1, Math.sqrt( dx * dx + dy * dy ), l[ 2 ] * size / 3, l[ 3 ], l[ 4 ] ) );
			}
		} catch ( err ) {
			_didIteratorError2 = true;
			_iteratorError2 = err;
		} finally {
			try {
				if ( !_iteratorNormalCompletion2 && _iterator2.return ) {
					_iterator2.return();
				}
			} finally {
				if ( _didIteratorError2 ) {
					throw _iteratorError2;
				}
			}
		}
	}
	_createClass( Robot, [ {
		key: 'update',
		value: function update() {
			// ---- beat ----
			if ( ++this.frame % 20 === 0 ) this.dir = -this.dir;
			// ---- create giants ----
			if ( dancerDrag && this === dancerDrag && this.size < 16 && this.frame > 600 ) {
				dancerDrag = null;
				dancers.push( new Robot( this.color, this.light * 1.25, this.size * 2, pointer.x, pointer.y - 100 * this.size * 2, struct ) );
				dancers.sort( function ( d0, d1 ) {
					return d0.size - d1.size;
				} );
			}
			// ---- update links ----
			var _iteratorNormalCompletion3 = true;
			var _didIteratorError3 = false;
			var _iteratorError3 = undefined;
			try {
				for ( var _iterator3 = this.links[ Symbol.iterator ](), _step3; !( _iteratorNormalCompletion3 = ( _step3 = _iterator3.next() )
						.done ); _iteratorNormalCompletion3 = true ) {
					var link = _step3.value;
					var p0 = link.p0;
					var p1 = link.p1;
					var dx = p0.x - p1.x;
					var dy = p0.y - p1.y;
					var dist = Math.sqrt( dx * dx + dy * dy );
					if ( dist ) {
						var tw = p0.w + p1.w;
						var r1 = p1.w / tw;
						var r0 = p0.w / tw;
						var dz = ( link.distance - dist ) * link.force;
						dx = dx / dist * dz;
						dy = dy / dist * dz;
						p1.x -= dx * r0;
						p1.y -= dy * r0;
						p0.x += dx * r1;
						p0.y += dy * r1;
					}
				}
				// ---- update points ----
			} catch ( err ) {
				_didIteratorError3 = true;
				_iteratorError3 = err;
			} finally {
				try {
					if ( !_iteratorNormalCompletion3 && _iterator3.return ) {
						_iterator3.return();
					}
				} finally {
					if ( _didIteratorError3 ) {
						throw _iteratorError3;
					}
				}
			}
			var _iteratorNormalCompletion4 = true;
			var _didIteratorError4 = false;
			var _iteratorError4 = undefined;
			try {
				for ( var _iterator4 = this.points[ Symbol.iterator ](), _step4; !( _iteratorNormalCompletion4 = ( _step4 = _iterator4.next() )
						.done ); _iteratorNormalCompletion4 = true ) {
					var point = _step4.value;
					// ---- drag ----
					if ( this === dancerDrag && point === pointDrag ) {
						point.x += ( pointer.x - point.x ) * 0.1;
						point.y += ( pointer.y - point.y ) * 0.1;
					}
					// ---- dance ----
					if ( this !== dancerDrag ) {
						point.fn && point.fn( 16 * Math.sqrt( this.size ), this.dir );
					}
					// ---- verlet integration ----
					point.vx = point.x - point.px;
					point.vy = point.y - point.py;
					point.px = point.x;
					point.py = point.y;
					point.vx *= 0.995;
					point.vy *= 0.995;
					point.x += point.vx;
					point.y += point.vy + 0.01;
				}
			} catch ( err ) {
				_didIteratorError4 = true;
				_iteratorError4 = err;
			} finally {
				try {
					if ( !_iteratorNormalCompletion4 && _iterator4.return ) {
						_iterator4.return();
					}
				} finally {
					if ( _didIteratorError4 ) {
						throw _iteratorError4;
					}
				}
			}
			var _iteratorNormalCompletion5 = true;
			var _didIteratorError5 = false;
			var _iteratorError5 = undefined;
			try {
				for ( var _iterator5 = this.links[ Symbol.iterator ](), _step5; !( _iteratorNormalCompletion5 = ( _step5 = _iterator5.next() )
						.done ); _iteratorNormalCompletion5 = true ) {
					var _link = _step5.value;
					var p1 = _link.p1;
					// ---- ground ----
					if ( p1.y > canvas.height * ground - _link.size * 0.5 ) {
						p1.y = canvas.height * ground - _link.size * 0.5;
						p1.x -= p1.vx;
						p1.vx = 0;
						p1.vy = 0;
					}
					// ---- borders ----
					if ( p1.id === 1 || p1.id === 2 ) {
						if ( p1.x > canvas.width - _link.size ) p1.x = canvas.width - _link.size;
						else if ( p1.x < _link.size ) p1.x = _link.size;
					}
				}
			} catch ( err ) {
				_didIteratorError5 = true;
				_iteratorError5 = err;
			} finally {
				try {
					if ( !_iteratorNormalCompletion5 && _iterator5.return ) {
						_iterator5.return();
					}
				} finally {
					if ( _didIteratorError5 ) {
						throw _iteratorError5;
					}
				}
			}
		}
    }, {
		key: 'draw',
		value: function draw() {
			var _iteratorNormalCompletion6 = true;
			var _didIteratorError6 = false;
			var _iteratorError6 = undefined;
			try {
				for ( var _iterator6 = this.links[ Symbol.iterator ](), _step6; !( _iteratorNormalCompletion6 = ( _step6 = _iterator6.next() )
						.done ); _iteratorNormalCompletion6 = true ) {
					var link = _step6.value;
					if ( link.size ) {
						var dx = link.p1.x - link.p0.x;
						var dy = link.p1.y - link.p0.y;
						var a = Math.atan2( dy, dx );
						var d = Math.sqrt( dx * dx + dy * dy );
						// ---- shadow ----
						ctx.save();
						ctx.translate( link.p0.x + link.size * 0.25, link.p0.y + link.size * 0.25 );
						ctx.rotate( a );
						ctx.restore();
						// ---- stroke ----
						ctx.save();
						ctx.translate( link.p0.x, link.p0.y );
						ctx.rotate( a );
						ctx.drawImage( link.image, -link.size * 0.5, -link.size * 0.5, d + link.size, link.size );
						ctx.restore();
					}
				}
			} catch ( err ) {
				_didIteratorError6 = true;
				_iteratorError6 = err;
			} finally {
				try {
					if ( !_iteratorNormalCompletion6 && _iterator6.return ) {
						_iterator6.return();
					}
				} finally {
					if ( _didIteratorError6 ) {
						throw _iteratorError6;
					}
				}
			}
		}
    } ] );
	return Robot;
}();
var Link = function Link( parent, p0, p1, dist, size, light, force ) {
	_classCallCheck( this, Link );
	// ---- cache strokes ----
	function stroke( color, axis ) {
		var image = document.createElement( 'canvas' );
		image.width = dist + size;
		image.height = size;
		var ict = image.getContext( '2d' );
		ict.beginPath();
		ict.lineCap = "round";
		ict.lineWidth = size / 60;
		ict.strokeStyle = '#f00'
		ict.moveTo( size * 0.5, size * 0.5 );
		ict.lineTo( size * 0.5 + dist, size * 0.5 );
		ict.stroke();
		return image;
	}
	this.p0 = p0;
	this.p1 = p1;
	this.distance = dist;
	this.size = size;
	this.light = light || 0.0;
	this.force = ( force || 0.5 );
	this.image = stroke( "hsl(" + parent.color + " ,100%, " + parent.light * this.light + "%)", true );
	this.shadow = stroke( "rgba(0,0,0,0.5)" );
};
var Point = function Point( id, x, y, fn, w ) {
	_classCallCheck( this, Point );
	this.id = id;
	this.x = x;
	this.y = y;
	this.w = ( w || 0.5 ) * 0.01;
	this.fn = fn || null;
	this.px = x;
	this.py = y;
	this.vx = 0;
	this.vy = 0;
};
var Canvas = function () {
	function Canvas() {
		var _this = this;
		_classCallCheck( this, Canvas );
		this.elem = document.createElement( 'canvas' );
		this.ctx = this.elem.getContext( '2d' );
		document.body.appendChild( this.elem );
		this.resize();
		window.addEventListener( 'resize', function () {
			return _this.resize();
		}, false );
	}
	_createClass( Canvas, [ {
		key: 'resize',
		value: function resize() {
			this.width = this.elem.width = this.elem.offsetWidth;
			this.height = this.elem.height = this.elem.offsetHeight;
			ground = this.height > 500 ? 0.85 : 1.0;
		}
    } ] );
	return Canvas;
}();
var Pointer = function () {
	function Pointer( canvas ) {
		var _this2 = this;
		_classCallCheck( this, Pointer );
		this.x = 0;
		this.y = 0;
		this.canvas = canvas;
		window.addEventListener( 'mousemove', function ( e ) {
			return _this2.move( e );
		}, false );
		canvas.elem.addEventListener( 'touchmove', function ( e ) {
			return _this2.move( e );
		}, false );
		window.addEventListener( 'mousedown', function ( e ) {
			return _this2.down( e );
		}, false );
		window.addEventListener( 'touchstart', function ( e ) {
			return _this2.down( e );
		}, false );
		window.addEventListener( 'mouseup', function ( e ) {
			return _this2.up( e );
		}, false );
		window.addEventListener( 'touchend', function ( e ) {
			return _this2.up( e );
		}, false );
	}
	_createClass( Pointer, [ {
		key: 'down',
		value: function down( e ) {
			this.move( e );
			var _iteratorNormalCompletion7 = true;
			var _didIteratorError7 = false;
			var _iteratorError7 = undefined;
			try {
				for ( var _iterator7 = dancers[ Symbol.iterator ](), _step7; !( _iteratorNormalCompletion7 = ( _step7 = _iterator7.next() )
						.done ); _iteratorNormalCompletion7 = true ) {
					var dancer = _step7.value;
					var _iteratorNormalCompletion8 = true;
					var _didIteratorError8 = false;
					var _iteratorError8 = undefined;
					try {
						for ( var _iterator8 = dancer.points[ Symbol.iterator ](), _step8; !( _iteratorNormalCompletion8 = ( _step8 = _iterator8.next() )
								.done ); _iteratorNormalCompletion8 = true ) {
							var point = _step8.value;
							var dx = pointer.x - point.x;
							var dy = pointer.y - point.y;
							var d = Math.sqrt( dx * dx + dy * dy );
							if ( d < 60 ) {
								dancerDrag = dancer;
								pointDrag = point;
								dancer.frame = 0;
							}
						}
					} catch ( err ) {
						_didIteratorError8 = true;
						_iteratorError8 = err;
					} finally {
						try {
							if ( !_iteratorNormalCompletion8 && _iterator8.return ) {
								_iterator8.return();
							}
						} finally {
							if ( _didIteratorError8 ) {
								throw _iteratorError8;
							}
						}
					}
				}
			} catch ( err ) {
				_didIteratorError7 = true;
				_iteratorError7 = err;
			} finally {
				try {
					if ( !_iteratorNormalCompletion7 && _iterator7.return ) {
						_iterator7.return();
					}
				} finally {
					if ( _didIteratorError7 ) {
						throw _iteratorError7;
					}
				}
			}
		}
    }, {
		key: 'up',
		value: function up( e ) {
			dancerDrag = null;
		}
    }, {
		key: 'move',
		value: function move( e ) {
			var touchMode = e.targetTouches,
				pointer = void 0;
			if ( touchMode ) {
				e.preventDefault();
				pointer = touchMode[ 0 ];
			} else pointer = e;
			this.x = pointer.clientX;
			this.y = pointer.clientY;
		}
    } ] );
	return Pointer;
}();
// ---- init ----
var ground = 1.0;
var canvas = new Canvas();
var ctx = canvas.ctx;
var pointer = new Pointer( canvas );
var dancerDrag = null;
var pointDrag = null;
var Thedancer;

var img = document.createElement( 'img' );
var imagelooper = [];
for ( var i = 1; i < 10; i++ ) {
	imagelooper[ i ] = new Image();
	imagelooper[ i ].src = 'js/' + i + '.png';
}
var psize = ( Math.random() * 50 ) + 100

// function planets( id, x, y ) {
// 	ctx.font = "30px Arial";
// 	ctx.fillText( id, x, y );
//
// }



var fl = -50,
	z = 0;

function dancerpointdraw() {
	ctx.strokeStyle = 'RGBA(255,255,255,0.7)'
	for ( var i = 0; i < Thedancer[ 0 ].length; i++ ) {
		if ( ( Thedancer[ 0 ][ i ].x ) > canvas.width || ( Thedancer[ 0 ][ i ].x ) == canvas.width / 2 || ( Thedancer[ 0 ][ i ].x ) == canvas.width / 3 || ( Thedancer[ 0 ][ i ].x ) == Math.random() * canvas.width || ( Thedancer[ 0 ][ i ].y ) > canvas.height ) {
			Thedancer[ 0 ][ i ].x = Thedancer[ 0 ][ i ].x - 10
			Thedancer[ 0 ][ i ].y = Thedancer[ 0 ][ i ].y - 30
		}
		ctx.beginPath();
		ctx.arc( Thedancer[ 0 ][ i ].x, Thedancer[ 0 ][ i ].y, ( Math.random() * 2 ) + 2, 0, 2 * Math.PI );
		ctx.fill();

	}
	ctx.beginPath()
	ctx.moveTo( Thedancer[ 0 ][ 0 ].x, Thedancer[ 0 ][ 0 ].y );
	ctx.lineTo( Thedancer[ 0 ][ 1 ].x, Thedancer[ 0 ][ 1 ].y );
	ctx.moveTo( Thedancer[ 0 ][ 1 ].x, Thedancer[ 0 ][ 1 ].y );
	ctx.lineTo( Thedancer[ 0 ][ 2 ].x, Thedancer[ 0 ][ 2 ].y );
	ctx.moveTo( Thedancer[ 0 ][ 2 ].x, Thedancer[ 0 ][ 2 ].y );
	ctx.lineTo( Thedancer[ 0 ][ 5 ].x, Thedancer[ 0 ][ 5 ].y );
	ctx.lineTo( Thedancer[ 0 ][ 9 ].x, Thedancer[ 0 ][ 9 ].y );
	ctx.moveTo( Thedancer[ 0 ][ 2 ].x, Thedancer[ 0 ][ 2 ].y );
	ctx.lineTo( Thedancer[ 0 ][ 6 ].x, Thedancer[ 0 ][ 6 ].y );
	ctx.lineTo( Thedancer[ 0 ][ 10 ].x, Thedancer[ 0 ][ 10 ].y );
	ctx.moveTo( Thedancer[ 0 ][ 1 ].x, Thedancer[ 0 ][ 1 ].y );
	ctx.lineTo( Thedancer[ 0 ][ 3 ].x, Thedancer[ 0 ][ 3 ].y );
	ctx.lineTo( Thedancer[ 0 ][ 7 ].x, Thedancer[ 0 ][ 7 ].y );
	ctx.moveTo( Thedancer[ 0 ][ 1 ].x, Thedancer[ 0 ][ 1 ].y );
	ctx.lineTo( Thedancer[ 0 ][ 4 ].x, Thedancer[ 0 ][ 4 ].y );
	ctx.lineTo( Thedancer[ 0 ][ 8 ].x, Thedancer[ 0 ][ 8 ].y );
	ctx.stroke();
}
// ---- main loop ----
var dancerId = 0

function run() {
	requestAnimationFrame( run );
	ctx.clearRect( 0, 0, canvas.width, canvas.height );
	ctx.fillStyle = "#eee";
	var _iteratorNormalCompletion9 = true;
	var _didIteratorError9 = false;
	var _iteratorError9 = undefined;
	try {
		for ( var _iterator9 = dancers[ Symbol.iterator ](), _step9; !( _iteratorNormalCompletion9 = ( _step9 = _iterator9.next() )
				.done ); _iteratorNormalCompletion9 = true ) {
			var dancer = _step9.value;
			Thedancer = [ dancer.points ]
			if ( dancerId < dancers.length ) {
				dancerId += 1
			} else {
				dancerId = 0
			}
			Thedancer.id = dancerId //Math.floor(Math.random() * 8)
			dancerpointdraw()

			dancer.update();
		}
	} catch ( err ) {
		_didIteratorError9 = true;
		_iteratorError9 = err;
	} finally {
		try {
			if ( !_iteratorNormalCompletion9 && _iterator9.return ) {
				_iterator9.return();
			}
		} finally {
			if ( _didIteratorError9 ) {
				throw _iteratorError9;
			}
		}
	}
	for ( var i = 0; i < dancers.length; i++ ) {
		var a
		if ( i > 9 ) {
			a = i - 10
		} else {
			a = i + 1
		}
		img.src = 'js/' + a + '.png';
		ctx.drawImage( img, dancers[ i ].points[ 0 ].x - img.width / 2, dancers[ i ].points[ 0 ].y - img.height / 2 )

	}
}

// ---- robot structure ----
var struct = {
	points: [
        [ 0, -4, function ( s, d ) {
			this.y -= 0.06 * s;
        } ],
        [ 0, -16, function ( s, d ) {
			this.y -= 0.02 * s * d;
        } ],
        [ 0, 12, function ( s, d ) {
			this.y += 0.02 * s * d;
        } ],
        [ -12, 0 ],
        [ 12, 0 ],
        [ -3, 34, function ( s, d ) {
			if ( d > 0 ) {
				this.x += 0.01 * s;
				this.y -= 0.015 * s;
			} else {
				this.y += 0.02 * s;
			}
        } ],
        [ 3, 34, function ( s, d ) {
			if ( d > 0 ) {
				this.y += 0.02 * s;
			} else {
				this.x -= 0.01 * s;
				this.y -= 0.015 * s;
			}
        } ],
        [ -28, 0, function ( s, d ) {
			this.x += this.vx * 0.035;
			this.y -= 0.001 * s;
        } ],
        [ 28, 0, function ( s, d ) {
			this.x += this.vx * 0.035;
			this.y -= 0.001 * s;
        } ],
        [ -3, 64, function ( s, d ) {
			this.y += 0.02 * s;
			if ( d > 0 ) {
				this.y -= 0.01 * s;
			} else {
				this.y += 0.05 * s;
			}
        } ],
        [ 3, 64, function ( s, d ) {
			this.y += 0.02 * s;
			if ( d > 0 ) {
				this.y += 0.05 * s;
			} else {
				this.y -= 0.01 * s;
			}
        } ],
        [ 0, -0.1 ]
    ],
	links: [
        [ 3, 7, 12, 0.5 ],
        [ 1, 3, 24, 0.9 ],
        [ 1, 0, 18, 0.5 ],
        [ 0, 11, 60, 0.8 ],
        [ 5, 9, 16, 0.5 ],
        [ 2, 5, 32, 0.5 ],
        [ 1, 2, 50, 1 ],
        [ 6, 10, 16, 1.5 ],
        [ 2, 6, 32, 1.5 ],
        [ 4, 8, 12, 1.5 ],
        [ 1, 4, 24, 1.5 ]
    ],
};
// ---- instanciate robots ----
var dancers = [];
for ( var i = 0; i < 25; i++ ) {
	//Robot(color, light, size, x, y, struct)
	var vpos = Math.random() * 1;
	dancers.push( new Robot( i * 360 / 7, 0.1, ( Math.random() * 4 ) + 1, ( i + 1 ) * canvas.width / 26, canvas.height * ground - 200 + vpos, struct ) );
}

run();