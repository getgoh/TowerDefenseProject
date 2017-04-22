
(function(){
    
	var Enemy = function(startX, startY, pathArea, speed, health, imgString)
	{
	    if (typeof (speed) === 'undefined') speed = 1;
	    if (typeof (health) === 'undefined') health = 100;
	    if (typeof (imgString) === 'undefined') imgString = "imgMonster1";

		this.Bitmap_constructor();
		this.x = startX;
		this.y = startY;
		this.speed = this.initSpeed = speed;
		this.maxHealth = this.health = health;
		this.currDest = 0;
		this.creditValue = 20;
		this.barSize = 1;
		this.image = queue.getResult(imgString);
		this.effects = [];
		this.isAlive = true;

		this.fireBG = null;
		this.fireMod = 1;

		this.initialize(pathArea);
	}

	var en = createjs.extend(Enemy, createjs.Bitmap);

	en.initialize = function(pathArea)
	{
		this.setDestinations(pathArea);
		this.drawEnemy();
	}

	en.getHealth = function()
	{
		return this.health;
	}

	en.setDestinations = function(pathArea)
	{
		this.destinations = pathArea;
	}

	en.drawEnemy = function()
	{
		// health bar stuff
		this.healthBar = new createjs.Shape();
		this.healthBarBG = new createjs.Shape();

	    // this.healthBar.graphics.beginFill("#2bd61b").drawRect(this.x, this.y - 4, 48, 5);
	    // this.healthBarBG.graphics.beginFill("#bc0b0b").drawRect(this.x, this.y - 4, 48, 5);
	    this.healthBar.graphics.beginFill("#2bd61b").drawRect(0, 0, 48, 5);
	    this.healthBarBG.graphics.beginFill("#bc0b0b").drawRect(0, 0, 48, 5);

	    stage.addChild(this.healthBarBG, this.healthBar);
	}

	var isPositiveX, isPositiveY;

	en.move = function()
	{
		if(this.effects.length > 0)
		{
			for(var eff = 0; eff < this.effects.length; eff++)
			{
				switch(this.effects[eff])
				{
					case "slow":
						var newTick = createjs.Ticker.getTicks();
						if(newTick - this.effectTick <= 200)
						{
							var color = new createjs.ColorFilter(0, 0, 1, 1, 0, 0, 0, 0);
					        this.filters = [color];
					        this.cache(0, 0, 48 + 10, 48 + 10);
							this.speed = this.initSpeed * 0.5;
						}
						else
						{
							this.speed = this.initSpeed;
							this.filters = [];
							this.cache(0, 0, 48+10, 48+10);
							this.effectTick = newTick;
							this.effects.splice(this.effects.indexOf(this.effects[eff]), 1);
						}
					break;
					case "burn":
						var newBurnTick = createjs.Ticker.getTicks();
						var diff = newBurnTick - this.burnTick;
						if(diff <= 300)
						{
							// visuals
							if(this.fireBG == null)
							{
								this.fireBG = new createjs.Bitmap(queue.getResult("imgFireBG"));
								this.fireBG.alpha = 0.8;
								stage.addChild(this.fireBG);
							}
							this.fireBG.x = this.x;
							this.fireBG.y = this.y;

							// fire animation
							if(diff%30 == 0)
							{
								console.log("DO ANIMATION: " + this.fireMod%2);
								if(this.fireMod%2 == 0)
								{
									this.fireBG.image = queue.getResult("imgFireBG2");
								}
								else
								{	
									this.fireBG.image = queue.getResult("imgFireBG");
								}
								this.fireMod++;
							}

							// damage per second
							if(diff%60 == 0)
							{
								// 4% damage per second
								this.takeDamage(this.maxHealth * 0.04);
							}
						}
						else
						{
							stage.removeChild(this.fireBG);
							this.fireBG = null;
							this.burnTick = newBurnTick;
							this.effects.splice(this.effects.indexOf(this.effects[eff]), 1);
						}

					break;
				}
			}
			// console.log("effect: " + this.effect);
			
		}

		// console.log("x:" + this.x + ", y:" + this.y);
		isPositiveX = (this.destinations[this.currDest].x - this.x) > 0 ? true : false;
		isPositiveY = (this.destinations[this.currDest].y - this.y) > 0 ? true : false;

		// this cleans up the wobbly movement of enemy
		// we can remove it to make the enemy movement look less programmed

		if(this.x != this.destinations[this.currDest].x)
		{
			this.x = isPositiveX ? this.x + this.speed : this.x - this.speed;
			
		}
		this.healthBar.x = this.healthBarBG.x = this.x;
		// this cleans up the wobbly movement of enemy
		if(this.y != this.destinations[this.currDest].y)
		{
			this.y = isPositiveY ? this.y + this.speed : this.y - this.speed;
		}
		this.healthBar.y = this.healthBarBG.y = this.y - 5;


		var xDist = this.destinations[this.currDest].x - this.x;
		var yDist = this.destinations[this.currDest].y - this.y;
		var dist = Math.sqrt(xDist*xDist+yDist*yDist);

		if(dist <= 3)
		{
			this.currDest++;
		}

		if(this.destinations[this.currDest] == null)
		{
			// enemy passed, deduct health from "castle" or something
			lives -= 1;
	 		txtLives.text = "Lives: " + lives;
			this.kill();
		}
	}

	en.applyEffect = function(effect)
	{
		// check first if "effect" is not already in effect
		if(this.effects.indexOf(effect) < 0)
		{
			this.effects.push(effect);	
		}


		this.effectTick = createjs.Ticker.getTicks();

		if(effect == "burn")
		{
			this.burnTick = createjs.Ticker.getTicks();
			// this.fireMod = 1;
		}
	}

	en.takeDamage = function(damage)
	{
		this.health -= damage;
		this.barSize -= damage / this.maxHealth;;
		this.healthBar.scaleX = this.barSize;

		if(this.health <= 0 && this.health != -9999)
		{
			this.health = -9999;
		    this.kill(true);
		}
	}

	en.kill = function()
	{	    
	    var index = enemies.indexOf(this);
	    if (index > -1) {
	        enemies.splice(index, 1);
		    addCredit(this.creditValue);
		    this.isAlive = false;
	    }
	    else
	    {
	    	console.log("ELSE");
	    }
		
		stage.removeChild(this, this.healthBar, this.healthBarBG);
		if(this.fireBG != null)
		{
			stage.removeChild(this.fireBG);
		}
	}

	en.hitTest = function(hitX, hitY)
	{
	    return (hitX >= this.x+10 && hitX <= this.x + 38 && hitY >= this.y+10 && hitY <= this.y + 38);
	}

window.Enemy = createjs.promote(Enemy, "Bitmap");
}());

