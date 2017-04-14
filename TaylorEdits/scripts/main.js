
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

var menuTower1, menuTower2;

var s1;

//queue
var queue;

//progress bar
var loadingBarContainer;
var loadingBar;

function init()
{
    canvas = document.getElementById("canvas");
    holder = document.getElementById('holder');
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(10);
    createjs.Ticker.setFPS(120);
    createjs.Ticker.on("tick", update);

    //preloader and progressbar
    progressBar();
}

function drawDashboard() {
    menuTower1 = new MenuTower(1);
}


function update(event) {

    // enemy1.move();

    for (var x = 1; x < enemies.length; x++) {
        //console.log(enemies[x]);
        enemies[x].move();
    }

    stage.update();
}

function progressBar()
{
    //load bar container
    loadingBarContainer = new createjs.Container();
    loadingBarHeight = 20;
    loadingBarWidth = 300;
    LoadingBarColor = createjs.Graphics.getRGB(0, 0, 0);

    //actual load bar
    loadingBar = new createjs.Shape();
    loadingBar.graphics.beginFill("#ff7700").drawRect(0, 0, 1, loadingBarHeight).endFill();

    //outer frame
    var frame = new createjs.Shape();
    padding = 3;
    frame.graphics.setStrokeStyle(1).beginStroke(LoadingBarColor).drawRect(-padding / 2, -padding / 2, loadingBarWidth + padding, loadingBarHeight + padding);

    //add bar to stage
    loadingBarContainer.addChild(loadingBar, frame);
    loadingBarContainer.x = Math.round(canvas.width / 2 - loadingBarWidth / 2);
    loadingBarContainer.y = 100;
    stage.addChild(loadingBarContainer);

    preloader();
}

function preloader()
{
    //create queue event listeners
    queue = new createjs.LoadQueue(false);
    createjs.Sound.initializeDefaultPlugins();
    queue.installPlugin(createjs.Sound);
    queue.addEventListener("complete", finishBar);
    queue.addEventListener("progress", updateBar);
    queue.addEventListener("complete", themeMusic);

    queue.loadManifest([
        { id: "imgStart", src: "images/btnStart.png" },
        { id: "imgOptions", src: "images/btnOptions.png" },
        { id: "imgInstructions", src: "images/btnInstructions.png" },
        { id: "imgExit", src: "images/btnExit.png" },
        { id: "imgMenu", src: "images/btnMenu.png" },
        { id: "imgSounds", src: "images/btnSounds.png" },
        { id: "imgMusic", src: "images/btnMusic.png" },
        { id: "openTheme", src: "sounds/opening.mp3" },
        { id: "gameTheme", src: "sounds/game.mp3" }
    ]);
}

function updateBar()
{
    loadingBar.scaleX = queue.progress * loadingBarWidth;   
    stage.update();
}

function finishBar()
{
    stage.removeChild(loadingBarContainer);

    // start the menu
    menu = new Menu();
    window.enemies = enemies;
    // enemy1 = new Enemy(400, 500, 600);
}