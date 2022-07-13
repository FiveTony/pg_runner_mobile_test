const DATA = [
    [290, -680, 'room1_1'],
    [700, -1280, 'room1_2'],
    [700, -1760, 'room1_3'],
    
    [500, -500, 'room2_1'],
    [680, -1400, 'room2_2'],
    [300, -1600, 'room2_3'],

    [310, -560, 'room3_1'],
    [370, -1200, 'room3_2'],
    [310, -1920, 'room3_3'],

    [300, -800, 'room4_1'],
    [300, -1360, 'room4_2'],
    [300, -1980, 'room4_3'],

    [500, -520, 'room5_1'],
    [300, -1200, 'room5_2'],
    [700, -1840, 'room5_3'],
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
        let elem_1 = new NegativeObject(this.scene, 290, 640, 'negative_spritesheet', 'room1_1')
        elem_1.move()
        this.add(elem_1)

        let data_2 = DATA[1]
        let elem_2 = new NegativeObject(this.scene, 700, 420, 'negative_spritesheet', 'room1_2')
        elem_2.move()
        this.add(elem_2)

        let data_3 = DATA[2]
        let elem_3 = new NegativeObject(this.scene, 700, -140, 'negative_spritesheet', 'room1_3')
        elem_3.move()
        this.add(elem_3)

        let data_4 = DATA[3]
        let elem_4 = new NegativeObject(this.scene, 506, -1310, 'negative_spritesheet', 'room2_1')
        elem_4.move()
        this.add(elem_4)

        let data_5 = DATA[4]
        let elem_5 = new NegativeObject(this.scene, 690, -2000, 'negative_spritesheet', 'room2_2')
        elem_5.move()
        this.add(elem_5)

        let data_6 = DATA[5]
        let elem_6 = new NegativeObject(this.scene, 300, -2400, 'negative_spritesheet', 'room2_3')
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
    
        this.body.height = this.height
        this.body.width = this.width
        this.scene.events.on('update', this.update, this)
        this.scene.events.on('start_game', this.move, this)
        this.scene.events.on('leave', this.move, this)
    }
    update(timestep, dt) {
        if (this.y > 1940 && this.alive_status){
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