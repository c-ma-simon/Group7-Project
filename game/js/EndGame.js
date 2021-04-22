"use strict";

GameStates.endGame = function(game, shared, keys, hints, items, shared_index){
  var gameexit = ['Game', 'exited.'];
  var style = { font: "30px Verdana", fill: "#8A5043", tabs: [20] };
  var text;
  var x = 100;
  var y = 200;
  //reset global variables
  shared = [];
  keys = []
  shared_index = 0;
  hints = []
  items = []
  return{
    create: function(){
      //add background
     this.background = game.sprite(0,0, 'background');
      //add Game exited text
     text = game.add.text(x, y, '', style);
     text.parseList(gameexit);
     this.exit = game.add.sprite(700, 50, 'exit');
     this.exit.inputEnabled = true;
     this.exit.events.onInputDown.add(function () { this.backToMenu(); }, this);
    },
    //return to MainMenu
    backToMenu: function () {
          //this.player.kill();
        this.state.start('MainMenu');
    },
  }


}
