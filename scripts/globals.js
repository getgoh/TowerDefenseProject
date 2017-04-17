/*
All global variables
*/

// Canvas sizes
var canvasWidth = 960;
var canvasHeight = 480;

// size per 'section' of the game board.
var cellWidth = 48;
var cellHeight = 48;

// canvas object and stage container
var canvas;
var stage;

var holder;

// menu
var menu;
// used in menu.js
var _menu;

// used in reward.js
var reward;
var _reward;
var rewardTime = 1000;
var time;

// game object collections
var enemies = [];
var towers = [];
var bullets = [];
var stage1;
var stage2;

//stage2 paths
var path1 = [
		{ x: 432, y: 192 },
		{ x: 336, y: 192 },
		{ x: 336, y: 288 }, //split occurs

		{ x: 144, y: 288 },
		{ x: 144, y: 384 },
		{ x: 48, y: 384 },
        { x: 48, y: 240 }];
var path2 = [
        { x: 432, y: 192 },
		{ x: 336, y: 192 },
		{ x: 336, y: 288 }, //split occurs

        { x: 576, y: 288 },
        //{ x: , y: 144 },
        { x: 576, y: 144 },
        { x: 768, y: 144 }];

//used in menutower.js
var _tower;

var menuTower1, menuTower2;

// Player currency
var credit = 300;
var lives = 5;
var creditTxt;

// preloader queue
var queue;

// progress bar
var loadingBarContainer;
var loadingBar;

// music toggle
var shouldPlayThemeMusic = true;
var themeMusicCtr;

//stage information
var enemyCount = 10;
var currState = null;
var didStart = false;


// constants
var TowersEnum = {
	BASIC : 1,
	ADVANCED : 2,
	ULTIMATE : 3
};

var TowerInfo, BulletInfo;

// need to put this inside function because we need
// the pre-loader (queue) to finish first
function setupTowerInfo()
{

	BulletInfo = {
		BASIC : {
			color: "#ff0000",
			size: 2
		},
		ADVANCED : {
			color: "#11d63b",
			size: 4
		},
		ULTIMATE : {
			color: "#000000",
			size: 5
		}
	};

	TowerInfo = {
		BASIC : {
			rateOfFire : 80,
			fireRange : 100,
			price : 100,
			power : 30,
			bullet : BulletInfo.BASIC,
			img : queue.getResult("imgt1")
		},
		ADVANCED : {
			rateOfFire : 120,
			fireRange : 100,
			price : 120,
			power : 50,
			bullet : BulletInfo.ADVANCED,
			img : queue.getResult("imgt2")
		},
		ULTIMATE : {
			rateOfFire : 100,
			fireRange : 150,
			price : 150,
			power : 50,
			bullet : BulletInfo.ULTIMATE,
			img : queue.getResult("imgt3")
		}
	};
}









