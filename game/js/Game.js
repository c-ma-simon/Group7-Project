"use strict";

GameStates.makeGame = function (game, shared, shared_index, keys, hints, items, xy ) {
    var bouncy = null;
    this.facing = 'left';
    shared[0] = 'HELLO';
	shared[1] = 'WORLD';
	shared[2] = '12345';
	
	var door_names = ['door_side_square_lock5', 'door_side_tri_lock5', 'door_front_star_lock',
		'door_side_square_lock4', 'door_side_tri_lock4', 'door_front_circle_lock4',
		'door_side_square_lock3', 'door_side_tri_lock3', 'door_front_circle_lock3',
		'door_side_square_lock2', 'door_side_tri_lock2', 'door_front_circle_lock2',
		'door_side_square_lock', 'door_side_tri_lock', 'door_front_circle_lock']; 
	//all of the x coordinates of each door in order
	var x_door = [736, 1492, 1088,
		736, 1492, 1088,
		736, 1492, 1088,
		736, 1492, 1088,
		736, 1492, 1088];
	//y coordinates
	var y_door = [289, 289, 33,
		929, 929, 608,
		1569, 1569, 1248,
		2209, 2209, 1888,
		2849, 2849, 2528];
	//door sprites are stored in here, which will be used for collisions 
	var doors = [];
	//names off all keys? Keys might need to be renamed later depending on what they were called in the preloader
	//these key names are in the same order that the door_names are (i.e. you must have 'key_S5' to unlock 'door_side_square_lock5')
	var door_keys = ['key_S5', 'key_T5', 'key_X',
		'key_S4', 'key_T4', 'key_C4',
		'key_S3', 'key_T3', 'key_C3',
		'key_S2', 'key_T2', 'key_C2',
		'key_S1', 'key_T1', 'key_C1'];
	//unlocked doors names are stored in here
	var unlocked_doors = [];
	//used door keys are stored in here
	var used_keys = [];

    return {
		//adds all assets and things used in the game
		//currently, there is only the player and physics 
		create: function () {
			this.cursors = this.input.keyboard.createCursorKeys();

			this.mapfloor = this.add.sprite(0, 32, 'mapfloor');//floor is a big image instead of tiles

			//tilemap
			this.map = this.game.add.tilemap('gamemap');
			this.map.addTilesetImage('CSprojecttiles00');
			this.map.setCollisionByExclusion([0, -1]);

			this.mapwall = this.add.sprite(0, 32, 'mapwall');//cover up flickering wall tiles attempt

			this.layer = this.map.createLayer('tile wall');
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

			//if (keys.includes('key_C1') == false) {
			//	this.key_1A = this.add.sprite(400, 100, 'key_C1');
			//	this.key_1A.inputEnabled = true;
			//	this.key_1A.events.onInputDown.add(function () { this.collectItem(this.key_1A, keys, 'key_C1'); }, this);
			//}


			//note: you must also check used keys or else it will re-spawn after removing them from inventory  
			if (keys.includes('key_X') == false && used_keys.includes('key_X') == false) {
				this.bossKey = this.add.sprite(1896, 2876, 'key_X');//1088,200
				this.bossKey.inputEnabled = true;
				this.bossKey.events.onInputDown.add(function () { this.collectItem(this.bossKey, keys, 'key_X'); }, this);
           	        }
			
			if (keys.includes('key_S5') == false) {
				this.key_5L = this.add.sprite(888, 508, 'key_S5');
				this.key_5L.inputEnabled = true;
				this.key_5L.events.onInputDown.add(function () { this.collectItem(this.key_5L, keys, 'key_S5'); }, this);
			}
			
			if (keys.includes('key_T5') == false) {
				this.key_5R = this.add.sprite(360, 316, 'key_T5');
				this.key_5R.inputEnabled = true;
				this.key_5R.events.onInputDown.add(function () { this.collectItem(this.key_5R, keys, 'key_T5'); }, this);
			}
			
			if (keys.includes('key_C4') == false) {
				this.key_4C = this.add.sprite(1896, 316, 'key_C4');
				this.key_4C.inputEnabled = true;
				this.key_4C.events.onInputDown.add(function () { this.collectItem(this.key_4C, keys, 'key_C4'); }, this);
			}
			
			if (keys.includes('key_S4') == false) {
				this.key_4L = this.add.sprite(888, 1148, 'key_S4');
				this.key_4L.inputEnabled = true;
				this.key_4L.events.onInputDown.add(function () { this.collectItem(this.key_4L, keys, 'key_S4'); }, this);
			}
			
			if (keys.includes('key_T4') == false) {
				this.key_4R = this.add.sprite(360, 956, 'key_T4');
				this.key_4R.inputEnabled = true;
				this.key_4R.events.onInputDown.add(function () { this.collectItem(this.key_4R, keys, 'key_T4'); }, this);
			}
			
			if (keys.includes('key_C3') == false) {
				this.key_3C = this.add.sprite(1896, 956, 'key_C3');
				this.key_3C.inputEnabled = true;
				this.key_3C.events.onInputDown.add(function () { this.collectItem(this.key_3C, keys, 'key_C3'); }, this);
			}
			
			if (keys.includes('key_S3') == false) {
				this.key_3L = this.add.sprite(888, 1788, 'key_S3');
				this.key_3L.inputEnabled = true;
				this.key_3L.events.onInputDown.add(function () { this.collectItem(this.key_3L, keys, 'key_S3'); }, this);
			}
			
			if (keys.includes('key_T3') == false) {
				this.key_3R = this.add.sprite(360, 1596, 'key_T3');
				this.key_3R.inputEnabled = true;
				this.key_3R.events.onInputDown.add(function () { this.collectItem(this.key_3R, keys, 'key_T3'); }, this);
			}
			
			if (keys.includes('key_C2') == false) {
				this.key_2C = this.add.sprite(1896, 1596, 'key_C2');
				this.key_2C.inputEnabled = true;
				this.key_2C.events.onInputDown.add(function () { this.collectItem(this.key_2C, keys, 'key_C2'); }, this);
			}
			
			if (keys.includes('key_S2') == false) {
				this.key_2L = this.add.sprite(888, 2428, 'key_S2');
				this.key_2L.inputEnabled = true;
				this.key_2L.events.onInputDown.add(function () { this.collectItem(this.key_2L, keys, 'key_S2'); }, this);
			}
			
			if (keys.includes('key_T2') == false) {
				this.key_2R = this.add.sprite(360, 2236, 'key_T2');
				this.key_2R.inputEnabled = true;
				this.key_2R.events.onInputDown.add(function () { this.collectItem(this.key_2R, keys, 'key_T2'); }, this);
			}
			
			if (keys.includes('key_C1') == false) {
				this.key_1C = this.add.sprite(1896, 2236, 'key_C1');
				this.key_1C.inputEnabled = true;
				this.key_1C.events.onInputDown.add(function () { this.collectItem(this.key_1C, keys, 'key_C1'); }, this);
			}
			
			if (keys.includes('key_S1') == false) {
				this.key_1L = this.add.sprite(888, 3068, 'key_S1');
				this.key_1L.inputEnabled = true;
				this.key_1L.events.onInputDown.add(function () { this.collectItem(this.key_1L, keys, 'key_S1'); }, this);
			}
			
			if (keys.includes('key_T1') == false) {
				this.key_1R = this.add.sprite(360, 2876, 'key_T1');
				this.key_1R.inputEnabled = true;
				this.key_1R.events.onInputDown.add(function () { this.collectItem(this.key_1R, keys, 'key_T1'); }, this);
			}
			
			//if (keys.includes('key_C4') == false) {
			//	this.key_4C = this.add.sprite(1896, 2876, 'key_C4');
			//	this.key_4C.inputEnabled = true;
			//	this.key_4C.events.onInputDown.add(function () { this.collectItem(this.key_4C, keys, 'key_C4'); }, this);
			//}
			
			this.match_1A = this.add.sprite(290, 100, 'match');
			this.match_1A.inputEnabled = true;

			hints = this.add.sprite(150, 100, 'hint');

			
			//goes through all doors in doors_names
			//checks to see if they were unlocked
			//adds any locked doors
			//unlocked doors will be replaced with null in the doors array
			for (var i = 0; i < door_names.length; i++) {
				if (unlocked_doors.includes(door_names[i]) == false) {
					doors[i] = this.add.sprite(x_door[i], y_door[i], door_names[i]);
					this.physics.enable(doors[i], Phaser.Physics.ARCADE);
					doors[i].collideWorldBounds = true;
					this.game.physics.arcade.enable([doors[i]], [this.player]);
					this.game.physics.arcade.enable([doors[i]], [this.layer]);
					doors[i].body.onCollide = new Phaser.Signal();
					doors[i].body.immovable = true;
				}
				else {
					doors[i] == null;
                }
			}
			//character

			this.player = this.add.sprite(xy[0], xy[1], 'locke');
			this.physics.enable(this.player, Phaser.Physics.ARCADE);
			this.player.body.collideWorldBounds = true;
			this.player.inputEnabled = true;
			this.player.events.onInputDown.add(function () { this.inventory(); }, this);
			this.player.animations.add('down', [0, 1, 2, 3], 10, true);
			this.player.animations.add('left', [4, 5, 6, 7], 10, true);
			this.player.animations.add('up', [8, 9, 10, 11], 10, true);
			this.player.animations.add('right', [12, 13, 14, 15], 10, true);
			game.camera.follow(this.player);

			//collision items
			this.box_1A = this.add.sprite(360, 316, 'box60');
			this.box_1A.inputEnabled = true;
			this.physics.enable(this.box_1A, Phaser.Physics.ARCADE);
			this.box_1A.body.collideWorldBounds = true;
            		this.game.physics.arcade.enable([this.box_1A],[this.player]);
            		this.box_1A.body.onCollide = new Phaser.Signal();


			this.box_2A = this.add.sprite(1896, 316, 'box60');
			this.box_2A.inputEnabled = true;
			this.physics.enable(this.box_2A, Phaser.Physics.ARCADE);
			this.box_2A.body.collideWorldBounds = true;
            		this.game.physics.arcade.enable([this.box_2A],[this.player]);
            		this.box_2A.body.onCollide = new Phaser.Signal();
			
			//foreground of tilemap
			//this.bg = this.map.createLayer('foreground');
		},
		//loop that responds to user input
		//currently only allows player to move the character
		update: function () {
			this.physics.arcade.collide(this.player, this.layer);
			this.physics.arcade.collide(this.box_1A, this.layer);
			this.physics.arcade.collide(this.box_1A, this.player);

			//door collisions
			//goes through each name in door_names
			//checks to see if was unlcoked earlier
			//if it was not, it will collide
			//each collision call the function unlockDoor()
			for (var i = 0; i < door_names.length; i++) {
				if (unlocked_doors.includes(door_names[i]) == false) {
					this.physics.arcade.collide(doors[i], this.layer);
					this.physics.arcade.collide(doors[i], this.player, this.unlockDoor, null, this);
				}
			}

			//character movement
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
			//quits game if last door is unlocked
			if (unlocked_doors.includes('door_front_star_lock')) {	
				unlocked_doors = [];
				used_keys = [];
				doors = [];
				xy = [1110, 320];
				this.quitGame();
            }
			//saves coordinates that the player was at last
			//NOTE: the array xy is in main.js, which has the original
			//spawn points
			xy[0] = this.player.world.x;
			xy[1] = this.player.world.y;
            
		},

		//adds door to doors array
		addDoor: function (sprite) {
			doors[doors.length] = sprite;
		},

		//removes item from an array
		removeItem: function(string, array){
			const index = array.indexOf(string);
			array.splice(index, 1);
		}, 

		//checks to see if door can be unlocked an unlocks it
		//unlocked doors are killed and replaced with null in doors array
		//it will be added to the unlocked doors array and the key
		//will be added to the used keys array
		unlockDoor: function (door, player) {
			var index = doors.indexOf(door);
			if (keys.includes(door_keys[index])) {
				this.removeItem(door_keys[index], keys);
				door.kill();
				doors[index] = null;
				unlocked_doors[unlocked_doors.length] = door_names[index];
				used_keys[used_keys.length] = door_keys[index];
            }
		},
		//kills item and adds it to the correct list
		//needs the stprite, the list it goes in, and the correct name of the sprite
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
			this.state.start('endGame');
		},
	};	

  
};
