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
}

// Current not in use, but leaving here
// in case we need it in the future
Stage2.prototype.setCanvasSize = function () {
    canvas.width = 600;
    canvas.height = 400;
    holder.style.width = "600px";
}

Stage2.prototype.spawnEnemies = function () {

    for (var x = 1; x <= enemyCount ; x++) {

        var rand = Math.floor((Math.random() * 10) + 1);

        if (rand % 2 == 0) {
            var enemy = new Enemy(cellWidth * 9, x * (-72), path1);
            enemies.push(enemy);
        }
        else {
            var enemy = new Enemy(cellWidth * 9, x * (-72), path2);
            enemies.push(enemy);
        }
    }
};

Stage2.prototype.setTable = function () {
    // size: 15 x 10
    // 0 = placeable cell
    // 9 = path
    // 5 = out of bounds
                    //1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15
    this.gameTable = [[0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 5, 5],
			    /*2*/[0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 5, 5],
				/*3*/[0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 9, 9, 5, 5],
				/*4*/[0, 0, 0, 0, 0, 0, 9, 9, 9, 0, 0, 9, 0, 5, 5],
				/*5*/[9, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 9, 0, 5, 5],
				/*6*/[9, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 5, 5],
				/*7*/[9, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5],
				/*8*/[9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5],
				/*9*/[5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
				/*10*/[5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]];
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