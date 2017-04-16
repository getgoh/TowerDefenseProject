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
	stage.removeAllChildren(); 
	this.drawText();
	this.drawButtons();
}

// sets canvas size
Menu.prototype.setCanvasSize = function()
{
	canvas.width = 600;
	canvas.height = 400;
	holder.style.width = "600px";
}

// creates title
Menu.prototype.drawText = function()
{
	this.txtTitle = new createjs.Text("Tower PewPew", "50px Arial", "#ff7700");

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
 	this.gameBtn.on("click", function(e) { window.location.href = "towerdefense.html"; });
 	this.instructionsBtn.on("click", this.Maps);
 	this.optionsBtn.on("click", this.menuOptions);
 	this.exitBtn.on("click", function (e) { alert('EXIT NOW!!'); });

 	stage.addChild(this.gameBtn, this.instructionsBtn, this.optionsBtn, this.exitBtn);
}


Menu.prototype.Maps = function()
{
    stage.removeAllChildren();

    Menu.prototype.drawText();
    
    // Level 1
    this.lvl1Btn = new createjs.Bitmap(queue.getResult("imgL1"));
    this.lvl1Btn.cursor = "pointer";
    this.lvl1Btn.x = stage.canvas.width / 2 - 190;
    this.lvl1Btn.y = stage.canvas.height / 2 - 10;
    this.lvl1Btn.on("click", _menu.startGame);
    
    // Level 2
    this.lvl2Btn = new createjs.Bitmap(queue.getResult("imgL2"));
    this.lvl2Btn.cursor = "pointer";
    this.lvl2Btn.x = stage.canvas.width / 2 + 34;
    this.lvl2Btn.y = stage.canvas.height / 2 - 10;
    this.lvl2Btn.on("click", _menu.startTwo);
    
    //return to Menu button
    this.menuBtn = new createjs.Bitmap(queue.getResult("imgMenu"));
    this.menuBtn.cursor = "pointer";
    this.menuBtn.x = stage.canvas.width / 2 - 70;
    this.menuBtn.y = stage.canvas.height / 2 + 50;
    this.menuBtn.on("click", function () { _menu.initialize(); });    
    
    
    stage.addChild(this.lvl1Btn, this.lvl2Btn, this.menuBtn);
}
// choose maptype
Menu.prototype.startGame = function()
{
    stage.removeAllChildren();
	stage1 = new Stage1();
	drawDashboard();
}

Menu.prototype.startTwo = function () {
    stage.removeAllChildren();
    stage2 = new Stage2();
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

    //return to Menu button
    this.menuBtn = new createjs.Bitmap(queue.getResult("imgMenu"));
    this.menuBtn.cursor = "pointer";
    this.menuBtn.x = stage.canvas.width / 2 - 70;
    this.menuBtn.y = stage.canvas.height / 2 + 50;

    this.menuBtn.on("click", function() { _menu.initialize(); });

    stage.addChild(this.musicBtn, this.soundsBtn, this.menuBtn);
}