	
var _tower;

var MenuTower = function(type)
{
	this.type = type;
	_tower = this;
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
    this.menuTower.y = 9 * 48;
    this.menuTower.x = 0;

	


	this.placeHelper = new createjs.Shape();
	this.placeHelper.graphics.beginFill("#107727").drawRect(0, 0, 48, 48);
	this.placeHelper.alpha = 0.0;

	// _tower.fillObj = new createjs.Graphics.Fill("#107727");
	// this.placeHelper.graphics.append(fillOjb);


	_tower.previewTower = new createjs.Bitmap("../images/tower1.png");

    _tower.previewTower.scaleX = scaleNum;
    _tower.previewTower.scaleY = scaleNum;
	_tower.previewTower.y = 9 * 48;
	_tower.previewTower.x = 0;
	_tower.previewTower.towerType = 1;


	_tower.previewTower.on("mousedown", this.onMouseDown);
    _tower.previewTower.on("pressmove", this.onDragged);
    _tower.previewTower.on("pressup", this.onRelease);

    stage.addChild(this.menuTower, this.placeHelper, _tower.previewTower);
}

MenuTower.prototype.onMouseDown = function()
{
	console.log("CLICK");
	_tower.placeHelper.alpha = 0.6;
}

MenuTower.prototype.onDragged = function(ev)
{
	_tower.dragMove();
}

MenuTower.prototype.dragMove = function()
{

	var ix = Math.floor(stage.mouseX / 48);
	var iy = Math.floor(stage.mouseY / 48);

	_tower.x0 = ix * 48;
	_tower.y0 = iy * 48;

	this.previewTower.x = this.placeHelper.x = _tower.x0;
	this.previewTower.y = this.placeHelper.y = _tower.y0;

	if(this.checkLocation(iy, ix))
	{
		console.log("yes");
	 // ... later, update the fill style/color:
		// _tower.fillObj.style = "#107727";
		_tower.placeHelper.graphics.beginFill("#107727");
	}
	else
	{		
		console.log("no");
		// _tower.fillObj.style = "#b20e0e";
		_tower.placeHelper.graphics.beginFill("#b20e0e");
	}

	// ev.target.x = this.x0;
	// ev.target.y = this.y0;

}

MenuTower.prototype.checkLocation = function(row, col)
{
	if(stage1.gameTable[row][col] != 0)
	{
		return false;
	}
	return true;
}

MenuTower.prototype.onRelease = function(ev)
{
	// return preview to initial position 
	ev.target.y = 9 * 48;
	ev.target.x = 0;

	this.towerType = ev.target.towerType;

	_tower.placeHelper.alpha = 0;
	_tower.placeHelper.x = -200;

	// initiate place tower


	// first, check if current position is valid for placement (not in path? no tower already? within bounds?)

	// var canPlace = _tower.checkLocation();

	// second, check if credits is enough for tower

	// if above conditions are met, place tower
	var newTower = new Tower(_tower.x0, _tower.y0, 1);
}