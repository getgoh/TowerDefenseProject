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

// game object collections
var enemies = [];
var towers = [];
var bullets = [];
var stage1;

//used in menutower.js
var _tower;

var menuTower1, menuTower2;

// Player currency
var credit = 500;
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


// constants
var TowersEnum = {
	BASIC : 1,
	ADVANCED : 2,
	ULTIMATE : 3
};

var TowerInfo;

function setupTowerInfo()
{
	TowerInfo = {
		BASIC : {
			rateOfFire : 80,
			fireRange : 120,
			price : 100,
			power : 10,
			img : queue.getResult("imgt1")
		},
		ADVANCED : {
			rateOfFire : 2,
			fireRange : 100,
			price : 120,
			power : 8,
			img : queue.getResult("imgt2")
		},
		ULTIMATE : {
			rateOfFire : 1,
			fireRange : 150,
			price : 150,
			power : 15,
			img : queue.getResult("imgt3")
		}
	};
}









