//Space ship prefab
class Spaceship extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointvalue) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        this.points = pointvalue
        this.moveSpeed = game.settings.spaceshipSpeed
    }

    update() {
        // move spaceship left
        this.x -= this.moveSpeed

        //wrap around
        if (this.x <= 0 - this.width) {
            this.x = game.config.width
        }
    }

    reset() {
        this.x = game.config.width
    }
}