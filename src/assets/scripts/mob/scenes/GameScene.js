import Borders from "../classes/Borders";
import Coins from "../classes/Coins";
import Negative from "../classes/Negative";
import Player from "../classes/Player";
import Positive from "../classes/Positive";
import Rooms from "../classes/Rooms";
import Spots from "../classes/Spots";
import UI_elements from "../classes/UI_elements";
import StartScene from "./StartScene";


const WIDTH = 1000
const HEIGHT = 1600

const GAME_VELOCITY_START = 5
const GAME_VELOCITY_STEP = 0

const SWIPE_POWER = 60

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

    this.play_num = 1

    this.isClicking = false

  }
  preload() {
    this.load.image("left_element", "src/assets/sprites/mob/left_element.png");
    this.load.image("right_element", "src/assets/sprites/mob/right_element.png");
    // this.load.image("left_element", "src/assets/sprites/mob/left_element2.jpg");
    // this.load.image("right_element", "src/assets/sprites/mob/right_element2.jpg");

    // this.load.image("room1", "src/assets/sprites/mob/rooms/jpg/room1.jpg");
    // this.load.image("room2", "src/assets/sprites/mob/rooms/jpg/room2.jpg");
    // this.load.image("room3", "src/assets/sprites/mob/rooms/jpg/room3.jpg");
    // this.load.image("room4", "src/assets/sprites/mob/rooms/jpg/room4.jpg");
    // this.load.image("room5", "src/assets/sprites/mob/rooms/jpg/room5.jpg");

    this.load.image("room1", "src/assets/sprites/mob/rooms/room1.png");
    this.load.image("room2", "src/assets/sprites/mob/rooms/room2.png");
    this.load.image("room3", "src/assets/sprites/mob/rooms/room3.png");
    this.load.image("room4", "src/assets/sprites/mob/rooms/room4.png");
    this.load.image("room5", "src/assets/sprites/mob/rooms/room5.png");
  }
  create() {
    this.version = 1.1
    // this.physics.world.setFPS(60) // 
    // this.cameras.main.setRoundPixels(true)
    // this.physics.world.setBounds(0 , 0, WIDTH, HEIGHT, false, false, false, true)
    // console.log(this.physics)
    // this.physics.world.fixedStep = false; // activates sync

    
    this.game_velocity = 0
    
    let rooms = new Rooms(this)
    
    // this.left_element1 = this.add.sprite(0, 0, "left_element").setOrigin(0)
    // this.physics.add.existing(this.left_element1)
    // this.left_element1.body.enable = true

    // this.left_element2 = this.add.sprite(0, -HEIGHT, "left_element").setOrigin(0)
    // this.physics.add.existing(this.left_element2)
    // this.left_element2.body.enable = true
    
    

    // this.right_element1 = this.add.sprite(WIDTH - 160, 0, "right_element").setOrigin(0)
    // this.physics.add.existing(this.right_element1)
    // this.right_element1.body.enable = true
    
    // this.right_element2 = this.add.sprite(WIDTH - 160, -HEIGHT, "right_element").setOrigin(0)
    // this.physics.add.existing(this.right_element2)
    // this.right_element2.body.enable = true
    
    
    this.left_element = this.add.tileSprite(0, 0, 160, HEIGHT, "left_element").setOrigin(0)
    this.right_element = this.add.tileSprite(WIDTH - 160, 0, 0, HEIGHT, "right_element").setOrigin(0)
    
    this.player = new Player(
      this, WIDTH / 2, HEIGHT / 2 + 500,
      `player_${this.hero}_1`,{"playerScale": 1, hero: this.hero})

      this.button_back = this.add.sprite(80, HEIGHT - 100, "ui_spritesheet","button_back").setInteractive()
      // .once("pointerdown", ()=> this.defeat())
      
      this.start_button = this.add.sprite(WIDTH / 2, HEIGHT / 2 + 700, "ui_spritesheet", "start")
        .setInteractive()
        .once("pointerdown", ()=> {
          this.player.play("player_animation");
          this.game_velocity = GAME_VELOCITY_START
          this.game_velocity_step = GAME_VELOCITY_STEP
          this.events.emit("start_game")
          this.events.removeListener("start_game")
          this.start_button.destroy()
          this.button_back.destroy()
          this.play_num++
        })

      this.tweens.add({
        targets: this.start_button,
        alpha: {
          from: 1,
          to: 0.7
        },
        angle: {
          from: -7,
          to: 7
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

    // this.line = new Phaser.Geom.Line(0, HEIGHT, WIDTH, HEIGHT)
    // console.log(this.line)
    // this.my_flag1 = false
    // this.my_flag2 = false

    this.fps = this.game.loop.actualFps
    this.fps_text = this.add.bitmapText(WIDTH / 2, HEIGHT / 2 + 300, 'Montserrat-Bold', `${this.fps}`, 60)
    this.version_text = this.add.bitmapText(WIDTH / 2 + 100, HEIGHT / 2 + 350, 'Montserrat-Bold', `${this.version}`, 60)
  }
  update(timestep, dt) {
    this.left_element.tilePositionY -= this.game_velocity
    this.right_element.tilePositionY -= this.game_velocity

    this.fps_text.setText(`${this.game.loop.actualFps}`)

    // this.left_element1.y += this.game_velocity
    // this.left_element2.y += this.game_velocity

    // this.right_element1.y += this.game_velocity
    // this.right_element2.y += this.game_velocity



    // if (!Phaser.Geom.Intersects.LineToRectangle(this.line, this.left_element1.body) && !this.my_flag1) {
    //   this.my_flag1 = !this.my_flag1
    //   this.left_element1.y = -HEIGHT
    //   this.right_element1.y = -HEIGHT
    //   console.log("OUT", this.my_flag1)
    // }

    // if (Phaser.Geom.Intersects.LineToRectangle(this.line, this.left_element1.body) && this.my_flag1) {
    //   this.my_flag1 = !this.my_flag1
    //   this.left_element2.y = -HEIGHT
    //   this.right_element2.y = -HEIGHT
    //   console.log("INTERSECT", this.my_flag1)
    // }
    

    if(!this.input.activePointer.isDown && this.isClicking == true) {
      if(Math.abs(this.input.activePointer.upX - this.input.activePointer.downX) >= SWIPE_POWER) {
          if(this.input.activePointer.upX < this.input.activePointer.downX) {
            this.player.leftMove()
          } else if(this.input.activePointer.upX > this.input.activePointer.downX) {
            this.player.rightMove()
          }
      }
      this.isClicking = false;
    } else if(this.input.activePointer.isDown && this.isClicking == false) {
      this.isClicking = true;
    }
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
          this.ui.heart_3.alpha = 1
          this.ui.heart_3.scale = 1

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
      ease: "Power2",
      duration: 900,
      onComplete: () => {
        target.setAlive(false);
        target.alpha = 1
        target.scale = 0.6
      },
    });
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
    this.swipe_sound = this.sound.add("swipe_sound", {
      mute: false,
      volume: 1,
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
  }
  onMusic() {
    this.ui.sound.on("pointerdown", () => {
      console.log("EVENTS ", this.events.eventNames())
      console.log("UPDATE ",this.events.listenerCount("update"))
      console.log("LEAVE ",this.events.listenerCount("leave"))
      console.log("start", this.events.listeners("start"))
      console.log("destroy", this.events.listeners("destroy"))
      console.log("shutdown", this.events.listeners("shutdown"))
      console.log("update", this.events.listeners("update"))
      console.log("preupdate", this.events.listeners("preupdate"))
      console.log("transitionstart", this.events.listeners("transitionstart"))
      console.log("transitionout", this.events.listeners("transitionout"))
      console.log("pause", this.events.listeners("pause"))
      console.log("sleep", this.events.listeners( "sleep"))
      console.log("pause", this.events.listeners("pause"))
      console.log("postupdate", this.events.listeners("postupdate"))
      console.log("leave", this.events.listeners("leave"))
      console.log("SCENES ", this.scene.manager.scenes)

      console.log(window)
      console.log(this.children.getAll())
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
    let prompt = this.add.sprite(x, y, "prompts_spritesheet", `prompt${num}`).setScale(1.4)
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
  defeat() {
    // this.game.scene.add('Start', StartScene, true, {mute: this.mute});
    // this.scene.remove("Game")
  }
  // createSideElement() {
  //   console.log("createSideElement()")
  //   this.left_element1.y = -HEIGHT
  // }
}
