	


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
    // original = 365 x 325
    this.menuTower = new createjs.Bitmap("../images/tower1.png");
    var scaleNum = 48/365;
    this.menuTower.scaleX = scaleNum;
    this.menuTower.scaleY = scaleNum;
    this.menuTower.y = stage.canvas.height - 48;
    this.menuTower.x = 0;


	this.previewTower = new createjs.Bitmap("../images/tower1.png");

    this.previewTower.scaleX = scaleNum;
    this.previewTower.scaleY = scaleNum;
	//this.previewTower.scaleX = this.previewTower.scaleY = 0.2;
	this.previewTower.y = stage.canvas.height - 48;
	this.previewTower.x = 0;
	this.previewTower.towerType = 1;


    this.previewTower.on("pressmove", this.onDragged);
    this.previewTower.on("pressup", this.onRelease);

    stage.addChild(this.menuTower, this.previewTower);
}

MenuTower.prototype.onDragged = function(ev)
{
	var ix = Math.floor(ev.stageX / 48);
	var iy = Math.floor(ev.stageY / 48);

	this.x0 = ix * 48;
	this.y0 = iy * 48;



	// console.log(ev.stageX);
	// ev.target.x = ev.stageX - 36;
	// ev.target.y = ev.stageY - 33;

	ev.target.x = this.x0;
	ev.target.y = this.y0;

	// this.currMouseX = ev.stageX - 36;
	// this.currMouseY = ev.stageY - 33;

}

MenuTower.prototype.onRelease = function(ev)
{
	// return preview to initial position 
	ev.target.y = stage.canvas.height - 48;
	ev.target.x = 0;

	this.towerType = ev.target.towerType;

	// initiate place tower

	// first, check if current position is valid for placement (not in path? no tower already? within bounds?)

	// second, check if credits is enough for tower

	// if above conditions are met, place tower
	var newTower = new Tower(this.x0, this.y0, 1);
}