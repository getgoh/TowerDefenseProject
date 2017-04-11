	


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
	this.destinations = [ 
		{x: 400, y: 40}, 
		{x: 400, y: 150}, 
		{x:  10, y: 150},
		{x:  10, y: 300},
		{x: 400, y: 300} ];
}

Enemy.prototype.draw = function()
{
	this.txtTitle = new createjs.Text("E", "50px Arial", "#ff7700");

    this.txtTitle.textAlign = 'center';
    this.txtTitle.textBaseline = 'middle';
    this.txtTitle.x = this.startX;
    this.txtTitle.y = this.startY;

    stage.addChild(this.txtTitle);
}

var isPositiveX, isPositiveY;

Enemy.prototype.move = function()
{
	isPositiveX = (this.destinations[this.currDest].x - this.txtTitle.x) > 0 ? true : false;
	isPositiveY = (this.destinations[this.currDest].y - this.txtTitle.y) > 0 ? true : false;

	this.txtTitle.x = isPositiveX ? this.txtTitle.x + this.speed : this.txtTitle.x - this.speed;
	this.txtTitle.y = isPositiveY ? this.txtTitle.y + this.speed : this.txtTitle.y - this.speed;


	if(this.txtTitle.x == this.destinations[this.currDest].x && this.txtTitle.y == this.destinations[this.currDest].y)
	{
		this.currDest++;
	}

	if(this.destinations[this.currDest] == null)
	{
		enemies.splice(0, 1);
		stage.removeChild(this.txtTitle);
	}
}