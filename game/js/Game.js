"use strict";

GameStates.makeGame = function (game, shared, shared_index, keys, hints, items ) {
    var bouncy = null;
    this.facing = 'left';
    shared[0] = 'HELLO';
	shared[1] = 'WORLD';
	shared[2] = '12345';
    return {
		//adds all assets and things used in the game
		//currently, there is only the player and physics 
		create: function () {
			this.cursors = this.input.keyboard.createCursorKeys();

			//this.stage.backgroundColor = '#BFF068';

			//tilemap
			this.map = this.game.add.tilemap('testmap1');
			this.map.addTilesetImage('CSprojecttiles00');
			this.map.setCollisionByExclusion([0, -1]);

			this.bg = this.map.createLayer('background');
			this.bg.resizeWorld();
			this.bg.cameraOffset.set(0, 0);
			this.layer = this.map.createLayer('layer');
			this.layer.resizeWorld();
			this.layer.cameraOffset.set(0, 0);
			this.map.setCollisionBetween(1, 9999, true, this.layer);


			//other items
			this.yellow = this.add.sprite(400, 400, 'temp_lock_1');
			this.yellow.inputEnabled = true;
			this.yellow.events.onInputDown.add(function () { this.lockOne(); }, this);

			this.red = this.add.sprite(500, 500, 'temp_lock_2');
			this.red.inputEnabled = true;
			this.red.events.onInputDown.add(function () { this.lockTwo(); }, this);

			if (keys.includes('key_1') == false) {
				this.key_1A = this.add.sprite(400, 100, 'key_1');
				this.key_1A.inputEnabled = true;
				this.key_1A.events.onInputDown.add(function () { this.collectItem(this.key_1A, keys, 'key_1'); }, this);
			}		
			this.match_1A = this.add.sprite(250, 100, 'match');
			this.match_1A.inputEnabled = true;
		
			//character

			this.player = this.add.sprite(300, 300, 'locke');
			this.physics.enable(this.player, Phaser.Physics.ARCADE);
			this.player.body.collideWorldBounds = true;
			this.player.inputEnabled = true;
			this.player.events.onInputDown.add(function () { this.inventory(); }, this);
			this.player.animations.add('down', [0, 1, 2, 3], 10, true);
			this.player.animations.add('left', [4, 5, 6, 7], 10, true);
			this.player.animations.add('up', [8, 9, 10, 11], 10, true);
			this.player.animations.add('right', [12, 13, 14, 15], 10, true);
			
			//collision items
			this.box_1A = this.add.sprite(100, 100, 'box60');
			this.box_1A.inputEnabled = true;
			this.physics.enable(this.box_1A, Phaser.Physics.ARCADE);
			this.box_1A.body.collideWorldBounds = true;
            this.game.physics.arcade.enable([this.box_1A],[this.player]);
            this.box_1A.body.onCollide = new Phaser.Signal();


			//foreground of tilemap
			this.bg = this.map.createLayer('foreground');
		},
		//loop that responds to user input
		//currently only allows player to move the character
		update: function () {
			this.physics.arcade.collide(this.player, this.layer);
			this.physics.arcade.collide(this.box_1A, this.layer);
			this.physics.arcade.collide(this.box_1A, this.player);

			if (this.cursors.left.isDown){
				this.player.body.velocity.x = -300;

				if (this.facing != 'left')
				{
					this.player.animations.play('left');
					this.facing = 'left';
				}
			}
			else if (this.cursors.right.isDown)
			{
				this.player.body.velocity.x = 300;

				if (this.facing != 'right')
				{	
					this.player.animations.play('right');
					this.facing = 'right';
					}     
			}
			else if (this.cursors.up.isDown){
				this.player.body.velocity.y = -300;
            
				if(this.facing != 'up'){
					this.player.animations.play('up');
					this.facing = 'up';
				}
			}
			else if(this.cursors.down.isDown){
				this.player.body.velocity.y = 300;
				if(this.facing != 'down'){
					this.player.animations.play('down');
					this.facing = 'down';
				}
			}
			else
			{
				if (this.facing != 'idle')
				{
					this.player.animations.stop();

					if (this.facing == 'left')
					{
						this.player.frame = 4;
					}
					else if(this.facing == 'right')
					{
						this.player.frame = 12;
					}
					else if(this.facing == 'up'){
						this.player.frame = 8;
					}
					else{
						this.player.frame = 0;
					}

					this.facing = 'idle';
					this.player.body.velocity.y = 0;
					this.player.body.velocity.x = 0;
                
				}
			}

            
		},

		//kills item and adds it to the correct list
		//needs the stprite, the list it goes in, and the correct name of the spite
		collectItem: function(sprite, array, string){
			sprite.kill();
			array[array.length] = string;
		},
		lockOne: function(){
			window.shared_index = 0;
			this.state.start('makePuzzle');
		},
		lockTwo: function(){
			window.shared_index = 2;
			this.state.start('numberPuzzle');
		},
		inventory: function () {
			this.state.start('menu');
		},
		//this will eventually end the game, but right now it starts the 
		//puzzle
		quitGame: function () {
			//this.player.kill();
			this.state.start('endGame');
		},
	};	

  
};
