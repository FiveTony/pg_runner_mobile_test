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
        this.scene.add.sprite(85 * 2, 40 * 2, "ui_spritesheet", 'score_rectangle')
        this.scene.add.sprite(46 * 2, 40 * 2, "ui_spritesheet", 'score_coin')
        // this.score_text = this.scene.add.text(690, 42, `${this.score}`, TEXT_STYLE)
        this.score_text = this.scene.add.bitmapText(74 * 2, 22 * 2, 'Montserrat-Bold', `${this.score}`, 60)
    }
    createHearts() {
        this.heart_1 = this.scene.add.sprite(225 * 2, 40 * 2, "ui_spritesheet", 'hp')
        this.heart_2 = this.scene.add.sprite(280 * 2, 40 * 2, "ui_spritesheet", 'hp')
        this.heart_3 = this.scene.add.sprite(335 * 2, 40 * 2, "ui_spritesheet", 'hp')
    }
    createSoundButtons() {
        let sound_sprite
        !this.scene.mute ? sound_sprite = "musicOn" : sound_sprite = "musicOff"
        this.sound = this.scene.add.sprite(window.innerWidth - 40* 2, 40* 2, "ui_spritesheet", sound_sprite).setInteractive()
    }

}