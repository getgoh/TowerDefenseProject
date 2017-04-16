	
(function() {

	var Tower = function(x, y, type)
	{
		this.Bitmap_constructor();
		this.towerType = type;
		this.hasTarget = false;
		this.x = x;
		this.y = y;
		this.oldTicks = createjs.Ticker.getTicks();


		this.initialize();
	}

	var _t = createjs.extend(Tower, createjs.Bitmap);

	_t.initialize = function()
	{
		this.getTowerInfo();
		this.drawTower();	
	}

	_t.getTowerInfo = function()
	{
		this.towerInfo = TowerInfo.BASIC;

		switch (this.towerType) {
	        case TowersEnum.BASIC:
	            this.towerInfo = TowerInfo.BASIC;
	            break;
	        case TowersEnum.ADVANCED:
	            this.towerInfo = TowerInfo.ADVANCED;
	            break;
	        case TowersEnum.ULTIMATE:
	            this.towerInfo = TowerInfo.ULTIMATE;
	            break;
	    }

	    this.image = 		this.towerInfo.img;
		this.rateOfFire = 	this.towerInfo.rateOfFire;
		this.fireRange = 	this.towerInfo.fireRange;
		this.price = 		this.towerInfo.price;
		this.power = 		this.towerInfo.power;
	}

	_t.drawTower = function()
	{
	    var scaleNum = 48/368;

		console.log("Draw!!");
	    this.scaleX = scaleNum;
	    this.scaleY = scaleNum;
		this.x = this.x;
		this.y = this.y;

		this.createRangeCircle();

		this.on("click", this.onSelectTower);

		console.log("x:" + this.x
			+ ", y:" + this.y
			+ ", scaleX:" + this.scaleX);

		//stage.addChild(this.currTower);
	}

	_t.checkIfInRange = function(pEnemy)
	{
		if(this.hasTarget)
		{
			// shoot on existing target
		}
		else
		{
			// check distance of enemy
			var dist = _t.distance(this, pEnemy);
			// console.log("dist:" + dist);
			if(dist <= this.getFireRange())
			{
				console.log("enemy in range: " + pEnemy);
				// shoot at enemy and set enemy as target
				//pTower.shoot(pEnemy);
				this.setTarget(pEnemy);
			}
			else
			{
				// console.log("enemy NOT in range: " + pEnemy);
			}
		}
	}

	_t.shoot = function(enemy)
	{
		if(enemy.getHealth() > 0)
		{			
			this.newTicks = createjs.Ticker.getTicks();
			if(this.newTicks - this.oldTicks >= this.rateOfFire)
			{
				// produce bullet, then add to bullets[] array
			}
			this.hasTarget = true;
		}
	}

    _t.distance = function (p1, p2) {
        return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
    };

	_t.hasTarget = function()
	{
		return this.hasTarget;
	}

	_t.setTarget = function(enemy)
	{
		this.target = enemy;
	}

	_t.onSelectTower = function()
	{
		this._rangeCircle.alpha = 1;
	}

	_t.createRangeCircle = function () 
	{
	    this._rangeCircle = new createjs.Shape();
	    this._rangeCircle.graphics.setStrokeStyle(1).beginStroke("rgba(255,0,0,1)").drawCircle(this.x + 24, this.y + 24, this.getFireRange()); //.beginStroke("rgba(255,255,255,1)")
	    this._rangeCircle.alpha = 0;
	    stage.addChild(this._rangeCircle);
	}

	_t.getFireRange = function()
	{
		return this.fireRange;
	}

window.Tower = createjs.promote(Tower, "Bitmap");
}());