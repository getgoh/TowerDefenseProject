/*

*/

//
var Stage2 = function () {
    this.initialize();
}

Stage2.prototype.initialize = function () {
    this.setTable();
    this.drawMap();
    this.spawnEnemies();
    this.oldTicks = createjs.Ticker.getTicks();
    this.enemiesToSpawn = enemyCounts[waveNumber];
    this.tickStamp = createjs.Ticker.getTicks();
    
    reward = new Reward();

    // music
    themeMusicForStage();
}

Stage2.prototype.saveTicks = function()
{
    this.tickStamp = createjs.Ticker.getTicks();
}

Stage2.prototype.setTicks = function()
{
    this.oldTicks += createjs.Ticker.getTicks() - this.tickStamp;
}

// Current not in use, but leaving here
// in case we need it in the future
Stage2.prototype.setCanvasSize = function () {
    canvas.width = 600;
    canvas.height = 400;
    holder.style.width = "600px";
}

Stage2.prototype.update = function () {
    this.spawnEnemies();
    this.checkForWin();

    // enemies
    for (var x = 0; x < enemies.length; x++) {
        enemies[x].move();

        // towers
        for (var y = 0; y < towers.length; y++) {
            if (enemies[x]) {
                towers[y].checkIfInRange(enemies[x]);
            }
        }
    }

    // bullets
    for (var b = 0; b < bullets.length; b++) {
        bullets[b].move();
    }
}

Stage2.prototype.checkForWin = function () {
    if (didStart == true) {
        if (lives <= 0) {
            // show lose message, then stop the game
            testgameover("You lose!");
            didStart = false;
        }
        else if (enemies.length == 0 && this.enemiesToSpawn == 0) {
            // show win message, then stop the game, or start next game, retaining life and money?
            waveNumber++;
            this.enemiesToSpawn = enemyCounts[waveNumber];
            if (this.enemiesToSpawn == 0) {
                testgameover("You win!");
            }
            didStart = false;
        }
    }
}

var ttm = false;
function testgameover(msg) {
    if (!ttm) {
        alert(msg);
        ttm = true;
    }
}

Stage2.prototype.spawnEnemies = function () {
    for (var x = 1; x <= enemyCounts[waveNumber] ; x++) {
        if (this.enemiesToSpawn > 0) {
            this.newTicks = createjs.Ticker.getTicks();
            if (this.newTicks - this.oldTicks >= 60) {
                if (Math.random() < 0.5) {
                    this.spawnEnemyOnPath(path1);
                }
                else {
                    this.spawnEnemyOnPath(path2);
                }
            }
        }  
    }
};

Stage2.prototype.returnEnemyType = function (area, wave) {

    if(wave === 4)
    {
        spawnBossSound();   
    }
    else
    {
        spawnEnemySound();
    }

    switch (wave) {
        case 0:
            return new Enemy(cellWidth * 9, 0, area, 1, 10);
            break;
        case 1:
            return new Enemy(cellWidth * 9, 0, area);
            break;
        case 2:
            return new Enemy(cellWidth * 9, 0, area, 2, 200, "imgMonster2");
            break;
        case 3:
            return new Enemy(cellWidth * 9, 0, area, 2, 200, "imgMonster2");
            break;
        case 4:
            return new Enemy(cellWidth * 9, 0, area, 1, 2000, "imgMonster3");
            break;
        default:
            return new Enemy(cellWidth * 9, 0, area);
            break;
    }
};

Stage2.prototype.spawnEnemyOnPath = function (path) {    
    var enemy = this.returnEnemyType(path, waveNumber);
    stage.addChild(enemy);
    enemies.push(enemy);
    this.oldTicks = this.newTicks;
    this.enemiesToSpawn--;

    didStart = true;
};

Stage2.prototype.setTable = function () {
    // size: 15 x 10
    // 0 = placeable cell
    // 9 = path
    // 5 = out of bounds
    //1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16
    this.gameTable = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 5, 5],
                      [0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 5, 5],
			    /* 3*/[0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 5, 5],
				/* 4*/[0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 9, 9, 5, 5],
				/* 5*/[0, 0, 0, 0, 0, 0, 0, 9, 9, 9, 0, 0, 9, 0, 5, 5],
				/* 6*/[0, 9, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 9, 0, 5, 5],
				/* 7*/[0, 9, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 5, 5],
				/* 8*/[0, 9, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5],
				/* 9*/[0, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5],
				/*10*/[5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
			    /*11*/[5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]];
}

Stage2.prototype.drawMap = function () {
    this.enemyPath = new createjs.Shape();
    this.enemyPath.graphics.setStrokeStyle(45);
    this.enemyPath.graphics.beginStroke("#4286f4");

    this.pathPoints = path1;
    this.enemyPath.graphics.moveTo(432 + 24, -48);

    for (var p = 0; p < this.pathPoints.length; p++) {

        this.enemyPath.graphics.lineTo(this.pathPoints[p].x + 24, this.pathPoints[p].y + 24);
    }

    this.pathPoints = path2;
    this.enemyPath.graphics.moveTo(432 + 24, -48);

    for (var p = 0; p < this.pathPoints.length; p++) {

        this.enemyPath.graphics.lineTo(this.pathPoints[p].x + 24, this.pathPoints[p].y + 24);
    }

    stage.addChild(this.enemyPath);
}

Stage2.prototype.drawText = function () {
    this.txtTitle = new createjs.Text("Stage 2", "20px Arial", "#ff7700");

    this.txtTitle.textAlign = 'center';
    this.txtTitle.textBaseline = 'middle';
    this.txtTitle.x = stage.canvas.width / 2;
    this.txtTitle.y = stage.canvas.height / 8;

    stage.addChild(this.txtTitle);
}