
const observer = new MutationObserver( ( mutations ) => {

	mutations.forEach( ( mutation ) => {

		const nodes = [ ... mutation.removedNodes ];

		nodes.forEach( ( node ) => {

			if( node.nodeName == "INPUT" && node.baseURI.includes( ".play" ) ) {

				stopAutoComplete( );

			}

		} );

	} );

} );

observer.observe( document.body, {

	childList: true

} );

const overrides = {

	[ String.fromCharCode( 160 ) ]: ' '

}

let _break = true;
let running = false;
const keyres = ( e ) => {
	
	e.preventDefault( );
	return;
	
}

const autoComplete = async ( delay, variation ) => {

	running = true;
	_break = false;

	document.onkeyup = keyres;
	document.onkeydown = keyres;

	const elements = [ ... document.querySelectorAll( ".token span.token_unit._clr" ) ];

	const characters = elements.map( element => {

		if( element.firstChild?.classList?.contains( "_enter" ) ) return "\n";

		return element.textContent[ 0 ];

	} ).map( c => overrides.hasOwnProperty( c ) ? overrides[ c ] : c );

	for( let i = 0; i < characters.length; i++ ) {

		if( _break ) return;

		window.core.record_keydown_time( characters[ i ] );

		await new Promise( r => setTimeout( r, Math.random( ) * ( ( delay + variation ) - ( delay - variation ) ) + ( delay - variation ) ) )

	}

}

const stopAutoComplete = ( ) => {

	_break = true;

	running = false;

	document.onkeyup = ( ) => { }
	document.onkeydown = ( ) => { }

}

document.addEventListener( "AEDC", ( e ) => running ? stopAutoComplete( ) : autoComplete( e.detail.keystrokeDelay, e.detail.delayVariation ) );
