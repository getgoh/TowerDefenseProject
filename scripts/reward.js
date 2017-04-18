var Reward = function()
{
    this.initialize();
    _reward = this;
}

Reward.prototype.initialize = function() {
    this.spawnReward();
};

Reward.prototype.spawnReward = function()
{
    if (time)
    {
        clearTimeout(time);
    }
    time = setTimeout(this.resetSpawnTime, rewardTime);
    //console.log(rewardTime);
};

Reward.prototype.resetSpawnTime = function()
{
    var multiplier = [21000, 13000, 1600, 17000, 2000, 10000, 9000, 14000, 14000, 5000, 8000];
    rewardTime = multiplier[Math.floor(Math.random() * multiplier.length)];

    _reward.displayReward();
    _reward.spawnReward();

};

//displaying the reward randomly to any location in canvas
Reward.prototype.displayReward = function()
{
    _reward.removeReward();

    _reward.image = new createjs.Bitmap(queue.getResult("imgMoney"));
    _reward.image.scaleX = _reward.image.scaleY = 1.5;
    _reward.image.x = (stage.canvas.width - _reward.image.getBounds().width) * Math.random();
    _reward.image.y = (stage.canvas.height - _reward.image.getBounds().height) * Math.random();
    //when click addreward called to add the rewards taken
    _reward.image.on("click", _reward.addReward);
    stage.addChild(_reward.image);
    rewardSpawnSound();
};

//add rewards taken like adding money to buy tower then remove after it was click
Reward.prototype.addReward = function()
{
    //dunno what variable for the money
    credit += 200;
    creditTxt.text = "Credits: " + credit;
    rewardGetSound();
    _reward.removeReward();

};

Reward.prototype.removeReward = function()
{
    stage.removeChild(_reward.image);
};
