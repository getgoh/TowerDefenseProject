function themeMusicStart()
{
	// initial start of theme music, while
	// assigning returned AbstractSoundInstance to themeMusicCtr
	//themeMusicCtr = createjs.Sound.play("theme");
}

function themeMusicToggle()
{
	if(shouldPlayThemeMusic)
		themeMusicCtr.stop();
	else
		themeMusicCtr.play();

	shouldPlayThemeMusic = !shouldPlayThemeMusic;
}

function rewardSpawnSound()
{
    createjs.Sound.play("itemSpawnSound");
}

function rewardGetSound()
{
    createjs.Sound.play("itemUseSound");
}