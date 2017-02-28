"use strict";

function Controls(game) {

    this.speed;
    this.isSneaking = false;
    this.toggleKey = false;

    this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.shift = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
    this.ctrl = game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);
};

Controls.prototype.movement = function(player, speed) {

    // Player sprints
    if (this.shift.isDown && !this.isSneaking) {
        this.speed = speed * 2;
    }
    else if (this.shift.isUp && !this.isSneaking) {
        this.speed = speed;
    }   

    // Player move north
    if (this.wKey.isDown && this.sKey.isUp) {
        player.body.velocity.y = -this.speed;
        player.body.velocity.x = -this.speed; 
        if (this.aKey.isDown && this.dKey.isUp) {
            player.body.velocity.y = 0;
        }
        else if (this.dKey.isDown  && this.aKey.isUp) {
            player.body.velocity.x = 0;
        }
    }
    // Player move south
    else if (this.sKey.isDown && this.wKey.isUp) {
        player.body.velocity.y = this.speed;
        player.body.velocity.x = this.speed; 
        if (this.aKey.isDown && this.dKey.isUp) {
            player.body.velocity.x = 0;
        }
        else if (this.dKey.isDown  && this.aKey.isUp) {
            player.body.velocity.y = 0;
        }
    }
    // Player move west
    else if (this.aKey.isDown && this.dKey.isUp) {
        player.body.velocity.y = this.speed - 30;
        player.body.velocity.x = -this.speed + 30;
    }
    // Player move east
    else if (this.dKey.isDown && this.aKey.isUp) {
        player.body.velocity.y = -this.speed + 30;
        player.body.velocity.x = this.speed - 30;
    }
    else {
        player.body.velocity.y = 0;
        player.body.velocity.x = 0;
    }

    // Player jumps
    if ( player.body.onFloor() && this.space.isDown ) {        
            player.body.velocity.z = 150;
    }

    // Player sneaks
    if (this.ctrl.isDown && !this.toggleKey) {
        
        this.toggleKey = true;
        if (this.isSneaking) {
            this.isSneaking = false;
            this.speed = speed;
        }
        else if (!this.isSneaking) {
            this.isSneaking = true;
            this.speed = speed / 2;
        }
    }
    else if (this.ctrl.isUp) {
        this.toggleKey = false;
    }
};

module.exports = Controls;