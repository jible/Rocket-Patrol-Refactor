// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        // add object to existing scene
        scene.add.existing(this)
        this.isFiring = false
        this.moveSpeed = 2
        this.sfxShot = scene.sound.add('sfx-shot')

    }

    


        
    
    

    update() {
        // left /right movement
        // if(keyLEFT.isDown && this.x >= borderUISize + this.width){
        //     this.x -= this.moveSpeed
        // } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
        //     this.x += this.moveSpeed
        // }
        // https://stackoverflow.com/questions/28104605/how-to-find-the-mouse-position-x-y-using-phaser
       
        
        if ( game.input.mousePointer.x > borderUISize && game.input.mousePointer.x < game.config.width -borderUISize ){
            this.x = game.input.mousePointer.x;
    }
        if (click.isDown){

            this.isFiring = true;
            this.sfxShot.play()
            
        }

        


        // fire button
        // fire button
        // if fired/ move up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed

        }

        //reset on miss
        if(this.y <=borderUISize *3 + borderPadding) {
            this.isFiring = false
            this.y = game.config.height - borderUISize - borderPadding
        }

        
    }
    reset(){
        this.isFiring = false
        this.y = game.config.height- borderUISize - borderPadding
    }
}


