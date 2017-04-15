/*
Starting js file. Index calls init.
Preloads assets, calls menu.js on completion
creates MenuTower
*/

function init()
{
    // declare globals
	canvas = document.getElementById("canvas");
    holder = document.getElementById('holder');
    stage = new createjs.Stage(canvas);

    // set tick speed
    stage.enableMouseOver(10);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.on("tick", update);

    // start the menu
    //menu = new Menu();
    // window.enemies = enemies;
    // enemy1 = new Enemy(400, 500, 600);

    
    //preloader and progressbar
    progressBar();

}

//create the MenuTower
function drawDashboard()
{
    
    menuTower1 = new MenuTower(1);
    creditTxt = new createjs.Text("Credit: " + credit, "20px Arial");
    creditTxt.x = menuTower1.x;
    creditTxt.y = menuTower1.y + 48;

    stage.addChild(creditTxt);
}

//
function update(event) {

	// enemy1.move();

    for(var x = 1; x < enemies.length; x++)
    {
        //console.log(enemies[x]);
        enemies[x].move();
    }

    stage.update();
}

//creates the progress bar for the preloader
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

// pre-loads assets
function preloader()
{
    // create queue event listeners
    queue = new createjs.LoadQueue(false);
    createjs.Sound.initializeDefaultPlugins();
    queue.installPlugin(createjs.Sound);
    queue.addEventListener("complete", finishBar);
    queue.addEventListener("progress", updateBar);

    // after pre-load is complete, call themeMusicStart function, which will play the theme music
    queue.addEventListener("complete", themeMusicStart);

    // pre-load sound files
    createjs.Sound.alternateExtensions = ["mp3"];
    queue.loadFile({id: "theme", src: "sounds/opening.mp3"},
                   {id: "gameTheme", src: "sounds/game.mp3"});

    // pre-load images
    queue.loadManifest([
        { id: "imgStart", src: "images/btnStart.png" },
        { id: "imgOptions", src: "images/btnOptions.png" },
        { id: "imgInstructions", src: "images/btnInstructions.png" },
        { id: "imgExit", src: "images/btnExit.png" },
        { id: "imgMenu", src: "images/btnMenu.png" },
        { id: "imgL1", src: "images/btnLevel1.png" },
        { id: "imgL2", src: "images/btnLevel2.png" },
        { id: "imgt1", src: "images/t1.png" },
        { id: "imgt2", src: "images/t2.png" },
        { id: "imgt3", src: "images/t3.png" },
        { id: "imgMonster1", src: "images/monster1.png" },
        { id: "imgSounds", src: "images/btnSounds.png" },
        { id: "imgMusic", src: "images/btnMusic.png" }
    ]);

    
}

//update bar progress
function updateBar()
{
    loadingBar.scaleX = queue.progress * loadingBarWidth;   
    stage.update();
}

//begin menu, menu.js
function finishBar()
{
    stage.removeChild(loadingBarContainer);

    // start the menu
    menu = new Menu();
    window.enemies = enemies;
    // enemy1 = new Enemy(400, 500, 600);
}