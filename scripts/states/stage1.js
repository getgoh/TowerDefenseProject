

var Stage1 = function()
{
	this.initialize();
}

Stage1.prototype.initialize = function()
{
	// this.setCanvasSize();
	// this.drawText();
	this.drawMap();
	this.spawnEnemies();
	//this.drawButtons();
}

Stage1.prototype.setCanvasSize = function()
{
	canvas.width = 600;
	canvas.height = 400;
	holder.style.width = "600px";
}

Stage1.prototype.spawnEnemies = function() {
	for(var x=1;x<=10;x++)
	{
		var enemy = new Enemy((x * (-80)), 40);
		//stage.addChild(enemy);
		enemies.push(enemy);
		window.enemies = enemies;
	}


};

Stage1.prototype.drawMap = function()
{
	this.enemyPath = new createjs.Shape();
	this.enemyPath.graphics.setStrokeStyle(45);
	this.enemyPath.graphics.beginStroke("#4286f4");


	this.pathPoints = [ 
		{x: 400, y: 40}, 
		{x: 400, y: 150}, 
		{x:  10, y: 150},
		{x:  10, y: 300},
		{x: 550, y: 300},
		{x: 550, y: 10} ];

	this.enemyPath.graphics.moveTo(-20, 70);

	for(var p = 0; p < this.pathPoints.length; p++)
	{
		this.enemyPath.graphics.lineTo(this.pathPoints[p].x + 30, this.pathPoints[p].y + 30);
	}

	stage.addChild(this.enemyPath);
}

Stage1.prototype.drawText = function()
{
	this.txtTitle = new createjs.Text("Stage 1", "20px Arial", "#ff7700");

    this.txtTitle.textAlign = 'center';
    this.txtTitle.textBaseline = 'middle';
    this.txtTitle.x = stage.canvas.width/2;
    this.txtTitle.y = stage.canvas.height/8;

    stage.addChild(this.txtTitle);
}

Stage1.prototype.drawButtons = function()
{
	// start game button
 	this.gameBtn = new createjs.Bitmap("../images/btnStart.png");
 	this.gameBtn.cursor = "pointer";
 	this.gameBtn.x = this.txtTitle.x - 190;
 	this.gameBtn.y = this.txtTitle.y + 50;

 	// instructions button
 	this.instructionsBtn = new createjs.Bitmap("../images/btnInstructions.png");
 	this.instructionsBtn.cursor = "pointer";
 	this.instructionsBtn.x = this.txtTitle.x - 194;
 	this.instructionsBtn.y = this.gameBtn.y + 60;

 	// options button
 	this.optionsBtn = new createjs.Bitmap("../images/btnOptions.png");
 	this.optionsBtn.cursor = "pointer";
 	this.optionsBtn.x = this.txtTitle.x + 34;
 	this.optionsBtn.y = this.txtTitle.y + 50;

 	// exit button
 	this.exitBtn = new createjs.Bitmap("../images/btnExit.png");
 	this.exitBtn.cursor = "pointer";
 	this.exitBtn.x = this.txtTitle.x + 34;
 	this.exitBtn.y = this.optionsBtn.y + 60;

 	this.gameBtn.on("click", function(e) { window.location.href = "towerdefense.html"; });
 	this.instructionsBtn.on("click", function(e) { alert('Show help page!!'); });
 	this.optionsBtn.on("click", function(e) { alert('Show options page!!'); });
 	this.exitBtn.on("click", function(e) { alert('EXIT NOW!!'); });

 	stage.addChild(this.gameBtn, this.instructionsBtn, this.optionsBtn, this.exitBtn);
}