/*
Name: James Milestone
Title: Space Boomers
Date: 1/31
Mods: 
-1 point 
    -Track high score
    -Allow player to control rocket after its fired
- 3 point
    -4 explosion sound effects
- 5 point 
    - New enemy spaceship type
    - Mouse control and firing with left click
    - Particles emit when rocket hits spaceships
- Extras:
    - Score and high score labeled!
    - Score is now the ship's speed multiplied by 10
    - Ships start at default speed, but respawn at a random speed 
    ( I tried increasing the speed, but the ships started moving too fast and the player always hit them)
    - Ships now wait one second before respawning, after they have been destoryed 

*/
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}
let game = new Phaser.Game(config)

// reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT, click

// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3
let highScore = 0
let screenWidth =0