const X_1 = 340
const X_2 = 540
const X_3 = 740

const X = [
    X_2, X_3, X_1, X_2,   
    X_2, X_1, X_1, X_2,    
    X_2, X_3, X_2, X_2,   
    X_2, X_3, X_3, X_2,    
    X_2, X_3, X_2, X_3
]

const Y = [
    -300,
    -920,
    -1200,
    -1400,
    
    -80,
    -500,
    -920,
    -1760,

    -720,
    -1140,
    -1500,
    -1920,

    -320,
    -720,
    -1780,
    -1980,

    -300,
    -800,
    -1600,
    -1200,
]

export default class Coins extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene)
        this.scene = scene

        this.count_created = 0
        this.createFirstElements()

        this.scene.events.on("leave", ()=>{
            if (this.scene.count_created_scenes > 2 ) {
                if (this.count_created === 20) this.count_created = 0 
                this.createCoin()
                this.createCoin()
                this.createCoin()
                this.createCoin()
            }
        }, this)
    }
    createFirstElements() {
        let elem_1 = new Coin(this.scene, X_2, 1320)
        elem_1.move()
        this.add(elem_1)

        let elem_2 = new Coin(this.scene, X_3, 920)
        elem_2.move()
        this.add(elem_2)

        let elem_3 = new Coin(this.scene, X_1, 420)
        elem_3.move()
        this.add(elem_3)

        let elem_4 = new Coin(this.scene, X_2, 120)
        elem_4.move()
        this.add(elem_4)

        let elem_5 = new Coin(this.scene, X_2, -380)
        elem_5.move()
        this.add(elem_5)

        let elem_6 = new Coin(this.scene, X_1, -780)
        elem_6.move()
        this.add(elem_6)

        let elem_7 = new Coin(this.scene, X_1, -1440)
        elem_7.move()
        this.add(elem_7)

        let elem_8 = new Coin(this.scene, X_2, -1860)
        elem_8.move()
        this.add(elem_8)

        this.count_created = 8
    }
    createCoin() {
        let x = X[this.count_created]
        let y = Y[this.count_created]
        let elem = this.getFirstDead()
        elem.reset(x, y)
        this.count_created++
    }
}


class Coin extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'positive_spritesheet', "coin")
        this.init()
    }
    init() {
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.body.enable = true
        this.alive_status = true
        this.scene.events.on('update', this.update, this)
        this.scene.events.on('start_game', this.move, this)
        this.scene.events.on('leave', this.move, this)
    }
    update(timestep, dt) {
        if (this.y > 1970 && this.alive_status){
            this.setAlive(false)
        } 
        this.y += this.velocityY
        this.angle += this.myRotate
    }
    setAlive(status) {   
        this.alive_status = status
        this.body.enable = status  
        this.setVisible(status)
        this.setActive(status)
    }
    reset(x, y) {
        this.x = x
        this.y = y
        this.setAlive(true)        
    }
    move() {
        this.velocityY = this.scene.game_velocity
        this.myRotate = 0.5
    }
}