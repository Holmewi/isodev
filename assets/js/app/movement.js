"use strict";

var game; 
var keyboard;
/* Movement directions */
var N, S, E, W, SE, NE, SW, NW;

var Movement = {

	//game : Object,

	init : function(game) {
		console.log("HEJ")
		this.game = game;

		// Set up our controls.
        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.game.input.keyboard.addKeyCapture([
            Phaser.Keyboard.LEFT,
            Phaser.Keyboard.RIGHT,
            Phaser.Keyboard.UP,
            Phaser.Keyboard.DOWN,
            Phaser.Keyboard.SPACEBAR
        ]);

        var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},

	onDown : function( key ) {

		console.log(this.game);
	}
};

module.exports = Movement;