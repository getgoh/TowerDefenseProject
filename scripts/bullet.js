
(function() {

	var Bullet = function(x, y, enemy, damage)
	{
		this.Shape_constructor();
		// this.towerType = type;
		this.hasTarget = false;
		this.damage = damage;
		this.enemy = enemy;
		this.speed = .5;
		this.startX = x;
		this.startY = y;
		this.x = 0;
		this.y = 0;
		this.oldTicks = createjs.Ticker.getTicks();


		this.initialize();
	}

	var _b = createjs.extend(Bullet, createjs.Shape);

	var tt = true;
	function testlog(msg)
	{
		if(tt)
		{
			console.log(msg);
			tt = false;
		}
	}

	_b.initialize = function()
	{
		testlog("bullet: " +this.x + ", " + this.y);
		this.graphics.beginFill("#ff0000").drawCircle(this.startX, this.startY, 5);
	}

	_b.move = function()
	{
		// console.log("this: " + this.x + ", " + this.y);
		// console.log("enemy: " + this.enemy.x + ", " + this.enemy.y);

		var enemyX = this.enemy.x + 24;
		var enemyY = this.enemy.y + 24;

		var thisX = this.x + this.startX;
		var thisY = this.y + this.startY;

		// console.log("thisX: " + this.x + ", thisY: " + this.y + " --- enemyX: " + enemyX + ", enemyY: " + enemyY);

		isPositiveX = (enemyX - thisX) > 0 ? true : false;
		isPositiveY = (enemyY - thisY) > 0 ? true : false;

		this.x = isPositiveX ? this.x + this.speed : this.x - this.speed;
		this.y = isPositiveY ? this.y + this.speed : this.y - this.speed;


		// if((thisX == enemyX || thisX > enemyX+5 || thisX < enemyX-5)
	 //    && (thisY == enemyY || thisY > enemyY+5 || thisY < enemyY-5))
		if(thisX == enemyX && thisY == enemyY)
		{
			this.enemy.takeDamage(this.damage);
			if(this.enemy.health <= 0)
			{
				var index = bullets.indexOf(this);
				if(index > -1)
				{
					bullets.splice(index, 1);
					stage.removeChild(this);
				}
				this.enemy.kill();
			}
		}

		// if(this.destinations[this.currDest] == null)
		// {
		// 	enemies.splice(0, 1);
		// 	stage.removeChild(this);
		// }
	}

	var isPositiveX;
	var isPositiveY;

	// en.move = function()
	// {
	// 	// console.log("x:" + this.x + ", y:" + this.y);
	// 	isPositiveX = (this.destinations[this.currDest].x - this.x) > 0 ? true : false;
	// 	isPositiveY = (this.destinations[this.currDest].y - this.y) > 0 ? true : false;

	// 	this.x = isPositiveX ? this.x + this.speed : this.x - this.speed;
	// 	this.y = isPositiveY ? this.y + this.speed : this.y - this.speed;


	// 	if(this.x == this.destinations[this.currDest].x && this.y == this.destinations[this.currDest].y)
	// 	{
	// 		this.currDest++;
	// 	}

	// 	if(this.destinations[this.currDest] == null)
	// 	{
	// 		enemies.splice(0, 1);
	// 		stage.removeChild(this);
	// 	}
	// }






	window.Bullet = createjs.promote(Bullet, "Shape");
}());