const WIDTH = 500
const HEIGHT = 800
const SWIPE_POWER = 30

const LEFT = 72
const CENTER = - 72 - 356
const RIGHT = - 72 - 356 - 72 - 356 - 72


import GameScene from "./GameScene";

export default class StartScene extends Phaser.Scene {
  constructor() {
    super("Start");
    console.log("StartScene")
  }
  create(data) {
    this.mute = data.mute
    this.cameras.main.setRoundPixels(true)
    this.direction = -1
    this.isClicking = false
    this.createBackground();
    this.createCharacters()

    this.tween_complete = true
  }
  createBackground() {
    this.add.graphics(0, 0, WIDTH, HEIGHT)
      .fillStyle(0x003DA6, 1)
      .fillRect(0, 0, WIDTH, HEIGHT);
    // this.add.circle(220, HEIGHT / 2, 720, 0x00348E, 0.84)

    this.add.text(WIDTH / 2, 86, "Выбери своего\nперсонажа", {
      font: 'bold 40px Montserrat',
      fill: '#FFFFFF',
      align: 'center',  // 'left'|'center'|'right'|'justify'
      lineSpacing: 10,

  }).setOrigin(0.5)

    let sound_sprite
    !this.mute ? sound_sprite = "musicOn" : sound_sprite = "musicOff"

    this.sound_toggle = this.add.sprite(WIDTH - 40, 40, "ui_spritesheet", sound_sprite).setScale(0.9).setInteractive()
      .on("pointerdown", () => { 
        if (this.mute == false) {
          this.sound_toggle.setFrame("musicOff");
          this.mute = true;
          this.muteMusic();
        } else {
          this.sound_toggle.setFrame("musicOn");
          this.mute = false;
          this.muteMusic();
        }
    });

  }
  launchGame(hero) {
    this.game.scene.add('Game', GameScene, true, {
      hero: hero, 
      play_num: 1,
      mute: this.mute
    });
    this.scene.remove("Start")
  }
  muteMusic() { 
    if (this.mute) this.scene.get("Preload").main_theme.pause();
    else this.scene.get("Preload").main_theme.resume();
  }
  update() {
    if(!this.input.activePointer.isDown && this.isClicking == true && this.tween_complete == true) {
      if(Math.abs(this.input.activePointer.upX - this.input.activePointer.downX) >= SWIPE_POWER) {
          // this.tween_complete = false
          if(this.input.activePointer.upX < this.input.activePointer.downX) {
            this.rightMove()
          } else if(this.input.activePointer.upX > this.input.activePointer.downX) {
            this.leftMove()
          }
      }
      this.isClicking = false;
    } else if(this.input.activePointer.isDown && this.isClicking == false) {
      this.isClicking = true;
    }
  }
  leftMove() {
    if (this.direction === 0) {
      // this.big_container.x = LEFT
      this.tween_complete = false

      this.tweens.add({
        targets: this.big_container,
        x: {
          from: this.big_container.x,
          to: LEFT
        },
        ease: "Power2",
        duration: 500,
        onComplete: () => {
          this.tween_complete = true
          this.direction = -1
        }
      });

    } else if (this.direction === 1) {
      // this.big_container.x = CENTER
      this.tween_complete = false

      this.tweens.add({
        targets: this.big_container,
        x: {
          from: this.big_container.x,
          to: CENTER
        },
        ease: "Power2",
        duration: 500,
        onComplete: () => {
          this.tween_complete = true
          this.direction = 0
        }
      });


    }
  }
  rightMove() {
    if (this.direction === 0) {
      // this.big_container.x = RIGHT
      this.tween_complete = false

      this.tweens.add({
        targets: this.big_container,
        x: {
          from: this.big_container.x,
          to: RIGHT
        },
        ease: "Power2",
        duration: 500,
        onComplete: () => {
          this.tween_complete = true
          this.direction = 1
        }
      });


    } else if (this.direction === -1) {
      // this.big_container.x = CENTER
      this.tween_complete = false

      this.tweens.add({
        targets: this.big_container,
        x: {
          from: this.big_container.x,
          to: CENTER
        },
        ease: "Power2",
        duration: 500,
        onComplete: () => {
          this.tween_complete = true
          this.direction = 0
        }
      });

    }
  }
  createCharacters() {
    this.big_container = this.add.container(72, 162)

    let container1 = this.add.container(0, 0)
    let graphics1 = this.add.graphics()
    .fillStyle(0x002F81, 1)
    .fillRoundedRect(0, 0, 356, 586, 10)
    let rita_label = this.add.sprite(356 / 2, 36, "rita_label").setOrigin(0.5)
    let rita_capture = this.add.sprite(356 / 2 - 10, 170, "rita_capture").setOrigin(0.5)
    let rita_text = this.add.sprite(356 / 2, 360, "rita_text").setOrigin(0.5)
    let rita_button = this.add.sprite(356 / 2, 470, "rita_button").setOrigin(0.5).setInteractive().on("pointerdown", () => this.launchGame("rita"))
    let rita_right_arrow = this.add.sprite(356 / 2 + 140, 170, "arrow").setOrigin(0.5).setInteractive().on("pointerdown", ()=>this.rightMove())
    let rita_slider = this.add.sprite(356 / 2, 570, "rita_slider").setOrigin(0.5)
    container1.add([graphics1, rita_label, rita_capture, rita_text, rita_button, rita_right_arrow, rita_slider])

    let container2 = this.add.container(356 + 72 + 72, 0)
    let graphics2 = this.add.graphics()
    .fillStyle(0x002F81, 1)
    .fillRoundedRect(0, 0, 356, 586, 10)
    let dima_label = this.add.sprite(356 / 2, 36, "dima_label").setOrigin(0.5)
    let dima_capture = this.add.sprite(356 / 2, 170, "dima_capture").setOrigin(0.5)
    let dima_text = this.add.sprite(356 / 2, 360, "dima_text").setOrigin(0.5)
    let dima_button = this.add.sprite(356 / 2, 470, "dima_button").setOrigin(0.5).setInteractive().on("pointerdown", () => this.launchGame("dima"))
    let dima_left_arrow = this.add.sprite(356 / 2 - 140, 170, "arrow").setOrigin(0.5).setAngle(180).setInteractive().on("pointerdown", ()=>this.leftMove())
    let dima_right_arrow = this.add.sprite(356 / 2 + 140, 170, "arrow").setOrigin(0.5).setInteractive().on("pointerdown", ()=>this.rightMove())
    let dima_slider = this.add.sprite(356 / 2, 570, "dima_slider").setOrigin(0.5)
    container2.add([graphics2, dima_label, dima_capture, dima_text, dima_button, dima_left_arrow, dima_right_arrow, dima_slider])

    let container3 = this.add.container(356 + 72 + 72 + 356 + 72 + 72, 0)
    let graphics3 = this.add.graphics()
    .fillStyle(0x002F81, 1)
    .fillRoundedRect(0, 0, 356, 586, 10)
    let musya_label = this.add.sprite(356 / 2, 36, "musya_label").setOrigin(0.5)
    let musya_capture = this.add.sprite(356 / 2, 170, "musya_capture").setOrigin(0.5)
    let musya_text = this.add.sprite(356 / 2, 360, "musya_text").setOrigin(0.5)
    let musya_button = this.add.sprite(356 / 2, 470, "musya_button").setOrigin(0.5).setInteractive().on("pointerdown", () => this.launchGame("musya"))

    let musya_left_arrow = this.add.sprite(356 / 2 - 140, 170, "arrow").setOrigin(0.5).setAngle(180).setInteractive().on("pointerdown", ()=>this.leftMove())
    let musya_slider = this.add.sprite(356 / 2, 570, "musya_slider").setOrigin(0.5)
    container3.add([graphics3, musya_label, musya_capture, musya_text, musya_button, musya_left_arrow, musya_slider])

    this.big_container.add([container1, container2, container3])
  }

}
