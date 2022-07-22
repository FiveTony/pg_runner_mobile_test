const BG_WIDTH = 680
const BG_HEIGHT = 2200

const WIDTH = 1080
const HEIGHT = 1920

const LIMIT_Y = window.innerHeight

const KOEF_X = window.innerWidth / 1080
const KOEF_Y = window.innerHeight / 1920


export default class Room extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,texture) {
        super(scene, x, y, texture)
        this.init()
        this.scene.children.sendToBack(this)
    }
    init() {
        this.setOrigin(1)
    
        this.leave_flag = false
        this.destroy_flag = false
        this.scene.add.existing(this)
        this.scene.events.on('update', this.update, this)
        this.scene.events.on('start_game', this.move, this)
        this.scene.events.on('leave', this.move, this)

        this.setScale(window.innerWidth / WIDTH, window.innerHeight / HEIGHT)

        this.delta = 16
    }
    update(timestep, dt) {
        if (this.y > BG_HEIGHT * KOEF_Y - 1 + LIMIT_Y && (!this.destroy_flag)) {
            this.setAlive(false)
            this.destroy_flag = !this.destroy_flag
        } else if ((this.y > BG_HEIGHT * KOEF_Y - this.delta) && (!this.leave_flag)) {
            // console.log("room_num:",this.scene.room_num, "this.y:", this.y)
            if (this.scene.game_velocity < 14) {
                this.scene.game_velocity += this.scene.game_velocity_step
                this.delta += 1
                
            }
            // console.log("this.scene.game_velocity:  ", this.scene.game_velocity)
            
            this.scene.events.emit("leave")
            this.leave_flag = !this.leave_flag      
        } 
        
        this.y += this.velocityY

    }
    setAlive(status) {     
        this.setVisible(status)
        this.setActive(status)
    }
    reset(room_sprite) {
        this.leave_flag = false
        this.destroy_flag = false
        this.x = (WIDTH / 2 + BG_WIDTH / 2) * KOEF_X //!!
        this.y = 0
        this.setAlive(true)
        this.setTexture(room_sprite)
        this.scene.children.sendToBack(this)
    }
    move() {
        this.velocityY = this.scene.game_velocity
    }
}