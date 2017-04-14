function themeMusic()
{

    //check out main.js, at the preloader function. dunno what's going on right now.

    createjs.Sound.alternateExtensions = ["mp3"];
    createjs.Sound.registerSound(queue.getResult("openTheme"), "theme");    
    createjs.Sound.play("theme");

    //instance.on("complete", this.handleComplete, this);
}