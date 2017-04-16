
(function() {

	// constructor
	var MenuTower = function(type)
	{
		this.Bitmap_constructor();
		
		this.type = type;
		this.x = 0;
		this.y = 9 * 48;
		this.initialize();
	}

	var _mt = createjs.extend(MenuTower, createjs.Bitmap);

	// init function
	_mt.initialize = function()
	{
	    this.drawMenuTower();
	}

	//
	_mt.drawMenuTower = function()
	{
		// instantiate menutower depending on current type
		// TowersEnum defined in globals.js
	    switch (this.type) {
	        case TowersEnum.BASIC:
	            // this.menuTower = new createjs.Bitmap(queue.getResult("imgt1"));
	            this.image = queue.getResult("imgt1");
	            break;
	        case TowersEnum.ADVANCED:
	            // this.menuTower = new createjs.Bitmap(queue.getResult("imgt2"));
	            this.image = queue.getResult("imgt2");
	            break;
	        case TowersEnum.ULTIMATE:
	            // this.menuTower = new createjs.Bitmap(queue.getResult("imgt3"));
	            this.image = queue.getResult("imgt3");
	            break;
	    }

	    _mt.placeHelper = new createjs.Shape();
	    _mt.cmd = _mt.placeHelper.graphics.beginFill("#107727").command;
	    _mt.placeHelper.graphics.drawRect(0, 0, 48, 48);
	    _mt.placeHelper.alpha = 0.01;

	    // _tower.fillObj = new createjs.Graphics.Fill("#107727");
	    // this.placeHelper.graphics.append(fillOjb);


	    _mt.previewTower = new createjs.Bitmap(queue.getResult("imgt1"));

	    // _mt.previewTower.scaleX = scaleNum;
	    // _mt.previewTower.scaleY = scaleNum;
	    _mt.previewTower.y = 9 * 48;
	    _mt.previewTower.x = 0;
	    _mt.previewTower.towerType = 1;


	    _mt.previewTower.on("mousedown", this.onMouseDown);
	    _mt.previewTower.on("pressmove", this.onDragged);
	    _mt.previewTower.on("pressup", this.onRelease);

	    stage.addChild(_mt.placeHelper, _mt.previewTower);
	}

	_mt.onMouseDown = function()
	{
		console.log("CLICK");
		_mt.placeHelper.x = _mt.previewTower.x;
		_mt.placeHelper.y = _mt.previewTower.y;
		_mt.placeHelper.alpha = 0.6;
	}

	_mt.onDragged = function(ev)
	{
		_mt.dragMove();
	}

	_mt.dragMove = function()
	{
		_mt.ix = Math.floor(stage.mouseX / 48);
		_mt.iy = Math.floor(stage.mouseY / 48);

		_mt.x0 = this.ix * 48;
		_mt.y0 = this.iy * 48;

		_mt.previewTower.x = _mt.placeHelper.x = _mt.x0;
		_mt.previewTower.y = _mt.placeHelper.y = _mt.y0;

		// placement guide
		// green = can place
		// red = cannot place
		if(_mt.iy < 10 && _mt.ix < 20)
		{
			if(this.checkLocation(this.iy, this.ix))
			{
				// console.log("yes");
			 // ... later, update the fill style/color:
				this.cmd.style = "#107727";
				// _tower.placeHelper.graphics.beginFill("#107727");
			}
			else
			{		
				// console.log("no");
				this.cmd.style = "#b20e0e";
				// _tower.placeHelper.graphics.beginFill("#b20e0e");
			}
		}

		// ev.target.x = this.x0;
		// ev.target.y = this.y0;

	}

	_mt.checkLocation = function(row, col)
	{
	    if (stage1) {
	        console.log(row);
	        if (stage1.gameTable[row][col] != 0) {
	            return false;
	        }
	        return true;
	    }
	    if (stage2) {
	        console.log(row);
	        if (stage2.gameTable[row][col] != 0) {
	            return false;
	        }
	        return true;
	    }
	}

	_mt.onRelease = function(ev)
	{
		// return preview to initial position 
		ev.target.y = 9 * 48;
		ev.target.x = 0;

		this.towerType = ev.target.towerType;

		_mt.placeHelper.alpha = 0;
		_mt.placeHelper.x = -200;

		// out of bounds
		if(_mt.iy >= 10 || _mt.ix >= 20)
		{
			return;
		}

		// initiate place tower


		// first, check if current position is valid for placement (not in path? no tower already? within bounds?)

		var canPlace = _mt.checkLocation(_mt.iy, _mt.ix);

		// second, check if credits is enough for tower

		if(credit < 100)
			return;

		if(canPlace)
		{
		// if above conditions are met, place tower
			var newTower = new Tower(_mt.x0, _mt.y0, TowersEnum.BASIC);
			stage.addChild(newTower);
			if (stage1) {
			    stage1.gameTable[_mt.iy][_mt.ix] = 1;
			}
			if (stage2) {
			    stage2.gameTable[_mt.iy][_mt.ix] = 1;
			}

			towers.push(newTower);

			// after placing, deduct price of tower from credit
			credit -= 100;
			creditTxt.text = "Credit: " + credit;
		}
	}

window.MenuTower = createjs.promote(MenuTower, "Bitmap");
}());



