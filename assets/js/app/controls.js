"use strict";

//var Ndown = false, Sdown = false, Edown = false, Wdown = false, SEdown = false, NEdown = false, SWdown = false, NWdown = false;

function Controls(game) {

    this.speed = 100;

    this.moveN = false;
    this.moveS = false;
    this.moveE = false;
    this.moveW = false;
    this.moveSE = false;
    this.moveNE = false;
    this.moveSW = false;
    this.moveNW = false;

    /*
    this.cursors = game.input.keyboard.createCursorKeys();

    
    game.input.keyboard.addKeyCapture([
        Phaser.Keyboard.W,
        Phaser.Keyboard.A,
        Phaser.Keyboard.S,
        Phaser.Keyboard.D,
        Phaser.Keyboard.SPACEBAR
    ]);
    */

    this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
};

Controls.prototype.input = function() {

    if (this.wKey.isDown) {
        this.moveN = true;
    }
    else if (this.sKey.isDown) {
        this.moveS = true;
    }
    else {
        //player.body.velocity.y = 0;
    }

    if (this.aKey.isDown) {
        //player.body.velocity.x = this.speed;
    }
    else if (this.dKey.isDown) {
        //player.body.velocity.x = -this.speed;
    }
    else {
        //player.body.velocity.x = 0;
    }

    if (this.wKey.isUp) {
        this.moveN = false;
    } 
    if (this.sKey.isUp) {
        this.moveS = false;
    }

    
};

Controls.prototype.movement = function(player) {
    if (this.moveN == true) {
        player.body.velocity.y = -this.speed;
        player.body.velocity.x = -this.speed;
    }
    else if (this.moveS == true) {
        player.body.velocity.y = this.speed;
        player.body.velocity.x = this.speed;
    }
    else {
        player.body.velocity.y = 0;
        player.body.velocity.x = 0;
    }
    this.space.onDown.add(function () {
        player.body.velocity.z = 150;
    }, this);
};

module.exports = Controls;