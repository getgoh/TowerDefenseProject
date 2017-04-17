/*

*/

//
var Stage1 = function()
{
	this.initialize();
}

Stage1.prototype.initialize = function()
{
	this.setTable();
	this.drawMap();
	this.spawnEnemies();
	this.oldTicks = createjs.Ticker.getTicks();
	this.enemiesToSpawn = enemyCount;
	reward = new Reward();
}

// Current not in use, but leaving here
// in case we need it in the future
Stage1.prototype.setCanvasSize = function()
{
	canvas.width = 600;
	canvas.height = 400;
	holder.style.width = "600px";
}

Stage1.prototype.update = function ()
{
    this.spawnEnemies();
}

Stage1.prototype.spawnEnemies = function ()
{

    var area = [
		{ x: 384, y: 48 },
		{ x: 384, y: 144 },
		{ x: 48, y: 144 },
		{ x: 48, y: 288 },
		{ x: 528, y: 288 },
		{ x: 528, y: 48 }];

    //for (var x = 1; x <= enemyCount ; x++) {
    //    var enemy = new Enemy((x * (-72)), cellWidth, area);
    //    enemies.push(enemy);
    //    console.log(enemy)
    //    stage.addChild(enemy);
    //}

    if (this.enemiesToSpawn > 0) {
        this.newTicks = createjs.Ticker.getTicks();
        if (this.newTicks - this.oldTicks >= 60) {
            var enemy = new Enemy(0, cellWidth, area);
            stage.addChild(enemy);
            enemies.push(enemy);
            this.oldTicks = this.newTicks;

            this.enemiesToSpawn--;
        }
    }


};

Stage1.prototype.setTable = function()
{
	// size: 15 x 10
	// 0 = placeable cell
	// 9 = path
	// 5 = out of bounds
	this.gameTable = [ [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5 ],
					   [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 9, 0, 5, 5 ],
					   [ 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 9, 0, 5, 5 ],
					   [ 0, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 9, 0, 5, 5 ],
					   [ 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 5, 5 ],
					   [ 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 5, 5 ],
					   [ 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 5, 5 ],
					   [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5 ],
					   [ 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5 ],
					   [ 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5 ]];


		// console.log("gt:" + this.gameTable[0][0]);

		// window.gt = this.gameTable;
}

Stage1.prototype.drawMap = function()
{
	this.enemyPath = new createjs.Shape();
	this.enemyPath.graphics.setStrokeStyle(45);
	this.enemyPath.graphics.beginStroke("#4286f4");

	// define and draw the path
	// *this is for visual purposes only*
	this.pathPoints = [ 
		{x: 384, y: 48}, 
		{x: 384, y: 144}, 
		{x:  48, y: 144},
		{x:  48, y: 288},
		{x: 528, y: 288},
		{x: 528, y: 48} ];

	this.enemyPath.graphics.moveTo(-48, 48 + 24);

	for(var p = 0; p < this.pathPoints.length; p++)
	{
		// var rowNum = Math.floor(this.pathPoints[p].y / 48);
		// var colNum = Math.floor(this.pathPoints[p].x / 48);

		// console.log("x:" + colNum + ", y:" + rowNum);

		//this.gameTable[rowNum][colNum] = 9;

		this.enemyPath.graphics.lineTo(this.pathPoints[p].x + 24, this.pathPoints[p].y + 24);
	}

	stage.addChild(this.enemyPath);
}

Stage1.prototype.drawText = function()
{
	this.txtTitle = new createjs.Text("Stage 1", "20px Arial", "#ff7700");

    this.txtTitle.textAlign = 'center';
    this.txtTitle.textBaseline = 'middle';
    this.txtTitle.x = stage.canvas.width/2;
    this.txtTitle.y = stage.canvas.height/8;

    stage.addChild(this.txtTitle);
}