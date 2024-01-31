//Fast ship prefab
class Fastship extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointvalue) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        this.points = pointvalue
        this.moveSpeed = game.settings.spaceshipSpeed +10
    }

    update() {
        // move spaceship left
        this.x += this.moveSpeed

        //wrap around
        if (this.x >= game.config.width - borderUISize) {
            this.x = borderUISize + 10
        }
    }

    reset() {
        
        this.x = game.config.width

    }
}