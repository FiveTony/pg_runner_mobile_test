const X_1 = 340
const X_2 = 540
const X_3 = 740

const X = [X_3, X_1,    X_1, X_2,   X_2, X_2,   X_2, X_3,   X_2, X_1]
const Y = [
    -720,
    -1800,

    -720,
    -2000,

    -500,
    -2700,

    -140,
    -940,

    -1000,
    -1800
]

const ANGLE = [-20, 20]

export default class Positive extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene)
        this.scene = scene

        this.count_created = 0
        this.createFirstElements()

        this.scene.events.on("leave", ()=>{
            if (this.scene.count_created_scenes > 3) {
                if (this.count_created === 10)this.count_created = 0 
                    
                this.createPositiveObject()
                this.createPositiveObject()
                // this.createPositiveObject()
            }
        }, this)
        
    }
    createFirstElements() {
        let elem_1 = new PositiveObject(this.scene, X_3, 1120, this.getSprite() )
        elem_1.move()
        this.add(elem_1)

        let elem_2 = new PositiveObject(this.scene, X_1, -80, this.getSprite())
        elem_2.move()
        this.add(elem_2)

        let elem_3 = new PositiveObject(this.scene, X_1, -1200, this.getSprite())
        elem_3.move()
        this.add(elem_3)

        let elem_4 = new PositiveObject(this.scene, X_2, -2260, this.getSprite())
        elem_4.move()
        this.add(elem_4)

        let elem_5 = new PositiveObject(this.scene, X_2, -2960, this.getSprite())
        elem_5.move()
        this.add(elem_5)        

        let elem_6 = new PositiveObject(this.scene, X_2, -3400, this.getSprite())
        elem_6.move()
        this.add(elem_6)

        this.count_created = 6
    }
    createPositiveObject() {
        let x = X[this.count_created]
        let y = Y[this.count_created]
        let elem = this.getFirstDead()    
        let sprite = `positive${Phaser.Math.Between(1,10)}`
        elem.reset(x, y, sprite)
        this.count_created++
    }
    getSprite() {
        return `positive${Phaser.Math.Between(1,10)}`
    }
}

class PositiveObject extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, frame) {
        super(scene, x, y, 'positive_spritesheet', frame)
        this.init()
    }
    init() {
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.body.enable = true
        this.alive_status = true

        console.log(this.scale)

        let angle = ANGLE[Phaser.Math.Between(0, 1)]
        this.setAngle(angle)
        this.scene.events.on('update', this.update, this)
        this.scene.events.on('start_game', this.move, this)
        this.scene.events.on('leave', this.move, this)
    }
    update(timestep, dt) {
        if (this.y > 2000 && this.alive_status) this.setAlive(false)
        this.y += this.velocityY
    }
    setAlive(status) {   
        this.alive_status = status
        this.body.enable = status  
        this.setVisible(status)
        this.setActive(status)
    }
    reset(x, y, frame) {
        this.x = x
        this.y = y
        this.setFrame(frame)
        this.setAlive(true)           
    }
    move() {
        this.velocityY = this.scene.game_velocity
    }
}