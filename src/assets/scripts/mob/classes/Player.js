const KOEF_X = window.innerWidth / 1080
const KOEF_Y = window.innerHeight / 1920

const LEFT = 340 * KOEF_X
const CENTER = 540 * KOEF_X
const RIGHT = 740* KOEF_X

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, frame, config) {
    super(scene, x, y, frame);
    this.config = config
    this.init();
  }
  init() {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.enable = true;

    this.body.height = this.height - 20
    this.body.width = this.width - 10

    this.direction = 0

    this.hero = this.config.hero

    this.setScale(this.config.playerScale);
    this.scene.events.on("update", this.update, this);

    this.setAnimation();
    
  }
  setAnimation() {
    const frames = this.anims.generateFrameNames(`player_${this.hero}`, {
      prefix: `player_${this.hero}_`,
      start: 1,
      end: 2,
    });

    this.anims.create({
      key: "player_animation",
      frames: frames,
      frameRate: 1.5,
      repeat: -1,
    });
  }
  leftMove() {
    if (!this.scene.mute) this.scene.swipe_sound.play()
    if (this.direction === 0) {
      this.x = LEFT
      this.direction = -1
    } else if (this.direction === 1) {
      this.x = CENTER
      this.direction = 0
    }
  }
  rightMove() {
    if (!this.scene.mute) this.scene.swipe_sound.play()
    if (this.direction === 0) {
      this.x = RIGHT
      this.direction = 1
    } else if (this.direction === -1) {
      this.x = CENTER
      this.direction = 0
    }
  }
}
