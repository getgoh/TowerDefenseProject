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
	this.enemiesToSpawnInit = this.enemiesToSpawn = enemyCounts[waveNumber];
	this.tickStamp = createjs.Ticker.getTicks();
	reward = new Reward();

	// temp for endless
	this.initSpeed = 1;
	this.initHP = 100;

	// music
	themeMusicForStage();
}

Stage1.prototype.saveTicks = function()
{
	this.tickStamp = createjs.Ticker.getTicks();
}

Stage1.prototype.setTicks = function()
{
	this.oldTicks += createjs.Ticker.getTicks() - this.tickStamp;
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
    this.checkForWin();

    // enemies
    for(var x = 0; x < enemies.length; x++)
    {
        enemies[x].move();

        // towers
        for(var y = 0; y < towers.length; y++)
        {
            if (enemies[x])
            {
                towers[y].checkIfInRange(enemies[x]);
            }
        }    
    }

    // bullets
    for (var b = 0; b < bullets.length; b++) {
        bullets[b].move();
    }
}

Stage1.prototype.checkForWin = function ()
{
	if(didStart == true)
	{
		if(lives <= 0)
		{
            enemies = [];
            towers = [];
            bullets = [];
			// show lose message, then stop the game
			testgameover("You lose! Your score is " + score);
			gameOverMenu();
			pauseToggle();
			didStart = false;
		}
		else if(enemies.length == 0 && this.enemiesToSpawn == 0)
		{
		    // show win message, then stop the game, or start next game, retaining life and money?
		    waveNumber++;
		    txtWaves.text = "Wave: " + (waveNumber + 1);
		    // this.enemiesToSpawn = enemyCounts[waveNumber];
		    this.enemiesToSpawnInit++;
		    if(this.initSpeed < 2)
		    {
		    	this.initSpeed += 0.1;
		    }
		    this.initHP += 20;
		    this.enemiesToSpawn = this.enemiesToSpawnInit;
		    if(this.enemiesToSpawn == 0) {
		    	
	            enemies = [];
	            towers = [];
	            bullets = [];
		        testgameover("You win! Your score is " + score);
		        gameOverMenu();
		        pauseToggle();
		    }
			didStart = false;
		}		
	}
}

Stage1.prototype.getNumEnemies = function(wave) {

}

var ttm = false;
function testgameover(msg)
{
	if(!ttm)
	{
		alert(msg);
		ttm = true;
	}
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

    //for (var x = 1; x <= enemyCounts[waveNumber] ; x++) {
    //    var enemy = new Enemy((x * (-72)), cellWidth, area);
    //    enemies.push(enemy);
    //    console.log(enemy)
    //    stage.addChild(enemy);
    //}

    if (this.enemiesToSpawn > 0) {

    	this.newTicks = createjs.Ticker.getTicks();
        
        if (this.newTicks - this.oldTicks >= 60) {

            // var enemy = this.returnEnemyType(area, waveNumber);
            var enemy = new Enemy(0, cellWidth, area, this.initSpeed, this.initHP, "imgMonster1");
            stage.addChild(enemy);

            // always set the boxinfo of towers on top of everything
            for(var tow=0;tow<towers.length;tow++)
            {
            	stage.setChildIndex( towers[tow]._boxInfo, stage.getNumChildren()-1);
            }

            enemies.push(enemy);
            this.oldTicks = this.newTicks;

            this.enemiesToSpawn--;

    		didStart = true;
        }
    }
    // else
    // {
    // 	this.waveTicker = 
    // }
};

Stage1.prototype.returnEnemyType = function (area, wave) {
    switch (wave) {
        case 0:
            spawnEnemySound();
            return new Enemy(0, cellWidth, area);
            break;
        case 1:
            spawnEnemySound();
            return new Enemy(0, cellWidth, area);
            break;
        case 2:
            spawnEnemySound();
            return new Enemy(0, cellWidth, area, 1.5, 200, "imgMonster2");
            break;
        case 3:
            spawnEnemySound();
            return new Enemy(0, cellWidth, area, 2, 200, "imgMonster2");
            break;
        case 4:
            spawnBossSound();
            return new Enemy(0, cellWidth, area, 1, 2000, "imgMonster3");
            break;
        default:
            spawnEnemySound();
            return new Enemy(0, cellWidth, area);
            break;
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