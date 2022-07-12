const BG_WIDTH = 900
const BG_HEIGHT = 2880

const X_1 = 700
const X_2 = 975
const X_3 = 1250

const DATA = [
    [X_3, -800, 20],
    [X_1, -2400, -20],

    [X_1, -980, -20],
    [X_2, -2600, 20],

    [X_2, -450, -20],
    [X_2, -1350, 20],

    [X_2, -1530, -20],
    [X_3, -2630, 20],
    
    [X_2, -800, -20],
    [X_1, -2390, 20],

    // [X_3, -2300],
    // [X_3, -4660]
]


export default class Positive extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene)
        this.scene = scene

        this.count_created = 0
        this.createFirstElements()

        this.scene.events.on("leave", ()=>{
            if (this.scene.count_created_scenes > 3 ) {
                if (this.count_created === 10) {
                    this.count_created = 0
                }
                this.createPositiveObject()
                this.createPositiveObject()
                // this.createPositiveObject()
            }
        }, this)
        
    }
    createFirstElements() {
        let data_1 = DATA[0]
        let elem_1 = new PositiveObject(this.scene, X_3, 100, 'positive_spritesheet', 'positive1', 20 )
        elem_1.move()
        this.add(elem_1)

        let data_2 = DATA[1]
        let elem_2 = new PositiveObject(this.scene, X_1, -1500, 'positive_spritesheet', 'positive2', -20)
        elem_2.move()
        this.add(elem_2)

        let data_3 = DATA[2]
        let elem_3 = new PositiveObject(this.scene, X_1, -3030, 'positive_spritesheet', 'positive3', -20)
        elem_3.move()
        this.add(elem_3)

        let data_4 = DATA[3]
        let elem_4 = new PositiveObject(this.scene, X_2, -4420, 'positive_spritesheet', 'positive4', 20)
        elem_4.move()
        this.add(elem_4)

        let data_5 = DATA[4]
        let elem_5 = new PositiveObject(this.scene, X_2, -5150, 'positive_spritesheet', 'positive5', -20)
        elem_5.move()
        this.add(elem_5)        

        let data_6 = DATA[5]
        let elem_6 = new PositiveObject(this.scene, X_2, -6000, 'positive_spritesheet', 'positive6', 20)
        elem_6.move()
        this.add(elem_6)

        this.count_created = 6
    }
    createPositiveObject() {
        let data = DATA[this.count_created]
        let elem = this.getFirstDead()    
        let num = Phaser.Math.Between(1,10)
        if (!elem) {
            console.log("!elem________")
            elem = new PositiveObject(this.scene, data[0], data[1], 'positive_spritesheet', `positive${num}`, data[2])
        } else elem.reset(data[0], data[1], `positive${num}`)
        this.count_created++
        }
    }


class PositiveObject extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, angle) {
        super(scene, x, y, texture, frame)
        this.init(angle)
    }
    init(angle) {
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.body.enable = true
        this.alive_status = true
        
        this.setAngle(angle)
        this.setScale(0.6)
        this.scene.events.on('update', this.update, this)
        this.scene.events.on('start_game', this.move, this)
        this.scene.events.on('leave', this.move, this)
    }
    update(timestep, dt) {
        if (this.y > 1200 && this.alive_status){
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
    }
    move() {
        this.velocityY = this.scene.game_velocity
    }
}