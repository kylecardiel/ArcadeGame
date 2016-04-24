//Global variables for enemies
var ENEMY_START_Y = 65;
var ENEMY_START_X = 101;
var NUMBER_OF_ENEMIES = 6;
var ENEMY_LENGTH = 101;
var ENEMY_HEIGHT = 83;

//Global variables for players
var PLAYER_LENGTH = 50;
var PLAYER_HEIGHT = 50;
var PLAYER_START_X = 202;
var PLAYER_X_MOVE = 101;
var PLAYER_MIN_X_LOC = 0;
var PLAYER_MAX_X_LOC = 404;
var PLAYER_START_Y = 415;
var PLAYER_Y_MOVE = 83;
var PLAYER_MIN_Y_LOC = 0;
var PLAYER_MAX_Y_LOC = 415;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    //randomlly selecting a starting location and speed for the enemies
    this.locX = 0 - ( ENEMY_START_X * (Math.floor(Math.random() * 8) + 1));
    this.locY =  ENEMY_START_Y + (83 * (Math.floor(Math.random() * 3)));
    this.speed = Math.floor(Math.random() * 100) + 100;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.locX = this.locX + (this.speed * dt);

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.locX, this.locY);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.locX = PLAYER_START_X;
    this.locY = PLAYER_START_Y;
};

//This method handles the key board inputs and determines if a player is allowed to move in the direction requested
//PLayers can only move within the canvas/game board.
Player.prototype.handleInput = function(keyInput) {
    switch(keyInput) {
        case 'left':
                if (this.locX > PLAYER_MIN_X_LOC){
                    this.locX = this.locX - PLAYER_X_MOVE;
                }
            break;
        case 'up':
                if (this.locY > PLAYER_MIN_Y_LOC){
                    this.locY = this.locY - PLAYER_Y_MOVE;
                }
            break;
        case 'right':
                if (this.locX < PLAYER_MAX_X_LOC){
                    this.locX = this.locX + PLAYER_X_MOVE;
                }
            break;
        case 'down':
                if (this.locY < PLAYER_MAX_Y_LOC){
                    this.locY = this.locY + PLAYER_Y_MOVE;
                }
            break;
        default:
            null;
    }
}

Player.prototype.update = function(){
    this.locX = this.locX;
    this.locY = this.locY;
}

//This function is called when a play collides with an enemy and sends the player back to the starting location
Player.prototype.collision = function(){
    this.locX = PLAYER_START_X;
    this.locY = PLAYER_START_Y;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.locX, this.locY);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies;

//This creates the predetermined number of enemies
function createAllEnemies() {
    allEnemies = [];
    for (var i=0; i < NUMBER_OF_ENEMIES; i++){
        allEnemies.push(new Enemy());
    }
}

createAllEnemies();

// Place the player object in a variable called player
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
