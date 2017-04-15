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
var stage1;
//used in tower.js
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