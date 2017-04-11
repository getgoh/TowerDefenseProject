
// Globals

var canvasWidth = 960;
var canvasHeight = 480;

var canvas;
var stage;

var holder;

// menu
var menu;
var enemies = [];

var s1;

function init()
{
	canvas = document.getElementById("canvas");
    holder = document.getElementById('holder');
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(10);
    createjs.Ticker.setFPS(120);
    createjs.Ticker.on("tick", update);

    // start the menu
    menu = new Menu();
    window.enemies = enemies;
    // enemy1 = new Enemy(400, 500, 600);

}


function update(event) {

	// enemy1.move();

    for(var x = 1; x < enemies.length; x++)
    {
        //console.log(enemies[x]);
        enemies[x].move();
    }

    stage.update();
}