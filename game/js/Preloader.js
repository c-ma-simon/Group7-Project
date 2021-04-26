"use strict";

GameStates.makePreloader = function( game ) {

	var background = null;
	var preloadBar = null;

	var ready = false;

    return {
    
        preload: function () {
    
            //	These are the assets we loaded in Boot.js
            //	A nice sparkly background and a loading progress bar
            background = game.add.sprite(0, 0, 'preloaderBackground');
            preloadBar = game.add.sprite(300, 400, 'preloaderBar');
    
            //	This sets the preloadBar sprite as a loader sprite.
            //	What that does is automatically crop the sprite from 0 to full-width
            //	as the files below are loaded in.
            game.load.setPreloadSprite(preloadBar);


            //tilemaps
            //game.load.tilemap('testmap0', 'assets/testmap00.json', null, Phaser.Tilemap.TILED_JSON);
            //game.load.tilemap('testmap1', 'assets/testmap01.json', null, Phaser.Tilemap.TILED_JSON);
	    game.load.tilemap('gamemap', 'assets/gamemap05.json', null, Phaser.Tilemap.TILED_JSON);
            //tilesets
            game.load.image('CSprojecttiles00', 'assets/CSprojecttiles00.png');
            //backgrounds
            game.load.image('passwordpage', 'assets/passwordpage.png');
            game.load.image('titlePage', 'assets/Menu.png');
            game.load.image('inventory', 'assets/inventory.png');
            game.load.image('controls', 'assets/controls.png');
	    game.load.image('mapfloor', 'assets/mapfloor.png');
	    game.load.image('mapwall', 'assets/tilewallmanual.png');
            //letters 
			game.load.image('A', 'assets/ABC/a.png');
			game.load.image('B', 'assets/ABC/b.png');
			game.load.image('C', 'assets/ABC/c.png');
			game.load.image('D', 'assets/ABC/d.png');
			game.load.image('E', 'assets/ABC/e.png');
			game.load.image('F', 'assets/ABC/f.png');
			game.load.image('G', 'assets/ABC/g.png');
			game.load.image('H', 'assets/ABC/h.png');
			game.load.image('I', 'assets/ABC/i.png');
			game.load.image('J', 'assets/ABC/j.png');
			game.load.image('K', 'assets/ABC/k.png');
			game.load.image('L', 'assets/ABC/l.png');
			game.load.image('M', 'assets/ABC/m.png');
			game.load.image('N', 'assets/ABC/n.png');
			game.load.image('O', 'assets/ABC/o.png');
			game.load.image('P', 'assets/ABC/p.png');
			game.load.image('Q', 'assets/ABC/q.png');
			game.load.image('R', 'assets/ABC/r.png');
			game.load.image('S', 'assets/ABC/s.png');
			game.load.image('T', 'assets/ABC/t.png');
			game.load.image('U', 'assets/ABC/u.png');
			game.load.image('V', 'assets/ABC/v.png');
			game.load.image('W', 'assets/ABC/w.png');
			game.load.image('X', 'assets/ABC/x.png');
			game.load.image('Y', 'assets/ABC/y.png');
            game.load.image('Z', 'assets/ABC/z.png');
            //numbers
            game.load.image('0', 'assets/123/zero.png');
            game.load.image('1', 'assets/123/one.png');
            game.load.image('2', 'assets/123/two.png');
            game.load.image('3', 'assets/123/three.png');
            game.load.image('4', 'assets/123/four.png');
            game.load.image('5', 'assets/123/five.png');
            game.load.image('6', 'assets/123/six.png');
            game.load.image('7', 'assets/123/seven.png');
            game.load.image('8', 'assets/123/eight.png');
            game.load.image('9', 'assets/123/nine.png');
            //temp locks
			game.load.image('temp_lock_1', 'assets/yellow circle.png');
            game.load.image('temp_lock_2', 'assets/red circle.png');
            //keys
            game.load.image('key_1', 'assets/KeyCircle.png');
            game.load.image('key_2', 'assets/KeySquare.png');
            game.load.image('key_3', 'assets/KeyTriangle.png');
	    //doors
            game.load.image('door_front_circle_lock', 'assets/DoorFrontCircleLock.png');
	    game.load.image('door_front_circle_lock2', 'assets/DoorFrontCircleLock.png');
	    game.load.image('door_front_circle_lock3', 'assets/DoorFrontCircleLock.png');
	    game.load.image('door_front_circle_lock4', 'assets/DoorFrontCircleLock.png');
	    game.load.image('door_front_circle_lock5', 'assets/DoorFrontCircleLock.png');
	    //game.load.image('door_front_open', 'assets/DoorFrontOpen.png'); unused
	    //game.load.image('door_front_square_lock', 'assets/DoorFrontSquareLock.png'); unused
	    //game.load.image('door_front_tri_lock', 'assets/DoorFrontTriLock.png'); unused
	    //game.load.image('door_side_circle_lock', 'assets/DoorSideCircleLock.png'); unused
	    //game.load.image('door_side_open', 'assets/DoorSideOpen.png'); unused
	    game.load.image('door_side_square_lock', 'assets/DoorSideSquareLock.png');
	    game.load.image('door_side_square_lock2', 'assets/DoorSideSquareLock.png');
	    game.load.image('door_side_square_lock3', 'assets/DoorSideSquareLock.png');
	    game.load.image('door_side_square_lock4', 'assets/DoorSideSquareLock.png');
	    game.load.image('door_side_square_lock5', 'assets/DoorSideSquareLock.png');
	    game.load.image('door_side_tri_lock', 'assets/DoorSideTriLock.png');
	    game.load.image('door_side_tri_lock2', 'assets/DoorSideTriLock.png');
	    game.load.image('door_side_tri_lock3', 'assets/DoorSideTriLock.png');
	    game.load.image('door_side_tri_lock4', 'assets/DoorSideTriLock.png');
	    game.load.image('door_side_tri_lock5', 'assets/DoorSideTriLock.png');
            //items
            game.load.image('match', 'assets/ItemMatch.png');
            game.load.image('box60', 'assets/ItemBox60x.png');
            game.load.image('box64', 'assets/ItemBox64x.png');
            game.load.image('button0', 'assets/ItemButton.png');
            game.load.image('button1', 'assets/ItemButtonNoPlate.png');
            //buttons
            game.load.image('exit', 'assets/exit.png');
            game.load.image('yellowexit', 'assets/yellowexit.png');
            game.load.image('reset', 'assets/reset.png');
            game.load.atlas('playButton', 'assets/play_button.png', 'assets/play_button.json');
            game.load.atlas('controlsButton', 'assets/controls_button.png', 'assets/play_button.json');
            //title stuff
            
            game.load.audio('titleMusic', ['assets/Poppers and Prosecco.mp3']);
            game.load.image( 'logo', 'assets/phaser.png' );

            //character
			this.load.spritesheet('locke', 'assets/locke.png', 96, 80);
        },
    
        create: function () {
    
            //	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
            preloadBar.cropEnabled = false;
    
        },
    
        update: function () {
    
            //	You don't actually need to do this, but I find it gives a much smoother game experience.
            //	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
            //	You can jump right into the menu if you want and still play the music, but you'll have a few
            //	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
            //	it's best to wait for it to decode here first, then carry on.
            
            //	If you don't have any music in your game then put the game.state.start line into the create function and delete
            //	the update function completely.
            
            if (game.cache.isSoundDecoded('titleMusic') && ready == false)
            {
                ready = true;
                game.state.start('MainMenu');
            }
    
        }
    
    };
};
