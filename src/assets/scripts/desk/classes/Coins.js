const X_1 = 700
const X_2 = 975
const X_3 = 1250

const WIDTH = 1920
const HEIGHT = 1080

const DATA = [
    [X_2, -450],
    [X_3, -1120],
    [X_1, -1550],
    [X_2, -2000],
    
    [X_2, -150],
    [X_2, -980],
    [X_1, -1780],
    [X_2, -2320],

    [X_2, -920],
    [X_3, -1350],
    [X_3, -2100],
    [X_2, -2600],

    [X_2, -410],
    [X_3, -1230],
    [X_3, -2090],
    [X_2, -2630],

    [X_2, -800],
    [X_3, -1300],
    [X_2, -2100],
    [X_3, -2600]
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
        let data_1 = DATA[0]
        let elem_1 = new Coin(this.scene, X_2, 500)
        elem_1.move()
        this.add(elem_1)

        let data_2 = DATA[1]
        let elem_2 = new Coin(this.scene, X_3, -200)
        elem_2.move()
        this.add(elem_2)

        let data_3 = DATA[2]
        let elem_3 = new Coin(this.scene, X_1, -600)
        elem_3.move()
        this.add(elem_3)

        let data_4 = DATA[3]
        let elem_4 = new Coin(this.scene, X_2, -1100)
        elem_4.move()
        this.add(elem_4)

        let data_5 = DATA[4]
        let elem_5 = new Coin(this.scene, X_2, -1950)
        elem_5.move()
        this.add(elem_5)

        let data_6 = DATA[5]
        let elem_6 = new Coin(this.scene, X_2, -2750)
        elem_6.move()
        this.add(elem_6)

        let data_7 = DATA[5]
        let elem_7 = new Coin(this.scene, X_1, -3300)
        elem_7.move()
        this.add(elem_7)

        let data_8 = DATA[5]
        let elem_8 = new Coin(this.scene, X_2, -4120)
        elem_8.move()
        this.add(elem_8)

        this.count_created = 8
    }
    createCoin() {
        let data = DATA[this.count_created]
        let elem = this.getFirstDead()
        if (!elem) {
            console.log("!elem________")
            elem = new Coin(this.scene, data[0], data[1])
        } else elem.reset(data[0], data[1])
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
        if (this.y > 1200 && this.alive_status){
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