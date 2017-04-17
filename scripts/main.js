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

    var preloader = new Preloader();

    //preloader and progressbar
    // progressBar();

}

var _Bbullet;

//create the MenuTower
function drawDashboard()
{
    menuTower1 = new MenuTower(TowersEnum.BASIC);
    menuTower2 = new MenuTower(TowersEnum.ADVANCED);
    menuTower3 = new MenuTower(TowersEnum.ULTIMATE);

    stage.addChild(menuTower1, menuTower2, menuTower3);

    creditTxt = new createjs.Text("Credits: " + credit, "20px Arial");
    creditTxt.x = menuTower1.x;
    creditTxt.y = menuTower1.y + 65;

    txtLives = new createjs.Text("Lives: " + lives, "20px Arial");
    txtLives.x = menuTower1.x;
    txtLives.y = creditTxt.y + 24;

    stage.addChild(creditTxt, txtLives);
}

function addCredit(amt)
{
    credit += amt;
    creditTxt.text = "Credits: " + credit;
}

//
function update(event) 
{    
    // I moved the movements to each state's update function - Al
    currState.update();

    stage.update();
}

