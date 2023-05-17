
const backspaceEvent = new KeyboardEvent( 'keydown', {

	key: 'Backspace',
	keyCode: 8,
	code: 'Backspace',
	which: 8,
	bubbles: true,
	cancelable: true

} );

const observer = new MutationObserver( mutations => {

	for( const mutation of mutations ) {

		for( const node of [ ... mutation.removedNodes ] ) {

			if( node.nodeName == 'INPUT' && node.baseURI.includes( '.play' ) ) stopAutoComplete( );

		}	

	}

} );

observer.observe( document.body, { childList: true } );

const overrides = {

	[ String.fromCharCode( 160 ) ]: ' '

}

let _break = true;
let running = false;
const keyres = e => {
	
	e.preventDefault( );
	return;
	
}

const autoComplete = async ( delay, variation, mistakeChance, correctionTime ) => {

	running = true;
	_break = false;

	document.onkeyup = keyres;
	document.onkeydown = keyres;

	const elements = [ ... document.querySelectorAll( '.token span.token_unit._clr' ) ];

	const characters = elements.map( element => element.firstChild?.classList?.contains( '_enter' ) ? '\n' : element.textContent[ 0 ] ).map( c => overrides.hasOwnProperty( c ) ? overrides[ c ] : c );

	for( let i = 0; i < characters.length; i++ ) {

		if( _break ) return;

		if( Math.random( ) < mistakeChance / 100 ) {

			window.core.record_keydown_time( ' ' );
			await new Promise( r => setTimeout( r, Math.round( correctionTime / 2 ) ) );

			if( [ ... document.querySelectorAll( '.token span.token_unit:not(._clr)' ) ].at( -1 )?.classList.contains( '_err' ) ) {

				document.dispatchEvent( backspaceEvent );
				await new Promise( r => setTimeout( r, Math.round( correctionTime / 2 ) ) );

			}

		}

		window.core.record_keydown_time( characters[ i ] );

		await new Promise( r => setTimeout( r, Math.random( ) * ( ( delay + variation ) - ( delay - variation ) ) + ( delay - variation ) ) );

	}

}

const stopAutoComplete = ( ) => {

	_break = true;
	running = false;

	document.onkeyup = ( ) => { }
	document.onkeydown = ( ) => { }

}

document.addEventListener( 'AEDC', e => running ? stopAutoComplete( ) : autoComplete( e.detail.keystrokeDelay, e.detail.delayVariation, e.detail.mistakeChance, e.detail.correctionTime ) );
