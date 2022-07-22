const DATA = [
    [330, -680, 'room1_1'],
    [740, -1280, 'room1_2'],
    [740, -1760, 'room1_3'],
    
    [546, -500, 'room2_1'],
    [730, -1400, 'room2_2'],
    [340, -1600, 'room2_3'],

    [340, -560, 'room3_1'],
    [426, -1200, 'room3_2'],
    [340, -1920, 'room3_3'],

    [340, -800, 'room4_1'],
    [340, -1360, 'room4_2'],
    [340, -1980, 'room4_3'],

    [540, -520, 'room5_1'],
    [340, -1200, 'room5_2'],
    [740, -1840, 'room5_3'],
]

const X = [
    330,
    740,
    740,

    546,
    730,
    340,

    340,
    426,
    340,

    340,
    340,
    340,

    540,
    340,
    740
]

const Y = [
    -680,
    -1280,
    -1760,
    
    -500,
    -1400,
    -1600,

    -560,
    -1200,
    -1920,

    -800,
    -1360,
    -1980,

    -520,
    -1200,
    -1840,
]

const SPRITES = [
    'room1_1',
    'room1_2',
    'room1_3',
        
    'room2_1',
    'room2_2',
    'room2_3',

    'room3_1',
    'room3_2',
    'room3_3',

    'room4_1',
    'room4_2',
    'room4_3',

    'room5_1',
    'room5_2',
    'room5_3'
]

export default class Negative extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene)
        this.scene = scene

        this.count_created = 0
        this.createFirstElements()

        this.scene.events.on("leave", ()=>{
            if (this.scene.count_created_scenes > 2 ) {
                this.createNextNegative()
                this.createNextNegative()
                this.createNextNegative()
                if (this.count_created === 15) this.count_created = 0
            }
        }, this)
    }
    createFirstElements() {
        let data_1 = DATA[0]
        let elem_1 = new NegativeObject(this.scene, 290 + 40, 640 + 320, 'room1_1')
        elem_1.move()
        this.add(elem_1)

        let data_2 = DATA[1]
        let elem_2 = new NegativeObject(this.scene, 700 + 40, 420 + 320, 'room1_2')
        elem_2.move()
        this.add(elem_2)

        let data_3 = DATA[2]
        let elem_3 = new NegativeObject(this.scene, 700 + 40, -140 + 320, 'room1_3')
        elem_3.move()
        this.add(elem_3)

        let data_4 = DATA[3]
        let elem_4 = new NegativeObject(this.scene, 506 + 40, -1310 + 320, 'room2_1')
        elem_4.move()
        this.add(elem_4)

        let data_5 = DATA[4]
        let elem_5 = new NegativeObject(this.scene, 690 + 40, -2000 + 320, 'room2_2')
        elem_5.move()
        this.add(elem_5)

        let data_6 = DATA[5]
        let elem_6 = new NegativeObject(this.scene, 300 + 30, -2400 + 320, 'room2_3')
        elem_6.move()
        this.add(elem_6)

        this.count_created = 6
    }
    createNextNegative() {  
        let data = DATA[this.count_created]
        let x = X[this.count_created]
        let y = Y[this.count_created]
        let sprite = SPRITES[this.count_created]
        let elem = this.getFirstDead()
        // console.log(data)
        // console.log(x, y ,sprite)
        elem.reset(x, y, sprite)
        
        this.count_created++
        }
    }


class NegativeObject extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, frame) {
        super(scene, x, y,'negative_spritesheet', frame)
        this.init()
    }
    init() {
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.body.enable = true
        this.alive_status = true
    
        this.body.height = this.height - 20
        this.body.width = this.width - 20
        this.scene.events.on('update', this.update, this)
        this.scene.events.on('start_game', this.move, this)
        this.scene.events.on('leave', this.move, this)
    }
    update(timestep, dt) {
        if (this.y > 2260 && this.alive_status) this.setAlive(false) 
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
        this.body.width = this.width - 20
        this.body.height = this.height - 20       
    }
    move() {
        this.velocityY = this.scene.game_velocity
    }
}