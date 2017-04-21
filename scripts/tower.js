
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
	        case TowersEnum.ICE_TOWER:
	        	this.towerInfo = TowerInfo.ICE_TOWER;
	        	break;
        	case TowersEnum.CHARGE_TOWER:
	        	this.towerInfo = TowerInfo.CHARGE_TOWER;
	        	break;
	    }

	    this.image = 		this.towerInfo.img;
		this.rateOfFire = 	this.towerInfo.rateOfFire;
		this.fireRange = 	this.towerInfo.fireRange;
		this.price = 		this.towerInfo.price;
		this.power = 		this.towerInfo.power;
		this.bullet = 		this.towerInfo.bullet;
	}

	_t.drawTower = function()
	{
		this.createRangeCircle();

		this.on("click", this.showRangeCircle);
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
			// console.log("NO TARGET: new target!! - " + pEnemy);
			// shoot at enemy and set it as current target
			this.initiateShoot(pEnemy);
		}
	}

	_t.initiateShoot = function(pEnemy)
	{
		// check distance of enemy
	    var dist = this.distance(this, pEnemy);
	    if (pEnemy.getHealth() > 0 && dist <= this.getFireRange())
	    {
	        this.shoot(pEnemy);
	        this.setTarget(pEnemy);
	    }
	    else
	    {
	    	if(this.towerType == TowersEnum.CHARGE_TOWER)
	    	{
	    		this.power = 1;
	    	}

	        this.hasTarget = false;
	        this.target = null;
	    }
		//if(dist <= this.getFireRange())
		//{
		//	// shoot at enemy
		//	this.shoot(pEnemy);
		//	this.setTarget(pEnemy);	
		//}
		//else
		//{
		//    // console.log("enemy NOT in range: " + pEnemy);
		//    this.hasTarget = false;
		//}
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

				var bullet = new Bullet(this.x + 24, this.y + 24, enemy, this.power, this.bullet);
				stage.addChild(bullet);
				bullets.push(bullet);

				if(this.towerType == TowersEnum.CHARGE_TOWER)
				{
					this.power += 1.5;
					console.log("Damage: " + this.power);
				}

				this.oldTicks = this.newTicks;
			}
			//this.hasTarget = true;
		}
		else
		{
			// console.log("no target");
			this.hasTarget = false;
			if(this.towerType == TowersEnum.CHARGE_TOWER)
	    	{
	    		this.power = 1;
	    	}
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
	    if (this._rangeCircle.alpha == 1)
	    {
	        this._rangeCircle.alpha = 0;
	    }
	    else
	    {
	        this._rangeCircle.alpha = 1
	    }
	}

	_t.showRangeCircle = function()
	{
		if(currTower != null)
		{
			if(currTower === this)
			{
				if (this._rangeCircle.alpha == 1)
			    {
			        this._rangeCircle.alpha = 0;
			    }
			    else
			    {
			        this._rangeCircle.alpha = 1
			    }
			}
			else
			{
				currTower._rangeCircle.alpha = 0;
				currTower = this;
				this._rangeCircle.alpha = 1;
			}
		}		
		else
		{
			currTower = this;
			this._rangeCircle.alpha = 1;
		}
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