
(function(){

	var Enemy = function(startX, startY, pathArea)
	{
		this.Bitmap_constructor();
		this.x = startX;
		this.y = startY;
		this.speed = 1;
		this.health = 100;
		this.currDest = 0;

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
		this.image = queue.getResult("imgMonster1");
	}

	var isPositiveX, isPositiveY;

	en.move = function()
	{
		// console.log("x:" + this.x + ", y:" + this.y);
		isPositiveX = (this.destinations[this.currDest].x - this.x) > 0 ? true : false;
		isPositiveY = (this.destinations[this.currDest].y - this.y) > 0 ? true : false;

		this.x = isPositiveX ? this.x + this.speed : this.x - this.speed;
		this.y = isPositiveY ? this.y + this.speed : this.y - this.speed;


		if(this.x == this.destinations[this.currDest].x && this.y == this.destinations[this.currDest].y)
		{
			this.currDest++;
		}

		if(this.destinations[this.currDest] == null)
		{
			// enemy passed, deduct health from "castle" or something
			this.kill();
		}
	}

	en.takeDamage = function(amount)
	{
		this.health -= amount;
	}

	en.kill = function()
	{
		enemies.splice(0, 1);
		stage.removeChild(this);
	}

window.Enemy = createjs.promote(Enemy, "Bitmap");
}());

