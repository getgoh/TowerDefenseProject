
// Globals

var canvasWidth = 960;
var canvasHeight = 480;

var canvas;
var stage;

var holder;

// menu
var menu;
var enemy1;

function init()
{
	canvas = document.getElementById("canvas");
    holder = document.getElementById('holder');
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(10);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.on("tick", update);

    // start the menu
    menu = new Menu();
    //enemy1 = new Enemy(400, 500, 600);

}


function update(event) {

	//enemy1.move();

    stage.update();
}