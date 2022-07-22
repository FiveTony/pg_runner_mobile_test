const X_1 = 340
const X_2 = 540
const X_3 = 740

const X = [X_1, X_2, X_2,   X_2, X_1, X_3,  X_1, X_3, X_3,  X_3, X_3, X_1,  X_3, X_1, X_1]
const Y = [
-300,
-920,
-1800,

-720,
-1200,
-2000,

-1500,
-500,
-940,

-320,
-1360,
-1580,

-520,
-800,
-1600]

export default class Spots extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene)
        this.scene = scene

        this.count_created = 0
        this.createFirstElements()

        this.scene.events.on("leave", ()=>{
            if (this.scene.count_created_scenes > 2 ) {
                    if (this.count_created === 15) this.count_created = 0
                    
                this.createSpot()
                this.createSpot()
                this.createSpot()
            }
        }, this)
    }
    createFirstElements() {
        let elem_1 = new Spot(this.scene, X_1, 1320, 'spot_2')
        elem_1.move()
        this.add(elem_1)

        let elem_2 = new Spot(this.scene, X_2, 920, 'spot_1')
        elem_2.move()
        this.add(elem_2)

        let elem_3 = new Spot(this.scene, X_2, -480, 'spot_2')
        elem_3.move()
        this.add(elem_3)

        let elem_4 = new Spot(this.scene, X_2, -800, 'spot_2')
        elem_4.move()
        this.add(elem_4)

        let elem_5 = new Spot(this.scene, X_1, -1660, 'spot_2')
        elem_5.move()
        this.add(elem_5)

        let elem_6 = new Spot(this.scene, X_3, -2260, 'spot_1')
        elem_6.move()
        this.add(elem_6)

        this.count_created = 6
    }
    createSpot() {
        let x = X[this.count_created]
        let y = Y[this.count_created]
        let sprite = `spot_${Phaser.Math.Between(1, 2)}`
        let elem = this.getFirstDead()
        elem.reset(x, y, sprite)
        
        this.count_created++
        }
    }


class Spot extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, frame) {
        super(scene, x, y, 'positive_spritesheet', frame)
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