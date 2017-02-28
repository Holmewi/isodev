"use strict";

function Player(game, group, name) {
	this.name = name;

    this.speed = 100;

	this.sprite = game.add.isoSprite(350, 280, 0, 'characterAnim', 0, group);
    this.sprite.alpha = 0.6;
    this.sprite.anchor.set(0.5);
    
    this.animation();
};

Player.prototype.animation = function() {
	this.sprite.animations.add('S', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
    this.sprite.animations.add('SW', [8, 9, 10, 11, 12, 13, 14, 15], 10, true);
    this.sprite.animations.add('W', [16, 17, 18, 19, 20, 21, 22, 23], 10, true);
    this.sprite.animations.add('NW', [24, 25, 26, 27, 28, 29, 30, 31], 10, true);
    this.sprite.animations.add('N', [32, 33, 34, 35, 36, 37, 38, 39], 10, true);
    this.sprite.animations.add('NE', [40, 41, 42, 43, 44, 45, 46, 47], 10, true);
    this.sprite.animations.add('E', [48, 49, 50, 51, 52, 53, 54, 55], 10, true);
    this.sprite.animations.add('SE', [56, 57, 58, 59, 60, 61, 62, 63], 10, true);
};

module.exports = Player;