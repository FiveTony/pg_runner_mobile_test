import Borders from "@assets/scripts/desk/classes/Borders.js";
import Coins from "@assets/scripts/desk/classes/Coins.js";
import Negative from "@assets/scripts/desk/classes/Negative.js";
import Player from "@assets/scripts/desk/classes/Player.js";
import Positive from "@assets/scripts/desk/classes/Positive.js";
import Rooms from "@assets/scripts/desk/classes/Rooms.js";
import Spots from "@assets/scripts/desk/classes/Spots.js";
import UI_elements from "@assets/scripts/desk/classes/UI_elements.js";
import StartScene from "@assets/scripts/desk/scenes/StartScene.js";
import { popupShow } from "../../../../js/files/game.js";


const WIDTH = 1920
const HEIGHT = 1080

const GAME_VELOCITY_START = 5

const SCORE_SPOT = 3
const SCORE_COIN = 1
const SCORE_POSITIVE = 5

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
    console.log("GameScene")
  }
  init(data) {
    this.room_num = 1
    this.score = 0
    this.hearts = 3

    this.hero = data.hero

    this.mute = data.mute

    this.prompt1_flag = true
    this.prompt3_flag = true
    this.prompt5_flag = true

    this.count_created_scenes = 0

    this.play_num = data.play_num
  }
  create() {
    document.querySelector('body').classList.add('bg-green-color');
    this.game_velocity = 0
    
    let rooms = new Rooms(this)
    this.left_element = this.add.tileSprite(0, 0, 510, HEIGHT, "left_element").setOrigin(0);
    this.right_element = this.add.tileSprite(WIDTH - 510, 0, 0, HEIGHT, "right_element").setOrigin(0);
    
    this.player = new Player(
      this,
      WIDTH / 2,
      HEIGHT / 2 + 300,
      `player_${this.hero}_1`,
      {"playerScale": 0.7, hero: this.hero}
      )
      
      this.button_back = this.add.sprite(WIDTH / 2 - 300, HEIGHT / 2 + 400, "button_back").setInteractive()
      .once("pointerdown", ()=> this.backToStart())

      this.start_button = this.add.sprite(WIDTH / 2, HEIGHT / 2 + 100, "start_hover")
        .setInteractive()
        .once("pointerdown", ()=> {
          this.player.play("player_animation");
          this.game_velocity = GAME_VELOCITY_START
          this.events.emit("start_game")
          this.events.removeListener("start_game")
          this.start_button.destroy()
          this.button_back.destroy()
          this.play_num++
        })
        .on("pointermove", ()=>{
          this.start_button.scale = 1.3
          this.start_button.angle = 5
          this.start_button.setTexture("start")
        })
        .on("pointerout", ()=>{
          this.start_button.scale = 1
          this.start_button.angle = 0
          this.start_button.setTexture("start_hover")
        })

        this.tweens.add({
          targets: this.start_button,
          alpha: {
            from: 1,
            to: 0.75
          },
          scale: {
            from: 1,
            to: 0.92
          },
          repeat: -1,
          ease: "Linear",
          yoyo: true,
          duration: 800,
          onComplete: function () {
            this.start_button.alpha = 1;
          },
        });



    this.border = new Borders(this)
    this.negative = new Negative(this)
    this.positive = new Positive(this)
    this.spots = new Spots(this)
    this.coins = new Coins(this)

    this.ui = new UI_elements(this, 0, 3)

    this.createSounds()
    this.addOverlap()
    this.onMusic()
  }
  update(timestep, dt) {
    this.left_element.tilePositionY -= this.game_velocity
    this.right_element.tilePositionY -= this.game_velocity
  }
  addOverlap() {
    this.physics.add.overlap(
      [this.border, this.negative],
      this.player,
      this.onNegativeOverlap,
      undefined,
      this
    );
    this.physics.add.overlap(
      this.positive,
      this.player,
      this.onPositiveOverlap,
      undefined,
      this
    );
    this.physics.add.overlap(
      this.coins,
      this.player,
      this.onCoinsOverlap,
      undefined,
      this
    );
    this.physics.add.overlap(
      this.spots,
      this.player,
      this.onSpotsOverlap,
      undefined,
      this
    );
  }
  onNegativeOverlap(source, target) { // source - игрок
    target.body.enable = false
    this.cameras.main.shake(500, 0.005)
    if (!this.mute) {
      this.hero === "musya" ? this.get_negative_musya.play() : this.get_negative.play()
    }

    this.tweens.add({
      targets: source,
      alpha: 0.1,
      repeat: 1,
      ease: "Power2",
      yoyo: true,
      duration: 250,
      onComplete: function () {
        source.alpha = 1;
      },
    });
    this.tweens.add({
      targets: target,
      alpha: {
        from: 1,
        to: 0
      },
      ease: "Power2",
      duration: 350,
      onComplete: function () {
        target.setAlive(false);
        target.alpha = 1
      },
    });

    if (this.hearts === 3){ 
      this.tweens.add({
        targets: this.ui.heart_1,
        scale: {
          from: 1,
          to: 2
        },
        alpha: {
          from: 1,
          to: 0
        },
        ease: "Power2",
        duration: 450,
        onComplete: () => {
          this.ui.heart_1.setFrame('not_hp')
          this.ui.heart_1.alpha = 1
          this.ui.heart_1.scale = 1
        },
      });

      // this.ui.heart_1.setTexture('not_hp')
      this.hearts--
    }
    else if (this.hearts === 2) {
      this.tweens.add({
        targets: this.ui.heart_2,
        scale: {
          from: 1,
          to: 2
        },
        alpha: {
          from: 1,
          to: 0
        },
        ease: "Power2",
        duration: 450,
        onComplete: () => {
          this.ui.heart_2.setFrame('not_hp')
          this.ui.heart_2.alpha = 1
          this.ui.heart_2.scale = 1
        },
      });
      this.hearts--
      // this.ui.heart_2.setTexture('not_hp')
  }
    else if (this.hearts === 1) {
      this.tweens.add({
        targets: this.ui.heart_3,
        scale: {
          from: 1,
          to: 2
        },
        alpha: {
          from: 1,
          to: 0
        },
        ease: "Power2",
        duration: 450,
        onComplete: () => {
          this.ui.heart_3.setFrame('not_hp')
          this.defeat()
        },
      });
      this.hearts--
    }  
  }
  onPositiveOverlap(source, target) {
    if (!this.mute) this.get_positive.play()
    target.body.enable = false
    if (this.prompt5_flag) {
      this.createPrompt(5, target.x, target.y)
      this.prompt5_flag = false
    }
    this.tweens.add({
      targets: target,
      scale: {
        from: 0.6,
        to: 1.2
      },
      alpha: {
        from: 1,
        to: 0.8
      },
      // y: "-=300",
      ease: "Power2",
      duration: 900,
      onComplete: () => {
        target.setAlive(false);
        target.alpha = 1
        target.scale = 0.6
      },
    });
    // target.setAlive(false);
    this.score += SCORE_POSITIVE
    this.ui.score_text.setText(`${this.score}`);
  }
  onCoinsOverlap(source, target) {
    if (!this.mute) this.get_positive.play()
    target.body.enable = false
    if (this.prompt1_flag) {
      this.createPrompt(1, target.x, target.y)
      this.prompt1_flag = false
    }
    this.tweens.add({
      targets: target,
      scale: {
        from: 1,
        to: 2
      },
      alpha: {
        from: 1,
        to: 0
      },
      ease: "Power2",
      duration: 500,
      onComplete: function () {
        target.setAlive(false);
        target.alpha = 1
        target.scale = 1
      },
    });
    // target.setAlive(false);
    this.score += SCORE_COIN
    this.ui.score_text.setText(`${this.score}`);
  }
  onSpotsOverlap(source, target) {
    if (!this.mute) this.get_positive.play()
    target.body.enable = false
    if (this.prompt3_flag) {
      this.createPrompt(3, target.x, target.y)
      this.prompt3_flag = false
    }
    this.tweens.add({
      targets: target,
      scale: {
        from: 1,
        to: 2
      },
      alpha: {
        from: 1,
        to: 0
      },
      ease: "Power2",
      duration: 500,
      onComplete: function () {
        target.setAlive(false);
        target.alpha = 1
        target.scale = 1
      },
    });
    // target.setAlive(false);
    this.score += SCORE_SPOT
    this.ui.score_text.setText(`${this.score}`);
  }
  muteMusic() { 
    if (this.mute) this.scene.get("Preload").main_theme.pause();
    else this.scene.get("Preload").main_theme.resume();
  }
  createSounds() {
    this.get_positive = this.sound.add("get_positive", {
      mute: false,
      volume: 0.2,
      rate: 1,
      detune: 0,
      seek: 0,
      delay: 0,
    });
    this.get_negative = this.sound.add("get_negative", {
      mute: false,
      volume: 0.2,
      rate: 1,
      detune: 0,
      seek: 0,
      delay: 0,
    });
    this.get_negative_musya = this.sound.add("get_negative_musya", {
      mute: false,
      volume: 0.2,
      rate: 1,
      detune: 0,
      seek: 0,
      delay: 0,
    });
    this.win = this.sound.add("win", {
      mute: false,
      volume: 0.2,
      rate: 1,
      detune: 0,
      seek: 0,
      delay: 0,
    });
    this.swipe_sound = this.sound.add("swipe_sound", {
      mute: false,
      volume: 1,
      rate: 1,
      detune: 0,
      seek: 0,
      delay: 0,
    });
  }
  onMusic() {
    this.ui.sound.on("pointerdown", () => {
      if (this.mute == false) {
        this.ui.sound.setFrame("musicOff");
        this.mute = true;
        this.muteMusic();
      } else {
        this.ui.sound.setFrame("musicOn");
        this.mute = false;
        this.muteMusic();
      }
    });
  }
  createPrompt(num, x, y) {
    let prompt = this.add.sprite(x, y, "prompts_spritesheet", `prompt${num}`)
    this.tweens.add({
      targets: prompt,
      alpha: {
        from: 1,
        to: 0
      },
      ease: "Power2",
      duration: 1800,
      onComplete: () => {
        prompt.destroy()
      },
    });
  }
  backToStart() {
    document.querySelector('body').classList.remove('bg-green-color');
    this.game.scene.add('Start', StartScene, true, {play_num: this.play_num, mute: this.mute});
    this.scene.remove("Game")
  }
  defeat() {
    this.scene.pause()
    if (this.play_num < 4) {
        const btnRestartGame = document.querySelector('[restart-game]');
        popupShow('#attempts', this.score); 
        const listener = () => {
            document.querySelector('body').classList.remove('bg-green-color');
            this.game.scene.add('Start', StartScene, true, {play_num: this.play_num, mute: this.mute});
            this.scene.remove("Game")
            btnRestartGame.removeEventListener('click', listener)
        }
        btnRestartGame.addEventListener('click', listener)      
    } else {
      popupShow('#not-attempts', this.score);
    }
  }
}
