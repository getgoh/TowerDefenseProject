	


var Tower = function(x, y, type)
{
	this.x = x;
	this.y = y;
	this.towerType = type;
	this.rateOfFire = 1;
	this.initialize();
}

Tower.prototype.initialize = function()
{
	//this.setDestinations();
	this.draw();
	// this.setCanvasSize();
	// this.drawText();
	// this.drawButtons();
}

Tower.prototype.draw = function()
{
	this.currTower = new createjs.Bitmap("../images/tower1.png");
    var scaleNum = 48/365;
    this.currTower.scaleX = this.currTower.scaleY = scaleNum;
	this.currTower.x = this.x;
	this.currTower.y = this.y;

	stage.addChild(this.currTower);
}