	
(function(){

	var Enemy = function(startX, startY)
	{
		this.Bitmap_constructor();
		this.x = startX;
		this.y = startY;
		this.speed = 1;
		this.health = 100;
		this.currDest = 0;

		this.initialize();
	}

	var en = createjs.extend(Enemy, createjs.Bitmap);

	en.initialize = function()
	{
		this.setDestinations();
		this.drawEnemy();
	}

	en.getHealth = function()
	{
		return this.health;
	}

	en.setDestinations = function()
	{
		this.destinations = [ 
		{x: 384, y: 48}, 
		{x: 384, y: 144}, 
		{x:  48, y: 144},
		{x:  48, y: 288},
		{x: 528, y: 288},
		{x: 528, y: 48} ];
	}

	en.drawEnemy = function()
	{
		this.image = queue.getResult("imgMonster1");
		// this.currEnemy = new createjs.Bitmap(queue.getResult("imgMonster1"));
		// var scaleNum = 48/512;
		// this.scaleX = scaleNum;
		// this.scaleY = scaleNum;
		// this.x = this.startX;
	 //    this.y = this.startY;
	    // stage.addChild(this.currEnemy);

		// this.txtTitle = new createjs.Text("E", "50px Arial", "#ff7700");

	 //    this.txtTitle.textAlign = 'center';
	 //    this.txtTitle.textBaseline = 'middle';
	 //    this.txtTitle.x = this.startX;
	 //    this.txtTitle.y = this.startY;

	 //    stage.addChild(this.txtTitle);
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
		var index = enemies.indexOf(this);
		console.log("Index: " + index);
		if(index > -1)
		{
			enemies.splice(index, 1);
			stage.removeChild(this);
		}
	}

window.Enemy = createjs.promote(Enemy, "Bitmap");
}());

