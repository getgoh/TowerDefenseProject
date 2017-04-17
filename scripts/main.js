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


    //preloader and progressbar
    progressBar();

}

var _Bbullet;

//create the MenuTower
function drawDashboard()
{
    // _Bbullet = new createjs.Shape();
    // _Bbullet.graphics.beginFill("#ff0000").drawCircle(400, 400, 50);
    // // _Bbullet.graphics.setStrokeStyle(1).beginStroke("rgba(255,0,0,1)");
    // stage.addChild(_Bbullet);

    menuTower1 = new MenuTower(TowersEnum.BASIC);
    creditTxt = new createjs.Text("Credit: " + credit, "20px Arial");
    creditTxt.x = menuTower1.x;
    creditTxt.y = menuTower1.y + 48;

    stage.addChild(creditTxt);

    stage.on("mousemove", function () { console.log(stage.mouseX + ", " + stage.mouseY) });
}

//
function update(event) 
{

    currState.update();

    // enemies
    for(var x = 0; x < enemies.length; x++)
    {
        enemies[x].move();

        // towers
        for(var y = 0; y < towers.length; y++)
        {
            if (enemies[x])
            {
                towers[y].checkIfInRange(enemies[x]);
            }
                
        }    
    }
    // bullets
    for (var b = 0; b < bullets.length; b++) {
        bullets[b].move();
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
    queue.addEventListener("complete", setupTowerInfo);
    queue.addEventListener("progress", updateBar);

    // after pre-load is complete, call themeMusicStart function, which will play the theme music
    queue.addEventListener("complete", themeMusicStart);

    // pre-load sound files
    createjs.Sound.alternateExtensions = ["mp3"];
    queue.loadFile({id: "theme", src: "sounds/opening.mp3"});
    queue.loadFile({ id: "gameTheme", src: "sounds/game.mp3" });

    queue.loadFile({ id: "itemSpawnSound", src: "sounds/itemSpawn.mp3"});
    queue.loadFile({ id: "itemUseSound", src: "sounds/itemUse.mp3" });

    queue.loadFile({ id: "enemySound", src: "sounds/spawnEnemy.mp3"});
    queue.loadFile({ id: "bossSound", src: "sounds/spawnBoss.mp3" });

    // pre-load images
    queue.loadManifest([
        { id: "imgStart", src: "images/btnStart.png" },
        { id: "imgOptions", src: "images/btnOptions.png" },
        { id: "imgInstructions", src: "images/btnInstructions.png" },
        { id: "imgExit", src: "images/btnExit.png" },
        { id: "imgMenu", src: "images/btnMenu.png" },
        { id: "imgL1", src: "images/btnLevel1.png" },
        { id: "imgL2", src: "images/btnLevel2.png" },
        { id: "imgt1", src: "images/t1-new.png" },
        { id: "imgt2", src: "images/t2.png" },
        { id: "imgt3", src: "images/t3.png" },
        { id: "imgMoney", src: "images/money-bag.png" },
        { id: "imgMonster1", src: "images/monster1-new.png" },
        { id: "imgMonster2", src: "images/boss.png" },
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

    // set tick speed
    stage.enableMouseOver(10);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.on("tick", update);

    // start the menu
    menu = new Menu();
    currState = menu;
    window.enemies = enemies;
}