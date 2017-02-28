"use strict";

function Controls(game) {

    this.speed;
    this.isSneaking = false;
    this.inAir = false;
    this.toggleKey = false;
    this.playerState = '';

    this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.shift = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
    this.ctrl = game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);
};

Controls.prototype.input = function() {
	// TODO: Set player state through input

	// Directions: N NE NW S SE SW E W IDLE
	// State: Sneaking, Moving, Sprinting, JumpUp, InAir, Landing
};

Controls.prototype.movement = function(player) {

    // Player sprints
    if (this.shift.isDown && !this.isSneaking) {
        this.speed = player.speed * 2;
        //TODO: Add sprint animations
    }
    else if (this.shift.isUp && !this.isSneaking) {
        this.speed = player.speed;
    }   

    // Player sneaks
    if (this.ctrl.isDown && !this.toggleKey) {
        
        this.toggleKey = true;
        if (this.isSneaking) {
            this.isSneaking = false;
            this.speed = player.speed;
        }
        else if (!this.isSneaking) {
            this.isSneaking = true;
            this.speed = player.speed / 2;
            //TODO: Add crouch animations
        }
    }
    else if (this.ctrl.isUp) {
        this.toggleKey = false;
    }

    // Player move north
    if (this.wKey.isDown && this.sKey.isUp) {
        player.sprite.body.velocity.y = -this.speed;
        player.sprite.body.velocity.x = -this.speed;
        //player.animation('N');
        if (this.aKey.isDown && this.dKey.isUp) {
            player.sprite.body.velocity.y = 0;
            //player.animation('NW');
        }
        else if (this.dKey.isDown  && this.aKey.isUp) {
            player.sprite.body.velocity.x = 0;
            //player.animation('NE');
        }
    }
    // Player move south
    else if (this.sKey.isDown && this.wKey.isUp) {
        player.sprite.body.velocity.y = this.speed;
        player.sprite.body.velocity.x = this.speed;
        //player.animation('S');
        if (this.aKey.isDown && this.dKey.isUp) {
            player.sprite.body.velocity.x = 0;
            //player.animation('SW');
        }
        else if (this.dKey.isDown  && this.aKey.isUp) {
            player.sprite.body.velocity.y = 0;
            //player.animation('SE');
        }
    }
    // Player move west
    else if (this.aKey.isDown && this.dKey.isUp) {
        player.sprite.body.velocity.y = this.speed - 30;
        player.sprite.body.velocity.x = -this.speed + 30;
        //player.animation('W');
    }
    // Player move east
    else if (this.dKey.isDown && this.aKey.isUp) {
        player.sprite.body.velocity.y = -this.speed + 30;
        player.sprite.body.velocity.x = this.speed - 30;
        
    }
    else {
        player.sprite.body.velocity.y = 0;
        player.sprite.body.velocity.x = 0;
        player.sprite.animations.stop(); //TODO: Add idle animation
    }

    // Player jumps
    if (player.sprite.body.onFloor() && this.space.isDown) {        
        player.sprite.body.velocity.z = 175;
        this.inAir = true;
        //TODO: Add jump animations
    } else if (!player.sprite.body.onFloor()) {
    	//TODO: Add falling animations
    } else if (player.sprite.body.onFloor() && this.inAir) {
    	this.inAir = false;
    	//TODO: Add land animations
    }

    console.log(this.playerState);
    player.animation(this.playerState);
};

module.exports = Controls;