
const ksdElement = document.querySelector( "#_aedc_ksd" );
const dvElement = document.querySelector( "#_aedc_dv" );

let keystrokeDelay = 100;
let delayVariation = 10;

chrome.storage.local.get( [ "keystrokeDelay", "delayVariation" ], ( res ) => {

	typeof res[ "keystrokeDelay" ] == "number" ? keystrokeDelay = res[ "keystrokeDelay" ] : chrome.storage.local.set( { keystrokeDelay: keystrokeDelay } )
	typeof res[ "delayVariation" ] == "number" ? delayVariation = res[ "delayVariation" ] : chrome.storage.local.set( { delayVariation: delayVariation } )

	ksdElement.value = keystrokeDelay;
	dvElement.value = delayVariation;

} );

ksdElement.onchange = ( ) => chrome.storage.local.set( { keystrokeDelay: Number( ksdElement.value ) } )
dvElement.onchange = ( ) => chrome.storage.local.set( { delayVariation: Number( dvElement.value ) } )

document.querySelector( "brand" ).onclick = ( ) => window.open( "https://www.itzarty.cf", "_blank_" );
