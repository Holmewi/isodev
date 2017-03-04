"use strict";

function PlayerController(game) {

    this.toggleCrouch = false;

    this.up = game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.left = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.down = game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.right = game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.jump = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.sprint = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
    this.crouch = game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);
};

PlayerController.prototype.update = function(player) {

    var direction = '';

    // Player jumps
    if (this.jump.isDown) {
        player.jump();
    }

    // Player sprints
    if (this.sprint.isDown) {
        player.sprint(true);
    } else if (this.sprint.isUp) {
        player.sprint(false);
    }

    if (this.crouch.isDown && !this.toggleCrouch) {
        this.toggleCrouch = true;
        player.crouch();
    } else if (this.crouch.isUp) {
        this.toggleCrouch = false;
    } 

    // Player walks north
    if (this.up.isDown && this.down.isUp) {
        if (this.left.isDown && this.right.isUp) {
           direction = 'NW'; 
        } else if (this.right.isDown && this.left.isUp) {
            direction = 'NE';
        } else {
            direction = 'N';
        }
    }
    else if (this.down.isDown && this.up.isUp) {
        if (this.left.isDown && this.right.isUp) {
           direction = 'SW'; 
        } else if (this.right.isDown && this.left.isUp) {
            direction = 'SE';
        } else {
            direction = 'S';
        }
    } else if (this.left.isDown && this.right.isUp) {
        direction = 'W';
    } else if (this.right.isDown && this.left.isUp) {
        direction = 'E';
    } else {
        direction = '';
        player.idle();
    }

    player.move(direction);
}

module.exports = PlayerController;