class Play extends Phaser.Scene {
    constructor() {
      super("playScene")
    }
    
    create() {
        screenWidth = this.width
        game.input.mouse.capture = true;
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0)
        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0)
  
        const emitter = this.add.particles(0, 0, 'splode', {
            frame: [ 0 ],
            lifespan: 500,
            speed: { min: 200, max: 350 },
            scale: { start: 0.4, end: 0 },
            rotate: { start: 0, end: 360 },
            gravityY: 50,
            emitting: false
        });

        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0)
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0)
        
      
        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0)
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0)
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0)
        this.fastShip = new Fastship(this, borderUISize + 10, borderUISize*7 + borderPadding*4, 'fastShip', 0, 50).setOrigin(0, 0)

        // define keys
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        // initialize score
        this.p1Score = 0
        // https://phaser.io/examples/v3/view/game-objects/text/align-text
        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            align: 'left',
            fixedWidth: 200
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2,"Score: " + this.p1Score, scoreConfig)
        
        let highScoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            align: 'left',
            fixedWidth: 300
        }

        this.highScore = this.add.text(borderUISize + borderPadding + 250, borderUISize + borderPadding*2,"High Score: " + highScore, highScoreConfig)
        
        // GAME OVER flag
        this.gameOver = false

        // 60-second play clock
        scoreConfig.fixedWidth = 0
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5)
            this.gameOver = true
        }, null, this)
        
        

    // Big ty to Jackson Mclane for helping me get this
    // i spent like 2 hours trying to figure out using the click to trigger my rocket and he pretty much walked me through it
        click = this.input.activePointer
    }

    update() {


        // check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.scene.restart()
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene")
        }

        this.starfield.tilePositionX -= 4
        if(!this.gameOver) {               
            this.p1Rocket.update()         // update rocket sprite
            this.ship01.update()           // update spaceships (x3)
            this.ship02.update()
            this.ship03.update()
            this.fastShip.update()
        } 
       
        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship03,this.ship03.points)   

        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship02,this.ship02.points)

        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship01,this.ship01.points)

        }
        if (this.checkCollision(this.p1Rocket, this.fastShip)) {
            this.p1Rocket.reset()
            this.shipExplode(this.fastShip,this.fastShip.points)
        }


    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
            return true
        } else {
            return false
        }
    }
    shipExplode(ship, point) {
        // temporarily hide ship
        ship.alpha = 0
        if ( typeof ship == Fastship){
            var newSpeed = Phaser.Math.Between(9, 15);

        } else {
            var newSpeed = Phaser.Math.Between(3, 12);
        }
        
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        let explosionParticle = this.add.particles(ship.x, ship.y, 'splode', {
            speed: 100,
            lifespan: 3000,
            gravityY: 200
        });

        boom.anims.play('explode')             // play explode animation
        boom.on('animationcomplete', () => {   // callback after anim completes
            ship.reset()                         // reset ship position
            boom.destroy()                      // remove explosion sprite
            explosionParticle.destroy()
        })       
        // score add and text update
        this.p1Score += ship.moveSpeed * 10;
        if (highScore < this.p1Score){
            highScore = this.p1Score
            this.highScore.text = "High Score: " + highScore
        }
        this.scoreLeft.text = "Score: " + this.p1Score   
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random    
        let x= Math.floor((Math.random() * (4 - 1) + 1))

        
        this.sound.play('sfx-explosion'+x)
        ship.moveSpeed = 0
        this.clock = this.time.delayedCall(2000, () => {
            ship.alpha = 1
            ship.moveSpeed = newSpeed
        },null, this);
    }
  }