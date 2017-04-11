	


var Tower = function(x, y)
{
	this.x = x;
	this.y = y;
	this.rateOfFire = 1;
	this.initialize();
}

Tower.prototype.initialize = function()
{
	this.setDestinations();
	this.draw();
	// this.setCanvasSize();
	// this.drawText();
	// this.drawButtons();
}