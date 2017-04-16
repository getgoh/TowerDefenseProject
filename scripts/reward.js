var Reward = function()
{
	this.initialize();
}

//displaying the reward randomly to any location in canvas
Reward.prototype.displayReward = function()
{
	this._reward = new createjs.Bitmap("../images/money-bag.png")
	this._reward.x = stage.canvas.width + Math.random()*300;
    this._reward.y = stage.canvas.height - Math.random()*1200;
	//when click addreward called to add the rewards taken
    this._reward.on("click", this.addReward);
	stage.addChild(this._reward);
}

//add rewards taken like adding money to buy tower then remove after it was click
Reward.prototype.addReward = function()
{
	//dunno what variable for the money
	stage.removeChild(this._reward);
}
