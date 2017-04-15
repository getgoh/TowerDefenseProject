	
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

	this.draw();
}

Tower.prototype.draw = function()
{
	console.log("Draw!!");
	this.currTower = new createjs.Bitmap(queue.getResult("imgt1"));
    var scaleNum = 48/368;
    this.currTower.scaleX = scaleNum;
    this.currTower.scaleY = scaleNum;
	this.currTower.x = this.x;
	this.currTower.y = this.y;

	console.log("x:" + this.x
		+ ", y:" + this.y
		+ ", scaleX:" + this.currTower.scaleX);

	stage.addChild(this.currTower);
}