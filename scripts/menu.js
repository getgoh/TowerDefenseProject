

var Menu = function()
{
	this.initialize();
}

Menu.prototype.initialize = function()
{
	this.setCanvasSize();
	this.drawText();
	this.drawButtons();
}

Menu.prototype.setCanvasSize = function()
{
	canvas.width = 600;
	canvas.height = 400;
	holder.style.width = "600px";
}

Menu.prototype.drawText = function()
{
	this.txtTitle = new createjs.Text("Tower PewPew", "50px Arial", "#ff7700");

    this.txtTitle.textAlign = 'center';
    this.txtTitle.textBaseline = 'middle';
    this.txtTitle.x = stage.canvas.width/2;
    this.txtTitle.y = stage.canvas.height/2 - 60;

    stage.addChild(this.txtTitle);
}

Menu.prototype.drawButtons = function()
{
	// start game button
 	this.gameBtn = new createjs.Bitmap("../images/btnStart.png");
 	this.gameBtn.cursor = "pointer";
 	this.gameBtn.x = this.txtTitle.x - 90;
 	this.gameBtn.y = this.txtTitle.y + 50;

 	// instructions button
 	this.instructionsBtn = new createjs.Bitmap("../images/btnInstructions.png");
 	this.instructionsBtn.cursor = "pointer";
 	this.instructionsBtn.x = this.txtTitle.x - 94;
 	this.instructionsBtn.y = this.gameBtn.y + 60;

 	this.gameBtn.on("click", function(e) { alert('START ZE GAME!!'); });
 	this.instructionsBtn.on("click", function(e) { alert('Show help page!!'); });

 	stage.addChild(this.gameBtn, this.instructionsBtn);
}