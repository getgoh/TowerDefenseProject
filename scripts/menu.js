/*
Creates all menus.
Starts game (stage1.js)
*/

// menu class prototype
var Menu = function()
{
	this.initialize();
	_menu = this;
}

// init function
Menu.prototype.initialize = function()
{
    console.log("MENU INIT");
	stage.removeAllChildren(); 
	this.drawText("Tower PewPew");
	this.drawButtons();
    enemies = [];
    towers = [];
    bullets = [];
    lives = 5;
    credit = 300;
}

Menu.prototype.update = function ()
{
    // do nothing
}
// sets canvas size
Menu.prototype.setCanvasSize = function()
{
	canvas.width = 600;
	canvas.height = 400;
	holder.style.width = "600px";
}

// creates title
Menu.prototype.drawText = function(txt)
{
	this.txtTitle = new createjs.Text(txt, "50px Arial", "#ff7700");

    this.txtTitle.textAlign = 'center';
    this.txtTitle.textBaseline = 'middle';
    this.txtTitle.x = stage.canvas.width/2;
    this.txtTitle.y = stage.canvas.height/2 - 60;

    stage.addChild(this.txtTitle);
}

// draws initial menu buttons
Menu.prototype.drawButtons = function()
{
	// start game button
 	this.gameBtn = new createjs.Bitmap(queue.getResult("imgStart"));
 	this.gameBtn.cursor = "pointer";
 	this.gameBtn.x = this.txtTitle.x - 190;
 	this.gameBtn.y = this.txtTitle.y + 50;

 	// instructions button
 	this.instructionsBtn = new createjs.Bitmap(queue.getResult("imgInstructions"));
 	this.instructionsBtn.cursor = "pointer";
 	this.instructionsBtn.x = this.txtTitle.x - 194;
 	this.instructionsBtn.y = this.gameBtn.y + 60;

 	// options button
 	this.optionsBtn = new createjs.Bitmap(queue.getResult("imgOptions"));
 	this.optionsBtn.cursor = "pointer";
 	this.optionsBtn.x = this.txtTitle.x + 34;
 	this.optionsBtn.y = this.txtTitle.y + 50;

 	// exit button
 	this.exitBtn = new createjs.Bitmap(queue.getResult("imgExit"));
 	this.exitBtn.cursor = "pointer";
 	this.exitBtn.x = this.txtTitle.x + 34;
 	this.exitBtn.y = this.optionsBtn.y + 60;

 	// button listeners
 	// this.gameBtn.on("click", function(e) { window.location.href = "towerdefense.html"; });
    this.gameBtn.on("click", this.Maps);
 	this.instructionsBtn.on("click", this.Instructions);
 	this.optionsBtn.on("click", this.menuOptions);
 	this.exitBtn.on("click", function() { 
        var getUrl = window.location;
        var baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
        // console.log(baseUrl);
        window.location = baseUrl + "images/closed_image.png"; 
    } );

 	stage.addChild(this.gameBtn, this.instructionsBtn, this.optionsBtn, this.exitBtn);
}

Menu.prototype.Instructions = function()
{
    stage.removeAllChildren();

    this.instructionsTitle = new createjs.Text("Instructions", "50px Arial", "#ff7700");

    this.instructionsTitle.textAlign = 'center';
    this.instructionsTitle.textBaseline = 'middle';
    this.instructionsTitle.x = stage.canvas.width/2;
    this.instructionsTitle.y = stage.canvas.height/4 - 60;

    this.instructionsTxt1 = new createjs.Text("Drag towers from the bottom of the screen to play.", "20px Arial");
    this.instructionsTxt1.x = stage.canvas.width/2;
    this.instructionsTxt1.y = this.instructionsTitle.y + 50;
    this.instructionsTxt1.textAlign = 'center';
    this.instructionsTxt1.textBaseline = 'middle';

    this.instructionsTxt3 = new createjs.Text("An outline guide will show if a tower can be placed on the selected block. Green means it can be placed and red means not.", "20px Arial");
    this.instructionsTxt3.x = stage.canvas.width/2;
    this.instructionsTxt3.lineWidth = stage.canvas.width - 200;
    this.instructionsTxt3.y = this.instructionsTxt1.y + 50;
    this.instructionsTxt3.textAlign = 'center';
    this.instructionsTxt3.textBaseline = 'middle';

    this.instructionsTxt4 = new createjs.Text("Click on a placed tower to see its range.", "20px Arial");
    this.instructionsTxt4.lineWidth = stage.canvas.width - 200;
    this.instructionsTxt4.x = stage.canvas.width/2;
    this.instructionsTxt4.y = this.instructionsTxt3.y + 80;
    this.instructionsTxt4.textAlign = 'center';
    this.instructionsTxt4.textBaseline = 'middle';

    this.instructionsTxt2 = new createjs.Text("Each enemy wave will be harder than the previous one, ultimately leading to the boss wave!", "20px Arial");
    this.instructionsTxt2.lineWidth = stage.canvas.width - 200;
    this.instructionsTxt2.x = stage.canvas.width/2;
    this.instructionsTxt2.y = this.instructionsTxt4.y + 50;
    this.instructionsTxt2.textAlign = 'center';
    this.instructionsTxt2.textBaseline = 'middle';

    this.btnBack = new createjs.Bitmap(queue.getResult("imgBack2"));
    this.btnBack.cursor = "pointer";
    this.btnBack.x = stage.canvas.width / 2 - 43;
    this.btnBack.y = this.instructionsTxt2.y + 50;
    this.btnBack.on("click", function () { _menu.initialize(); });

    stage.addChild(this.instructionsTxt1, this.instructionsTxt3, this.instructionsTxt2, this.instructionsTxt4, this.btnBack, this.instructionsTitle);

}

Menu.prototype.Maps = function()
{
    stage.removeAllChildren();

    Menu.prototype.drawText("Options");

    // Level 1
    this.lvl1Btn = new createjs.Bitmap(queue.getResult("imgL1"));
    this.lvl1Btn.cursor = "pointer";
    this.lvl1Btn.x = stage.canvas.width / 2 - (109 + 109/2);
    this.lvl1Btn.y = stage.canvas.height / 2 - 10;
    this.lvl1Btn.on("click", _menu.startGame);

    // Level 2
    this.lvl2Btn = new createjs.Bitmap(queue.getResult("imgL2"));
    this.lvl2Btn.cursor = "pointer";
    this.lvl2Btn.x = stage.canvas.width / 2 + (109/2);
    this.lvl2Btn.y = stage.canvas.height / 2 - 10;
    this.lvl2Btn.on("click", _menu.startTwo);

    //return to Menu button
    this.menuBtn = new createjs.Bitmap(queue.getResult("imgMenu"));
    this.menuBtn.cursor = "pointer";
    this.menuBtn.x = stage.canvas.width / 2 - 78;
    this.menuBtn.y = stage.canvas.height / 2 + 50;
    this.menuBtn.on("click", function () { _menu.initialize(); });


    stage.addChild(this.lvl1Btn, this.lvl2Btn, this.menuBtn);
}
// map1
Menu.prototype.startGame = function()
{
	stage.removeAllChildren(); 
	stage1 = new Stage1();
	currState = stage1;
	drawDashboard();
}
// map2
Menu.prototype.startTwo = function () {
    stage.removeAllChildren();
    stage2 = new Stage2();
    currState = stage2;
    drawDashboard();
}

// start options-menu
Menu.prototype.menuOptions = function()
{
    stage.removeAllChildren();
    Menu.prototype.drawText();

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

    //return to Menu button
    this.menuBtn = new createjs.Bitmap(queue.getResult("imgMenu"));
    this.menuBtn.cursor = "pointer";
    this.menuBtn.x = stage.canvas.width / 2 - 70;
    this.menuBtn.y = stage.canvas.height / 2 + 50;

    this.menuBtn.on("click", function() { _menu.initialize(); });

    stage.addChild(this.musicBtn, this.soundsBtn, this.menuBtn);
}