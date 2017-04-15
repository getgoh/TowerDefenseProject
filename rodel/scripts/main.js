
// Globals

// 20 x 10 (48px per 'cell')

var canvasWidth = 960;
var canvasHeight = 480;

var cellWidth = 48;
var cellHeight = 48;

var canvas;
var stage;

var holder;

// menu
var menu;

var enemies = [];
var towers = [];
var stage1;

var menuTower1, menuTower2;


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
    window.enemies = enemies;
    // enemy1 = new Enemy(400, 500, 600);

}

function drawDashboard()
{
    menuTower1 = new MenuTower(1);
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