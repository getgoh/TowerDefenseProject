function themeMusicStart()
{
	// initial start of theme music, while
	// assigning returned AbstractSoundInstance to themeMusicCtr
	themeMusicCtr = createjs.Sound.play("theme", { interrupt: createjs.Sound.INTERRUPT_NONE, loop: -1});
}

function themeMusicForStage(stage)
{
	themeMusicCtr.stop();
	themeMusicCtr = createjs.Sound.play("gameTheme", { interrupt: createjs.Sound.INTERRUPT_NONE, loop: -1, volume: 0.1});
	themeMusicCtr.stop();
	if(shouldPlayThemeMusic)
	{		
		themeMusicCtr.play();
	}
}

function themeMusicToggle()
{
	if(shouldPlayThemeMusic)
		themeMusicCtr.stop();
	else
		themeMusicCtr.play();

	shouldPlayThemeMusic = !shouldPlayThemeMusic;
}

function soundEffectsToggle()
{
	shouldPlaySoundEffect = !shouldPlaySoundEffect;
}

function rewardSpawnSound()
{	
	if(shouldPlaySoundEffect)
	{
    	createjs.Sound.play("itemSpawnSound");
    }
}

function rewardGetSound()
{
	if(shouldPlaySoundEffect)
	{
    	createjs.Sound.play("itemUseSound");
    }
}

function spawnEnemySound()
{
	if(shouldPlaySoundEffect)
	{
		createjs.Sound.play("enemySound");
	}
}

function spawnBossSound()
{
	if(shouldPlaySoundEffect)
	{
		createjs.Sound.play("bossSound");
	}
}