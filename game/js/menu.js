"use strict";

GameStates.makeMenu = function (game, shared) {

	return {

		create: function () {
			this.exit = game.add.sprite(700, 50, 'exit');
			this.exit.inputEnabled = true;
			this.exit.events.onInputDown.add(function () { this.exitMenu(); }, this);
		},

		update: function () {


		},
		exitMenu: function () {
			this.state.start('Game');
		},
	};


};
