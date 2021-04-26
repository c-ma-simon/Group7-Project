"use strict";

window.onload = function() {

	//	Create your Phaser game and inject it into the 'game' div.
	//	We did it in a window.onload event, but you can do it anywhere (requireJS load, anonymous function, jQuery dom ready, - whatever floats your boat)
	var game = new Phaser.Game( 768, 640, Phaser.AUTO, 'game' );

	//	Add the States your game has.
	//	You don't have to do this in the html, it could be done in your Boot state too, but for simplicity I'll keep it here.
	
	// An object for shared variables, so that them main menu can show
	// the high score if you want.
	var shared = [];
	var keys = [];
	var hints = [];
	var items = [];
	var xy = [1110,320];
	var shared_index = 0;
	game.state.add( 'Boot', GameStates.makeBoot( game ) );
	game.state.add('Preloader', GameStates.makePreloader(game));
	game.state.add('controls', GameStates.makeControls(game));
	game.state.add( 'MainMenu', GameStates.makeMainMenu( game, shared, shared_index, keys, hints, items ) );
	game.state.add('Game', GameStates.makeGame(game, shared, shared_index, keys, hints, items, xy ) );
	game.state.add('makePuzzle', GameStates.makePuzzle(game, shared, shared_index, keys, hints, items ) );
	game.state.add('menu', GameStates.makeMenu(game, shared, keys, hints, items)); 
	game.state.add('numberPuzzle', GameStates.makeNumber(game, shared, shared_index, keys, hints, items)); 
	game.state.add('endGame', GameStates.endGame(game, shared, keys, hints, items, shared_index));
	//	Now start the Boot state.
	game.state.start('Boot');

};
