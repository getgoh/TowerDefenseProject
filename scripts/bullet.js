
(function() {

	var Bullet = function(x, y, enemy, damage)
	{
		this.Shape_constructor();
		// this.towerType = type;
		this.hasTarget = false;
		this.damage = damage;
		this.enemy = enemy;
		this.speed = .1;
		this.x = x;
		this.y = y;
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
		this.graphics.beginFill("#ff0000").drawCircle(this.x, this.y, 10);
	}

	// _b.move = function()
	// {
	// 	// console.log("this: " + this.x + ", " + this.y);
	// 	// console.log("enemy: " + this.enemy.x + ", " + this.enemy.y);

		// isPositiveX = (this.enemy.x - this.x) > 0 ? true : false;
		// isPositiveY = (this.enemy.y - this.y) > 0 ? true : false;

	// 	var enemyX = this.enemy.x + 24;
	// 	var enemyY = this.enemy.y + 24;

	// 	var thisX = this.x + this.startX;
	// 	var thisY = this.y + this.startY;

	// 	// console.log("thisX: " + this.x + ", thisY: " + this.y + " --- enemyX: " + enemyX + ", enemyY: " + enemyY);

	// 	isPositiveX = (enemyX - thisX) > 0 ? true : false;
	// 	isPositiveY = (enemyY - thisY) > 0 ? true : false;


	// 	this.x = isPositiveX ? this.x + this.speed * xDist/dist: this.x - this.speed;
	// 	this.y = isPositiveY ? this.y + this.speed : this.y - this.speed;



		// if((this.x == this.enemy.x || this.x > this.enemy.x-5 || this.x < this.enemy.x+5)
	 //    && (this.y == this.enemy.y || this.y > this.enemy.y-5 || this.y < this.enemy.y+5))

	// 	// if((thisX == enemyX || thisX > enemyX+5 || thisX < enemyX-5)
	//  //    && (thisY == enemyY || thisY > enemyY+5 || thisY < enemyY-5))
	// 	if(thisX == enemyX && thisY == enemyY)
	// 	{
	// 		console.log("EH:" + this.enemy.health + ", DAM:" + this.damage);
	// 		this.enemy.takeDamage(this.damage);
	// 		if(this.enemy.health <= 0)
	// 		{
	// 			this.enemy.kill();
	// 		}

	// 		var index = bullets.indexOf(this);
	// 		if(index > -1)
	// 		{
	// 			bullets.splice(index, 1);
	// 			stage.removeChild(this);
	// 		}
	// 	}

	// 	// if(this.destinations[this.currDest] == null)
	// 	// {
	// 	// 	enemies.splice(0, 1);
	// 	// 	stage.removeChild(this);
	// 	// }
	// }

	_b.move = function() {
		var enemyX = this.enemy.x + 24;
		var enemyY = this.enemy.y + 24;
		var thisX = this.x + this.startX;
		var thisY = this.y + this.startY;
		//find unit vector
		var xDist = enemyX - thisX;
		var yDist = enemyY - thisY;
		var dist = Math.sqrt(xDist*xDist+yDist*yDist);
		this.x = this.x + this.speed * xDist/dist;
		this.y = this.y + this.speed * yDist/dist;

		// if(thisX == enemyX && thisY == enemyY)
		// if((thisX == enemyX || thisX < enemyX+5 || thisX > enemyX-5)
	 //    && (thisY == enemyY || thisY < enemyY+5 || thisY > enemyY-5))
		if(this.enemy.hitTest(thisX, thisY))
		{
			console.log("EH:" + this.enemy.health + ", DAM:" + this.damage);
			this.enemy.takeDamage(this.damage);
			if(this.enemy.health <= 0)
			{
				this.enemy.die();
				stage.removeChild(this);
				this.enemy.kill();
			}

			var index = bullets.indexOf(this);
			if(index > -1)
			{
				bullets.splice(index, 1);
				stage.removeChild(this);
			}
		}
	};

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