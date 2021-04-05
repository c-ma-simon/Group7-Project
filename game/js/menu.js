"use strict";

GameStates.makeMenu = function (game, shared, keys, hints, items) {

	return {

		create: function () {
			this.background = game.add.sprite(0, 0, 'inventory');
			this.exit = game.add.sprite(700, 50, 'yellowexit');
			this.exit.inputEnabled = true;
			this.exit.events.onInputDown.add(function () { this.exitMenu(); }, this);
			var x = 125;
			var y0 = 200;
			var y1 = 300;
			var y2 = 400;
			for (var i = 0; i < keys.length; i++) {
				game.add.sprite(x, y0, keys[i]);
				x += 50;
			}
			x = 200;
			for (var i = 0; i < hints.length; i++) {
				game.add.sprite(x, y1, hints[i]);
				x += 50;
			}
			x = 200;
			for (var i = 0; i < items.length; i++) {
				game.add.sprite(x, y1, items[i]);
				x += 50;
			}
			x = 200;

		},

		update: function () {


		},
		exitMenu: function () {
			this.state.start('Game');
		},
	};


};
