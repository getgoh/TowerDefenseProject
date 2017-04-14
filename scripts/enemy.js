	


var Enemy = function(startX, startY)
{
	this.startX = startX;
	this.startY = startY;
	this.speed = 1;
	this.initialize();
	this.currDest = 0;
}

Enemy.prototype.initialize = function()
{
	this.setDestinations();
	this.draw();
	// this.setCanvasSize();
	// this.drawText();
	// this.drawButtons();
}

Enemy.prototype.setDestinations = function()
{
	// this.destinations = [ 
	// 	{x: 400, y: 40}, 
	// 	{x: 400, y: 150}, 
	// 	{x:  10, y: 150},
	// 	{x:  10, y: 300},
	// 	{x: 550, y: 300},
	// 	{x: 550, y: 10} ];

		this.destinations = [ 
		{x: 384, y: 48}, 
		{x: 384, y: 144}, 
		{x:  48, y: 144},
		{x:  48, y: 288},
		{x: 528, y: 288},
		{x: 528, y: 48} ];
}

Enemy.prototype.draw = function()
{
	this.currEnemy = new createjs.Bitmap("../images/monster1.png");
	var scaleNum = 48/512;
	this.currEnemy.scaleX = scaleNum;
	this.currEnemy.scaleY = scaleNum;
	this.currEnemy.x = this.startX;
    this.currEnemy.y = this.startY;
    stage.addChild(this.currEnemy);

	// this.txtTitle = new createjs.Text("E", "50px Arial", "#ff7700");

 //    this.txtTitle.textAlign = 'center';
 //    this.txtTitle.textBaseline = 'middle';
 //    this.txtTitle.x = this.startX;
 //    this.txtTitle.y = this.startY;

 //    stage.addChild(this.txtTitle);
}

var isPositiveX, isPositiveY;

Enemy.prototype.move = function()
{
	isPositiveX = (this.destinations[this.currDest].x - this.currEnemy.x) > 0 ? true : false;
	isPositiveY = (this.destinations[this.currDest].y - this.currEnemy.y) > 0 ? true : false;

	this.currEnemy.x = isPositiveX ? this.currEnemy.x + this.speed : this.currEnemy.x - this.speed;
	this.currEnemy.y = isPositiveY ? this.currEnemy.y + this.speed : this.currEnemy.y - this.speed;


	if(this.currEnemy.x == this.destinations[this.currDest].x && this.currEnemy.y == this.destinations[this.currDest].y)
	{
		this.currDest++;
	}

	if(this.destinations[this.currDest] == null)
	{
		enemies.splice(0, 1);
		stage.removeChild(this.currEnemy);
	}
}