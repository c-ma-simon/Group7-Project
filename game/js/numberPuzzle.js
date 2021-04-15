"use strict";

GameStates.makeNumber = function (game, shared, shared_index, keys, hints, items) {
	var password;
	var numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	var buttons = [];
	var answer = [];
	var answer_size;
	var number_answer = [];
	var x = 100;
	var y = 200;

	var unlocked = [false, false];
	return {
		//randomly adds all letters (buttons), including the answer to the page
		//in 4 x n (length of word) rectangle
		create: function () {
			password = shared[window.shared_index];
			answer_size = 0;
			this.background = game.add.sprite(0, 0, 'passwordpage');
			this.cursors = this.input.keyboard.createCursorKeys();
			this.exit = game.add.sprite(700, 50, 'exit');
			this.exit.inputEnabled = true;
			this.exit.events.onInputDown.add(function () { this.quitLock(); }, this);
			this.reset = game.add.sprite(50, 550, 'reset');
			this.reset.inputEnabled = true;
			this.reset.events.onInputDown.add(function () { this.resetAnswer(); }, this);
			for (var i = 0; i <= 10; i++) {
				buttons[i] = game.add.sprite(x, y, numbers[i]);
				const num = numbers[i];
				buttons[i].inputEnabled = true;
				buttons[i].events.onInputDown.add(function () { this.addNumber(num); }, this);
				x += 100;
				if (i == 4) {
					y += 100; 
					x = 100;
                }
			}
		},
		//loop that checks for input from user
		//checks to see if the letters they've chosen are 
		//correct. If they are, it will call quitLock();
		update: function () {
			var equal = true;
			if (answer_size == password.length) {
				for (var i = 0; i < answer_size; i++) {
					
					if (number_answer[i] != password[i]) {
						equal = false;
					}
				}
			}
			else {
				equal = false;
            }
			if (equal == true || unlocked[window.shared_index] == true) {
				unlocked[window.shared_index] = true;
				equal == false;
				this.quitLock();
			}
		},
		//adds letter that the player has chosen to top of 
		//the page. It will also add it to an array to
		//compare to the correct answer
		addNumber: function (num) {
			if (answer.length < 6) {
				const answer_x = 100;
				const answer_y = 120;
				answer[answer_size] = game.add.sprite((answer_x + (100 * answer_size)), answer_y, num);
				number_answer[answer_size] = num;
				answer_size++;
			}

		},
		resetAnswer: function () {
			for (var i = 0; i < answer.length; i++) {
				answer[i].kill();
			}
			answer_size = 0;
			number_answer = [];
			answer = [];
			x = 100;
			y = 200;
        },
		//exits the puzzle gamestate and starts the GameState. 
		//kills all buttons 
		quitLock: function () {
			for (var i = 0; i <= 10; i++) {
				buttons[i].kill();
			}
			this.resetAnswer();
			this.state.start('Game');
		},

	};
};
// JavaScript source code
