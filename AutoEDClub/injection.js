
let keystrokeDelay = 100;
let delayVariation = 10;

const element = document.createElement( "script" );
element.type = "text/javascript";
element.src = chrome.runtime.getURL( "AutoEDClub/core.js" );
document.body.appendChild( element );

document.onkeydown = ( e ) => {

	if( e.key == "F8" ) {

		chrome.storage.local.get( [ "keystrokeDelay", "delayVariation" ], ( res ) => {

			typeof res[ "keystrokeDelay" ] == "number" ? keystrokeDelay = res[ "keystrokeDelay" ] : chrome.storage.local.set( { keystrokeDelay: keystrokeDelay } )
			typeof res[ "delayVariation" ] == "number" ? delayVariation = res[ "delayVariation" ] : chrome.storage.local.set( { delayVariation: delayVariation } )

			document.dispatchEvent( new CustomEvent( "AEDC", {

				detail: {

					keystrokeDelay: keystrokeDelay,
					delayVariation: delayVariation

				} 

			} ) );

		} );

	}

}
