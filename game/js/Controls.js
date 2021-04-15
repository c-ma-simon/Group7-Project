"use strict";

GameStates.makeControls = function (game) {

	return {

		create: function () {
			game.add.sprite(0, 0, 'controls');
			this.exit = game.add.sprite(700, 50, 'exit');
			this.exit.inputEnabled = true;
			this.exit.events.onInputDown.add(function () { this.backToMenu(); }, this);
		},

		update: function () {

		},

		backToMenu: function () {
			//this.player.kill();
			this.state.start('MainMenu');
		},
	};


};
// JavaScript source code
