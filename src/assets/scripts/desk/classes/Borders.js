const BG_WIDTH = 900
const BG_HEIGHT = 2880

const WIDTH = 1920
const HEIGHT = 1080

export default class Borders extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene)
        this.scene = scene

        this.left_x = WIDTH / 2 - 268
        this.right_x = WIDTH / 2 + 268

        this.count_created = 0

        this.createFirstBorders()

        this.scene.events.on("leave", ()=>{
            if (this.scene.count_created_scenes > 2) {
                if (this.count_created === 10) this.count_created = 0
                this.createBorder(this.left_x)
                this.createBorder(this.right_x)
            }
        }, this)
    }
    createFirstBorders() {
        let elem_1 = new Border(this.scene, this.left_x, -2880 + HEIGHT + 25)
        elem_1.move()
        this.add(elem_1)
        let elem_2 = new Border(this.scene, this.right_x, -2880 + HEIGHT + 25)
        elem_2.move()
        this.add(elem_2)
        this.count_created = 2
    }
    createBorder(x) {
        let elem = this.getFirstDead()
        elem.reset(x, -27)
        elem.move()
        this.count_created++
    }
}

class Border extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
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
    }
    update(timestep, dt) {
        if (this.y > 1100 && this.alive_status){
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