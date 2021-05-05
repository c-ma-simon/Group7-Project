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
		'door_side_square_lock', 'door_side_tri_lock2', 'door_front_circle_lock2']; 
	var x_door = [736, 1492, 1088,
		736, 1492, 1088,
		736, 1492, 1088,
		736, 1492, 1088,
		736, 1492, 1088];
	var y_door = [289, 289, 33,
		929, 929, 608,
		1569, 1569, 1248,
		2209, 2209, 1888,
		2849, 2849, 2528];
	var doors = [];
	//names off all keys? Keys might need to be renamed later depending on what they were called in the preloader
	//these key names are in the same order that the door_names are (i.e. you must have 'key_ss5' to unlock 'door_side_square_lock5')
	var door_keys = ['key_ss5', 'key_st5', 'key_X',
		'key_ss4', 'key_st4', 'key_sc4',
		'key_ss3', 'key_st3', 'key_sc3',
		'key_ss2', 'key_st2', 'key_sc2',
		'key_ss', 'key_st', 'key_sc'];
	var unlocked_doors = [];
	var used_keys = [];
    return {
		//adds all assets and things used in the game
		//currently, there is only the player and physics 
		create: function () {
			this.cursors = this.input.keyboard.createCursorKeys();

			//this.stage.backgroundColor = '#BFF068';
			this.mapfloor = this.add.sprite(0, 32, 'mapfloor');//floor is a big image instead of tiles

			//tilemap
			this.map = this.game.add.tilemap('gamemap');
			this.map.addTilesetImage('CSprojecttiles00');
			this.map.setCollisionByExclusion([0, -1]);

			this.mapwall = this.add.sprite(0, 32, 'mapwall');//cover up flickering wall tiles attempt

			//this.map = this.game.add.tilemap('testmap1');
			//this.map.addTilesetImage('CSprojecttiles00');
			//this.map.setCollisionByExclusion([0, -1]);

			//this.bg = this.map.createLayer('tile floor');
			//this.bg.resizeWorld();
			//this.bg.cameraOffset.set(0, 0);

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

			if (keys.includes('key_C1') == false) {
				this.key_1A = this.add.sprite(400, 100, 'key_C1');
				this.key_1A.inputEnabled = true;
				this.key_1A.events.onInputDown.add(function () { this.collectItem(this.key_1A, keys, 'key_C1'); }, this);
			}

			if (keys.includes('key_S1') == false) {
				this.key_5L = this.add.sprite(988, 289, 'key_S1');
				this.key_5L.inputEnabled = true;
				this.key_5L.events.onInputDown.add(function () { this.collectItem(this.key_5L, keys, 'key_S1'); }, this);
			}
			//note: you must also check used keys or else it will re-spawn after removing them from inventory  
			if (keys.includes('key_X') == false && used_keys.includes('key_X') == false) {
				this.bossKey = this.add.sprite(1088, 200, 'key_X');
				this.bossKey.inputEnabled = true;
				this.bossKey.events.onInputDown.add(function () { this.collectItem(this.bossKey, keys, 'key_X'); }, this);
            }
			this.match_1A = this.add.sprite(290, 100, 'match');
			this.match_1A.inputEnabled = true;

			hints = this.add.sprite(150, 100, 'hint');
			//add doors
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
			//doors (floors 5 to 1 corresponds up to down, L=left,C=center,R=Right)
			/*
			if (unlocked_doors.includes('door_side_square_lock5') == false) { 88
				this.door_5L = this.add.sprite(736, 289, 'door_side_square_lock5');
				this.physics.enable(this.door_5L, Phaser.Physics.ARCADE);
				this.door_5L.body.collideWorldBounds = true;
				this.game.physics.arcade.enable([this.door_5L], [this.player]);
				this.door_5L.body.onCollide = new Phaser.Signal();
				//this.door_5L.body.immovable=true;

				//NOTE: "key_word" needs to be changed to the correct key!
				this.addDoor(this.door_5L, "key_word");
			}
			
			if (unlocked_doors.includes('door_side_tri_lock5') == false) { 88
				this.door_5R = this.add.sprite(1492, 289, 'door_side_tri_lock5');
				this.physics.enable(this.door_5R, Phaser.Physics.ARCADE);
				this.door_5R.body.collideWorldBounds = true;
				this.game.physics.arcade.enable([this.door_5R], [this.player]);
				this.door_5R.body.onCollide = new Phaser.Signal();
				this.door_5R.body.immovable = true;

				//NOTE: "key_word" needs to be changed to the correct key!
				this.addDoor(this.door_5R, "key_word");
			}
			if (unlocked_doors.includes('door_front_star_lock5') == false) { 88
				this.door_5C = this.add.sprite(1088, 33, 'door_front_star_lock');
				this.physics.enable(this.door_5C, Phaser.Physics.ARCADE);
				this.door_5C.body.collideWorldBounds = true;
				this.game.physics.arcade.enable([this.door_5C], [this.player]);
				this.door_5C.body.onCollide = new Phaser.Signal();
				this.door_5C.body.immovable = true;

				//NOTE: "key_word" needs to be changed to the correct key!
				this.addDoor(this.door_5C, "key_word");
			}
			if (unlocked_doors.includes('door_side_square_lock4') == false) {
				this.door_4L = this.add.sprite(736, 929, 'door_side_square_lock4');
				this.physics.enable(this.door_4L, Phaser.Physics.ARCADE);
				this.door_4L.body.collideWorldBounds = true;
				this.game.physics.arcade.enable([this.door_4L], [this.player]);
				this.door_4L.body.onCollide = new Phaser.Signal();
				this.door_4L.body.immovable = true;

				//NOTE: "key_word" needs to be changed to the correct key!
				this.addDoor(this.door_4L, "key_word");
			}
			if (unlocked_doors.includes('door_side_tri_lock4') == false) {
				this.door_4R = this.add.sprite(1492, 929, 'door_side_tri_lock4');
				this.physics.enable(this.door_4R, Phaser.Physics.ARCADE);
				this.door_4R.body.collideWorldBounds = true;
				this.game.physics.arcade.enable([this.door_4R], [this.player]);
				this.door_4R.body.onCollide = new Phaser.Signal();
				this.door_4R.body.immovable = true;
			}
			if (unlocked_doors.includes('door_front_circle_lock4') == false) {
				this.door_4C = this.add.sprite(1088, 608, 'door_front_circle_lock4');
				this.physics.enable(this.door_4C, Phaser.Physics.ARCADE);
				this.door_4C.body.collideWorldBounds = true;
				this.game.physics.arcade.enable([this.door_4C], [this.player]);
				this.door_4C.body.onCollide = new Phaser.Signal();
				//this.door_4C.body.immovable=true;
			}
			this.door_3L = this.add.sprite(736, 1569, 'door_side_square_lock3');
			this.physics.enable(this.door_3L, Phaser.Physics.ARCADE);
			this.door_3L.body.collideWorldBounds = true;		
            this.game.physics.arcade.enable([this.door_3L],[this.player]);
            this.door_3L.body.onCollide = new Phaser.Signal();
			this.door_3L.body.immovable=true;
			
			this.door_3R = this.add.sprite(1492, 1569, 'door_side_tri_lock3');
			this.physics.enable(this.door_3R, Phaser.Physics.ARCADE);
			this.door_3R.body.collideWorldBounds = true;		
            this.game.physics.arcade.enable([this.door_3R],[this.player]);
            this.door_3R.body.onCollide = new Phaser.Signal();
			this.door_3R.body.immovable=true;
						
			this.door_3C = this.add.sprite(1088, 1248, 'door_front_circle_lock3');
			this.physics.enable(this.door_3C, Phaser.Physics.ARCADE);
			this.door_3C.body.collideWorldBounds = true;		
            		this.game.physics.arcade.enable([this.door_3C],[this.player]);
            		this.door_3C.body.onCollide = new Phaser.Signal();
			//this.door_3C.body.immovable=true;
			
			this.door_2L = this.add.sprite(736, 2209, 'door_side_square_lock2');
			this.physics.enable(this.door_2L, Phaser.Physics.ARCADE);
			this.door_2L.body.collideWorldBounds = true;		
            		this.game.physics.arcade.enable([this.door_2L],[this.player]);
            		this.door_2L.body.onCollide = new Phaser.Signal();
			this.door_2L.body.immovable=true;
			
			this.door_2R = this.add.sprite(1492, 2209, 'door_side_tri_lock2');
			this.physics.enable(this.door_2R, Phaser.Physics.ARCADE);
			this.door_2R.body.collideWorldBounds = true;		
            		this.game.physics.arcade.enable([this.door_2R],[this.player]);
            		this.door_2R.body.onCollide = new Phaser.Signal();
			this.door_2R.body.immovable=true;
			
 			this.door_2C = this.add.sprite(1088, 1888, 'door_front_circle_lock2');
			this.physics.enable(this.door_2C, Phaser.Physics.ARCADE);
			this.door_2C.body.collideWorldBounds = true;		
            		this.game.physics.arcade.enable([this.door_2C],[this.player]);
            		this.door_2C.body.onCollide = new Phaser.Signal();
			//this.door_2C.body.immovable=true;
						
			this.door_1L = this.add.sprite(736, 2849, 'door_side_square_lock');
			this.physics.enable(this.door_1L, Phaser.Physics.ARCADE);
			this.door_1L.body.collideWorldBounds = true;		
            		this.game.physics.arcade.enable([this.door_1L],[this.player]);
            		this.door_1L.body.onCollide = new Phaser.Signal();
			this.door_1L.body.immovable=true;
		
			this.door_1R = this.add.sprite(1492, 2849, 'door_side_tri_lock');
			this.physics.enable(this.door_1R, Phaser.Physics.ARCADE);
			this.door_1R.body.collideWorldBounds = true;		
            this.game.physics.arcade.enable([this.door_1R],[this.player]);
            this.door_1R.body.onCollide = new Phaser.Signal();
			this.door_1R.body.immovable=true;
			
			this.door_1C = this.add.sprite(1088, 2528, 'door_front_circle_lock');
			this.physics.enable(this.door_1C, Phaser.Physics.ARCADE);
			this.door_1C.body.collideWorldBounds = true;		
            		this.game.physics.arcade.enable([this.door_1C],[this.player]);
            		this.door_1C.body.onCollide = new Phaser.Signal();
			//this.door_1C.body.immovable=true;
			*/
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
			this.box_1A = this.add.sprite(100, 100, 'box60');
			this.box_1A.inputEnabled = true;
			this.physics.enable(this.box_1A, Phaser.Physics.ARCADE);
			this.box_1A.body.collideWorldBounds = true;
            this.game.physics.arcade.enable([this.box_1A],[this.player]);
            this.box_1A.body.onCollide = new Phaser.Signal();


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
			for (var i = 0; i < door_names.length; i++) {
				if (unlocked_doors.includes(door_names[i]) == false) {
					this.physics.arcade.collide(doors[i], this.layer);
					this.physics.arcade.collide(doors[i], this.player, this.unlockDoor, null, this);
					//game.physics.arcade.overlap(doors[i], this.player, this.unlockDoor, null, this)
				}
			}
			/*
			this.physics.arcade.collide(this.door_5L, this.layer);
			this.physics.arcade.collide(this.door_5L, this.player);
			this.physics.arcade.collide(this.door_5R, this.layer);
			this.physics.arcade.collide(this.door_5R, this.player);
			this.physics.arcade.collide(this.door_5C, this.layer);
			this.physics.arcade.collide(this.door_5C, this.player);
			this.physics.arcade.collide(this.door_4L, this.layer);
			this.physics.arcade.collide(this.door_4L, this.player);
			this.physics.arcade.collide(this.door_4R, this.layer);
			this.physics.arcade.collide(this.door_4R, this.player);
			this.physics.arcade.collide(this.door_4C, this.layer);
			this.physics.arcade.collide(this.door_4C, this.player);
			this.physics.arcade.collide(this.door_3L, this.layer);
			this.physics.arcade.collide(this.door_3L, this.player);
			this.physics.arcade.collide(this.door_3R, this.layer);
			this.physics.arcade.collide(this.door_3R, this.player);
			this.physics.arcade.collide(this.door_3C, this.layer);
			this.physics.arcade.collide(this.door_3C, this.player);
			this.physics.arcade.collide(this.door_2L, this.layer);
			this.physics.arcade.collide(this.door_2L, this.player);
			this.physics.arcade.collide(this.door_2R, this.layer);
			this.physics.arcade.collide(this.door_2R, this.player);
			this.physics.arcade.collide(this.door_2C, this.layer);
			this.physics.arcade.collide(this.door_2C, this.player);
			this.physics.arcade.collide(this.door_1L, this.layer);
			this.physics.arcade.collide(this.door_1L, this.player);			
			this.physics.arcade.collide(this.door_1R, this.layer);
			this.physics.arcade.collide(this.door_1R, this.player);
			this.physics.arcade.collide(this.door_1C, this.layer);
			this.physics.arcade.collide(this.door_1C, this.player);
			*/
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
			xy[0] = this.player.world.x;
			xy[1] = this.player.world.y;
            
		},
		addDoor: function (sprite) {
			doors[doors.length] = sprite;
        },
		//removes item from an array
		removeItem: function(string, array){
			const index = array.indexOf(string);
			array.splice(index, 1);
		}, 
		//checks to see if door can be unlocked an unlocks it
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
			this.state.start('endGame');
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
