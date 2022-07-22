const KOEF_X = window.innerWidth / 1080
const KOEF_Y = window.innerHeight / 1920

const LIMIT_Y = window.innerHeight + 100

const X_1 = 340 * KOEF_X
const X_2 = 540 * KOEF_X
const X_3 = 740 * KOEF_X


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

const DATA = [
    [X_3, -720],
    [X_1, -1800],

    [X_1, -720],
    [X_2, -2000],

    [X_2, -500],
    [X_2, -2700],

    [X_2, -140],
    [X_3, -940],
    
    [X_2, -1000],
    [X_1, -1800]
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
                if (this.count_created === 10) {
                    this.count_created = 0
                    // console.log(this.count_created)
                }
                    
                this.createPositiveObject()
                this.createPositiveObject()
                // this.createPositiveObject()
            }
        }, this)
        
    }
    createFirstElements() {
        let data_1 = DATA[0]
        let elem_1 = new PositiveObject(this.scene, X_3, (800 + 320) * KOEF_Y, 'positive_spritesheet', 'positive1' )
        elem_1.move()
        this.add(elem_1)

        let data_2 = DATA[1]
        let elem_2 = new PositiveObject(this.scene, X_1, (-400 + 320) * KOEF_Y, 'positive_spritesheet', 'positive2')
        elem_2.move()
        this.add(elem_2)

        let data_3 = DATA[2]
        let elem_3 = new PositiveObject(this.scene, X_1, (-1520 + 320) * KOEF_Y, 'positive_spritesheet', 'positive3')
        elem_3.move()
        this.add(elem_3)

        let data_4 = DATA[3]
        let elem_4 = new PositiveObject(this.scene, X_2, (-2580 + 320) * KOEF_Y, 'positive_spritesheet', 'positive4')
        elem_4.move()
        this.add(elem_4)

        let data_5 = DATA[4]
        let elem_5 = new PositiveObject(this.scene, X_2, (-3280 + 320) * KOEF_Y, 'positive_spritesheet', 'positive5')
        elem_5.move()
        this.add(elem_5)        

        let data_6 = DATA[5]
        let elem_6 = new PositiveObject(this.scene, X_2, (-3720 + 320) * KOEF_Y, 'positive_spritesheet', 'positive6')
        elem_6.move()
        this.add(elem_6)

        this.count_created = 6
    }
    createPositiveObject() {
        // let data = DATA[this.count_created]
        let x = X[this.count_created]
        let y = Y[this.count_created]
        let elem = this.getFirstDead()    
        let sprite = `positive${Phaser.Math.Between(1,10)}`
        // if (!elem) {
        //     console.log("!elem________")
        //     elem = new PositiveObject(this.scene, data[0], data[1], 'positive_spritesheet', `positive${num}`, data[2])
        // } else 
        elem.reset(x, y, sprite)
        this.count_created++
        }
    }


class PositiveObject extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        this.init()
    }
    init() {
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.body.enable = true
        this.alive_status = true


        let angle = ANGLE[Phaser.Math.Between(0, 1)]
        this.setAngle(angle)
        this.setScale(0.6)
        this.scene.events.on('update', this.update, this)
        this.scene.events.on('start_game', this.move, this)
        this.scene.events.on('leave', this.move, this)
    }
    update(timestep, dt) {
        if (this.y > LIMIT_Y && this.alive_status){
            this.setAlive(false)
        } 
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
        this.y = y * KOEF_Y
        this.setFrame(frame)
        this.setAlive(true)           
    }
    move() {
        this.velocityY = this.scene.game_velocity
    }
}