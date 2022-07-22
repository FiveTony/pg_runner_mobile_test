
const KOEF_Y = window.innerHeight / 1920
const KOEF_X = window.innerWidth / 1080

const LIMIT_Y = window.innerHeight + 50

console.log(KOEF_X, KOEF_Y)

const X_1 = 340 * KOEF_X
const X_2 = 540 * KOEF_X
const X_3 = 740 * KOEF_X

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

const DATA = [
    [X_1, -300],
    [X_2, -920],
    [X_2, -1800],

    [X_2, -1120],
    [X_1, -1200],
    [X_3, -2000],
    
    [X_1, -1500],
    [X_3, -500],
    [X_3, -940],

    [X_3, -320],
    [X_3, -1360],
    [X_1, -1580],

    [X_3, -520],
    [X_1, -800],
    [X_1, -1600],
]


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
        let data_1 = DATA[0]
        let elem_1 = new Spot(this.scene, X_1, (1000 + 320) * KOEF_Y, 'positive_spritesheet', 'spot_2')
        elem_1.move()
        this.add(elem_1)

        let data_2 = DATA[1]
        let elem_2 = new Spot(this.scene, X_2, (600 + 320) * KOEF_Y, 'positive_spritesheet', 'spot_1')
        elem_2.move()
        this.add(elem_2)

        let data_3 = DATA[2]
        let elem_3 = new Spot(this.scene, X_2, (-400 + 320) * KOEF_Y, 'positive_spritesheet', 'spot_2')
        elem_3.move()
        this.add(elem_3)

        let data_4 = DATA[3]
        let elem_4 = new Spot(this.scene, X_2, (-1120 + 320)* KOEF_Y, 'positive_spritesheet', 'spot_2')
        elem_4.move()
        this.add(elem_4)

        let data_5 = DATA[4]
        let elem_5 = new Spot(this.scene, X_1, (-1980 + 320) * KOEF_Y, 'positive_spritesheet', 'spot_2')
        elem_5.move()
        this.add(elem_5)

        let data_6 = DATA[5]
        let elem_6 = new Spot(this.scene, X_3, (-2580 + 320) * KOEF_Y, 'positive_spritesheet', 'spot_1')
        elem_6.move()
        this.add(elem_6)

        this.count_created = 6
    }
    createSpot() {
        // let data = DATA[this.count_created]
        let x = X[this.count_created]
        let y = Y[this.count_created]
        let sprite = `spot_${Phaser.Math.Between(1, 2)}`
        let elem = this.getFirstDead()
        // if (!elem) {
        //     console.log("!elem________")
        //     elem = new Spot(this.scene, data[0], data[1], data[2])
        // } else 
        // let num = Phaser.Math.Between(1, 2)
        elem.reset(x, y, sprite)
        
        this.count_created++
        }
    }


class Spot extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        this.init()
    }
    init() {
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.body.enable = true
        // this.setScale(2)
        // this.setOrigin(0.5)
        // this.scene.children.moveDown(this)
        this.alive_status = true
        // this.scene.children.bringToTop(this)
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

        // this.scene.children.bringToTop(this)
        
    }
    move() {
        this.velocityY = this.scene.game_velocity
    }
}