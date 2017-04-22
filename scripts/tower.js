
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
        	case TowersEnum.FIRE_TOWER:
	        	this.towerInfo = TowerInfo.FIRE_TOWER;
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
		this.createBoxInfo();

		this.on("click", this.onTowerClick);
	}

	_t.createRangeCircle = function () 
	{
	    this._rangeCircle = new createjs.Shape();
	    this._rangeCircle.graphics.setStrokeStyle(1).beginStroke("rgba(255,0,0,1)").drawCircle(this.x + 24, this.y + 24, this.getFireRange()); //.beginStroke("rgba(255,255,255,1)")
	    this._rangeCircle.alpha = 0;
	    stage.addChild(this._rangeCircle);
	}

	_t.createBoxInfo = function()
	{
		this._boxInfo = new createjs.Container();
		this._boxInfoBG = new createjs.Shape();
		this._boxInfoBG.graphics.beginStroke("#000").beginFill("#ffffff").drawRect(0, 0, 70, 60);
		this._boxInfoBG.alpha = 0.8;
		this._boxInfo.x = this.x - 12;
		this._boxInfo.y = this.y + 50;
		this._boxInfo.alpha = 0;

		// damage text
		this._txtDamage = new createjs.Text("Damage: " + this.power, "Arial 10px", "#0018f7");
		this._txtSpeed = new createjs.Text("Speed: " + this.rateOfFire, "Arial 10px", "#0018f7");

		// speed text
		this._txtDamage.x = this._txtSpeed.x = 8;
		this._txtSpeed.y = this._txtDamage.y + 10;

		// sell button
		this.txt = new createjs.Text("Sell: " + (this.price * 0.5));
        this.btn = new createjs.Shape();
        this.btn.graphics.beginStroke("#000");
        this.btn.graphics.beginFill("#CCC");
        this.btn.graphics.drawRect(0,0,50,25);
        this.btn.x = 8;
        this.btn.y = this._txtSpeed.y + 15;
        this.btn.price = this.price;
        this.btn.parentTower = this;
        stage.addChild(this.btn);
        this.txt.textAlign = 'center';
        this.txt.textBaseline = 'middle';
        this.txt.x = 28;
        this.txt.y = this._txtSpeed.y + 26;


        this.btn.on("click", this.sellTower);

		this._boxInfo.addChild(this._boxInfoBG, this._txtDamage, this._txtSpeed, this.btn, this.txt);
		stage.addChild(this._boxInfo);
	}

	_t.sellTower = function()
	{
		console.log(this.parentTower);
		var index = towers.indexOf(this.parentTower);
		if(index >= -1)
		{
			var ix = Math.floor(this.parentTower.x / 48);
			var iy = Math.floor(this.parentTower.y / 48);
			console.log(ix + ",, " + iy);

		    currState.gameTable[iy][ix] = 0;

			this.parentTower.removeChildren();
			stage.removeChild(this.parentTower);
			towers.splice(index, 1);
			credit += this.parentTower.price * 0.5;
			creditTxt.text = "Credits: " + credit;
		}
	}

	_t.removeChildren = function()
	{
		stage.removeChild(this._rangeCircle, this._boxInfo);
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
	    	// for charge towers
	    	this.resetDamage();

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

	_t.resetDamage = function()
	{
		this.power = this.towerType == TowersEnum.CHARGE_TOWER ? 1 : this.power;
	}

	_t.setDamage = function()
	{
		this.power = this.towerType == TowersEnum.CHARGE_TOWER ? this.power + 1 : this.power;	
		this._txtDamage.text = "Damage: " + this.power;
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

				// for charge towers
				this.setDamage();

				this.oldTicks = this.newTicks;
			}
			//this.hasTarget = true;
		}
		else
		{
			// console.log("no target");
			this.hasTarget = false;
			// for charge towers
			this.resetDamage();
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

	_t.onTowerClick = function()
	{
		this.showRangeCircle(false);
	}

	_t.infoBoxToggle = function(off)
	{
		if(off)
		{
			this._boxInfo.alpha = 0;
		}
		else
		{
			this._boxInfo.alpha = this._boxInfo.alpha == 1 ? 0 : 1;
		}
		// stage.setChildIndex( this._boxInfo, stage.getNumChildren()-1);
		// stage.setChildIndex(this._boxInfo, 999);
	}

	_t.showRangeCircle = function(justClose)
	{
		if(justClose)
		{
	        this._rangeCircle.alpha = 0;
			this.infoBoxToggle(true);
			return;
		}

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
			    this.infoBoxToggle(false);
			}
			else
			{
				currTower._rangeCircle.alpha = 0;
				currTower.infoBoxToggle(true);
				currTower = this;
				this._rangeCircle.alpha = 1;
				this.infoBoxToggle(false);
			}
		}		
		else
		{
			currTower = this;
			this._rangeCircle.alpha = 1;
			this.infoBoxToggle(false);
		}
	}

	

	_t.getFireRange = function()
	{
		return this.fireRange;
	}

window.Tower = createjs.promote(Tower, "Bitmap");
}());