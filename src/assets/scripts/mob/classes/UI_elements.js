export default class UI_elements {
    constructor(scene, score, hearts) {
        this.scene = scene
        this.score = score
        this.hearts = hearts
        this.createStats()
        this.createHearts()
        this.createSoundButtons()
    }
    createStats() {
        this.scene.add.sprite(170, 80, "ui_spritesheet", 'score_rectangle')
        this.scene.add.sprite(92, 80, "ui_spritesheet", 'score_coin')
        this.score_text = this.scene.add.bitmapText(148, 44, 'Montserrat-Bold', `${this.score}`, 60)
    }
    createHearts() {
        this.heart_1 = this.scene.add.sprite(450, 80, "ui_spritesheet", 'hp')
        this.heart_2 = this.scene.add.sprite(560, 80, "ui_spritesheet", 'hp')
        this.heart_3 = this.scene.add.sprite(670, 80, "ui_spritesheet", 'hp')
    }
    createSoundButtons() {
        let sound_sprite
        !this.scene.mute ? sound_sprite = "musicOn" : sound_sprite = "musicOff"
        this.sound = this.scene.add.sprite(910, 80, "ui_spritesheet", sound_sprite).setInteractive()
    }

}