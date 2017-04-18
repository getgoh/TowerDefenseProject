// test change XXX


var Enemy = function(firstDest, secondDest, thirdDest)
{
	this.firstDest = firstDest;
	this.secondDest = secondDest;
	this.thirdDest = thirdDest;
	this.currDest = firstDest;
	this.speed = 2;
	this.initialize();
}

Enemy.prototype.initialize = function()
{
	this.draw();
	// this.setCanvasSize();
	// this.drawText();
	// this.drawButtons();
}

Enemy.prototype.draw = function()
{
	this.txtTitle = new createjs.Text("ENEMY", "50px Arial", "#ff7700");

    this.txtTitle.textAlign = 'center';
    this.txtTitle.textBaseline = 'middle';
    this.txtTitle.x = 10;
    this.txtTitle.y = 10;

    stage.addChild(this.txtTitle);
}

Enemy.prototype.move = function()
{
	if(this.txtTitle.x < this.currDest)
	{
		this.txtTitle.x += this.speed;
	}
	else
	{
		this.currDest = this.secondDest;
	}

}