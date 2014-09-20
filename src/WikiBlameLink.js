/**
 * Add a link to WikiBlame
 * @author: [[User:Helder.wiki]]
 */
/*jslint browser: true, white: true, devel: true, regexp: true */
/*global jQuery, mediaWiki */
( function ( mw, $ ) {
'use strict';

function addWikiBlameLink(){
	$( mw.util.addPortletLink(
		'p-cactions',
		'#',
		'WikiBlame',
		'ca-blame',
		'Identificar o autor de um trecho da página, usando o WikiBlame'
	) ).click( function( e ) {
		var url, langMap, data,
			tip = 'Digite um texto no campo abaixo para saber quem o incluiu na página atual.',
			text = prompt( tip, 'Texto' );
		e.preventDefault();
		if ( text === null ){
			return;
		}
		url = 'http://wikipedia.ramselehof.de/wikiblame.php?';
		langMap = {
			commonswiki: 'commons',
			incubatorwiki: 'incubator',
			mediawikiwiki: 'www',
			metawiki: 'meta',
			simplewiki: 'simple',
			sourceswiki: 'blank',
			specieswiki: 'species',
			wikidatawiki:'www'
		};
		data = {
			'article': mw.config.get( 'wgPageName' ),
			'user_lang': mw.config.get( 'wgUserLanguage' )
				.replace( /-.+$/g, '' ),
			'lang': langMap[ mw.config.get( 'wgDBname' ) ]
				|| mw.config.get('wgContentLanguage'),
			'needle': text,
			'force_wikitags': 'on',
			'project': mw.config.get( 'wgServer' )
				.replace( /\/\/(?:[a-z]+\.)?([a-z]+).org/, '$1' )
		};
		window.open( url + $.param( data ), '_blank' );
	});
}

if ( mw.config.get( 'wgNamespaceNumber' ) >= 0 ) {
	$( addWikiBlameLink );
}

}( mediaWiki, jQuery ) );
