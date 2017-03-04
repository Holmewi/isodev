"use strict";

var State = {
    'Idle' : true,
    'Moving' : false,
    'Sprint' : false,
    'Crouch' : false,
    'Jump' : false,
    'Fall' : false,
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
    this.jumpHeight = 175;
    this.moveX;
    this.moveY;

    this.facing;
    this.currentState;

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

Player.prototype.update = function() {
    //console.log(this.sprite.body.z);

    if (!this.sprite.body.onFloor()) {
        if (this.sprite.body.velocity.z >= 0 && this.sprite.body.z < 35) {
            State.Jump = true;
        } else if (this.sprite.body.velocity.z < 0 && this.sprite.body.z < 15) {
            State.Fall = false;
            State.Land = true;
        } else {
            State.Fall = true;
            State.Jump = false;
        }
    } else {
        State.Land = false;
        if (State.Crouch) {
            this.currentState = 'Crouch';
        } else if (State.Sprint) {
            this.currentState = 'Sprint';
        } else {
            this.currentState = '';
        }
    } 
};

Player.prototype.jump = function() {

    if (this.sprite.body.onFloor()) {    
        this.sprite.body.velocity.z = this.jumpHeight;
    }
};

Player.prototype.sprint = function(keyIsDown) {

    if (keyIsDown && !State.Crouch && !State.Idle) {
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

    if (direction) {
        State.Idle = false;
        State.Moving = true;
    }

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
};

Player.prototype.idle = function() {

    if (this.sprite.body.velocity.x <= 0 && this.sprite.body.velocity.y <= 0) {
        State.Idle = true;
        State.Moving = false;
    }
};

Player.prototype.draw = function() {

    if (State.Idle) {
        if (State.Jump) {
            // Play jump animation
        } else if (State.Fall) {
            // PLay fall animation
        } else if (State.Land) {
            // Play land animation
        } else if (State.Crouch) {
            // Play idle animation
        } else {
            this.sprite.animations.stop();
        } 
    } else {
        if (State.Jump) {
            // Play jump animation with current state
        } else if (State.Fall) {
            // PLay fall animation with current state
        } else if (State.Land) {
            // Play land animation with current state
        } else {
            this.sprite.animations.play(this.currentState + this.facing);
        }
    }
};

module.exports = Player;