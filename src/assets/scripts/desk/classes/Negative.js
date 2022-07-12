const BG_WIDTH = 900
const BG_HEIGHT = 2880

const DATA = [
    [665, -900, 'room1_1'],
    [1220, -1660, 'room1_2'],
    [1270, -2460, 'room1_3'],
    
    [700, -670, 'room2_1'],
    [1220, -1350, 'room2_2'],
    [700, -2300, 'room2_3'],

    [670, -1050, 'room3_1'],
    [802, -1800, 'room3_2'],
    [703, -2500, 'room3_3'],

    [705, -1130, 'room4_1'],
    [692, -1800, 'room4_2'],
    [703, -2500, 'room4_3'],

    [1260, -300, 'room5_1'],
    [690, -1300, 'room5_2'],
    [1250, -2120, 'room5_3'],
]



export default class Negative extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene)
        this.scene = scene

        this.count_created = 0
        this.createFirstElements()

        this.scene.events.on("leave", ()=>{
            if (this.scene.count_created_scenes > 2 ) {
                if (this.count_created === 15) this.count_created = 0
                this.createNextNegative()
                this.createNextNegative()
                this.createNextNegative()
            }
        }, this)
    }
    createFirstElements() {
        let data_1 = DATA[0]
        let elem_1 = new NegativeObject(this.scene, 665, 100, 'negative_spritesheet', 'room1_1')
        elem_1.move()
        this.add(elem_1)

        let data_2 = DATA[1]
        let elem_2 = new NegativeObject(this.scene, 1220, -700, 'negative_spritesheet', 'room1_2')
        elem_2.move()
        this.add(elem_2)

        let data_3 = DATA[2]
        let elem_3 = new NegativeObject(this.scene, 1270, -1250, 'negative_spritesheet', 'room1_3')
        elem_3.move()
        this.add(elem_3)

        let data_4 = DATA[3]
        let elem_4 = new NegativeObject(this.scene, 700, -2470, 'negative_spritesheet', 'room2_1')
        elem_4.move()
        this.add(elem_4)

        let data_5 = DATA[4]
        let elem_5 = new NegativeObject(this.scene, 1220, -3300, 'negative_spritesheet', 'room2_2')
        elem_5.move()
        this.add(elem_5)

        let data_6 = DATA[5]
        let elem_6 = new NegativeObject(this.scene, 700, -4000, 'negative_spritesheet', 'room2_3')
        elem_6.move()
        this.add(elem_6)

        this.count_created = 6
    }
    createNextNegative() {
        
        let data = DATA[this.count_created]
        let elem = this.getFirstDead()
        if (!elem) {
            console.log("!elem________")
            elem = new NegativeObject(this.scene, data[0], data[1], 'negative_spritesheet', data[2])
        } else {
            elem.reset(data[0], data[1], data[2])
        }
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
    
        this.body.height = this.height
        this.body.width = this.width
        this.scene.events.on('update', this.update, this)
        this.scene.events.on('start_game', this.move, this)
        this.scene.events.on('leave', this.move, this)
    }
    update(timestep, dt) {
        if (this.y > 1500 && this.alive_status){
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
        this.y = y
        this.setFrame(frame)
        this.setAlive(true)
        this.body.width = this.width
        this.body.height = this.height

        // this.scene.children.bringToTop(this)
        
    }
    move() {
        this.velocityY = this.scene.game_velocity
    }
}