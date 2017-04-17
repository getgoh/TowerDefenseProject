
(function() {

	var Bullet = function(x, y, enemy, damage)
	{
		this.Shape_constructor();
		// this.towerType = type;
		this.hasTarget = false;
		this.damage = damage;
		this.enemy = enemy;
		this.speed = 5;
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
		//console.log("enemyx"+this.enemy.x);
		//console.log("enemyY" + this.enemy.y);
		//console.log("ThisX" + thisX);
	    //console.log("thisY" + thisY);
        
	    if(dist < 5)
		//if(this.enemy.hitTest(thisX, thisY))
		{
			console.log("EH:" + this.enemy.health + ", DAM:" + this.damage);
			this.enemy.takeDamage(this.damage);
			if(this.enemy.health <= 0)
			{
			    this.enemy.kill();
			    

			    console.log("TEST");
				// stage.removeChild(this);
				// this.enemy.kill();
			}

			var index = bullets.indexOf(this);
			if(index > -1)
			{
				bullets.splice(index, 1);
				stage.removeChild(this);
			}
		}
	};


	window.Bullet = createjs.promote(Bullet, "Shape");
}());