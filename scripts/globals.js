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
var waveNumber = 0;
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

var menuTower1, menuTower2, menuTower3, menuTower4;

// Player currency
var credit = 300;
var lives = 5;
var creditTxt;
var score = 300;
var scoreTxt;

// preloader queue
var queue;

// progress bar
var loadingBarContainer;
var loadingBar;

// music toggle
var shouldPlayThemeMusic = false;
var themeMusicCtr;

// sound effect toggle
var shouldPlaySoundEffect = false;

//stage information

var enemyCounts = [8, 10, 8, 10, 1, 0];
var currState = null;
var didStart = false;
var isPaused = false;
var currTower = null;


// constants
var TowersEnum = {
	BASIC : 1,
	ADVANCED : 2,
	ULTIMATE : 3,
	ICE_TOWER : 4
};

var StageInfo;

function setupStageInfo()
{
	StageInfo = {
		Stage1 : {
			startX : 0,
			startY = 48
		}
	};
}

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
		},
		ICE_TOWER : {
			color: "#244e91",
			size: 4,
			effect: "slow"
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
			rateOfFire : 80,
			fireRange : 200,
			price : 150,
			power : 25,
			bullet : BulletInfo.ULTIMATE,
			img : queue.getResult("imgt3")
		},
		ICE_TOWER : {
			rateOfFire : 60,
			fireRange : 100,
			price : 250,
			power : 5,
			bullet : BulletInfo.ICE_TOWER,
			img : queue.getResult("imgIceTower")
		}
	};
}









