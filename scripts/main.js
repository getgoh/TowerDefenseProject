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
    createjs.Touch.enable(stage);

    var preloader = new Preloader();

    //preloader and progressbar
    // progressBar();

}

var _Bbullet;

//create the MenuTower
function drawDashboard()
{
    // menutowers
    menuTower1 = new MenuTower(TowersEnum.BASIC);
    menuTower2 = new MenuTower(TowersEnum.ADVANCED);
    menuTower3 = new MenuTower(TowersEnum.ULTIMATE);

    stage.addChild(menuTower1, menuTower2, menuTower3);

    // credits
    creditTxt = new createjs.Text("Credits: " + credit, "20px Arial");
    creditTxt.x = menuTower1.x;
    creditTxt.y = menuTower1.y + 65;

    // score
    scoreTxt = new createjs.Text("Score: " + score, "20px Arial");
    scoreTxt.x = menuTower1.x;
    scoreTxt.y = menuTower1.y + 115;

    // lives
    txtLives = new createjs.Text("Lives: " + lives, "20px Arial");
    txtLives.x = menuTower1.x;
    txtLives.y = creditTxt.y + 24;
    
    // pause button
    this.btnPause = new createjs.Bitmap(queue.getResult("imgPause"));
    this.btnPause.cursor = "pointer";
    this.btnPause.x = stage.canvas.width - 160;
    this.btnPause.y = menuTower1.y;
    this.btnPause.on("click", optionsMenu);


    stage.addChild(creditTxt, txtLives, scoreTxt, this.btnPause);
}

var menuContainer;

// options-menu
function optionsMenu()
{   
    menuContainer = new createjs.Container();

    // stage.removeAllChildren();
    this.backScreen = new createjs.Shape();
    this.backScreen.graphics.beginFill("#fff").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
    // Menu.prototype.drawText();

    //music toggle button
    this.musicBtn = new createjs.Bitmap(queue.getResult("imgMusic"));
    this.musicBtn.cursor = "pointer";
    this.musicBtn.x = stage.canvas.width / 2 - 190;
    this.musicBtn.y = stage.canvas.height / 2 - 10;

    this.musicBtn.on("click", themeMusicToggle);
    
    //sound toggle button
    this.soundsBtn = new createjs.Bitmap(queue.getResult("imgSounds"));
    this.soundsBtn.cursor = "pointer";
    this.soundsBtn.x = stage.canvas.width / 2 + 34;
    this.soundsBtn.y = stage.canvas.height / 2 - 10;

    this.soundsBtn.on("click", soundEffectsToggle);

    //return to game button
    this.backBtn = new createjs.Bitmap(queue.getResult("imgBack"));
    this.backBtn.cursor = "pointer";
    this.backBtn.x = stage.canvas.width / 2 - 99;
    this.backBtn.y = stage.canvas.height / 2 + 50;


    // return to main menu button
    this.btnMainMenu = new createjs.Bitmap(queue.getResult("imgMenu"));
    this.btnMainMenu.cursor = "pointer";
    this.btnMainMenu.x = stage.canvas.width / 2 - 78;
    this.btnMainMenu.y = this.backBtn.y + 60;
    this.btnMainMenu.on("click", function() { menu.initialize(); currState = menu; pauseToggle(); });


    this.backBtn.on("click", 
        function() 
        { 
            stage.removeChild(menuContainer);
            stage.update();
            currState.setTicks();
            pauseToggle();
        });

    menuContainer.addChild(this.backScreen, this.musicBtn, this.soundsBtn, this.backBtn, this.btnMainMenu);
    stage.addChild(menuContainer);
    stage.update();

    currState.saveTicks();
    pauseToggle();
}

function pauseToggle()
{
    var paused = !createjs.Ticker.getPaused();
    createjs.Ticker.setPaused(paused);
    isPaused = !isPaused;
}

function addCredit(amt)
{
    credit += amt;
    score += (amt * (10 * waveNumber));
    if (waveNumber == 4)
    {
        score += 10000;
    }
    creditTxt.text = "Credits: " + credit;
    scoreTxt.text = "Score: " + score;
}

//
function update(event) 
{    
    // I moved the movements to each state's update function - Al
    if(!isPaused)
    {
        currState.update();

        stage.update();
    }
}

