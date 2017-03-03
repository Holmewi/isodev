"use strict";

var State = {
    'Idle' : true,
    'Walk' : false,
    'Sprint' : false,
    'Crouch' : false,
    'InAir' : false,
    'JumpUp' : false,
    'Land' : false
};

var Action = {
    'Jump' : false
};

function Player(game, group, name) {
	this.name = name;

    this.maxSpeed = 100;
    this.movementSpeed = this.maxSpeed;
    this.acceleration = 5;
    this.moveX;
    this.moveY;

    this.facing;

	this.sprite = game.add.isoSprite(350, 280, 0, 'characterAnim', 0, group);
    this.sprite.alpha = 0.6;
    this.sprite.anchor.set(0.5);
    
    this.sprite.animations.add('S', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
    this.sprite.animations.add('SW', [8, 9, 10, 11, 12, 13, 14, 15], 10, true);
    this.sprite.animations.add('W', [16, 17, 18, 19, 20, 21, 22, 23], 10, true);
    this.sprite.animations.add('NW', [24, 25, 26, 27, 28, 29, 30, 31], 10, true);
    this.sprite.animations.add('N', [32, 33, 34, 35, 36, 37, 38, 39], 10, true);
    this.sprite.animations.add('NE', [40, 41, 42, 43, 44, 45, 46, 47], 10, true);
    this.sprite.animations.add('E', [48, 49, 50, 51, 52, 53, 54, 55], 10, true);
    this.sprite.animations.add('SE', [56, 57, 58, 59, 60, 61, 62, 63], 10, true);
};

Player.prototype.jump = function() {

    if (this.sprite.body.onFloor()) {        
        this.sprite.body.velocity.z = 175;
        State.InAir = true;
        //TODO: Add jump animations
    } else if (!player.sprite.body.onFloor()) {
        //TODO: Add falling animations
    } else if (player.sprite.body.onFloor() && State.InAir) {
        State.InAir = false;
        //TODO: Add land animations
    }
};

Player.prototype.sprint = function(keyIsDown) {

    if (keyIsDown && !State.Crouch) {
        State.Sprint = true;
        this.movementSpeed = this.maxSpeed * 2;
    } else if (State.Sprint) {
        State.Sprint = false;
        this.movementSpeed = this.maxSpeed;
    }  
};

Player.prototype.crouch = function() {
    if (!State.Crouch) {
        State.Crouch = true;
        this.movementSpeed = this.maxSpeed / 2;
    } else if (State.Crouch) {
        State.Crouch = false;
        this.movementSpeed = this.maxSpeed;
    }
};

Player.prototype.move = function(direction) {
    this.facing = direction;

    if (this.sprite.body.onFloor()) {
        switch (direction) {
            case 'N':
                this.moveX = -this.movementSpeed;
                this.moveY = -this.movementSpeed;
                break;
            case 'NW':
                this.moveX = -this.movementSpeed;
                this.moveY = 0;
                break;
            case 'NE':
                this.moveX = 0;
                this.moveY = -this.movementSpeed;
                break;
            case 'S':
                this.moveX = this.movementSpeed;
                this.moveY = this.movementSpeed;
                break;
            case 'SW':
                this.moveX = 0;
                this.moveY = this.movementSpeed;
                break;
            case 'SE':
                this.moveX = this.movementSpeed;
                this.moveY = 0;
                break;
            case 'W':
                this.moveX = -this.movementSpeed + 30;
                this.moveY = this.movementSpeed - 30;
                break;
            case 'E':
                this.moveX = this.movementSpeed - 30;
                this.moveY = -this.movementSpeed + 30;
                break;
            default:
                this.moveX = 0;
                this.moveY = 0;
        }
    }
    

    this.moving(this.moveX, this.moveY);
};

Player.prototype.moving = function(x, y) {
    if (this.sprite.body.velocity.x > x) {
        this.sprite.body.velocity.x = this.sprite.body.velocity.x - this.acceleration;
    }
    else {
        this.sprite.body.velocity.x = this.sprite.body.velocity.x + this.acceleration;
    }
    if (this.sprite.body.velocity.y > y) {
        this.sprite.body.velocity.y = this.sprite.body.velocity.y - this.acceleration;
    }
    else {
        this.sprite.body.velocity.y = this.sprite.body.velocity.y + this.acceleration;
    }
}

Player.prototype.draw = function(direction, state) {

    //console.log(direction);

    // While running pass state continuously
	this.sprite.animations.play(this.facing);

    // While jumping up just pass one state

    // While in air just pass one state

    // While sneaking pass state continuously

    // While sprinting just speed up running animation?
};

module.exports = Player;