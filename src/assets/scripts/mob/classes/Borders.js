const BG_HEIGHT = 2200

const KOEF_Y = window.innerHeight / 1920
const KOEF_X = window.innerWidth / 1080

const LIMIT_Y = window.innerHeight + 10

const WIDTH = 1080
const HEIGHT = 1920

const LEFT_X = 700 
const RIGHT_X = window.innerWidth - 700 

export default class Borders extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene)
        this.scene = scene

        this.count_created = 0

        this.createFirstBorders()

        this.scene.events.on("leave", ()=>{
            if (this.scene.count_created_scenes > 2) {
                if (this.count_created === 10) {
                    this.count_created = 0
                    // console.log(this.count_created)
                }
                this.createBorder(LEFT_X)
                this.createBorder(RIGHT_X)
            }
        }, this)
    }
    createFirstBorders() {
        let elem_1 = new Border(this.scene, LEFT_X, -BG_HEIGHT * KOEF_Y + window.innerHeight + 10 * KOEF_Y)
        elem_1.move()
        this.add(elem_1)
        let elem_2 = new Border(this.scene, RIGHT_X, -BG_HEIGHT * KOEF_Y + window.innerHeight + 10 * KOEF_Y)
        elem_2.move()
        this.add(elem_2)
        this.count_created = 2
    }
    createBorder(x) {
        let elem = this.getFirstDead()
        elem.reset(x, -10 * KOEF_Y)
        elem.move()
        this.count_created++
    }
}

class Border extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "negative_spritesheet", 'border')
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

        this.setScale(window.innerWidth / WIDTH, window.innerHeight / HEIGHT)
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
    reset(x, y) {
        this.x = x
        this.y = y
        this.setAlive(true)        
    }
    move() {
        this.velocityY = this.scene.game_velocity
    }
}