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
			game.load.image('passwordpage', 'assets/passwordpage.png');
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
			
			game.load.image('exit', 'assets/exit.png');
            //	Here we load the rest of the assets our game needs.
            //	As this is just a Project Template I've not provided these assets, swap them for your own.
            game.load.image('titlePage', 'assets/Menu.png');
            game.load.atlas('playButton', 'assets/play_button.png', 'assets/play_button.json');
            game.load.audio('titleMusic', ['assets/Poppers and Prosecco.mp3']);
            //	+ lots of other required assets here
            game.load.image( 'logo', 'assets/phaser.png' );
			this.load.spritesheet('girl', 'assets/girl1536x80.png', 96, 80);
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
