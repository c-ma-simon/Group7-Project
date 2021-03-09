"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    var bouncy = null;
    this.facing = 'left';
    
    return {
    
        create: function () {
			this.cursors = this.input.keyboard.createCursorKeys();
			this.player = this.add.sprite(300, 300, 'girl');
			this.physics.enable(this.player, Phaser.Physics.ARCADE);
			this.player.body.collideWorldBounds = true;
			this.player.inputEnabled = true;				
			this.player.events.onInputDown.add( function() { this.quitGame(); }, this );
			this.player.animations.add('down', [0,1,2,3,], 10, true);
			this.player.animations.add('left', [4, 5, 6, 7], 10, true);
			this.player.animations.add('up', [8, 9, 10, 11], 10, true);
			this.player.animations.add('right', [12, 13, 14, 15], 10, true);
            
		},
    
		update: function () {
			if (this.cursors.left.isDown){
				this.player.body.velocity.x = -150;

				if (this.facing != 'left')
				{
					this.player.animations.play('left');
					this.facing = 'left';
				}
			}
			else if (this.cursors.right.isDown)
			{
				this.player.body.velocity.x = 150;

				if (this.facing != 'right')
				{	
					this.player.animations.play('right');
					this.facing = 'right';
					}     
			}
			else if (this.cursors.up.isDown){
				this.player.body.velocity.y = -150;
            
				if(this.facing != 'up'){
					this.player.animations.play('up');
					this.facing = 'up';
				}
			}
			else if(this.cursors.down.isDown){
				this.player.body.velocity.y = 150;
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
		quitGame: function () {
			this.player.kill();
			this.state.start('makePuzzle');
		},
	};	

  
};
