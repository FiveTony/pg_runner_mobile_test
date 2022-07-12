const X_1 = 300
const X_2 = 500
const X_3 = 700

const DATA = [
    [X_3, -720, 20],
    [X_1, -1800, -20],

    [X_1, -720, -20],
    [X_2, -2000, 20],

    [X_2, -500, -20],
    [X_2, -2700, 20],

    [X_2, -140, -20],
    [X_3, -940, 20],
    
    [X_2, -1000, -20],
    [X_1, -1800, 20]
]


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
        let elem_1 = new PositiveObject(this.scene, X_3, 400* 2, 'positive_spritesheet', 'positive1', 20 )
        elem_1.move()
        this.add(elem_1)

        let data_2 = DATA[1]
        let elem_2 = new PositiveObject(this.scene, X_1, -400, 'positive_spritesheet', 'positive2', -20)
        elem_2.move()
        this.add(elem_2)

        let data_3 = DATA[2]
        let elem_3 = new PositiveObject(this.scene, X_1, -1520, 'positive_spritesheet', 'positive3', -20)
        elem_3.move()
        this.add(elem_3)

        let data_4 = DATA[3]
        let elem_4 = new PositiveObject(this.scene, X_2, -2580, 'positive_spritesheet', 'positive4', 20)
        elem_4.move()
        this.add(elem_4)

        let data_5 = DATA[4]
        let elem_5 = new PositiveObject(this.scene, X_2, -3280, 'positive_spritesheet', 'positive5', -20)
        elem_5.move()
        this.add(elem_5)        

        let data_6 = DATA[5]
        let elem_6 = new PositiveObject(this.scene, X_2, -3720, 'positive_spritesheet', 'positive6', 20)
        elem_6.move()
        this.add(elem_6)

        this.count_created = 6
    }
    createPositiveObject() {
        let data = DATA[this.count_created]
        let elem = this.getFirstDead()    
        let num = Phaser.Math.Between(1,10)
        // if (!elem) {
        //     console.log("!elem________")
        //     elem = new PositiveObject(this.scene, data[0], data[1], 'positive_spritesheet', `positive${num}`, data[2])
        // } else 
        elem.reset(data[0], data[1], `positive${num}`)
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
        if (this.y > 1700 && this.alive_status){
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