"use strict";

GameStates.makePuzzle = function (game, shared, shared_index, keys, hints, items) {
    var word;
	var abc = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T',
	'U','V','W','X','Y','Z'];
	var buttons = [];
	var answer = [];
	var letter_answer = [];
	var random_num;
	var random_letter;
	var x = 100;
	var y = 200;
	
	var unlocked = [false, false];
	return {
		//randomly adds all letters (buttons), including the answer to the page
		//in 4 x n (length of word) rectangle
		create: function () {
			word = shared[window.shared_index];
			this.background = game.add.sprite(0,0,'passwordpage');
			this.cursors = this.input.keyboard.createCursorKeys();
			this.exit = game.add.sprite(700, 50, 'exit');
			this.exit.inputEnabled = true;				
			this.exit.events.onInputDown.add( function() { this.quitLock(); }, this );
			for(var j = 0; j < word.length; j++){
				buttons[j] = [];
			}
			for(var i = 0; i < word.length; i++){
				random_num = Math.floor(Math.random() * Math.floor(4));
				y = y + (50 * random_num);
				buttons[i][random_num] = game.add.sprite(x, y, word[i]);
				buttons[i][random_num].inputEnabled = true;
				const index = i;
				const letter = word[i];
				buttons[i][random_num].events.onInputDown.add( function() { this.addLetter(index, letter); }, this );
				x += 100;
				y = 200;
			}
			x = 100;
			for(var i = 0; i < word.length; i ++){
				for(var j = 0; j < 4; j++){
					if(buttons[i][j] == null){
						random_letter = Math.floor(Math.random() * Math.floor(26));
						buttons[i][j] = game.add.sprite(x, (y +(50 * j)), abc[random_letter]);
						const index = i;
						const letter = abc[random_letter];
						buttons[i][j].inputEnabled = true;
						buttons[i][j].events.onInputDown.add( function() { this.addLetter(index, letter); }, this );
					}
				}
				x += 100;
			}
			
		},
		//loop that checks for input from user
		//checks to see if the letters they've chosen are 
		//correct. If they are, it will call quitLock();
		update: function () {
			var equal = true;
			for(var i = 0; i < word.length; i++){
				if(letter_answer[i] != word[i]){
					equal = false;
				}
			}
			if(equal == true || unlocked[window.shared_index] == true){
				unlocked[window.shared_index] = true;
				equal == false;
				this.quitLock();
			}
		},
		//adds letter that the player has chosen to top of 
		//the page. It will also add it to an array to
		//compare to the correct answer
		addLetter: function (index, letter){
			if(answer[index] != null){
				answer[index].kill();
			}
			const answer_x = 150;
			const answer_y = 100;
			answer[index] = game.add.sprite((answer_x + (index * 100)),answer_y, letter);
			letter_answer[index] = letter;
		},
		//exits the puzzle gamestate and starts the GameState. 
		//kills all buttons 
		quitLock: function () {
			for(var i = 0; i < word.length; i ++){
				for(var j = 0; j < 4; j++){
					buttons[i][j].kill();
				}
			}
			buttons = [];
			answer = [];
			letter_answer = [];
			random_num = null;
			random_letter = null;
			x = 100;
			y = 200;
			this.state.start('Game');
		},

	};
};
