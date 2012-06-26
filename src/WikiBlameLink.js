/**
 * Add a link to WikiBlame
 * @author: [[User:Helder.wiki]]
 * @tracking: [[Special:GlobalUsage/User:Helder.wiki/Tools/WikiBlameLink.js]] ([[File:User:Helder.wiki/Tools/WikiBlameLink.js]])
 */
/*jslint browser: true, white: true, devel: true, regexp: true */
/*global jQuery, mediaWiki */
( function ( $, mw /* , undefined */ ) {
'use strict';

function addWikiBlameLink(){
	$( mw.util.addPortletLink(
		'p-cactions',
		'#',
		'WikiBlame',
		'ca-blame',
		'Identificar o autor de um trecho da página, usando o WikiBlame'
	)).click( function( e ) {
		e.preventDefault();
		var tip = 'Digite um texto no campo abaixo para saber quem o incluiu na página atual.',
			url = 'http://wikipedia.ramselehof.de/wikiblame.php?',
			langMap = {
				metawiki: 'meta',
				specieswiki: 'species',
				commonswiki: 'commons',
				mediawikiwiki: 'www'
			},
			data = {
				'article': mw.config.get('wgPageName'),
				'user_lang': mw.config.get('wgUserLanguage').replace(/-.+/g, ''),
				'lang': langMap[ mw.config.get('wgDBname') ] || mw.config.get('wgContentLanguage'),
				'needle': prompt(tip, 'Texto'),
				'force_wikitags': 'on',
				'project': mw.config.get('wgServer')
					.replace( /\/\/[a-z]+\.([a-z]+).org/, '$1' )
			};
		window.open( url + $.param( data ), '_blank');
	});
}

if ( mw.config.get( 'wgNamespaceNumber' ) >= 0 ) {
	$(addWikiBlameLink);
}

}( jQuery, mediaWiki ) );