
(function(){
    
	var Enemy = function(startX, startY, pathArea, speed, health, imgString)
	{
	    if (typeof (speed) === 'undefined') speed = 1;
	    if (typeof (health) === 'undefined') health = 100;
	    if (typeof (imgString) === 'undefined') imgString = "imgMonster1";

		this.Bitmap_constructor();
		this.x = startX;
		this.y = startY;
		this.speed = speed;
		this.maxHealth = this.health = health;
		this.currDest = 0;
		this.creditValue = 20;
		this.barSize = 1;
		this.image = queue.getResult(imgString);

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


		if(this.x == this.destinations[this.currDest].x && this.y == this.destinations[this.currDest].y)
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

	en.takeDamage = function(amount)
	{
		this.health -= amount;
		this.barSize -= amount / this.maxHealth;;
		this.healthBar.scaleX = this.barSize;
	}

	en.kill = function()
	{	    
	    var index = enemies.indexOf(this);
	    if (index > -1) {
	        enemies.splice(index, 1);
	    }
		
		stage.removeChild(this, this.healthBar, this.healthBarBG);
	}

	en.hitTest = function(hitX, hitY)
	{
	    return (hitX >= this.x+10 && hitX <= this.x + 38 && hitY >= this.y+10 && hitY <= this.y + 38);
	}

window.Enemy = createjs.promote(Enemy, "Bitmap");
}());

