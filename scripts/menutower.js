	


var MenuTower = function(type)
{
	this.type = type;
	// this.x = x;
	// this.y = y;
	this.initialize();
}

MenuTower.prototype.initialize = function()
{
	this.draw();
}

MenuTower.prototype.draw = function()
{	
    // 73 x 65
    // 182.5 x 162.5
    this.menuTower = new createjs.Bitmap("../images/tower1.png");
    this.menuTower.scaleX = this.menuTower.scaleY = 0.2;
    this.menuTower.y = stage.canvas.height - 60;
    this.menuTower.x = 0;


	this.previewTower = new createjs.Bitmap("../images/tower1.png");
	this.previewTower.scaleX = this.previewTower.scaleY = 0.2;
	this.previewTower.y = stage.canvas.height - 60;
	this.previewTower.x = 0;


    this.previewTower.on("pressmove", this.onDragged);
    this.previewTower.on("pressup", this.onRelease);

    stage.addChild(this.menuTower, this.previewTower);
}

MenuTower.prototype.onDragged = function(ev)
{
	// console.log(ev.stageX);
	ev.target.x = ev.stageX - 36;
	ev.target.y = ev.stageY - 33;
}

MenuTower.prototype.onRelease = function(ev)
{
	console.log("Released!!!");
	ev.target.y = stage.canvas.height - 60;
	ev.target.x = 0;

}