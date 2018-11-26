// Defines a global object to be used as a namespace
var gameNs = {};


/**
 * main is the entry point for Javascript programs.
 *
 */
function main()
{
    initCanvas();

    const game = new Game();
    gameNs.game = game;

    game.initWorld();
    game.update();
}

/**
 * Initialises the canvas and gives it it's default value
 */
function initCanvas()
{
	var canvas = document.createElement("canvas");
	canvas.id = 'mycanvas';

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	var ctx = canvas.getContext("2d");
	document.body.appendChild(canvas);
}

/**
 * Listens for events and ignores the defaults of the arrow keys
 *
 */
window.addEventListener("keydown", function(e) {
    // Space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
