"use strict";

GameStates.makePuzzle = function(game) {

    
	return {

		create: function () {
			this.background = game.add.sprite(0,0,'passwordpage');
			this.cursors = this.input.keyboard.createCursorKeys();
			this.exit = game.add.sprite(700, 50, 'exit');
			this.exit.inputEnabled = true;				
			this.exit.events.onInputDown.add( function() { this.quitLock(); }, this );
		},

		update: function () {
			
		},

		quitLock: function () {

			this.state.start('Game');

		},

	};
};
