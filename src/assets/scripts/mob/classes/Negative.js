const KOEF_X = window.innerWidth / 1080
const KOEF_Y = window.innerHeight / 1920

const LIMIT_Y = window.innerHeight  + 340

const WIDTH = 1080
const HEIGHT = 1920

const DATA = [
    [300 + 40, -680, 'room1_1'],
    [710 + 40, -1280, 'room1_2'],
    [700 + 40, -1760, 'room1_3'],
    
    [500 + 40, -500, 'room2_1'],
    [700 + 40, -1400, 'room2_2'],
    [300 + 40, -1600, 'room2_3'],

    [310 + 40, -560, 'room3_1'],
    [370 + 40, -1200, 'room3_2'],
    [310 + 40, -1920, 'room3_3'],

    [300 + 40, -800, 'room4_1'],
    [300 + 40, -1360, 'room4_2'],
    [300 + 40, -1980, 'room4_3'],

    [500 + 40, -520, 'room5_1'],
    [300 + 40, -1200, 'room5_2'],
    [700 + 40, -1840, 'room5_3'],
]


export default class Negative extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene)
        this.scene = scene

        this.count_created = 0
        this.createFirstElements()

        this.scene.events.on("leave", ()=>{
            if (this.scene.count_created_scenes > 2 ) {
                if (this.count_created === 15) {
                    this.count_created = 0
                    // console.log(this.count_created)
                }
                this.createNextNegative()
                this.createNextNegative()
                this.createNextNegative()
            }
        }, this)
    }
    createFirstElements() {
        let data_1 = DATA[0]
        let elem_1 = new NegativeObject(this.scene, (300 + 40)  * KOEF_X , (640 + 320) * KOEF_Y, 'negative_spritesheet', 'room1_1')
        elem_1.move()
        this.add(elem_1)

        let data_2 = DATA[1]
        let elem_2 = new NegativeObject(this.scene, (710 + 40)  * KOEF_X, (420 + 320) * KOEF_Y, 'negative_spritesheet', 'room1_2')
        elem_2.move()
        this.add(elem_2)

        let data_3 = DATA[2]
        let elem_3 = new NegativeObject(this.scene, (700 + 40) * KOEF_X, (-140 + 320) * KOEF_Y, 'negative_spritesheet', 'room1_3')
        elem_3.move()
        this.add(elem_3)

        let data_4 = DATA[3]
        let elem_4 = new NegativeObject(this.scene, (506 + 40) * KOEF_X, (-1310 + 320) * KOEF_Y, 'negative_spritesheet', 'room2_1')
        elem_4.move()
        this.add(elem_4)

        let data_5 = DATA[4]
        let elem_5 = new NegativeObject(this.scene, (700 + 40) * KOEF_X , -2000 + 320, 'negative_spritesheet', 'room2_2')
        elem_5.move()
        this.add(elem_5)

        let data_6 = DATA[5]
        let elem_6 = new NegativeObject(this.scene, (300 + 40) * KOEF_X , -2400 + 320, 'negative_spritesheet', 'room2_3')
        elem_6.move()
        this.add(elem_6)

        this.count_created = 6
    }
    createNextNegative() {
        
        let data = DATA[this.count_created]
        let elem = this.getFirstDead()
        // if (!elem) {
        //     console.log("!elem________")
        //     elem = new NegativeObject(this.scene, data[0], data[1], 'negative_spritesheet', data[2])
        // } else 

        elem.reset(data[0], data[1], data[2])
        
        this.count_created++
        }
    }


class NegativeObject extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,texture, frame) {
        super(scene, x, y, texture, frame)
        this.init()
    }
    init() {
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.body.enable = true
        this.alive_status = true
    
        this.body.height = this.height - 60
        this.body.width = this.width - 60
        this.scene.events.on('update', this.update, this)
        this.scene.events.on('start_game', this.move, this)
        this.scene.events.on('leave', this.move, this)

        this.setScale(window.innerWidth / WIDTH, 1)

        // this.x = this.x * KOEF_X
        console.log(this.x, this.y)
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
        this.x = x * KOEF_X
        this.y = y
        this.setFrame(frame)
        this.setAlive(true)
        this.body.width = this.width - 60
        this.body.height = this.height  - 60       
    }
    move() {
        this.velocityY = this.scene.game_velocity
    }
}