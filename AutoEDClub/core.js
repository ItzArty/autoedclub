
const overrides = {

	[ String.fromCharCode( 160 ) ]: ' '

}

let lastChar = 0;
let _break = true;
let running = false;

const autoComplete = async ( delay, variation ) => {

	running = true;

	const elements = [ ... document.querySelectorAll( ".token span.token_unit" ) ];

	const characters = elements.map( element => {

		if( element.firstChild?.classList?.contains( "_enter" ) ) return "\n";

		return element.textContent[ 0 ];

	} ).map( c => overrides.hasOwnProperty( c ) ? overrides[ c ] : c );

	for( ( lastChar > 0 ) ? lastChar : lastChar = 0; lastChar < characters.length; lastChar++ ) {

		if( _break ) return;

		window.core.record_keydown_time( characters[ lastChar ] );

		await new Promise( r => setTimeout( r, Math.random( ) * ( ( delay + variation ) - ( delay - variation ) ) + ( delay - variation ) ) )

	}

}

document.addEventListener( "AEDC", ( e ) => {

	if( running ) {

		_break = true;

		running = false;

	} else {

		_break = false;

		autoComplete( e.detail.keystrokeDelay, e.detail.delayVariation );

	}

} );