
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
		this.createRangeCircle();

		this.on("click", this.onSelectTower);
	}

	_t.checkIfInRange = function(pEnemy)
	{
		// console.log(this);
		if(this.hasTarget)
		{
			// console.log("has existing target");
			// shoot at existing target
			this.initiateShoot(this.target)
		}
		else
		{
			console.log("NO TARGET: new target!! - " + pEnemy);
			// shoot at enemy and set it as current target
			this.initiateShoot(pEnemy);
		}
	}

	_t.initiateShoot = function(pEnemy)
	{
		// check distance of enemy
		var dist = this.distance(this, pEnemy);
		if(dist <= this.getFireRange())
		{
			// shoot at enemy
			this.shoot(pEnemy);
			this.setTarget(pEnemy);	
		}
		else
		{
			// console.log("enemy NOT in range: " + pEnemy);
		}
	}

	var tt = true;
	function testlog(msg)
	{
		if(tt)
		{
			console.log(msg);
			tt = false;
		}
	}

	_t.shoot = function(enemy)
	{
		if(enemy && enemy.getHealth() > 0)
		{			
			this.newTicks = createjs.Ticker.getTicks();
			// console.log("NT: " + this.newTicks + ", OT: " + this.oldTicks + ", ROF: " + this.rateOfFire);
			// testlog("ROF: " + this.rateOfFire);
			if(this.newTicks - this.oldTicks >= this.rateOfFire)
			{

				// console.log("tower: " + this.x + ", " + this.y);

				// produce bullet, then add to bullets[] array				
				var bullet = new Bullet(this.x + 24, this.y + 24, enemy, this.power);
				stage.addChild(bullet);
				bullets.push(bullet);

				this.oldTicks = this.newTicks;
			}
			//this.hasTarget = true;
		}
		else
		{
			// console.log("no target");
			this.hasTarget = false;
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
		this.hasTarget = true;
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